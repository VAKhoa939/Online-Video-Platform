import React, { useState } from "react";

const UploadButton = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Access the first file in the FileList
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create a temporary URL for preview
    } else {
      setSelectedImage(null); // Clear the image if no file is selected
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "block", margin: "20px auto" }}
      />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected Image"
          style={{ maxWidth: "100%" }}
        />
      )}
    </div>
  );
};

export default UploadButton;
