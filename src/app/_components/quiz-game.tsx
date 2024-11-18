"use client";

import React, { useState, useEffect } from "react";
import { Class, ImageData } from "../definitions/definitions";

export const QuizGame = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [quizImages, setQuizImages] = useState<ImageData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const storedClasses = localStorage.getItem("uploadedClasses");
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses));
    }
  }, []);

  const generateQuizPool = () => {
    const selectedImages = classes
      .filter((cls) => selectedClasses.includes(cls.identifier))
      .flatMap((cls) => cls.imageDatas);

    setQuizImages(selectedImages);
    if (selectedImages.length > 0) {
      generateQuestion(selectedImages);
    }
  };

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
      generateQuestion(quizImages);
    }, 1000);
  };

  const toggleClassSelection = (classIdentifier: string) => {
    setSelectedClasses((prev) =>
      prev.includes(classIdentifier)
        ? prev.filter((cls) => cls !== classIdentifier)
        : [...prev, classIdentifier],
    );
  };

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-4 text-2xl font-bold">Quiz: Schülernamen lernen</h1>

      <div className="mb-4">
        <h2 className="mb-2 text-lg font-semibold">Klassen auswählen:</h2>
        <div className="flex flex-wrap gap-2">
          {classes.map((cls) => (
            <label key={cls.identifier} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={cls.identifier}
                checked={selectedClasses.includes(cls.identifier)}
                onChange={() => toggleClassSelection(cls.identifier)}
              />
              {cls.identifier}
            </label>
          ))}
        </div>
        <button
          onClick={generateQuizPool}
          className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
        >
          Quiz starten
        </button>
      </div>

      {quizImages.length > 0 ? (
        <div className="flex flex-col items-center">
          <img
            src={quizImages[currentImageIndex].src}
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
        <p className="text-gray-500">
          Bitte wählen Sie Klassen aus und starten Sie das Quiz.
        </p>
      )}
    </main>
  );
};
