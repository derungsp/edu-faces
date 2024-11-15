"use client";

import { useEffect, useState } from "react";

interface ImageData {
  src: string; // Base64-String
  firstName: string;
  lastName: string;
}

export function FileUploader() {
  const [images, setImages] = useState<ImageData[]>([]);

  // Lade Bilder aus LocalStorage beim ersten Render
  useEffect(() => {
    const storedImages = localStorage.getItem("uploadedImages");
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);

      // Bilder in Base64 konvertieren
      const base64Images = await Promise.all(
        uploadedFiles.map((file) => toBase64(file)),
      );

      // Bilder in das ImageData-Format umwandeln
      const newImages = base64Images.map((src) => ({
        src,
        firstName: "",
        lastName: "",
      }));

      // Aktualisiere den State und speichere in LocalStorage
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleNameChange = (
    index: number,
    field: "firstName" | "lastName",
    value: string,
  ) => {
    const updatedImages = [...images];
    updatedImages[index][field] = value;
    setImages(updatedImages);
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
  };

  const clearFiles = () => {
    setImages([]);
    localStorage.removeItem("uploadedImages");
  };

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Schüler Foto-Upload</h1>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {images.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative rounded border p-2 shadow">
              <img
                src={image.src}
                alt={`Bild ${index}`}
                className="mb-2 h-32 w-32 rounded object-cover"
              />
              <input
                type="text"
                placeholder="Vorname"
                value={image.firstName}
                onChange={(e) =>
                  handleNameChange(index, "firstName", e.target.value)
                }
                className="mb-1 w-full rounded border p-1"
              />
              <input
                type="text"
                placeholder="Nachname"
                value={image.lastName}
                onChange={(e) =>
                  handleNameChange(index, "lastName", e.target.value)
                }
                className="w-full rounded border p-1"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Keine Bilder hochgeladen.</p>
      )}
      <button
        onClick={clearFiles}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
      >
        Alle löschen
      </button>
    </main>
  );
}
