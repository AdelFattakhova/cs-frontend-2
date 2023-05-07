const canvas = document.querySelector('canvas');
const ctx = canvas?.getContext('2d');
const image = new Image();
image.src = './test-images/yard.jpeg';

const SPACE_BETWEEN_IMAGES = 10;

let imageWidth: number;
let imageHeight: number;

function addImagetoCanvas() {
  if (!canvas) return;

  const scaleFactor = Math.min(
    canvas.width / ((image.width + SPACE_BETWEEN_IMAGES / 2) * 2),
    canvas.height / image.height
  );

  imageWidth = image.width * scaleFactor;
  imageHeight = image.height * scaleFactor;

  image.addEventListener("load", () => {
    ctx?.drawImage(image, 0, 0, imageWidth, imageHeight);
  });
}

// TODO: refactor all cycles to use 2d-matrix

function invert() {
  const imageData = ctx?.getImageData(0, 0, imageWidth, imageHeight);
  if (!imageData) return;

  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] ^= 255;
    imageData.data[i + 1] ^= 255;
    imageData.data[i + 2] ^= 255;
  }

  ctx?.putImageData(imageData, imageWidth + SPACE_BETWEEN_IMAGES, 0);
}

function grayscale() {
  const imageData = ctx?.getImageData(0, 0, imageWidth, imageHeight);
  if (!imageData) return;

  for (let i = 0; i < imageData.data.length; i += 4) {
    const singleValue = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;

    imageData.data[i] = singleValue;
    imageData.data[i + 1] = singleValue;
    imageData.data[i + 2] = singleValue;
  }

  ctx?.putImageData(imageData, imageWidth + SPACE_BETWEEN_IMAGES, 0);
}

function bluescale() {
  const imageData = ctx?.getImageData(0, 0, imageWidth, imageHeight);
  if (!imageData) return;

  for (let i = 0; i < imageData.data.length; i += 4) {
    const singleValue = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;

    imageData.data[i] = singleValue;
    imageData.data[i + 1] = singleValue;
    imageData.data[i + 2] = 255;
  }

  ctx?.putImageData(imageData, imageWidth + SPACE_BETWEEN_IMAGES, 0);
}

function shadows() {
  const imageData = ctx?.getImageData(0, 0, imageWidth, imageHeight);
  if (!imageData) return;

  for (let i = 0; i < imageData.data.length; i += 4) {
    const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 300;

    imageData.data[i] *= avg;
    imageData.data[i + 1] *= avg;
    imageData.data[i + 2] *= avg;
  }

  ctx?.putImageData(imageData, imageWidth + SPACE_BETWEEN_IMAGES, 0);
}

function applyHandlers() {
  const invertBtn = document.querySelector('#invert-btn');
  const grayscaleBtn = document.querySelector('#grayscale-btn');
  const bluescaleBtn = document.querySelector('#bluescale-btn');
  const shadowsBtn = document.querySelector('#shadows-btn');

  invertBtn?.addEventListener('click', () => invert());
  grayscaleBtn?.addEventListener('click', () => grayscale());
  bluescaleBtn?.addEventListener('click', () => bluescale());
  shadowsBtn?.addEventListener('click', () => shadows());
}

const imagesContainer = document.querySelector('.images__buttons');

imagesContainer?.addEventListener('click', (e) => {
  if (!(e.target as HTMLElement).closest('button')) return;

  const newImageUrl = (e.target as HTMLElement).dataset.url;

  if (newImageUrl) {
    image.src = newImageUrl;
    ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
    addImagetoCanvas();
  }
});

applyHandlers();
addImagetoCanvas();
