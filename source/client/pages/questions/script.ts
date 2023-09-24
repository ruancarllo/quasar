window.addEventListener('DOMContentLoaded', async function() {
  class RandomQuestion {
    image: HTMLImageElement;
    url: string;
    universityName: string;

    constructor(universityName: string) {
      this.universityName = universityName;
    }

    static async create(universityName: string) {
      const randomQuestion = new RandomQuestion(universityName);

      await randomQuestion.fetchURL();
      await randomQuestion.removeWatermarks();
      await randomQuestion.renderImage();

      randomQuestion.watchChanges();
    }

    async fetchURL() {
      const request = await fetch(`/api/random-question?universityName=${universityName}`);
      const blob = await request.blob();
      const url = URL.createObjectURL(blob);

      this.url = url;
    }

    async removeWatermarks() {
      this.image = new Image();
      this.image.src = this.url;

      await new Promise((resolve) => this.image.onload = resolve);

      const canvas = document.createElement('canvas');
      canvas.width = this.image.naturalWidth;
      canvas.height = this.image.naturalHeight;

      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(this.image, 0, 0);

        let dynamicData = context.getImageData(0, 0, canvas.width, canvas.height);

        for (let led = 0; led < dynamicData.data.length; led += 4) {
          const r = dynamicData.data[led];
          const g = dynamicData.data[led + 1];
          const b = dynamicData.data[led + 2];

          const pixel = {r, g, b};

          if (this.arePixelsSimilar(pixel, RandomQuestion.pixels.watermark, 20)) {
            dynamicData.data[led + 0] = RandomQuestion.pixels.white.r;
            dynamicData.data[led + 1] = RandomQuestion.pixels.white.g;
            dynamicData.data[led + 2] = RandomQuestion.pixels.white.b;
          }
        }

        context.putImageData(dynamicData, 0, 0);

        this.url = canvas.toDataURL();
      }      
    }

    async renderImage() {
      this.image = new Image();
      this.image.src = this.url;

      await new Promise((resolve) => this.image.onload = resolve);

      document.querySelector('#images-area')?.append(this.image);
    }

    async watchChanges() {
      const observer = new IntersectionObserver(async function (entries) {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            await RandomQuestion.create(this.universityName);
          }
        }
      }, {
        threshold: 0.5
      });

      observer.observe(this.image);
    }

    arePixelsSimilar(firstColor: Color, secondColor: Color, tolerance: number) {
      const rDifference = Math.abs(firstColor.r - secondColor.r);
      const gDifference = Math.abs(firstColor.g - secondColor.g);
      const bDifference = Math.abs(firstColor.b - secondColor.b);
    
      return rDifference <= tolerance && gDifference <= gDifference && bDifference <= tolerance;
    }

    static pixels = {
      watermark: {
        r: 220,
        g: 230,
        b: 240
      },

      white: {
        r: 255,
        g: 255,
        b: 255
      }
    }
  }

  const parameters = new URLSearchParams(window.location.search);
  const universityName = parameters.get('universityName');

  if (universityName) {
    for (let count = 0; count <= 3; count++) {
      await RandomQuestion.create(universityName);
      document.querySelector('#images-area')?.removeAttribute('style');
    }
  
    const spinner = document.querySelector('#spinner');

    if (spinner) {
      new IntersectionObserver(async function(entries) {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            await RandomQuestion.create(universityName);
          }
        }
      }, {
        threshold: 0.75
      }).observe(spinner);
    }
  }
});

type Color = {
  r: number,
  g: number,
  b: number
}