#!/usr/bin/env python3
"""
Reel FIL 2026 — Miluno Editorial
1080 x 1920 px  |  30 fps  |  ~20 segundos
Sin audio (se agrega despuees).
"""

import os, sys, subprocess, threading
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

# ─── Paths & constants ────────────────────────────────────────────────────────
BASE = r"C:\Users\gutie\Projects\galeria-barbara\publicaciones-miluno"
OUT  = os.path.join(BASE, "reel-fil-2026.mp4")
W, H = 1080, 1920
FPS  = 30

# Editorial palette (matches gen_fil1.py)
BG   = (249, 248, 244)
INK  = (17,  17,  15)
GRAY = (148, 145, 137)
RULE = (205, 202, 194)

_FONT_PATHS = {
    "r":  r"C:\Windows\Fonts\georgia.ttf",
    "b":  r"C:\Windows\Fonts\georgiab.ttf",
    "i":  r"C:\Windows\Fonts\georgiai.ttf",
    "bi": r"C:\Windows\Fonts\georgiaz.ttf",
}

# ─── Font helper ──────────────────────────────────────────────────────────────
def f(variant="r", size=28):
    return ImageFont.truetype(_FONT_PATHS[variant], size)

# ─── Drawing utilities ────────────────────────────────────────────────────────
def get_bb(draw, text, font):
    b = draw.textbbox((0, 0), text, font=font)
    return b[2]-b[0], b[3]-b[1], b[0], b[1]   # w, h, ox, oy

def draw_c(draw, text, font, color, y):
    """Draw text horizontally centered at baseline y; returns text height."""
    w, h, ox, oy = get_bb(draw, text, font)
    x = (W - w) // 2 - ox
    draw.text((x, y - oy), text, font=font, fill=color)
    return h

def hline(draw, y, mx=88, color=RULE, thick=1):
    draw.rectangle([(mx, y), (W - mx, y + thick - 1)], fill=color)

def wrap_text(draw, text, font, max_w):
    words, lines, cur = text.split(" "), [], []
    for word in words:
        test = " ".join(cur + [word])
        b = draw.textbbox((0, 0), test, font=font)
        if b[2] - b[0] <= max_w:
            cur.append(word)
        else:
            if cur:
                lines.append(" ".join(cur))
            cur = [word]
    if cur:
        lines.append(" ".join(cur))
    return lines

def draw_cw(draw, text, font, color, y, max_w=W-180, gap=12):
    """Draw centered wrapped text; returns total height consumed."""
    total = 0
    for line in wrap_text(draw, text, font, max_w):
        h = draw_c(draw, line, font, color, y + total)
        total += h + gap
    return total

def fit_img(img, mw, mh):
    """Resize img to fit within (mw, mh) preserving aspect ratio."""
    iw, ih = img.size
    r = min(mw / iw, mh / ih)
    return img.resize((int(iw * r), int(ih * r)), Image.LANCZOS)

def shadow_paste(canvas, img, x, y, offset=6, sh_color=(218, 215, 207)):
    """Paste img onto canvas with a simple drop shadow."""
    shadow = Image.new("RGB", (img.width, img.height), sh_color)
    canvas.paste(shadow, (x + offset, y + offset))
    canvas.paste(img, (x, y))

# ─── Scene builders ───────────────────────────────────────────────────────────

def make_logo():
    img = Image.new("RGB", (W, H), BG)
    d   = ImageDraw.Draw(img)

    logo = fit_img(Image.open(os.path.join(BASE, "logo-miluno.jpg")).convert("RGB"), 560, 340)
    lx = (W - logo.width) // 2
    ly = H // 2 - logo.height // 2 - 160
    img.paste(logo, (lx, ly))

    ry = ly + logo.height + 85
    hline(d, ry, mx=180)

    y = ry + 68
    draw_c(d, "Nos vemos en la FIL 2026", f("i", 52), INK, y)
    y += 75
    draw_c(d, "23 de abril al 11 de mayo", f("r", 30), GRAY, y)
    y += 52
    draw_c(d, "Stand Waldhuter #410  \u00b7  Pabellon Azul  \u00b7  La Rural", f("r", 24), GRAY, y)

    hline(d, H - 148, mx=180)
    draw_c(d, "@milunoeditorial", f("i", 24), GRAY, H - 118)
    return img


