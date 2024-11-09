import { GamesList } from "@/features/games-list/server";

export default async function Home() {
  return (
    <div className="flex flex-col gap-8 container mx-auto pt-[100px]">
      <h1 className="text-4xl font-bold">Игры</h1>
      <GamesList />
    </div>
  );
}
