'use client';

import { RefObject, useEffect, useState } from 'react';

import { MAP_ASPECT_PRESET_TO_DIMENSIONS } from '@/app/utils/constants';
import { drawImageOnCanvas } from '@/app/components/Framer/utils';
import { AspectRatio } from '@/app/components/Framer/types';

interface UseImageEditorProps {
  image: HTMLImageElement;
  aspectRatio: AspectRatio;
  optimizeSize: boolean;
  canvasRef: RefObject<HTMLCanvasElement>;
}

export const useImageEditor = (props: UseImageEditorProps) => {
  const { image, aspectRatio, optimizeSize, canvasRef } = props;

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [backgroundColor, setBackgroundColor] = useState('#000');

  const computeDimensions = (
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

  useEffect(() => {
    image.onload = () => {
      const dims = computeDimensions(image, aspectRatio, optimizeSize);
      setCanvasDimensions(dims);

      if (canvasRef.current) {
        canvasRef.current.width = dims.width;
        canvasRef.current.height = dims.height;
        canvasRef.current?.getContext('2d')?.drawImage(image, 0, 0);
      }
    };
    /** eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    if (!image.width) return;
    setCanvasDimensions(computeDimensions(image, aspectRatio, optimizeSize));
    /** eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [aspectRatio, optimizeSize]);

  useEffect(() => {
    drawImageOnCanvas({ canvasRef, image, canvasDimensions, backgroundColor });
    /** eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [image, canvasDimensions, backgroundColor]);

  return {
    image,
    canvasRef,
    imageDimensions: canvasDimensions,
  };
};