def make_book(cover_path, connector, author_line, num):
    img = Image.new("RGB", (W, H), BG)
    d   = ImageDraw.Draw(img)

    # Roman numeral top-left
    rn = ["I", "II", "III", "IV", "V"][num]
    d.text((102, 58), rn, font=f("r", 22), fill=RULE)
    hline(d, 108, mx=88)

    # Book cover (max 840 x 1060)
    cover = fit_img(Image.open(cover_path).convert("RGB"), 840, 1060)
    cx = (W - cover.width) // 2
    cy = 130
    shadow_paste(img, cover, cx, cy, offset=8)

    # Text section below cover
    ty = cy + cover.height + 58
    hline(d, ty, mx=160)
    ty += 54

    h1 = draw_cw(d, connector, f("i", 40), INK, ty, max_w=W - 180, gap=10)
    ty += h1 + 22
    draw_cw(d, author_line, f("r", 28), GRAY, ty, max_w=W - 180)

    hline(d, H - 148, mx=180)
    draw_c(d, "@milunoeditorial", f("i", 22), GRAY, H - 118)
    return img


def make_final():
    img = Image.new("RGB", (W, H), BG)
    d   = ImageDraw.Draw(img)

    # Logo (small, top)
    logo = fit_img(Image.open(os.path.join(BASE, "logo-miluno.jpg")).convert("RGB"), 300, 148)
    lx = (W - logo.width) // 2
    img.paste(logo, (lx, 78))

    ry = 78 + logo.height + 30
    hline(d, ry, mx=88)
    ry += 34
    draw_c(d, "CATALOGO FIL 2026", f("r", 26), GRAY, ry)
    ry += 42
    hline(d, ry, mx=88)

    # Five covers: 3 on top row, 2 on bottom row
    cover_files = [
        "tapa-pervivencia.jpg", "tapa-adivinacion.jpg", "tapa-gaia.jpg",
        "tapa-terraforma.jpg",  "tapa-glissant.jpg",
    ]
    covers = [
        fit_img(Image.open(os.path.join(BASE, fn)).convert("RGB"), 302, 420)
        for fn in cover_files
    ]
    gap = 18
    th  = max(c.height for c in covers)   # tallest cover sets row height

    # Row 1 — 3 covers
    rw1 = 3 * 302 + 2 * gap
    rx1 = (W - rw1) // 2
    gy  = ry + 26
    for i, c in enumerate(covers[:3]):
        slot_x = rx1 + i * (302 + gap)
        px = slot_x + (302 - c.width) // 2
        py = gy + (th - c.height) // 2
        shadow_paste(img, c, px, py, offset=6)

    # Row 2 — 2 covers (centered)
    rw2 = 2 * 302 + gap
    rx2 = (W - rw2) // 2
    gy2 = gy + th + 22
    for i, c in enumerate(covers[3:]):
        slot_x = rx2 + i * (302 + gap)
        px = slot_x + (302 - c.width) // 2
        py = gy2 + (th - c.height) // 2
        shadow_paste(img, c, px, py, offset=6)

    # Info block
    ty = gy2 + th + 58
    hline(d, ty, mx=88)
    ty += 52
    draw_c(d, "FIL BUENOS AIRES 2026", f("b", 46), INK, ty)
    ty += 64
    draw_c(d, "23 de abril al 11 de mayo", f("i", 34), GRAY, ty)
    ty += 56
    hline(d, ty, mx=200)
    ty += 46
    draw_c(d, "Stand Waldhuter #410  \u00b7  Pabellon Azul", f("r", 28), INK, ty)
    ty += 44
    draw_c(d, "La Rural, Buenos Aires", f("r", 26), GRAY, ty)

    hline(d, H - 148, mx=180)
    draw_c(d, "@milunoeditorial", f("i", 24), GRAY, H - 118)
    return img

# ─── Blending & easing ────────────────────────────────────────────────────────

def ease(t):
    t = max(0.0, min(1.0, float(t)))
    return t * t * (3.0 - 2.0 * t)

def blend_np(a, b, t):
    """Blend two uint8 numpy arrays: t=0 -> a, t=1 -> b."""
    af = a.astype(np.float32)
    bf = b.astype(np.float32)
    return np.clip(af * (1.0 - t) + bf * t, 0, 255).astype(np.uint8)

# ─── Frame generator (yields uint8 numpy arrays) ──────────────────────────────

