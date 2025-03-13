import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-50 p-4">
      <h1 className="mb-4 text-4xl font-bold text-blue-900">
        Willkommen zur Edu Faces App
      </h1>
      <p className="mb-8 text-lg text-gray-700">
        Lerne die Namen deiner Schüler auf eine einfache und unterhaltsame
        Weise!
      </p>
      <Link
        href="/config"
        className="rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-blue-700"
      >
        Jetzt starten
      </Link>
    </main>
  );
}
