import { RefObject, useEffect, useState } from 'react';

import {
  computeDimensions,
  drawImageOnCanvas,
} from '@/app/components/Framer/utils';
import { AspectRatio } from '@/app/components/Framer/types';

interface UseImageEditorProps {
  image: HTMLImageElement;
  aspectRatio: AspectRatio;
  optimizeSize: boolean;
  borderColor: string;
  canvasRef: RefObject<HTMLCanvasElement>;
  src: string;
}

export const useImageEditor = (props: UseImageEditorProps) => {
  const { image, aspectRatio, optimizeSize, borderColor, canvasRef, src } =
    props;

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });

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
    if (!canvasDimensions.width || !canvasDimensions.height) return;

    drawImageOnCanvas({
      canvasRef,
      image,
      canvasDimensions,
      backgroundColor: borderColor,
    });
    /** eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [image, canvasDimensions, borderColor]);

  return {
    image,
    canvasRef,
    imageDimensions: canvasDimensions,
  };
};
