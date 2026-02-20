'use client';

import { RefObject, useEffect, useState } from 'react';

import { MAP_ASPECT_PRESET_TO_DIMENSIONS } from '@/app/utils/constants';
import {
  computeDimensions,
  drawImageOnCanvas,
} from '@/app/components/Framer/utils';
import { AspectRatio } from '@/app/components/Framer/types';

interface UseImageEditorProps {
  image: HTMLImageElement;
  aspectRatio: AspectRatio;
  optimizeSize: boolean;
  canvasRef: RefObject<HTMLCanvasElement>;
  src: string;
}

export const useImageEditor = (props: UseImageEditorProps) => {
  const { image, aspectRatio, optimizeSize, canvasRef, src } = props;

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [backgroundColor, setBackgroundColor] = useState('#000');

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

    image.src = src;
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
