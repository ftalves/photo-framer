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

const ImageEditor = () => {
  // const [image, setImage] = useState<HTMLImageElement>(new Image()); Why image is not defined?
  const [image, setImage] = useState<HTMLImageElement>();
  const [borderSize, setBorderSize] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const newWidth = borderSize * 2 + (image?.width || 0);
    const newHeight = borderSize * 2 + (image?.height || 0);

    canvasRef.current.width = newWidth;
    canvasRef.current.height = newHeight;
    console.log({ newWidth });
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, newWidth, newHeight);
    ctx.drawImage(image, borderSize, borderSize);
  });

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
        <input
          type="range"
          min={0}
          max={300}
          value={borderSize}
          onChange={(e) => {
            setBorderSize(Number(e.target.value));
          }}
        />
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
