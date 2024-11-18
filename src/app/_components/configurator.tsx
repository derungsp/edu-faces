"use client";

import Link from "next/link";
import { FileUploader } from "./file-uploader";

export const Configurator = () => {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <FileUploader />

      <Link
        href="quiz"
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Starte Quiz
      </Link>
    </main>
  );
};
