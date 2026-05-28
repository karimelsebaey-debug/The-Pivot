"""
Heal dark vertical column artifact in all hero frames.
Linearly interpolates pixels between SHADOW_L and SHADOW_R edges.
"""
from PIL import Image
import os, glob

FRAMES_DIR = r"C:\Users\Dell\.claude\The-Pivot\public\frames-hero"
SHADOW_L = 1210   # left edge of dark column (pixel x)
SHADOW_R = 1440   # right edge of dark column (pixel x)
SHADOW_W = SHADOW_R - SHADOW_L - 1

def heal_frame(path):
    img = Image.open(path).convert("RGB")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        left_px  = pixels[SHADOW_L, y]
        right_px = pixels[SHADOW_R, y]
        for xi, x in enumerate(range(SHADOW_L + 1, SHADOW_R)):
            t = xi / SHADOW_W
            pixels[x, y] = (
                int(left_px[0] * (1 - t) + right_px[0] * t),
                int(left_px[1] * (1 - t) + right_px[1] * t),
                int(left_px[2] * (1 - t) + right_px[2] * t),
            )
    img.save(path, "JPEG", quality=92)

frames = sorted(glob.glob(os.path.join(FRAMES_DIR, "frame_*.jpg")))
print(f"Healing {len(frames)} frames...")
for i, path in enumerate(frames):
    heal_frame(path)
    if (i + 1) % 20 == 0:
        print(f"  {i + 1}/{len(frames)} done")
print("All frames healed.")
