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
  // const [image, setImage] = useState<HTMLImageElement>(new Image()); Why image is not defined?
  const [image, setImage] = useState<HTMLImageElement>();
  const [borderSize, setBorderSize] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [aspectPreset, setAspectPreset] = useState("");
  const initialImageDimensions = useRef([0, 0]);

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      setImage(image);
      if (canvasRef.current) {
        canvasRef.current.width = image.width;
        canvasRef.current.height = image.height;
        canvasRef.current?.getContext("2d")?.drawImage(image, 0, 0);
        initialImageDimensions.current = [image.width, image.height];
      }
    };
  };

  const handleDownload = () => {
    const imageUrl = canvasRef.current?.toDataURL("image/png") || null;
    if (imageUrl) {
      saveAs(imageUrl, "image.png");
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!canvasRef.current || !ctx || !image) {
      return;
    }

    const imageWidth = image?.width || 0;
    const imageHeight = image?.height || 0;
    const [maxWidth, maxHeight] =
      MAP_ASPECT_PRESET_TO_DIMENSIONS[aspectPreset] ||
      initialImageDimensions.current;

    canvasRef.current.width = maxWidth;
    canvasRef.current.height = maxHeight;

    const imgScale = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);

    const newImgWidth = imageWidth * imgScale; //borderSize * 2 + imageWidth;
    const newImgHeight = imageHeight * imgScale; //borderSize * 2 + imageHeight;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, maxWidth, maxHeight);

    ctx.drawImage(
      image,
      maxWidth / 2 - newImgWidth / 2,
      maxHeight / 2 - newImgHeight / 2,
      newImgWidth,
      newImgHeight
    );
  }, [image, aspectPreset]);

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
          onChange={(e) => setAspectPreset(e.target.value)}
        >
          <option value="">Original</option>
          <option value="insta-story">Story</option>
          <option value="insta-portrait">Portrait</option>
          <option value="insta-square">Square</option>
        </select>
        {/* <input
          type="range"
          min={0}
          max={300}
          value={borderSize}
          onChange={(e) => {
            setBorderSize(Number(e.target.value));
          }}
        /> */}
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
