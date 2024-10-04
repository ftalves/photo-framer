import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageEditor } from '../ImageEditor';
import { DROPZONE_TEST_ID } from '@/app/utils/testIds';

describe('ImageEditor', () => {
  let editorComponent: RenderResult;

  beforeEach(() => {
    editorComponent = render(<ImageEditor />);
  });

  describe('File upload', () => {
    it('Should display a dropzone for file upload', () => {
      expect(editorComponent.getByTestId(DROPZONE_TEST_ID)).toBeInTheDocument();
    });
  });
});
