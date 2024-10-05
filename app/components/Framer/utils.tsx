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
