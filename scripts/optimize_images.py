#!/usr/bin/env python3
"""Optimize candidate photos for web use and copy to public/images."""
from PIL import Image
import os

SRC = "/home/z/my-project/public/images/raw"
DST = "/home/z/my-project/public/images"
os.makedirs(DST, exist_ok=True)

# mapping: source -> destination (final names used by the site)
MAPPING = {
    "hero1.jpg": "hero-owner.jpg",        # owner in workshop (hero)
    "bakery1.jpg": "case-bakery.jpg",     # baker at work
    "shop2.jpg": "case-workshop.jpg",     # machinist in shop
    "retail1.jpg": "case-retail.jpg",     # boutique owner
    "resto1.jpg": "case-restaurant.jpg",  # restaurant counter
    "shop1.jpg": "method-workshop.jpg",   # square workshop shot for method strip
}

MAX_W = 1600
QUALITY = 78

for src, dst in MAPPING.items():
    p = os.path.join(SRC, src)
    im = Image.open(p).convert("RGB")
    w, h = im.size
    if w > MAX_W:
        nh = int(h * MAX_W / w)
        im = im.resize((MAX_W, nh), Image.LANCZOS)
    out = os.path.join(DST, dst)
    im.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    print(f"{src} -> {dst}: {im.size}, {os.path.getsize(out)//1024}KB")
