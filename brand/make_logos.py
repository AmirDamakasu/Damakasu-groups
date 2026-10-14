"""Generate Damakasu logo concepts as standalone SVGs (text converted to outlines).

Run:  <python with fonttools> brand/make_logos.py
Writes brand/logo-concepts/*.svg and brand/logo-concepts/index.html (preview sheet).
"""
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "node_modules/@fontsource"
OUT = ROOT / "brand/logo-concepts"

GREEN, NAVY, GOLD, WHITE, PAPER = "#14532D", "#0F172A", "#C9A227", "#FFFFFF", "#F7F8F7"

SERIF = TTFont(FONTS / "playfair-display/files/playfair-display-latin-800-normal.woff")
SANS = TTFont(FONTS / "dm-sans/files/dm-sans-latin-600-normal.woff")


def text_path(font: TTFont, text: str, size: float, tracking: float = 0.0, x: float = 0.0, baseline: float = 0.0):
    """Return (svg path data, advance width) for `text` at `size` px, with letter-spacing in em."""
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    scale = size / font["head"].unitsPerEm
    pen = SVGPathPen(glyphs)
    cursor = 0.0
    for i, char in enumerate(text):
        name = cmap[ord(char)]
        glyph = glyphs[name]
        glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, x + cursor, baseline)))
        cursor += glyph.width * scale + (tracking * size if i < len(text) - 1 else 0)
    return pen.getCommands(), cursor


# ─── Marks (drawn in a 100×100 box) ──────────────────────────
def mark_monogram(fg: str, accent: str, inner: str) -> str:
    """'DM' monogram set in a solid rounded hexagon, with a short accent bar."""
    hexagon = "M50 3 L91 26.5 Q94 28.2 94 31.7 L94 68.3 Q94 71.8 91 73.5 L50 97 L9 73.5 Q6 71.8 6 68.3 L6 31.7 Q6 28.2 9 26.5 Z"
    d, w = text_path(SERIF, "DM", 40, tracking=-0.02)
    d, _ = text_path(SERIF, "DM", 40, tracking=-0.02, x=50 - w / 2, baseline=63)
    return (
        f'<path d="{hexagon}" fill="{fg}"/>'
        f'<path d="{d}" fill="{inner}"/>'
        f'<rect x="38" y="70" width="24" height="4.5" rx="2.25" fill="{accent}"/>'
    )


def mark_links(primary: str, secondary: str, accent: str) -> str:
    """Two interlocking links — the 'Multi-Link' idea. Each passes over the other once, like a real chain."""
    stroke = 'fill="none" stroke-width="12"'
    left = f'<rect x="6" y="28" width="56" height="44" rx="22" {stroke} stroke="{primary}"/>'
    right = f'<rect x="38" y="28" width="56" height="44" rx="22" {stroke} stroke="{secondary}"/>'
    # Right link drawn first, left link on top; then the right link's lower-left arc is redrawn over
    # the left link so the two cross over-and-under.
    under_over = f'<path d="M60 72 A22 22 0 0 1 38 50" {stroke} stroke="{secondary}" stroke-linecap="butt"/>'
    return right + left + under_over


def mark_growth(shield: str, grain: str, accent: str) -> str:
    """Shield holding a wheat ear: export-grade trust around agricultural produce."""
    shield_path = "M50 4 L88 16 Q91 17 91 20.5 L91 48 Q91 78 50 96 Q9 78 9 48 L9 20.5 Q9 17 12 16 Z"
    stem = f'<rect x="47.5" y="40" width="5" height="44" rx="2.5" fill="{grain}"/>'
    kernels = []
    for y in (68, 55, 42):
        kernels.append(f'<ellipse cx="41" cy="{y}" rx="5.5" ry="10" transform="rotate(-32 41 {y})" fill="{grain}"/>')
        kernels.append(f'<ellipse cx="59" cy="{y}" rx="5.5" ry="10" transform="rotate(32 59 {y})" fill="{grain}"/>')
    top = f'<ellipse cx="50" cy="28" rx="5.5" ry="10" fill="{accent}"/>'
    return f'<path d="{shield_path}" fill="{shield}"/>{stem}{"".join(kernels)}{top}'


