import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "./_sections/Hero";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="mx-auto w-full max-w-page px-4 lg:px-8">
        <Hero />
      </main>
    </>
  );
}
