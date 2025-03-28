import PokemonList from '@/components/PokemonList';

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        React Demo Programación Web
      </h1>
      <PokemonList />
    </main>
  );
}
