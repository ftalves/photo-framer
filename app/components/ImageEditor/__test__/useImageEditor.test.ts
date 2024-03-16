import path from "path";
import fs from "fs";
import { renderHook, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useImageEditor } from "..";
import { act } from "react-dom/test-utils";

const readFile = (filePath: string) => {
  return new Promise<File>((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        reject();
      }

      // Create a File object
      const file = new File([data], "file.jpg", { type: "image/jpg" });
      resolve(file);
    });
  });
};

describe("useImageEditor", () => {
  const { result } = renderHook(() => useImageEditor());

  it("Should toggle 'lock proportions'", async () => {
    expect(result.current.lockProportions).toBe(true);

    act(() => {
      result.current.toggleLockProportions();
    });
    expect(result.current.lockProportions).toBe(false);

    act(() => {
      result.current.toggleLockProportions();
    });
    expect(result.current.lockProportions).toBe(true);
  });

  it("Should handle image upload", async () => {
    const file = await readFile(`${__dirname}/assets/girl.jpeg`);

    await act(() => {
      result.current.handleFileUpload([file]);
    });
    expect(result.current.imageDimensions).toBe({ width: 183, height: 275 });
  });
});
