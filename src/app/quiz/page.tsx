import { QuizGame } from "../_components/quiz-game";

export default async function Quiz() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-50">
      <QuizGame />
    </main>
  );
}
