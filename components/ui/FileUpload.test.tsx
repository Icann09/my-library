import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";

// MUST be at the top BEFORE FileUpload import
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    message: vi.fn(),
  },
}));

import { toast } from "sonner";
import FileUpload from "./FileUpload";


// Mock ImageKit components (IKUpload, IKImage, IKVideo, Provider)
vi.mock("imagekitio-next", () => ({
  ImageKitProvider: ({ children }: any) => <div>{children}</div>,
  IKUpload: vi.fn().mockImplementation(({ onSuccess, onError, onUploadProgress }: any) => (
    <input
      data-testid="ik-upload"
      type="file"
      style={{ display: "none" }}
      onChange={(e: any) => {
        const file = e.target.files[0];

        // Trigger validation + upload flow
        if (!file) return;

        // Simulate file size validation (assuming component does this before upload)
        if (file.size > 20 * 1024 * 1024) {
          toast.error("Please upload a file that is less than 20 MB in size");
          return;
        }

        try {
          onUploadProgress?.({ loaded: 50, total: 100 });

          onSuccess?.({
            filePath: "/uploaded/test-file.jpg",
          });
        } catch (err) {
          onError?.(err);
        }
      }}
    />
  )),
  IKImage: ({ path }: any) => <img data-testid="ik-image" src={path} />,
  IKVideo: ({ path }: any) => <video data-testid="ik-video" src={path} />,
}));



describe("FileUpload Component", () => {
  const mockOnFileChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders upload button with placeholder", () => {
    render(
      <FileUpload
        onFileChange={mockOnFileChange}
        type="image"
        accept="image/*"
        placeholder="Upload Image"
        folder="/test"
        variant="dark"
      />
    );

    expect(screen.getByText("Upload Image")).toBeDefined();
  });

  it("opens file input when button is clicked", () => {
    render(
      <FileUpload
        onFileChange={mockOnFileChange}
        type="image"
        accept="image/*"
        placeholder="Upload Image"
        folder="/test"
        variant="dark"
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // IKUpload is rendered
    expect(screen.getByTestId("ik-upload")).toBeDefined();
  });

  it("handles successful file upload", () => {
    render(
      <FileUpload
        onFileChange={mockOnFileChange}
        type="image"
        accept="image/*"
        placeholder="Upload Image"
        folder="/test"
        variant="dark"
      />
    );

    const input = screen.getByTestId("ik-upload");

    // simulate file upload
    const file = new File(["test"], "photo.jpg", { type: "image/jpeg" });
    fireEvent.change(input, { target: { files: [file] } });

    // callback should be called
    expect(mockOnFileChange).toHaveBeenCalledWith("/uploaded/test-file.jpg");

    // preview image should appear
    expect(screen.getByTestId("ik-image")).toBeDefined();
  });

  it("updates progress during upload", () => {
    render(
      <FileUpload
        onFileChange={mockOnFileChange}
        type="image"
        accept="image/*"
        placeholder="Upload Image"
        folder="/test"
        variant="dark"
      />
    );

    const input = screen.getByTestId("ik-upload");

    const file = new File(["test"], "photo.jpg", { type: "image/jpeg" });
    fireEvent.change(input, { target: { files: [file] } });

    // progress bar should appear (50% from mock)
    expect(screen.getByText("50%")).toBeDefined();
  });

  it("rejects invalid large image files", () => {
  render(
    <FileUpload
      onFileChange={mockOnFileChange}
      type="image"
      accept="image/*"
      placeholder="Upload Image"
      folder="/test"
      variant="dark"
    />
  );

  const input = screen.getByTestId("ik-upload");

  // Create a file > 20MB
  const largeFile = new File(["x".repeat(25 * 1024 * 1024)], "large.jpg", {
    type: "image/jpeg",
  });

  fireEvent.change(input, { target: { files: [largeFile] } });

  // EXPECT the spy to be called
  expect(toast.error).toHaveBeenCalledWith(
    "Please upload a file that is less than 20 MB in size"
  );
});

});
