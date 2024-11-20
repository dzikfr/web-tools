import React, { useState } from "react";
import Tittle from "../components/Title";
import Button from "../components/Button";
import FileInput from "../components/FileInput";
import Badge from "../components/Badge";
import axios from "axios";

const FindAnime: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const searchAnime = async () => {
    if (!selectedImage) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SEARCH_ANIME_URL}/search`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data.result?.[0] || null);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch anime details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Tittle title="Find Anime" />

      {/* File Input */}
      <FileInput
        id="file-input"
        label="Upload Image"
        onChange={handleImageUpload}
      />

      {/* Preview */}
      {preview && (
        <div style={{ margin: "20px" }}>
          <Badge text="Preview" />
          <img
            src={preview}
            alt="Preview"
            style={{ width: "300px", height: "auto", borderRadius: "8px", marginTop: "6px" }}
          />
        </div>
      )}

      {/* Button Search */}
      <Button
        onClick={() => searchAnime()}
        disabled={!selectedImage || loading}
        className="mt-4"
      >
        {loading ? "Searching..." : "Search"}
      </Button>

      {/* Result */}
      {result && (
        <div style={{ marginTop: "30px" }}>
          <Badge text="Result" />
          <p>
            <strong>Title:</strong>{" "}
            {result.anilist?.title || result.filename || "N/A"}
          </p>
          <p>
            <strong>Episode:</strong> {result.episode || "N/A"}
          </p>
          <p>
            <strong>Timestamp:</strong>{" "}
            {result.from &&
              `${Math.floor(result.from / 60)}m ${Math.floor(
                result.from % 60
              )}s`}
          </p>
          <p>
            <strong>Similarity:</strong> {(result.similarity * 100).toFixed(2)}%
          </p>

          <Button
            onClick={() => window.open(result.video, "_blank")} // Membuka link di tab baru
            className="mt-4 justify-center"
          >
            Watch Clip
          </Button>
        </div>
      )}
    </div>
  );
};

export default FindAnime;
