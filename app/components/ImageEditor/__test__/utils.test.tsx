import '@testing-library/jest-dom';

import {
  getImageCanvasCoords,
  getProportionalHeight,
  getProportionalWidth,
  getSizeProportion,
} from '../utils';

describe('ImageEditor utils', () => {
  describe('getProportionalWidth', () => {
    it('should return the correct width', () => {
      const height = 200;
      const proportionRatio = 0.75;

      expect(getProportionalWidth(height, proportionRatio)).toEqual(150);
    });

    it('should return the correct width for non exact calculations', () => {
      const height = 100;
      const proportionRatio = 0.666;

      expect(getProportionalWidth(height, proportionRatio)).toEqual(67);
    });
  });

  describe('getProportionalHeight', () => {
    it('should return the correct height', () => {
      const width = 100;
      const proportionRatio = 0.5;

      expect(getProportionalHeight(width, proportionRatio)).toEqual(200);
    });

    it('should return the correct height for non exact calculations', () => {
      const width = 200;
      const proportionRatio = 0.75;

      expect(getProportionalHeight(width, proportionRatio)).toEqual(266);
    });
  });

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
