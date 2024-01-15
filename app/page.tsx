"use client";

import { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { saveAs } from "file-saver";

const dropzoneStyle = {
  width: "100%",
  height: "100px",
  border: "2px dashed #ccc",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const MAP_ASPECT_PRESET_TO_DIMENSIONS: { [key: string]: number[] } = {
  "insta-story": [1080, 1920],
  "insta-portrait": [1080, 1350],
  "insta-square": [1080, 1080],
};

const ImageEditor = () => {
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

  const onDrop = (acceptedFiles: any) => {
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

  const handleDownload = () => {
    const imageUrl = canvasRef.current?.toDataURL(`image/${format}}`) || null;
    if (imageUrl) {
      saveAs(imageUrl, `image.${format}`);
    }
  };

  return (
    <div>
      <h1>Image Editor</h1>

      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Drag n drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>

      <div>
        <select
          name="aspect-ratio"
          onChange={(e) => {
            const [width, height] = MAP_ASPECT_PRESET_TO_DIMENSIONS[
              e.target.value
            ] || [image?.width, image?.height];

            setCanvasDimensions({ width, height });
            setProportionRatio(width / height);
          }}
        >
          <option value="">Original</option>
          <option value="insta-story">Story</option>
          <option value="insta-portrait">Portrait</option>
          <option value="insta-square">Square</option>
        </select>
        <div>
          <input
            type="number"
            value={canvasDimensions.width}
            onChange={(e) => {
              const newWidth = Number(e.target.value);
              setCanvasDimensions({
                width: newWidth,
                height: lockProportions
                  ? Math.ceil(newWidth / proportionRatio)
                  : canvasDimensions.height,
              });
            }}
          />
          <input
            type="number"
            value={canvasDimensions.height}
            onChange={(e) => {
              const newHeight = Number(e.target.value);
              setCanvasDimensions({
                height: newHeight,
                width: lockProportions
                  ? Math.ceil(newHeight / proportionRatio)
                  : canvasDimensions.width,
              });
            }}
          />
          <input
            type="checkbox"
            checked={lockProportions}
            onChange={() => {
              setLockProportions(!lockProportions);
              setCanvasDimensions({
                width: canvasDimensions.width,
                height: Math.ceil(canvasDimensions.width / proportionRatio),
              });
            }}
          />
        </div>
        <canvas ref={canvasRef} width={100} height={100} />
        <button onClick={handleDownload}>Download Edited Image</button>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ImageEditor />
    </main>
  );
}