CONCEPTS = {
    "a-monogram": ("Monogram", mark_monogram),
    "b-multilink": ("Multi-Link", mark_links),
    "c-growth": ("Harvest Shield", mark_growth),
}

# Colour schemes per variant: (mark args..., name colour, tagline colour, background)
VARIANTS = {
    "color": {"bg": None, "name": NAVY, "tag": GREEN},
    "dark": {"bg": NAVY, "name": WHITE, "tag": "#A7D7B8"},
    "mono": {"bg": None, "name": NAVY, "tag": NAVY},
}


def mark_colors(concept: str, variant: str):
    if variant == "color":
        return {"a-monogram": (GREEN, GOLD, WHITE), "b-multilink": (GREEN, NAVY, GOLD), "c-growth": (NAVY, "#3FBF7F", GOLD)}[concept]
    if variant == "dark":
        return {"a-monogram": ("#1F7A4A", GOLD, WHITE), "b-multilink": ("#3FBF7F", WHITE, GOLD), "c-growth": (WHITE, GREEN, GOLD)}[concept]
    return {"a-monogram": (NAVY, NAVY, WHITE), "b-multilink": (NAVY, NAVY, NAVY), "c-growth": (NAVY, WHITE, WHITE)}[concept]


def wordmark(x: float, name_color: str, tag_color: str, name_size=58, tag_size=13.5, center=False, width=None):
    name_d, name_w = text_path(SERIF, "DAMAKASU", name_size, tracking=0.035)
    tag_d, tag_w = text_path(SANS, "MULTI-LINK INVESTMENT LTD", tag_size, tracking=0.24)
    if center:
        nx, tx = (width - name_w) / 2, (width - tag_w) / 2
    else:
        nx, tx = x, x + 2
    name_d, _ = text_path(SERIF, "DAMAKASU", name_size, tracking=0.035, x=nx, baseline=0)
    tag_d, _ = text_path(SANS, "MULTI-LINK INVESTMENT LTD", tag_size, tracking=0.24, x=tx, baseline=0)
    return name_d, tag_d, max(name_w, tag_w)


def svg(width: float, height: float, body: str, bg: str | None, title: str) -> str:
    background = f'<rect width="{width:.0f}" height="{height:.0f}" fill="{bg}"/>' if bg else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.0f} {height:.0f}" role="img" aria-label="{title}">'
        f"<title>{title}</title>{background}{body}</svg>\n"
    )


def horizontal(concept: str, variant: str) -> str:
    scheme = VARIANTS[variant]
    mark = CONCEPTS[concept][1](*mark_colors(concept, variant))
    pad, mark_size, gap = 24, 112, 26
    name_d, tag_d, text_w = wordmark(0, scheme["name"], scheme["tag"])
    x_text = pad + mark_size + gap
    width = x_text + text_w + pad
    height = pad * 2 + mark_size
    body = (
        f'<g transform="translate({pad} {pad}) scale({mark_size / 100})">{mark}</g>'
        f'<g transform="translate({x_text} {pad + 66})"><path d="{name_d}" fill="{scheme["name"]}"/></g>'
        f'<g transform="translate({x_text} {pad + 98})"><path d="{tag_d}" fill="{scheme["tag"]}"/></g>'
    )
    return svg(width, height, body, scheme["bg"], "Damakasu Multi-Link Investment Ltd")


def stacked(concept: str, variant: str) -> str:
    scheme = VARIANTS[variant]
    size = 512
    mark = CONCEPTS[concept][1](*mark_colors(concept, variant))
    name_d, tag_d, _ = wordmark(0, scheme["name"], scheme["tag"], name_size=64, tag_size=15, center=True, width=size)
    body = (
        f'<g transform="translate(156 86) scale(2)">{mark}</g>'
        f'<g transform="translate(0 368)"><path d="{name_d}" fill="{scheme["name"]}"/></g>'
        f'<g transform="translate(0 404)"><path d="{tag_d}" fill="{scheme["tag"]}"/></g>'
    )
    return svg(size, size, body, scheme["bg"] or PAPER, "Damakasu Multi-Link Investment Ltd")


