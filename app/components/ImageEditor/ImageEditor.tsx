'use client';

import Dropzone from 'react-dropzone';

import { useImageEditor } from './useImageEditor';
import { DROPZONE_TEST_ID, IMAGE_EDITOR_TEST_ID } from '@/app/utils/testIds';

const dropzoneStyle = {
  width: '100%',
  height: '100px',
  border: '2px dashed #ccc',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const ImageEditor = () => {
  const {
    image,
    canvasRef,
    imageDimensions,
    lockProportions,
    setLockProportions,
    setWidth,
    setHeight,
    handleUpload,
    handleAspectRatioChange,
    handleDownload,
  } = useImageEditor();

  return (
    <div>
      <Dropzone onDrop={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={dropzoneStyle}
            data-testid={DROPZONE_TEST_ID}
          >
            <input {...getInputProps()} />
            <p>Drag n drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>

      {image && (
        <div data-testid={IMAGE_EDITOR_TEST_ID} className="w-screen">
          <h1>Image Editor</h1>

          <label htmlFor={'aspect-ratio'}>Aspect Ratio</label>
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
              onChange={(e) => setWidth(Number(e.target.value))}
            />
            <input
              type="number"
              value={imageDimensions.height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
            <input
              type="checkbox"
              checked={lockProportions}
              onChange={() => setLockProportions(!lockProportions)}
            />
          </div>
          <canvas ref={canvasRef} width={0} height={0} className="w-1/3" />
          <button onClick={handleDownload}>Download Edited Image</button>
        </div>
      )}
    </div>
  );
};

export { ImageEditor };
