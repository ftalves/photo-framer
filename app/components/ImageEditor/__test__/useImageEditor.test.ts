import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useImageEditor } from "..";
import { act } from "react-dom/test-utils";

describe("useImageEditor", () => {
  const { result } = renderHook(() => useImageEditor());

  it("Should toggle lockProportions", async () => {
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
});
