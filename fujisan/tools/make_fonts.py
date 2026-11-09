#!/usr/bin/env python3
"""Subset the self-hosted fonts to Arabic + Latin (and only the Japanese characters
actually used on the page) and write WOFF2 files into fonts/.

Source TTFs are the Google Fonts originals (OFL). Usage:
    python tools/make_fonts.py <dir-with-source-ttfs>
Needs: pip install fonttools brotli
"""
import sys, pathlib, re, json
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".")
OUT = ROOT / "fonts"; OUT.mkdir(exist_ok=True)

LATIN = list(range(0x20, 0x7F)) + list(range(0xA0, 0x100)) + [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026, 0x00B7, 0x2009, 0x200C, 0x200D, 0x200E, 0x200F]
ARABIC = [0x060C, 0x061B, 0x061F, 0x0640, 0x066A, 0x066B, 0x066C] + list(range(0x0621, 0x063B)) + list(range(0x0641, 0x0656)) + list(range(0x0660, 0x066A)) + [0x0670]

def japanese_chars():
    """Every CJK/kana character used in index.html, menu.json, CSS and JS."""
    text = ""
    for p in [ROOT / "data" / "menu.json", ROOT / "build.py", ROOT / "index.html", ROOT / "app.js"]:
        if p.exists(): text += p.read_text(encoding="utf-8")
    return sorted({ord(c) for c in text if re.match(r"[　-ヿ一-鿿＀-￯]", c)})

def make(src, out, unicodes, wght=None, wght_range=None):
    f = TTFont(SRC / src)
    if "fvar" in f:
        if wght_range: f = instancer.instantiateVariableFont(f, {"wght": wght_range})
        elif wght: f = instancer.instantiateVariableFont(f, {"wght": wght})
        import io
        buf = io.BytesIO(); f.save(buf); buf.seek(0); f = TTFont(buf)  # reload: avoids lazy-gvar errors when subsetting
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["*"]
    opts.name_IDs = [0, 1, 2, 3, 4, 5, 6]
    opts.hinting = False
    opts.desubroutinize = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=unicodes)
    sub.subset(f)
    f.flavor = "woff2"
    f.save(OUT / out)
    print(f"{out:36s} {(OUT / out).stat().st_size/1024:6.1f} KB")

make("ReemKufi[wght].ttf", "reemkufi-600.woff2", ARABIC + [0x20], wght=600)
for w, n in ((400, "Regular"), (500, "Medium"), (600, "SemiBold")):
    make(f"IBMPlexSansArabic-{n}.ttf", f"plexar-{w}.woff2", ARABIC + LATIN)
make("Cinzel[wght].ttf", "cinzel-600-700.woff2", LATIN, wght_range=(600, 700))
make("NotoSerifJP[wght].ttf", "notoserifjp-500.woff2", japanese_chars() + [0x20], wght=500)
