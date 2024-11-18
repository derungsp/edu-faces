import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between bg-gray-200 p-5">
      <Link href="/">EduFaces</Link>
      <div>
        <ul className="flex gap-x-5">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="quiz">Quiz</Link>
          </li>
          <li>
            <Link href="config">Configurator</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
