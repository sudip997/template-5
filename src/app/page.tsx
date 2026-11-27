import { Hero } from "@/components/sections/hero/hero";
import { Navbar } from "@/components/sections/navbar/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
    </>
  );
}
