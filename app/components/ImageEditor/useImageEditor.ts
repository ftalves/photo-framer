'use client';

import { useEffect, useRef, useState } from 'react';
import { saveAs } from 'file-saver';

import { MAP_ASPECT_PRESET_TO_DIMENSIONS } from '@/app/utils/constants';

import {
  getImageCanvasCoords,
  getProportionalHeight,
  getProportionalWidth,
  getSizeProportion,
} from './utils';

const useImageEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [lockProportions, setLockProportions] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#000');
  const [format, setFormat] = useState('jpeg');
  const [proportionRatio, setProportionRatio] = useState(1);

  const handleDownload = () => {
    //TODO: delegate to a web worker
    canvasRef.current?.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `image.${format}`);
      }
    }, `image/${format}`);
  };

  const handleUpload = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      setImage(image);
      setCanvasDimensions({ width: image.width, height: image.height });
      setProportionRatio(image.width / image.height);

      if (canvasRef.current) {
        canvasRef.current.width = image.width;
        canvasRef.current.height = image.height;
        canvasRef.current?.getContext('2d')?.drawImage(image, 0, 0);
      }
    };
  };

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

  const handleAspectRatioChange = (newPreset: string) => {
    const [width, height] = MAP_ASPECT_PRESET_TO_DIMENSIONS[newPreset] || [
      image?.width,
      image?.height,
    ];

    setProportionRatio(width / height);
  };

  // Update the width when the lockProportions is toggled
  useEffect(() => {
    if (lockProportions) {
      setWidth(canvasDimensions.width);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockProportions]);

  useEffect(() => {
    setWidth(canvasDimensions.width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proportionRatio]);

  useEffect(() => {
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
  }, [image, canvasDimensions, backgroundColor]);

  return {
    image,
    canvasRef,
    imageDimensions: canvasDimensions,
    lockProportions,
    setLockProportions,
    setWidth,
    setHeight,
    handleUpload,
    handleDownload,
    handleAspectRatioChange,
  };
};

export { useImageEditor };
