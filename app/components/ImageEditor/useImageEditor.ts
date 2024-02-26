"use client";

import { useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";

const MAP_ASPECT_PRESET_TO_DIMENSIONS: { [key: string]: number[] } = {
  "insta-story": [1080, 1920],
  "insta-portrait": [1080, 1350],
  "insta-square": [1080, 1080],
};

const useImageEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [lockProportions, setLockProportions] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#000");
  const [format, setFormat] = useState("jpg");
  const [proportionRatio, setProportionRatio] = useState(1);

  const setImageDimensions = ({
    width,
    height,
    lockProportions,
  }: {
    width?: number;
    height?: number;
    lockProportions: boolean;
  }) => {
    if (!width && !height) {
      return;
    }

    let newWidth = width;
    let newHeight = height;

    if (!newWidth) {
      newWidth = lockProportions
        ? Math.ceil(newHeight! * proportionRatio)
        : canvasDimensions.width;
    }

    if (!newHeight) {
      newHeight = lockProportions
        ? Math.floor(newWidth! / proportionRatio)
        : canvasDimensions.height;
    }

    setCanvasDimensions({ width: newWidth, height: newHeight });
  };

  const toggleLockProportions = () => {
    const nextLockProportions = !lockProportions;

    setLockProportions(nextLockProportions);
    if (nextLockProportions) {
      setImageDimensions({
        width: canvasDimensions.width,
        lockProportions: nextLockProportions,
      });
    }
  };

  const handleDownload = () => {
    const imageUrl = canvasRef.current?.toDataURL(`image/${format}}`) || null;
    if (imageUrl) {
      saveAs(imageUrl, `image.${format}`);
    }
  };

  const handleFileDrop = (acceptedFiles: any) => {
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
        canvasRef.current?.getContext("2d")?.drawImage(image, 0, 0);
      }
    };
  };

  const handleAspectRatioChange = (newPreset: string) => {
    const [width, height] = MAP_ASPECT_PRESET_TO_DIMENSIONS[newPreset] || [
      image?.width,
      image?.height,
    ];

    setImageDimensions({ width, height, lockProportions });
    setProportionRatio(width / height);
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!canvasRef.current || !ctx || !image) {
      return;
    }

    const imageWidth = image?.width || 0;
    const imageHeight = image?.height || 0;

    const maxWidth = canvasDimensions.width || image.width;
    const maxHeight = canvasDimensions.height || image.height;

    canvasRef.current.width = maxWidth;
    canvasRef.current.height = maxHeight;

    // The proportion the image will need to grow / shrink in order to fit in the chosen aspect ratio
    const sizeProportion = Math.min(
      maxWidth / imageWidth,
      maxHeight / imageHeight
    );

    const newImageWidth = imageWidth * sizeProportion;
    const newImageHeight = imageHeight * sizeProportion;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, maxWidth, maxHeight);
    ctx.drawImage(
      image,
      maxWidth / 2 - newImageWidth / 2,
      maxHeight / 2 - newImageHeight / 2,
      newImageWidth,
      newImageHeight
    );
  }, [image, canvasDimensions, backgroundColor]);

  return {
    canvasRef,
    imageDimensions: canvasDimensions,
    setImageDimensions,
    lockProportions,
    toggleLockProportions,
    handleFileDrop,
    handleDownload,
    handleAspectRatioChange,
  };
};

export { useImageEditor };
