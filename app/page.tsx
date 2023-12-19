"use client";

import { useMemo, useRef, useState } from "react";
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
  const [image, setImage] = useState(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasContext = useMemo(
    () => canvasRef.current?.getContext("2d"),
    [canvasRef]
  );

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const image = new Image(300, 300);
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      canvasContext?.drawImage(image, 0, 0);
    };
  };

  const handleDownload = () => {
    const imageUrl = canvasRef.current?.toDataURL("image/png") || null;
    if (imageUrl) {
      saveAs(imageUrl, "image.png");
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
        <canvas ref={canvasRef} width={300} height={300} />
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
