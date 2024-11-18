"use client";

import React, { useState, useEffect } from "react";

interface ImageData {
  src: string;
  firstName: string;
  lastName: string;
}

export const QuizGame = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const storedImages = localStorage.getItem("uploadedImages");
    if (storedImages) {
      const parsedImages: ImageData[] = JSON.parse(storedImages);
      setImages(parsedImages);
      generateQuestion(parsedImages);
    }
  }, []);

  const generateQuestion = (imageSet: ImageData[]) => {
    if (imageSet.length === 0) return;

    const randomIndex = Math.floor(Math.random() * imageSet.length);
    const selectedImage = imageSet[randomIndex];
    setCurrentImageIndex(randomIndex);

    const correctName = `${selectedImage.firstName} ${selectedImage.lastName}`;
    setCorrectAnswer(correctName);

    const incorrectOptions = imageSet
      .filter((_, index) => index !== randomIndex)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((img) => `${img.firstName} ${img.lastName}`);

    const allOptions = [correctName, ...incorrectOptions].sort(
      () => 0.5 - Math.random(),
    );
    setOptions(allOptions);
  };

  const handleOptionSelect = (selectedOption: string) => {
    if (selectedOption === correctAnswer) {
      setFeedback("Richtig!");
    } else {
      setFeedback("Falsch!");
    }

    setTimeout(() => {
      setFeedback(null);
      generateQuestion(images);
    }, 1000);
  };

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-4 text-2xl font-bold">Quiz: Schülernamen lernen</h1>
      {images.length > 0 ? (
        <div className="flex flex-col items-center">
          <img
            src={images[currentImageIndex].src}
            alt="Quiz Bild"
            className="mb-4 h-48 w-48 rounded object-cover"
          />
          <div className="mb-4 grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && (
            <p
              className={`text-lg font-semibold ${
                feedback === "Richtig!" ? "text-green-500" : "text-red-500"
              }`}
            >
              {feedback}
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Keine Bilder im Spiel verfügbar.</p>
      )}
    </main>
  );
};
