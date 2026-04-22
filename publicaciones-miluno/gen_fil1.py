#!/usr/bin/env python3
"""
FIL-1 Countdown — @milunoeditorial
1080x1080px editorial Instagram post
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ── Canvas ──────────────────────────────────────────────────────────────────
W, H = 1080, 1080

# ── Palette: editorial neutral ───────────────────────────────────────────────
BG   = (249, 248, 244)   # warm white / cream
INK  = (17,  17,  15)    # deep anthracite
GRAY = (148, 145, 137)   # warm muted mid-gray
RULE = (205, 202, 194)   # pale warm rule color

img  = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# ── Font loader ──────────────────────────────────────────────────────────────
def font(variant, size):
    paths = {
        "b":  "C:/Windows/Fonts/georgiab.ttf",
        "r":  "C:/Windows/Fonts/georgia.ttf",
        "i":  "C:/Windows/Fonts/georgiai.ttf",
        "bi": "C:/Windows/Fonts/georgiaz.ttf",
    }
    return ImageFont.truetype(paths[variant], size)

# ── Helpers ──────────────────────────────────────────────────────────────────
def text_width(text, fnt, ls=0):
    if ls > 0:
        chars = list(text)
        widths = [draw.textbbox((0, 0), c, font=fnt)[2] - draw.textbbox((0, 0), c, font=fnt)[0] for c in chars]
        return sum(widths) + ls * max(len(chars) - 1, 0)
    bb = draw.textbbox((0, 0), text, font=fnt)
    return bb[2] - bb[0]

def text_height(text, fnt):
    bb = draw.textbbox((0, 0), text, font=fnt)
    return bb[3] - bb[1], bb[1]   # height, top_offset

def draw_centered(text, fnt, color, y, ls=0):
    if ls > 0:
        chars  = list(text)
        widths = [draw.textbbox((0, 0), c, font=fnt)[2] - draw.textbbox((0, 0), c, font=fnt)[0] for c in chars]
        total  = sum(widths) + ls * max(len(chars) - 1, 0)
        x      = (W - total) // 2
        for c, cw in zip(chars, widths):
            draw.text((x, y), c, font=fnt, fill=color)
            x += cw + ls
    else:
        bb = draw.textbbox((0, 0), text, font=fnt)
        x  = (W - (bb[2] - bb[0])) // 2 - bb[0]
        draw.text((x, y - bb[1]), text, font=fnt, fill=color)

def hline(y, mx=88, thick=1, color=RULE):
    draw.rectangle([(mx, y), (W - mx, y + thick - 1)], fill=color)

# ── Fonts ────────────────────────────────────────────────────────────────────
f_year   = font("r",  18)   # FIL 2026 label
f_date   = font("b", 128)   # 23.04 — 11.05  (the hero)
f_fil    = font("r",  26)   # FERIA INTERNACIONAL DEL LIBRO
f_city   = font("r",  17)   # BUENOS AIRES · 2026
f_stand  = font("r",  20)   # Stand info
f_handle = font("i",  18)   # @milunoeditorial

# ── Layout ───────────────────────────────────────────────────────────────────
MX = 88    # margin x

# Measure date block height for vertical centering
dh, dt = text_height("23.04 — 11.05", f_date)

# Content block total estimated height (used to anchor vertically)
# We'll start the block so its visual center is slightly above H/2
BLOCK_H = (
    22    # year label
  + 36    # gap + rule
  + 56    # gap before date
  + dh    # date height
  + 55    # gap + rule
  + 34    # gap
  + 28    # FERIA line
  + 22    # gap
  + 20    # city line
  + 44    # gap + rule
  + 30    # gap
  + 22    # stand
)

y0 = (H - BLOCK_H) // 2 - 28   # nudge 28px above true center

# ── 1. Year label ─────────────────────────────────────────────────────────
y = y0
draw_centered("FIL  2026", f_year, GRAY, y, ls=4)
y += 26

# ── Thin rule ─────────────────────────────────────────────────────────────
y += 10
hline(y, MX)
y += 1

# ── 2. Main date ──────────────────────────────────────────────────────────
y += 52
draw_centered("23.04 — 11.05", f_date, INK, y)
y += dh

# ── Thin rule ─────────────────────────────────────────────────────────────
y += 52
hline(y, MX)
y += 1

# ── 3. FERIA INTERNACIONAL DEL LIBRO ─────────────────────────────────────
y += 38
draw_centered("FERIA INTERNACIONAL DEL LIBRO", f_fil, INK, y, ls=2)
y += 30

# ── 4. City / year sub-label ──────────────────────────────────────────────
y += 14
draw_centered("BUENOS AIRES  ·  2026", f_city, GRAY, y, ls=2)
y += 22

# ── Thin rule ─────────────────────────────────────────────────────────────
y += 22
hline(y, MX)
y += 1

# ── 5. Stand info ─────────────────────────────────────────────────────────
y += 32
draw_centered("Stand Waldhuter #410  |  Pabellón Azul  |  La Rural", f_stand, INK, y)
y += 24

# ── Graphic element: stacked short rules (like pages / spine) ─────────────
y += 56
cx = W // 2
for i, half_w in enumerate([34, 25, 17]):
    gy = y + i * 9
    draw.rectangle([(cx - half_w, gy), (cx + half_w, gy)], fill=RULE)

# ── 6. Handle ─────────────────────────────────────────────────────────────
draw_centered("@milunoeditorial", f_handle, GRAY, H - 82)

# ── Save ──────────────────────────────────────────────────────────────────
out = r"C:\Users\gutie\Projects\galeria-barbara\publicaciones-miluno\fil-1-countdown.png"
img.save(out, "PNG", dpi=(300, 300))
print(f"Guardado: {out}")
print(f"Tamaño: {img.size[0]}x{img.size[1]}px")
