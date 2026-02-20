'use client';

import { useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import { saveAs } from 'file-saver';

import { DROPZONE_TEST_ID } from '@/app/utils/testIds';
import { ImageEditor } from './subcomponents';
import { AspectRatio, ImageItem } from './types';

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

export const Framer = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('insta-portrait');
  const [optimizeSize, setOptimizeSize] = useState(true);

  const canvasRefs = useRef<HTMLCanvasElement[]>([]);

  const handleUpload = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => {
      const image = new Image();
      const src = URL.createObjectURL(file);

      const mimeType = file.type || 'image/png';
      const extension = (
        file.name.split('.').pop() ||
        mimeType.split('/')[1] ||
        'png'
      ).toLowerCase();

      return { image, mimeType, extension, src };
    });

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDownload = () => {
    canvasRefs.current.forEach((canvasRef, index) => {
      const item = images[index];
      if (!item) return;

      canvasRef.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `image.${item.extension}`);
        }
      }, item.mimeType);
    });
  };

  const handleRemove = (image: HTMLImageElement) => {
    const newImages = [];

    for (const item of images) {
      if (item.image.src !== image.src) {
        newImages.push(item);
        URL.revokeObjectURL(item.src);
      }
    }

    setImages(newImages);
  };

  return (
    <>
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

        <h1>Image Editor</h1>

        <label htmlFor={'aspect-ratio'}>Aspect Ratio</label>
        <select
          id="aspect-ratio"
          onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
          value={aspectRatio}
        >
          <option value="insta-portrait">Portrait</option>
          <option value="insta-story">Story</option>
          <option value="insta-square">Square</option>
        </select>

        <label htmlFor="optimize-size">
          <input
            id="optimize-size"
            type="checkbox"
            checked={optimizeSize}
            onChange={(e) => setOptimizeSize(e.target.checked)}
          />
          Optimize Image Size
        </label>

        <button onClick={handleDownload}>Download Edited Images</button>

        {images.map(({ image, src }, i) => (
          <ImageEditor
            key={src}
            image={image}
            src={src}
            aspectRatio={aspectRatio}
            optimizeSize={optimizeSize}
            onRemove={() => handleRemove(image)}
            ref={(el: HTMLCanvasElement) => (canvasRefs.current[i] = el)}
          />
        ))}
      </div>
    </>
  );
};
