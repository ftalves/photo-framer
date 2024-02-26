"use client";

import Dropzone from "react-dropzone";

import { useImageEditor } from "./useImageEditor";

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
  const {
    canvasRef,
    imageDimensions,
    setImageDimensions,
    lockProportions,
    toggleLockProportions,
    handleFileDrop,
    handleAspectRatioChange,
    handleDownload,
  } = useImageEditor();

  return (
    <div>
      <h1>Image Editor</h1>

      <Dropzone onDrop={handleFileDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Drag n drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>

      <div>
        <label htmlFor={"aspect-ratio"}>Aspect Ratio</label>
        <select
          id="aspect-ratio"
          onChange={(e) => handleAspectRatioChange(e.target.value)}
        >
          <option value="">Original</option>
          <option value="insta-story">Story</option>
          <option value="insta-portrait">Portrait</option>
          <option value="insta-square">Square</option>
        </select>
        <div>
          <input
            type="number"
            value={imageDimensions.width}
            onChange={(e) =>
              setImageDimensions({
                width: Number(e.target.value),
                lockProportions,
              })
            }
          />
          <input
            type="number"
            value={imageDimensions.height}
            onChange={(e) =>
              setImageDimensions({
                height: Number(e.target.value),
                lockProportions,
              })
            }
          />
          <input
            type="checkbox"
            checked={lockProportions}
            onChange={toggleLockProportions}
          />
        </div>
        <canvas ref={canvasRef} width={100} height={100} />
        <button onClick={handleDownload}>Download Edited Image</button>
      </div>
    </div>
  );
};

export { ImageEditor };
