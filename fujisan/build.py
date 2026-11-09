#!/usr/bin/env python3
"""Build index.html from data/menu.json.

    python3 build.py

Reads data/menu.json, renders the whole menu as static HTML (so the page works and
is indexable before any JavaScript runs) and writes index.html. No dependencies
beyond the Python standard library.

app.js renders the same markup in the browser. On load it fetches data/menu.json
and compares its hash with the one baked into index.html; if you edited the JSON
but forgot to re-run this script, the page re-renders itself from the JSON.
Re-running build.py is still recommended (for search engines and no-JS users).
"""
import html
import json
import pathlib
import re
import struct

ROOT = pathlib.Path(__file__).resolve().parent
DATA = ROOT / "data" / "menu.json"
OUT = ROOT / "index.html"


def esc(s):
    return html.escape(str(s), quote=True)


def fnv1a(data: bytes) -> str:
    """32-bit FNV-1a over the raw bytes of menu.json (mirrored in app.js)."""
    h = 0x811C9DC5
    for b in data:
        h ^= b
        h = (h * 0x01000193) & 0xFFFFFFFF
    return format(h, "08x")


def webp_size(path):
    """Return (width, height) of a WebP file without any image library."""
    try:
        b = path.read_bytes()[:40]
    except OSError:
        return None
    if b[:4] != b"RIFF" or b[8:12] != b"WEBP":
        return None
    chunk = b[12:16]
    if chunk == b"VP8X":
        w = 1 + int.from_bytes(b[24:27], "little")
        h = 1 + int.from_bytes(b[27:30], "little")
        return w, h
    if chunk == b"VP8L":
        bits = int.from_bytes(b[21:25], "little")
        return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
    if chunk == b"VP8 ":
        w, h = struct.unpack("<HH", b[26:30])
        return w & 0x3FFF, h & 0x3FFF
    return None


# ---------------------------------------------------------------- render helpers
# Keep these in sync with the render functions in app.js.

def fmt_price(p):
    if isinstance(p, float) and p.is_integer():
        p = int(p)
    return str(p)


def pcs_label(n):
    if not n:
        return ""
    if n == 2:
        return "قطعتان"
    if n <= 10:
        return f"{n} قطع"
    return f"{n} قطعة"


RIYAL = '<svg class="ry" viewBox="0 0 1016 1118" role="img" aria-label="ريال"><use href="#ry"/></svg>'


def img_tag(src, alt, cls, eager=False):
    if not src:
        return ""
    size = webp_size(ROOT / src)
    wh = f' width="{size[0]}" height="{size[1]}"' if size else ""
    load = ' fetchpriority="high"' if eager else ' loading="lazy"'
    return f'<img class="{cls}" src="{esc(src)}" alt="{esc(alt)}"{wh}{load} decoding="async">'


def meta_row(it):
    out = ['<p class="meta">']
    if it.get("options"):
        parts = []
        for o in it["options"]:
            parts.append(f'<span class="price"><span class="opt">{esc(o["ar"])}</span>'
                         f'<span class="num">{fmt_price(o["price"])}</span>{RIYAL}</span>')
        out.append('<span class="sep" aria-hidden="true">·</span>'.join(parts))
    else:
        out.append(f'<span class="price"><span class="num">{fmt_price(it["price"])}</span>{RIYAL}</span>')
    if it.get("pcs"):
        out.append(f'<span class="pcs">{pcs_label(it["pcs"])}</span>')
    if it.get("cal") is not None:
        out.append(f'<span class="cal"><span dir="ltr" lang="en">{it["cal"]} cal</span></span>')
    out.append("</p>")
    return "".join(out)


def badge(it):
    return '<span class="new">جديد · <span lang="en">New</span></span>' if it.get("isNew") else ""


def alt_text(it):
    return f"صورة {it['ar']}"


def item_li(it, hl):
    photo = ""
    if it.get("photo"):
        photo = f'<div class="ph">{img_tag(it["photo"], alt_text(it), "ph-img")}</div>'
    desc = f'<p class="desc"><span dir="ltr" lang="en">{esc(it["desc"])}</span></p>' if it.get("desc") else ""
    return (f'<li class="item{"" if photo else " item--nophoto"}" id="i-{esc(it["id"])}">{photo}<div class="bd">'
            f'<h{hl} class="nm"><span class="ar">{esc(it["ar"])}</span>{badge(it)}</h{hl}>'
            f'<p class="en"><span dir="ltr" lang="en">{esc(it["en"])}</span></p>'
            f'{desc}{meta_row(it)}</div></li>')