def gen_frames(scene_arrs, holds, trans_sec=0.5, fade_sec=0.6):
    T = int(trans_sec * FPS)
    F = int(fade_sec  * FPS)
    BLACK = np.zeros((H, W, 3), dtype=np.uint8)
    n = len(scene_arrs)

    # Fade in from black
    for i in range(F):
        yield blend_np(BLACK, scene_arrs[0], ease(i / F))

    for si in range(n):
        A    = scene_arrs[si]
        hold = int(holds[si] * FPS)

        # Static hold
        for _ in range(hold):
            yield A

        if si < n - 1:
            # Cross-fade to next scene
            B = scene_arrs[si + 1]
            for i in range(T):
                yield blend_np(A, B, ease(i / T))
        else:
            # Fade out to black
            for i in range(F):
                yield blend_np(A, BLACK, ease(i / F))

# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("=== Reel FIL 2026 - Miluno Editorial ===")
    print("Construyendo escenas...")

    scenes_pil = [
        make_logo(),
        make_book(
            os.path.join(BASE, "tapa-pervivencia.jpg"),
            "Las imagenes que no mueren",
            "Aby Warburg", 0
        ),
        make_book(
            os.path.join(BASE, "tapa-adivinacion.jpg"),
            "El mismo Warburg, otro cielo",
            "Aby Warburg", 1
        ),
        make_book(
            os.path.join(BASE, "tapa-gaia.jpg"),
            "De las imagenes a la Tierra",
            "Bruno Latour", 2
        ),
        make_book(
            os.path.join(BASE, "tapa-terraforma.jpg"),
            "Ait-Touati edita Gaia, cartografia la Tierra",
            "Fredérique Ait-Touati  \u00b7  prologo de Latour", 3
        ),
        make_book(
            os.path.join(BASE, "tapa-glissant.jpg"),
            "Mundialidad: otra forma de pensar el mundo",
            "Edouard Glissant", 4
        ),
        make_final(),
    ]

    scene_arrs = [np.array(s) for s in scenes_pil]
    print(f"  {len(scene_arrs)} escenas listas")

    # Timing
    holds     = [2.3, 2.0, 2.0, 2.0, 2.0, 2.0, 3.5]
    trans_sec = 0.5
    fade_sec  = 0.6

    T = int(trans_sec * FPS)
    F = int(fade_sec  * FPS)
    n = len(holds)
    total_frames = F + sum(int(h * FPS) for h in holds) + T * (n - 1) + F
    total_sec    = total_frames / FPS
    print(f"  Duracion: {total_sec:.1f} s  |  {total_frames} frames")

    # ── ffmpeg via stdin pipe ──────────────────────────────────────────────────
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg_exe, "-y",
        "-f",       "rawvideo",
        "-vcodec",  "rawvideo",
        "-s",       f"{W}x{H}",
        "-pix_fmt", "rgb24",
        "-r",       str(FPS),
        "-i",       "pipe:0",
        "-vcodec",  "libx264",
        "-crf",     "18",
        "-pix_fmt", "yuv420p",
        "-preset",  "medium",
        OUT,
    ]

    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.PIPE)

    # Read stderr in background to prevent pipe deadlock
    stderr_buf = []
    def _read_err():
        stderr_buf.append(proc.stderr.read())
    t_err = threading.Thread(target=_read_err, daemon=True)
    t_err.start()

    print("Generando y codificando...")
    frame_gen = gen_frames(scene_arrs, holds, trans_sec, fade_sec)
    for i, frame in enumerate(frame_gen):
        if i % 90 == 0:
            pct = i / total_frames * 100
            print(f"  Frame {i:4d}/{total_frames}  ({pct:3.0f}%)")
        proc.stdin.write(frame.tobytes())

    proc.stdin.close()
    t_err.join(timeout=60)
    proc.wait()

    if proc.returncode != 0:
        err = stderr_buf[0].decode("utf-8", errors="replace") if stderr_buf else "(sin salida)"
        print("\nERROR ffmpeg:\n" + err[-3000:])
        sys.exit(1)

    size_mb = os.path.getsize(OUT) / 1024 / 1024
    print(f"\nListo: {OUT}")
    print(f"  Tamano: {size_mb:.1f} MB  |  {total_sec:.1f} s  |  {FPS} fps")

if __name__ == "__main__":
    main()
