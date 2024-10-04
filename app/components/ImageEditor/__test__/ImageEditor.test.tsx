import { render, RenderResult } from '@testing-library/react';

import { DROPZONE_TEST_ID } from '@/app/utils/testIds';
import { ImageEditor } from '../ImageEditor';

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