def fuji_icon(level):
    return f'<svg class="fuji" viewBox="0 0 504 273" aria-hidden="true"><use href="#fuji-{level}"/></svg>'


def level_head(key, lv):
    return (f'<h3 class="lvh"><span class="lvh-ar">{fuji_icon(key)}<span class="lvh-name">{esc(lv["ar"])}</span>'
            f' <span class="lvh-type">{esc(lv["typeAr"])}</span></span>'
            f'<span class="lvh-en"><span class="jp" lang="ja">{esc(lv["jp"])}</span> '
            f'<span dir="ltr" lang="en">{esc(lv["en"])} · {esc(lv["typeEn"])}</span></span></h3>')


def group_items(items):
    """Group a section's items by level, merging repeated groups in first-seen order."""
    order, groups = [], {}
    for it in items:
        k = it.get("level") or ""
        if k not in groups:
            groups[k] = []
            order.append(k)
        groups[k].append(it)
    return [(k, groups[k]) for k in order]


def section_head(sec):
    return (f'<header class="sh"><div class="sh-t"><h2 id="{esc(sec["id"])}-h">'
            f'<span class="sh-ar">{esc(sec["ar"])}</span>'
            f'<span class="sh-en" dir="ltr" lang="en">{esc(sec["en"])}</span></h2>'
            f'<svg class="brush" viewBox="0 0 1120 46" aria-hidden="true"><use href="#brush"/></svg></div>'
            f'<span class="sh-jp" lang="ja" aria-hidden="true">{esc(sec["jp"])}</span></header>')


def featured(it, idx, kind):
    src = it.get("hero") or it.get("photo")
    desc = f'<p class="desc"><span dir="ltr" lang="en">{esc(it["desc"])}</span></p>' if it.get("desc") else ""
    return (f'<article class="ft ft--{kind}{" ft--alt" if idx % 2 else ""}" id="f-{esc(it["id"])}">'
            f'<div class="ft-ph"><span class="disc" aria-hidden="true"></span>{img_tag(src, alt_text(it), "ft-img")}</div>'
            f'<div class="ft-bd"><h3 class="ft-nm"><span class="ar">{esc(it["ar"])}</span>{badge(it) if kind != "new" else ""}</h3>'
            f'<p class="en"><span dir="ltr" lang="en">{esc(it["en"])}</span></p>{desc}{meta_row(it)}</div></article>')


def render_sections(menu):
    by_id = {it["id"]: it for s in menu["sections"] for it in s["items"] if "id" in it}
    levels = menu["levels"]
    out = []
    for sec in menu["sections"]:
        if menu.get("climb") and menu["climb"].get("beforeSection") == sec["id"]:
            out.append(render_climb(menu))
        items = [by_id[x["ref"]] if "ref" in x else x for x in sec["items"]]
        body = []
        if sec["layout"] == "featured":
            kind = "new" if sec["id"] == "new" else "box"
            body.append('<div class="fts">')
            for i, it in enumerate(items):
                body.append(featured(it, i, kind))
            body.append("</div>")
        else:
            for key, its in group_items(items):
                lv = levels.get(key)
                hl = 4 if lv else 3
                cls = f"card card--lv lv-{key}" if lv else "card"
                body.append(f'<div class="{cls}">')
                if lv:
                    body.append(level_head(key, lv))
                body.append('<ul class="items">' + "".join(item_li(it, hl) for it in its) + "</ul></div>")
        out.append(f'<section class="sec sec--{sec["layout"]}" id="{esc(sec["id"])}" aria-labelledby="{esc(sec["id"])}-h">'
                   f'{section_head(sec)}{"".join(body)}</section>')
    return "".join(out)


