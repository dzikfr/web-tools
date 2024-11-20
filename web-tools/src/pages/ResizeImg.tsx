import React, { useState } from "react";
import FileInput from "../components/FileInput";
import Tittle from "../components/Title";
import Button from "../components/Button";

const ResizePage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      setFilename(selectedFile.name);
    }
  };

  const handleResize = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("filename", `resizes-${filename}`);


    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/resize`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setResizedImage(
          `${import.meta.env.VITE_BACKEND_URL}${data.url}`
        );
      } else {
        alert(data.error || data.message);
      }
    } catch (error) {
      console.error("Error resizing image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    const fileName = `resized-${filename}`;
    const link = document.createElement("a");
    link.href = `${import.meta.env.VITE_BACKEND_URL}/api/download/${fileName}`;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-2">
      <Tittle title="Resize Image" />

      <FileInput
        id="file-input"
        label="Upload Image"
        onChange={handleFileChange}
      />

      <Button onClick={handleResize} disabled={isLoading}>
        {isLoading ? "Resizing..." : "Resize"}
      </Button>

      {resizedImage && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Resized Image:</h2>
          <img src={resizedImage} alt="Resized" className="mt-4 border" />
          <div className="mt-4">
            <Button
              onClick={downloadImage}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Download Resized Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResizePage;
