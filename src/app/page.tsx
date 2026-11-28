import { Hero } from "@/components/sections/hero/hero";
import { LogoCloud } from "@/components/sections/logo-cloud/logo-cloud";
import { Navbar } from "@/components/sections/navbar/navbar";
import { SignalToAction } from "@/components/sections/signal-to-action/signal-to-action";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LogoCloud />
        <SignalToAction />
      </main>
    </>
  );
}
