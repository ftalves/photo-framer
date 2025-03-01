'use client';

import { useEffect, useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import { saveAs } from 'file-saver';

import { DROPZONE_TEST_ID } from '@/app/utils/testIds';
import { MAP_EXPORT_FORMAT_TO_LABEL } from '@/app/utils/constants';
import { AspectRatio, ExportFormat } from './types';
import { ImageEditor } from './subcomponents';

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
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('');
  const [format, setFormat] = useState<ExportFormat>('jpeg');

  const canvasRefs = useRef<HTMLCanvasElement[]>([]);

  const handleUpload = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      return image;
    });

    setImages([...images, ...newImages]);
  };

  useEffect(() => {
    canvasRefs.current = canvasRefs.current.slice(0, images.length || 0);
  }, [images]);

  const handleDownload = () => {
    canvasRefs.current.forEach((canvasRef) => {
      //TODO: delegate to a web worker
      canvasRef.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `image.${format}}`);
        }
      }, `image/${format}`);
    });
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
        >
          <option value="">Original</option>
          <option value="insta-story">Story</option>
          <option value="insta-portrait">Portrait</option>
          <option value="insta-square">Square</option>
        </select>

        <label htmlFor={'format'}>Export Format</label>
        <select
          id="format"
          onChange={(e) => setFormat(e.target.value as ExportFormat)}
        >
          {(Object.keys(MAP_EXPORT_FORMAT_TO_LABEL) as Array<ExportFormat>).map(
            (format) => (
              <option key={format} value={format}>
                {MAP_EXPORT_FORMAT_TO_LABEL[format]}
              </option>
            )
          )}
        </select>

        <button onClick={handleDownload}>Download Edited Images</button>

        {images.map((image, i) => (
          <ImageEditor
            key={image.src}
            image={image}
            aspectRatio={aspectRatio}
            onRemove={() => setImages(images.filter((({ src }) => src !== image.src)))}
            ref={(el: HTMLCanvasElement) => (canvasRefs.current[i] = el)}
          />
        ))}
      </div>
    </>
  );
};