def render_climb(menu):
    c, levels = menu["climb"], menu["levels"]
    rows = []
    for key, lv in levels.items():
        rows.append(f'<li class="cl lv-{key}"><span class="cl-main">{fuji_icon(key)}<span class="cl-txt">'
                    f'<span class="cl-ar"><span class="lvh-name">{esc(lv["ar"])}</span> · {esc(lv["typeAr"])}</span>'
                    f'<span class="cl-en" dir="ltr" lang="en">{esc(lv["en"])} · {esc(lv["typeEn"])}</span></span></span>'
                    f'<span class="cl-jp" lang="ja" aria-hidden="true">{esc(lv["jp"])}</span></li>')
    return (f'<section class="climb" id="climb" aria-labelledby="climb-h"><h2 id="climb-h">'
            f'<span class="sh-ar">{esc(c["ar"])}</span><span class="climb-en" dir="ltr" lang="en">{esc(c["en"])}</span></h2>'
            f'<p class="climb-ar">{esc(c["textAr"])}</p><p class="climb-tx"><span dir="ltr" lang="en">{esc(c["textEn"])}</span></p>'
            f'<ol class="cls">{"".join(rows)}</ol></section>')


def render_nav(menu):
    return "".join(f'<a class="chip" href="#{esc(s["id"])}">{esc(s["nav"])}</a>' for s in menu["sections"])


CONTACT_ICONS = {
    "phone": '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/>',
    "whatsapp": '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.47-.72-1.7-.8s-.39-.12-.56.12-.64.8-.79.97-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.9c-.25-.43.25-.4.71-1.33a.45.45 0 0 0-.02-.42c-.06-.12-.56-1.34-.76-1.84s-.4-.41-.56-.42h-.48a.92.92 0 0 0-.66.31 2.8 2.8 0 0 0-.87 2.07 4.8 4.8 0 0 0 1 2.55 11 11 0 0 0 4.2 3.7c1.56.67 2.17.73 2.95.62a2.5 2.5 0 0 0 1.66-1.17 2 2 0 0 0 .14-1.17c-.06-.1-.23-.16-.48-.28z"/>',
    "instagram": '<path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.2 5.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2c-2.7 0-3.1 0-4.1.06-3.6.16-5.7 2.2-5.8 5.8C2 8.9 2 9.3 2 12s0 3.1.06 4.1c.16 3.6 2.2 5.7 5.8 5.8 1 .05 1.4.06 4.1.06s3.1 0 4.1-.06c3.6-.16 5.7-2.2 5.8-5.8.05-1 .06-1.4.06-4.1s0-3.1-.06-4.1c-.16-3.6-2.2-5.7-5.8-5.8C15.1 2 14.7 2 12 2zm0 1.8c2.7 0 3 0 4 .06 2.6.12 3.9 1.4 4.1 4.1.05 1 .06 1.4.06 4s0 3-.06 4c-.12 2.7-1.4 3.9-4.1 4.1-1 .05-1.4.06-4 .06s-3 0-4-.06c-2.7-.12-3.9-1.4-4.1-4.1-.05-1-.06-1.4-.06-4s0-3 .06-4C4.1 5.3 5.4 4 8 3.86c1-.05 1.4-.06 4-.06z"/>',
}
CONTACT_LABELS = {"phone": ("رقم المطعم", "Call"), "whatsapp": ("واتساب", "WhatsApp"), "instagram": ("حسابات التواصل", "Instagram")}


def contact_href(kind, val):
    if not val:
        return ""
    if kind == "phone":
        return "tel:" + "".join(ch for ch in val if ch.isdigit() or ch == "+")
    if kind == "whatsapp":
        return "https://wa.me/" + "".join(ch for ch in val if ch.isdigit())
    if kind == "instagram":
        return "https://instagram.com/" + val.lstrip("@")
    return ""


def render_contact(menu):
    out = []
    for kind in ("phone", "whatsapp", "instagram"):
        ar, en = CONTACT_LABELS[kind]
        href = contact_href(kind, menu.get("contact", {}).get(kind, ""))
        icon = f'<svg viewBox="0 0 24 24" aria-hidden="true">{CONTACT_ICONS[kind]}</svg>'
        inner = f'{icon}<span>{ar}</span><span class="cb-en" dir="ltr" lang="en">{en}</span>'
        if href:
            ext = ' target="_blank" rel="noopener"' if href.startswith("http") else ""
            out.append(f'<a class="cb" href="{esc(href)}"{ext}>{inner}</a>')
        else:
            out.append(f'<span class="cb cb--ph" aria-disabled="true" title="قريباً · Coming soon">{inner}</span>')
    return "".join(out)


