from PIL import Image
import requests
from io import BytesIO
def main():
    urls = [
        {"url":"https://rukminim1.flixcart.com/image/120/120/kzzw5u80/coffee/s/b/x/-original-imagbwf3wvhzfh5z.jpeg?q=80", "name": "coffee"},

        {"url": "https://rukminim1.flixcart.com/image/120/120/kx50gi80/pen/h/z/k/119766-flair-original-imag9nzubznagufg.jpeg?q=80", "name": "stationary" },

        {"url": "https://rukminim1.flixcart.com/image/120/120/l58iaa80/electric-cycle/i/y/f/-original-imagfykthgudy4qz.jpeg?q=80", "name": "cycle" },

        {"url": "https://rukminim1.flixcart.com/image/120/120/jxz0brk0/stuffed-toy/n/t/s/4-feet-pink-very-beautiful-best-quality-for-special-gift-125-13-original-imafgv92puzkdytg.jpeg?q=80", "name": "softToy" },

        {"url": "https://rukminim1.flixcart.com/image/120/120/kdbzqfk0/bar/8/h/q/push-up-bar-0-8-long-ankaro-original-imafu9dmvdk3rzvy.jpeg?q=80", "name":"gym"},

        {"url": "https://rukminim1.flixcart.com/image/120/120/acoustic-guitar/e/y/y/dd-380c-blk-jixing-original-imaeff94e9tczafp.jpeg?q=80", "name": "instrument"},

        {"url":"https://rukminim1.flixcart.com/image/120/120/kl5hh8w0/puzzle/g/n/g/60-wooden-earth-jigsaw-puzzle-60-pcs-webby-original-imagyc8hsdztzdzb.jpeg?q=80", "name": "puzzle"},

        {"url":"https://rukminim1.flixcart.com/image/120/120/xif0q/book/r/1/6/it-ends-with-us-it-starts-with-us-combo-of-2-books-original-imah7vdzcbsnrx7a.jpeg?q=80", "name": "fictionBooks"},
    ]
    print("downloading images")
    for url in urls:
        res = requests.get(url["url"])
        img = Image.open(BytesIO(res.content))
        img.save(f"{url['name']}.jpg")
    print("images downloaded")

# main()