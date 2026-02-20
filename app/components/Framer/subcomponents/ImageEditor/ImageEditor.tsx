import { ForwardedRef, forwardRef, useRef } from 'react';

import { IMAGE_EDITOR_TEST_ID } from '@/app/utils/testIds';
import { AspectRatio } from '@/app/components/Framer/types';

import { useImageEditor } from './useImageEditor';

interface EditorProps {
  image: HTMLImageElement;
  src: string;
  aspectRatio: AspectRatio;
  optimizeSize: boolean;
  borderColor: string;
  onRemove: () => void;
}

export const ImageEditor = forwardRef(
  (props: EditorProps, canvasRef: ForwardedRef<HTMLCanvasElement>) => {
    const myRef = useRef<HTMLCanvasElement | null>(null);

    const { imageDimensions } = useImageEditor({
      ...props,
      canvasRef: myRef,
    });

    return (
      <div
        data-testid={IMAGE_EDITOR_TEST_ID}
        className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-sm"
      >
        {/* Canvas preview */}
        <div className="flex items-center justify-center p-3">
          <canvas
            ref={(node) => {
              myRef.current = node;
              if (canvasRef) {
                if (typeof canvasRef === 'function') {
                  canvasRef(node);
                } else {
                  canvasRef.current = node;
                }
              }
            }}
            width={0}
            height={0}
            className="max-h-64 w-auto rounded object-contain shadow-sm"
          />
        </div>

        {/* Footer: dimensions + remove */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs font-medium text-gray-400 tabular-nums">
            {imageDimensions.width} &times; {imageDimensions.height}
          </span>
          <button
            onClick={props.onRemove}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <svg
              className="h-3.5 w-3.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Remove
          </button>
        </div>
      </div>
    );
  }
);
ImageEditor.displayName = 'Editor';
