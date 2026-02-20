import '@testing-library/jest-dom';

import { getImageCanvasCoords, getSizeProportion } from '../utils';

describe('ImageEditor utils', () => {
  describe('getSizeProportion', () => {
    it('should return the correct proportion', () => {
      const imageWidth = 100;
      const imageHeight = 200;
      const maxWidth = 300;
      const maxHeight = 400;

      expect(
        getSizeProportion(imageWidth, imageHeight, maxWidth, maxHeight)
      ).toEqual(2);
    });
  });

  describe('getImageCanvasCoords', () => {
    it('should return the correct coordinates', () => {
      const canvasWidth = 100;
      const canvasHeight = 200;
      const imageWidth = 50;
      const imageHeight = 100;

      expect(
        getImageCanvasCoords(canvasWidth, canvasHeight, imageWidth, imageHeight)
      ).toEqual({ x: 25, y: 50 });
    });
  });
});
