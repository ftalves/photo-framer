'use client';

import { RefObject, useEffect, useState } from 'react';

import { MAP_ASPECT_PRESET_TO_DIMENSIONS } from '@/app/utils/constants';
import {
  drawImageOnCanvas,
  getProportionalHeight,
  getProportionalWidth,
} from '@/app/components/Framer/utils';
import { AspectRatio } from '@/app/components/Framer/types';

interface UseImageEditorProps {
  image: HTMLImageElement;
  aspectRatio: AspectRatio;
  canvasRef: RefObject<HTMLCanvasElement>;
}

export const useImageEditor = (props: UseImageEditorProps) => {
  const { image, aspectRatio, canvasRef } = props;

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [lockProportions, setLockProportions] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#000');
  const [proportionRatio, setProportionRatio] = useState(1);

  const setWidth = (width: number) => {
    setCanvasDimensions({
      width,
      height: lockProportions
        ? getProportionalHeight(width, proportionRatio)
        : canvasDimensions.height,
    });
  };

  const setHeight = (height: number) => {
    setCanvasDimensions({
      height,
      width: lockProportions
        ? getProportionalWidth(height, proportionRatio)
        : canvasDimensions.width,
    });
  };

  useEffect(() => {
    image.onload = () => {
      setCanvasDimensions({ width: image.width, height: image.height });
      setProportionRatio(image.width / image.height);

      if (canvasRef.current) {
        canvasRef.current.width = image.width;
        canvasRef.current.height = image.height;
        canvasRef.current?.getContext('2d')?.drawImage(image, 0, 0);
      }
    };
    /** eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    const [width, height] = aspectRatio
      ? MAP_ASPECT_PRESET_TO_DIMENSIONS[aspectRatio]
      : [image?.width, image?.height];

    setProportionRatio(width / height);
    /** eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [aspectRatio]);

  useEffect(() => {
    if (lockProportions) {
      setWidth(canvasDimensions.width);
    }
    /** eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [lockProportions]);

  useEffect(() => {
    setWidth(canvasDimensions.width);
    /** eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [proportionRatio]);

  useEffect(() => {
    drawImageOnCanvas({ canvasRef, image, canvasDimensions, backgroundColor });
  }, [image, canvasDimensions, backgroundColor]);

  return {
    image,
    canvasRef,
    imageDimensions: canvasDimensions,
    lockProportions,
    setLockProportions,
    setWidth,
    setHeight,
  };
};
