"use client";

import { useEffect, useState } from "react";
import { Class } from "../definitions/definitions";

export const FileUploader = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [currentClass, setCurrentClass] = useState<string>("");

  useEffect(() => {
    const storedClasses = localStorage.getItem("uploadedClasses");
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses));
    }
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!currentClass) {
      alert("Bitte wählen oder erstellen Sie zuerst eine Klasse aus.");
      return;
    }

    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);

      const base64Images = await Promise.all(
        uploadedFiles.map((file) => toBase64(file)),
      );

      const newImages = base64Images.map((src) => ({
        src,
        firstName: "",
        lastName: "",
      }));

      const updatedClasses = classes.map((cls) =>
        cls.identifier === currentClass
          ? { ...cls, imageDatas: [...cls.imageDatas, ...newImages] }
          : cls,
      );

      setClasses(updatedClasses);
      localStorage.setItem("uploadedClasses", JSON.stringify(updatedClasses));
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
    classIndex: number,
    imageIndex: number,
    field: "firstName" | "lastName",
    value: string,
  ) => {
    const updatedClasses = [...classes];
    updatedClasses[classIndex].imageDatas[imageIndex][field] = value;
    setClasses(updatedClasses);
    localStorage.setItem("uploadedClasses", JSON.stringify(updatedClasses));
  };

  const createClass = () => {
    const newClassIdentifier = prompt("Bitte geben Sie einen Klassenname ein:");
    if (newClassIdentifier) {
      const newClass: Class = {
        identifier: newClassIdentifier,
        imageDatas: [],
      };
      const updatedClasses = [...classes, newClass];
      setClasses(updatedClasses);
      localStorage.setItem("uploadedClasses", JSON.stringify(updatedClasses));
    }
  };

  const clearClasses = () => {
    setClasses([]);
    localStorage.removeItem("uploadedClasses");
  };

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Schüler Foto-Upload</h1>

      <div className="mb-4 flex flex-col items-center">
        <button
          onClick={createClass}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-blue-700"
        >
          Neue Klasse erstellen
        </button>
        <select
          value={currentClass}
          onChange={(e) => setCurrentClass(e.target.value)}
          className="mt-5 rounded border p-2"
        >
          <option value="" disabled>
            Klasse auswählen
          </option>
          {classes.map((cls, index) => (
            <option key={index} value={cls.identifier}>
              {cls.identifier}
            </option>
          ))}
        </select>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {classes.map((cls, classIndex) => (
        <div key={classIndex} className="mb-6 w-full">
          <h2 className="mb-2 text-xl font-semibold">{cls.identifier}</h2>
          <div className="grid grid-cols-3 gap-4">
            {cls.imageDatas.map((image, imageIndex) => (
              <div
                key={imageIndex}
                className="relative rounded border p-2 shadow"
              >
                <img
                  src={image.src}
                  alt={`Bild ${imageIndex}`}
                  className="mb-2 h-32 w-32 rounded object-cover"
                />
                <input
                  type="text"
                  placeholder="Vorname"
                  value={image.firstName}
                  onChange={(e) =>
                    handleNameChange(
                      classIndex,
                      imageIndex,
                      "firstName",
                      e.target.value,
                    )
                  }
                  className="mb-1 w-full rounded border p-1"
                />
                <input
                  type="text"
                  placeholder="Nachname"
                  value={image.lastName}
                  onChange={(e) =>
                    handleNameChange(
                      classIndex,
                      imageIndex,
                      "lastName",
                      e.target.value,
                    )
                  }
                  className="w-full rounded border p-1"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={clearClasses}
        className="rounded-lg bg-red-600 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-red-700"
      >
        Alle Klassen löschen
      </button>
    </main>
  );
};