def render_allergens(menu):
    return "".join(f'<li><span>{esc(a["ar"])}</span><span class="al-en" dir="ltr" lang="en">{esc(a["en"])}</span></li>'
                   for a in menu["allergens"])


# ---------------------------------------------------------------- page template

SPRITE = """<svg class="sprite" width="0" height="0" aria-hidden="true" focusable="false"><defs>
<clipPath id="fj-c1"><rect y="182" width="504" height="91"/></clipPath>
<clipPath id="fj-c2"><rect y="91" width="504" height="182"/></clipPath>
<path id="fj" d="M0 273C110 240 175 120 214 0H290C329 120 394 240 504 273Z"/>
<symbol id="fuji-foothill" viewBox="0 0 504 273"><use href="#fj" fill="currentColor" opacity=".26"/><use href="#fj" fill="currentColor" clip-path="url(#fj-c1)"/></symbol>
<symbol id="fuji-mid" viewBox="0 0 504 273"><use href="#fj" fill="currentColor" opacity=".26"/><use href="#fj" fill="currentColor" clip-path="url(#fj-c2)"/></symbol>
<symbol id="fuji-summit" viewBox="0 0 504 273"><use href="#fj" fill="currentColor"/><path fill="#F3EADA" d="M214 0H290L307 49L274 33L252 55L230 33L197 49Z"/></symbol>
<symbol id="ry" viewBox="0 0 1016 1118"><path fill="currentColor" d="M608 1118C612 1074 624 1031 642 993L1016 914C1012 958 1000 1000 982 1039L608 1118ZM981 796L597 876L597 636L478 661L478 794C478 806 474 818 467 827L405 917C390 940 366 956 339 961L0 1032C4 987 17 944 34 905L359 837L359 686L56 749C61 704 73 661 91 622L359 565L359 99C391 59 432 25 478 0L478 540L597 516L597 157C631 118 671 84 717 59L717 491L1016 428C1011 473 999 516 981 555L717 611L717 731L1016 669C1011 714 999 756 981 796Z"/></symbol>
<symbol id="brush" viewBox="0 0 1120 46"><path fill="currentColor" d="M0 32C166 8 391 0 728 4C897 6 1038 11 1119 19C1043 27 925 35 757 38C475 43 222 46 0 41Z"/></symbol>
</defs></svg>"""

PAGE = """<!doctype html>
<html lang="ar" dir="rtl" data-menu-hash="{hash}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Fuji San | فوجي سان — المنيو</title>
<meta name="description" content="{description}">
<meta name="theme-color" content="#0C0C0C">
<meta name="color-scheme" content="dark">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Fuji San | فوجي سان">
<meta property="og:title" content="Fuji San | فوجي سان — المنيو">
<meta property="og:description" content="{description}">
<meta property="og:locale" content="ar_SA">
<meta property="og:image" content="{site}img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="شعار فوجي سان — Fuji San logo">
{og_url}<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="img/emblem.svg" type="image/svg+xml">
<link rel="icon" href="img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="fonts/reemkufi-600.woff2" as="font" type="font/woff2" crossorigin>
<style>{css}</style>
<script src="app.js" defer></script>
<script type="application/ld+json">{jsonld}</script>
</head>
<body>
{sprite}
<div class="sun" aria-hidden="true"></div>
<a class="skip" href="#menu">تخطَّ إلى المنيو</a>
<header class="hero">
<div class="hero-in">
<h1 class="logo">{logo}</h1>
<p class="tag-ar">{tag_ar}</p>
<p class="tag-en" dir="ltr" lang="en">{tag_en}</p>
<p class="tag-jp" lang="ja">{tag_jp}</p>
<p class="cuisine">{cuisine}</p>
</div>
</header>
<nav class="nav" aria-label="أقسام المنيو"><div class="chips" id="chips">{nav}</div></nav>
<main id="menu">{sections}</main>
<footer class="foot" id="info">
<div class="foot-in">
<div class="bye">{fuji_sun}<p class="bye-jp" lang="ja">{closing_jp}</p><p class="bye-ar">{closing_ar}</p><p class="bye-en" dir="ltr" lang="en">{closing_en}</p></div>
<section class="contact" aria-labelledby="contact-h"><h2 id="contact-h" class="fh">للطلب والتواصل <span dir="ltr" lang="en">· Orders &amp; Contact</span></h2><div class="cbs" id="contact">{contact}</div></section>
<section class="allergens" aria-labelledby="al-h"><h2 id="al-h" class="fh">بعض منتجاتنا تحتوي على: <span dir="ltr" lang="en">Some of our products contain:</span></h2><ul class="als">{allergens}</ul>
<p class="al-note">{allergy_ar} <span dir="ltr" lang="en">· {allergy_en}</span></p></section>
<p class="vat">{vat_ar} <span dir="ltr" lang="en">· {vat_en}</span></p>
<p class="kcal">{cal_ar}</p>
<p class="kcal"><span dir="ltr" lang="en">{cal_en}</span></p>
<p class="copy"><span dir="ltr" lang="en">© Fuji San</span> · فوجي سان</p>
</div>
</footer>
</body>
</html>
"""