def icon(concept: str) -> str:
    mark = CONCEPTS[concept][1](*mark_colors(concept, "color"))
    return svg(100, 100, mark, None, "Damakasu")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    cards = []
    for concept, (label, _) in CONCEPTS.items():
        files = {}
        for variant in VARIANTS:
            name = f"{concept}-horizontal-{variant}.svg"
            (OUT / name).write_text(horizontal(concept, variant))
            files[variant] = name
        (OUT / f"{concept}-stacked.svg").write_text(stacked(concept, "color"))
        (OUT / f"{concept}-icon.svg").write_text(icon(concept))
        cards.append((concept, label, files))

    rows = []
    for concept, label, files in cards:
        rows.append(f"""
  <section class="concept">
    <h2>{label} <span>concept {concept[0].upper()}</span></h2>
    <div class="grid">
      <figure class="light"><img src="{files['color']}" alt="{label} — full colour"><figcaption>Full colour</figcaption></figure>
      <figure class="dark"><img src="{files['dark']}" alt="{label} — on dark"><figcaption>On dark</figcaption></figure>
      <figure class="light"><img src="{files['mono']}" alt="{label} — single colour"><figcaption>Single colour</figcaption></figure>
      <figure class="light square"><img src="{concept}-stacked.svg" alt="{label} — stacked"><figcaption>Stacked (social avatar)</figcaption></figure>
      <figure class="light sizes"><div>
        <img src="{concept}-icon.svg" width="16" height="16" alt=""><img src="{concept}-icon.svg" width="32" height="32" alt="">
        <img src="{concept}-icon.svg" width="64" height="64" alt=""></div><figcaption>Favicon 16 / 32 / 64 px</figcaption></figure>
      <figure class="light header"><div class="fakeheader"><img src="{files['color']}" alt=""><span>Home · About Us · Products · Contact</span></div><figcaption>In the site header (56 px tall)</figcaption></figure>
    </div>
  </section>""")
    (OUT / "index.html").write_text(f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Damakasu Logo Concepts</title>
<style>
  :root {{ --navy:{NAVY}; --green:{GREEN}; --paper:{PAPER}; }}
  body {{ margin:0; font-family: system-ui, sans-serif; background: var(--paper); color: var(--navy); }}
  header {{ padding: 32px 24px 8px; max-width: 1100px; margin: auto; }}
  h1 {{ font-size: 28px; margin: 0 0 6px; }} header p {{ margin: 0; color: #475569; }}
  .concept {{ max-width: 1100px; margin: 24px auto; padding: 0 24px; }}
  h2 {{ font-size: 20px; }} h2 span {{ font-size: 13px; color: var(--green); font-weight: 600; margin-left: 8px; text-transform: uppercase; letter-spacing: .1em; }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }}
  figure {{ margin: 0; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: center; gap: 10px; border: 1px solid #e2e8f0; }}
  .light {{ background: #fff; }} .dark {{ background: var(--navy); border-color: var(--navy); }}
  .dark figcaption {{ color: #cbd5e1; }}
  figure > img {{ width: 100%; height: auto; }}
  .square img {{ width: 60%; margin: auto; }}
  .sizes div {{ display: flex; align-items: end; gap: 18px; }}
  .fakeheader {{ display: flex; align-items: center; justify-content: space-between; gap: 12px; }}
  .fakeheader img {{ height: 56px; width: auto; }} .fakeheader span {{ font-size: 11px; color: #64748b; }}
  figcaption {{ font-size: 12px; color: #64748b; }}
</style></head><body>
<header><h1>Damakasu Multi-Link Investment Ltd — logo concepts</h1>
<p>Three directions. Wordmark set in Playfair Display ExtraBold with DM Sans tagline (the site's fonts), converted to outlines.</p></header>
{''.join(rows)}
</body></html>
""")
    print("wrote", sorted(p.name for p in OUT.iterdir()))


if __name__ == "__main__":
    main()
