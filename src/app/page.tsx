import Link from "next/link";
import { FileUploader } from "./_components/file-uploader";
import { QuizGame } from "./_components/quiz-game";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50">
      <FileUploader />

      <Link
        href="quiz"
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Starte Quiz
      </Link>
    </main>
  );
}
