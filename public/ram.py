from PIL import Image

img = Image.open("site_icon.webp")

img.thumbnail((64,64), Image.Resampling.LANCZOS)
# img.save("favicon.ico", format="ico")