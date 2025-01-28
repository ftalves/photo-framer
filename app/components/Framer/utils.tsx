import { RefObject } from 'react';

export const getProportionalWidth = (
  height: number,
  proportionRatio: number
) => {
  return Math.ceil(height * proportionRatio);
};

export const getProportionalHeight = (
  width: number,
  proportionRatio: number
) => {
  return Math.floor(width / proportionRatio);
};

// The proportion the image will need to grow / shrink in order to fit in the chosen preset
export const getSizeProportion = (
  imageWidth: number,
  imageHeight: number,
  maxWidth: number,
  maxHeight: number
) => {
  return Math.min(maxWidth / imageWidth, maxHeight / imageHeight);
};

// Get the coordinates to center the image on the canvas
export const getImageCanvasCoords = (
  canvasWidth: number,
  canvasHeight: number,
  imageWidth: number,
  imageHeight: number
) => {
  const x = (canvasWidth - imageWidth) / 2;
  const y = (canvasHeight - imageHeight) / 2;

  return { x, y };
};

export const drawImageOnCanvas = ({
  canvasRef,
  image,
  canvasDimensions,
  backgroundColor,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  image: HTMLImageElement;
  canvasDimensions: { width: number; height: number };
  backgroundColor: string;
}) => {
  const ctx = canvasRef.current?.getContext('2d');

  if (!canvasRef.current || !ctx || !image) {
    return;
  }

  const imageWidth = image?.width || 0;
  const imageHeight = image?.height || 0;

  // Max dimensions defined by aspect ratio preset
  const maxWidth = canvasDimensions.width || image.width;
  const maxHeight = canvasDimensions.height || image.height;

  // Resize the canvas to match the preset
  canvasRef.current.width = maxWidth;
  canvasRef.current.height = maxHeight;

  // The proportion the image will need to grow / shrink in order to fit in the chosen preset
  const sizeProportion = getSizeProportion(
    imageWidth,
    imageHeight,
    maxWidth,
    maxHeight
  );

  const newImageWidth = imageWidth * sizeProportion;
  const newImageHeight = imageHeight * sizeProportion;

  const coords = getImageCanvasCoords(
    maxWidth,
    maxHeight,
    newImageWidth,
    newImageHeight
  );

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, maxWidth, maxHeight);
  ctx.drawImage(image, coords.x, coords.y, newImageWidth, newImageHeight);
};
