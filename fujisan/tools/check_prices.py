#!/usr/bin/env python3
"""Cross-check every item's price, calories and piece count in data/menu.json
against the text of FujiSan-Menu-1-Sumi-Dark.pdf.

    pip install pymupdf
    python3 tools/check_prices.py [path/to/FujiSan-Menu-1-Sumi-Dark.pdf]

How it reads the PDF: every item in the Sumi PDF has its English name set in
Cinzel Bold (warm #D5C6AC). The price is the next Cinzel Bold number after it,
and the calories / pieces are the "NNN cal" / "N قطع" labels on the same row.
Exit code 1 if anything does not match.
"""
import json
import pathlib
import re
import sys

import pymupdf

ROOT = pathlib.Path(__file__).resolve().parent.parent
PDF = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "FujiSan-Menu-1-Sumi-Dark.pdf"


def norm(s):
    return re.sub(r"[^a-z]", "", s.lower().replace("ñ", "n"))


def pdf_records(path):
    """Yield one dict per item occurrence in the PDF."""
    doc = pymupdf.open(path)
    for page in doc:
        spans = []
        for b in page.get_text("dict")["blocks"]:
            for line in b.get("lines", []):
                for s in line["spans"]:
                    t = s["text"].strip()
                    if t:
                        spans.append((t, s["font"], s["color"], s["bbox"]))
        for i, (t, font, color, bb) in enumerate(spans):
            if "Cinzel-Bold" not in font or color != 0xD5C6AC:
                continue
            prices, cal, pcs = [], None, None
            for t2, f2, c2, bb2 in spans[i + 1:i + 14]:
                if "Cinzel-Bold" in f2 and c2 == 0xD5C6AC:
                    break  # next item
                if "Cinzel-Bold" in f2 and re.fullmatch(r"\d+(\.\d+)?", t2):
                    prices.append(float(t2))
                m = re.search(r"(\d+)\s*cal", t2)
                if m:
                    cal = int(m.group(1))
                if "قطعتان" in t2:
                    pcs = 2
                else:
                    m = re.search(r"(\d+)", t2) if re.search(r"قطع", t2) else None
                    if m:
                        pcs = int(m.group(1))
                if cal is not None and prices:
                    # row finished once calories are read (calories come last on the meta row)
                    break
            yield {"page": page.number + 1, "en": t, "prices": prices, "cal": cal, "pcs": pcs}


def main():
    menu = json.loads((ROOT / "data" / "menu.json").read_text(encoding="utf-8"))
    items = {}
    for sec in menu["sections"]:
        for it in sec["items"]:
            if "id" in it:
                items[norm(it["en"])] = (sec["id"], it)

    problems, checked, seen = [], 0, set()
    for rec in pdf_records(PDF):
        key = norm(rec["en"])
        if key not in items:
            problems.append(f"p{rec['page']:>2}  {rec['en']!r}: in PDF but not in menu.json")
            continue
        seen.add(key)
        sec, it = items[key]
        want_prices = [o["price"] for o in it["options"]] if it.get("options") else [it["price"]]
        checked += 1
        if [float(p) for p in want_prices] != rec["prices"]:
            problems.append(f"p{rec['page']:>2}  {it['en']}: price json={want_prices} pdf={rec['prices']}")
        if it.get("cal") != rec["cal"]:
            problems.append(f"p{rec['page']:>2}  {it['en']}: calories json={it.get('cal')} pdf={rec['cal']}")
        if (it.get("pcs") or None) != rec["pcs"]:
            problems.append(f"p{rec['page']:>2}  {it['en']}: pieces json={it.get('pcs')} pdf={rec['pcs']}")

    for key, (sec, it) in items.items():
        if key not in seen:
            problems.append(f"      {it['en']} ({sec}): in menu.json but not found in PDF")

    print(f"Checked {checked} PDF item occurrences against {len(items)} menu.json items.")
    if problems:
        print(f"{len(problems)} mismatch(es):")
        print("\n".join("  " + p for p in problems))
        sys.exit(1)
    print("All prices, calories and piece counts match the PDF.")


if __name__ == "__main__":
    main()
