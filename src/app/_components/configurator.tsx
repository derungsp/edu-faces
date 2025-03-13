"use client";

import { FileUploader } from "./file-uploader";

export const Configurator = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-50 p-4">
      <FileUploader />
    </main>
  );
};
