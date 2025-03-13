import { Configurator } from "../_components/configurator";

export default async function Config() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-50">
      <Configurator />
    </main>
  );
}
