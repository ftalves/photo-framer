import { MAP_ASPECT_PRESET_TO_DIMENSIONS } from '@/app/utils/constants';
import { RefObject } from 'react';
import { AspectRatio } from './types';

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

export const computeDimensions = (
  img: HTMLImageElement,
  ratio: AspectRatio,
  optimize: boolean
): { width: number; height: number } => {
  if (!ratio) {
    return { width: img.width, height: img.height };
  }

  if (optimize) {
    const [w, h] = MAP_ASPECT_PRESET_TO_DIMENSIONS[ratio];
    return { width: w, height: h };
  }

  // Fit image at native resolution into the target aspect ratio by adding
  // the minimum border on the shorter axis.
  const [targetW, targetH] = MAP_ASPECT_PRESET_TO_DIMENSIONS[ratio];
  const targetRatio = targetW / targetH;
  const imageRatio = img.width / img.height;

  if (imageRatio > targetRatio) {
    // Image is wider than target ratio — pad height
    return {
      width: img.width,
      height: Math.round(img.width / targetRatio),
    };
  } else {
    // Image is taller than target ratio — pad width
    return {
      width: Math.round(img.height * targetRatio),
      height: img.height,
    };
  }
};
