import React, { useState } from "react";
import { removeBackground as imglyRemoveBackground } from "@imgly/background-removal";
import Button from "../components/Button";
import Tittle from "../components/Title";
import FileInput from "../components/FileInput";

const RemoveBg = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [removedBgImage, setRemovedBgImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (image) {
      setIsLoading(true);
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const imageSrc = reader.result;

          if (typeof imageSrc === "string") {
            const resultBlob = await imglyRemoveBackground(imageSrc);
            const url = URL.createObjectURL(resultBlob);
            setRemovedBgImage(url);
            setPreviewImage(null);
          } else {
            console.error("Gambar tidak dalam format yang valid");
          }
        };

        reader.readAsDataURL(image);
      } catch (error) {
        console.error("Error removing background:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const downloadImage = () => {
    if (removedBgImage) {
      const link = document.createElement("a");
      link.href = removedBgImage;
      link.download = "removedbg.png";
      link.click();
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreviewImage(null);
    setRemovedBgImage(null);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Tittle title="Remove Background" />

      {/* Input file */}
      <FileInput
        id="file-upload"
        label="Upload File"
        onChange={handleImageChange}
      />

      {/* Display preview or result */}
      <div className="mt-6 flex flex-col items-center">
        {previewImage && !removedBgImage && (
          <div>
            <h3 className="text-xl font-semibold">Preview</h3>
            <h5 className="text-sm">When generate, it will take some time</h5>
            <img
              src={previewImage}
              alt="Preview"
              className="mt-4 h-auto max-w-full rounded-lg shadow-md"
            />
          </div>
        )}

        {removedBgImage && (
          <div>
            <h3 className="text-xl font-semibold">Result</h3>
            <img
              src={removedBgImage}
              alt="Removed Background"
              className="mt-4 h-auto max-w-full rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col items-center">
        {!removedBgImage && (
          <Button onClick={removeBackground}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        )}
        {removedBgImage && (
          <div>
            <Button onClick={downloadImage}>Download Image</Button>
            <div className="mt-4">
              <Button onClick={clearImage}>Clear Image</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBg;