def minify_css(css):
    """Strip comments and redundant whitespace; styles.css stays the editable source."""
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"\s+", " ", css)
    css = re.sub(r"\s*([{}:;,>])\s*", r"\1", css)
    css = css.replace(";}", "}").replace("</", "<\\/")
    return css.strip()


def build():
    raw = DATA.read_bytes()
    menu = json.loads(raw.decode("utf-8"))
    r, n = menu["restaurant"], menu["notes"]
    site = (menu.get("site", {}) or {}).get("url", "").rstrip("/")
    site_prefix = site + "/" if site else ""
    description = ("منيو فوجي سان — سوشي، رامن ومطبخ ياباني. من السفح إلى القمة. "
                   "Fuji San menu — sushi, ramen & Japanese cuisine in Saudi Arabia.")
    jsonld = {
        "@context": "https://schema.org", "@type": "Restaurant",
        "name": "Fuji San | فوجي سان", "servesCuisine": ["Japanese", "Sushi", "Ramen"],
        "image": site_prefix + "img/og-image.jpg", "currenciesAccepted": "SAR",
        "address": {"@type": "PostalAddress", "addressCountry": "SA"},
    }
    if site:
        jsonld["url"] = site + "/"
        jsonld["hasMenu"] = site + "/#menu"
    if menu.get("contact", {}).get("phone"):
        jsonld["telephone"] = menu["contact"]["phone"]
    page = PAGE.format(
        hash=fnv1a(raw),
        description=esc(description),
        site=esc(site_prefix),
        og_url=f'<meta property="og:url" content="{esc(site)}/">\n<link rel="canonical" href="{esc(site)}/">\n' if site else "",
        jsonld=json.dumps(jsonld, ensure_ascii=False).replace("</", "<\\/"),
        sprite=SPRITE,
        logo=img_tag("img/logo.webp", "فوجي سان — Fuji San", "logo-img", eager=True).replace(
            ' alt=', ' srcset="img/logo-400.webp 400w, img/logo-560.webp 560w, img/logo.webp 720w"'
                     ' sizes="(min-width: 600px) 420px, 76vw" alt=', 1),
        css=minify_css((ROOT / "styles.css").read_text(encoding="utf-8")),
        tag_ar=esc(r["tagline"]["ar"]), tag_en=esc(r["tagline"]["en"]), tag_jp=esc(r["tagline"]["jp"]),
        cuisine='<span class="dot" aria-hidden="true">•</span>'.join(f"<span>{esc(c)}</span>" for c in r["cuisine"]),
        nav=render_nav(menu),
        sections=render_sections(menu),
        fuji_sun=img_tag("img/fuji-sun.webp", "", "bye-img"),
        closing_jp=esc(n["closingJp"]), closing_ar=esc(n["closingAr"]), closing_en=esc(n["closingEn"]),
        contact=render_contact(menu),
        allergens=render_allergens(menu),
        allergy_ar=esc(n["allergyAr"]), allergy_en=esc(n["allergyEn"]),
        vat_ar=esc(n["vatAr"]), vat_en=esc(n["vatEn"]),
        cal_ar=esc(n["caloriesAr"]), cal_en=esc(n["caloriesEn"]),
    )
    OUT.write_text(page, encoding="utf-8")
    n_items = sum(1 for s in menu["sections"] for it in s["items"] if "id" in it)
    print(f"wrote {OUT.name}: {len(page.encode()) / 1024:.1f} KB, {n_items} items, hash {fnv1a(raw)}")


if __name__ == "__main__":
    build()
