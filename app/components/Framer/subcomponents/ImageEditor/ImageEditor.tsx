import { ForwardedRef, forwardRef, useRef } from 'react';

import { IMAGE_EDITOR_TEST_ID } from '@/app/utils/testIds';
import { AspectRatio } from '@/app/components/Framer/types';

import { useImageEditor } from './useImageEditor';

interface EditorProps {
  image: HTMLImageElement;
  aspectRatio: AspectRatio;
}

export const ImageEditor = forwardRef(
  (props: EditorProps, canvasRef: ForwardedRef<HTMLCanvasElement>) => {
    const myRef = useRef<HTMLCanvasElement | null>(null);

    const {
      imageDimensions,
      lockProportions,
      setLockProportions,
      setWidth,
      setHeight,
    } = useImageEditor({ ...props, canvasRef: myRef });

    return (
      <div data-testid={IMAGE_EDITOR_TEST_ID} className="w-screen">
        <div>
          <input
            type="number"
            value={imageDimensions.width || 0}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <input
            type="number"
            value={imageDimensions.height || 0}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <input
            type="checkbox"
            checked={lockProportions}
            onChange={() => setLockProportions(!lockProportions)}
          />
        </div>

        <canvas
          ref={(node) => {
            myRef.current = node;
            if (canvasRef) {
              if (typeof canvasRef === 'function') {
                canvasRef(node);
              } else if (canvasRef) {
                canvasRef.current = node;
              }
            }
          }}
          width={0}
          height={0}
          className="w-1/3"
        />
      </div>
    );
  }
);
ImageEditor.displayName = 'Editor';
