"use client";

import { CreateWishlistForm, Header } from "@/components";
import { Hero, RatingSection, WhySection } from "./_components";

export default function CreateWishlistPage() {
  return (
    <>
      <Header />
      <main className="pt-10">
        <Hero />
        <RatingSection />
        <section className="px-6 py-8">
          <CreateWishlistForm />
        </section>
        <WhySection />
      </main>
    </>
  );
}
