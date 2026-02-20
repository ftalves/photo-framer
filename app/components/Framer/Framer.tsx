'use client';

import { useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';
import Dropzone from 'react-dropzone';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { HexColorPicker } from 'react-colorful';

import { DROPZONE_TEST_ID } from '@/app/utils/testIds';
import { ImageEditor } from './subcomponents';
import { AspectRatio, ImageItem } from './types';

export const Framer = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('insta-portrait');
  const [optimizeSize, setOptimizeSize] = useState(true);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<HTMLCanvasElement[]>([]);

  // Close the color picker when clicking outside it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(e.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleDownload = async () => {
    const blobEntries = await Promise.all(
      canvasRefs.current.map((canvasRef, index) => {
        const item = images[index];
        if (!item) return Promise.resolve(null);

        return new Promise<{
          blob: Blob;
          extension: string;
          mimeType: string;
        } | null>((resolve) => {
          canvasRef.toBlob((blob) => {
            resolve(
              blob
                ? { blob, extension: item.extension, mimeType: item.mimeType }
                : null
            );
          }, item.mimeType);
        });
      })
    );

    const valid = blobEntries.filter(Boolean) as {
      blob: Blob;
      extension: string;
      mimeType: string;
    }[];

    if (valid.length === 0) return;

    if (valid.length === 1) {
      saveAs(valid[0].blob, `image.${valid[0].extension}`);
      return;
    }

    const zip = new JSZip();
    valid.forEach(({ blob, extension }, i) => {
      zip.file(`image-${i + 1}.${extension}`, blob);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'instaready-images.zip');
  };

  const handleRemove = (image: HTMLImageElement) => {
    const newImages = [];

    for (const item of images) {
      if (item.image.src !== image.src) {
        newImages.push(item);
      } else {
        URL.revokeObjectURL(item.src);
      }
    }

    setImages(newImages);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-6">
      {/* Hero */}
      <header className="mb-10 mt-5 flex flex-col items-center gap-4 ">
        <div className="max-w-3xl">
          <NextImage
            src="/logo.png"
            alt="InstaReady"
            width={220}
            height={60}
            priority
            className="h-auto w-auto"
          />
        </div>
        <p className="text-xl text-gray-500 text-center">
          Add clean borders to match Instagram ratios instantly.
        </p>
      </header>

      {/* Dropzone */}
      <Dropzone onDrop={handleUpload} accept={{ 'image/*': [] }}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            data-testid={DROPZONE_TEST_ID}
            className={`flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed px-6 py-12 cursor-pointer transition-colors ${
              isDragActive
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-gray-300 bg-white hover:border-indigo-300 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <svg
              className="mb-3 h-10 w-10 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="text-sm font-medium text-gray-700">
              {isDragActive
                ? 'Drop images here'
                : 'Drag & drop images, or click to select'}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              PNG, JPG, WEBP supported
            </p>
          </div>
        )}
      </Dropzone>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 px-5 py-4">
        <div className="flex items-center gap-2">
          <label
            htmlFor="aspect-ratio"
            className="text-sm font-medium text-gray-700 whitespace-nowrap"
          >
            Aspect Ratio
          </label>
          <select
            id="aspect-ratio"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="insta-portrait">Portrait / Post</option>
            <option value="insta-story">Story</option>
            <option value="insta-square">Square</option>
          </select>
        </div>

        {/* Border colour picker */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Border Color
          </span>
          <div ref={colorPickerRef} className="relative">
            <button
              onClick={() => setShowColorPicker((v) => !v)}
              className="h-7 w-7 rounded-md border-2 border-gray-300 shadow-sm ring-offset-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              style={{ backgroundColor: borderColor }}
              aria-label="Pick border color"
            />
            {showColorPicker && (
              <div className="absolute left-0 top-9 z-20 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                <HexColorPicker color={borderColor} onChange={setBorderColor} />
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono uppercase">
                    {borderColor}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <label
          htmlFor="optimize-size"
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <input
            id="optimize-size"
            type="checkbox"
            checked={optimizeSize}
            onChange={(e) => setOptimizeSize(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 accent-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Optimize Image Size
          </span>
        </label>

        {images.length > 0 && (
          <button
            onClick={handleDownload}
            className="ml-auto flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 active:bg-indigo-700 transition-colors"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Download{images.length > 1 ? ` all as ZIP (${images.length})` : ''}
          </button>
        )}
      </div>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map(({ image, src }, i) => (
            <ImageEditor
              key={src}
              image={image}
              src={src}
              aspectRatio={aspectRatio}
              optimizeSize={optimizeSize}
              borderColor={borderColor}
              onRemove={() => handleRemove(image)}
              ref={(el: HTMLCanvasElement) => (canvasRefs.current[i] = el)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
