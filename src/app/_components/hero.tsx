import { useScrollToElement } from "@/hooks/ui";

import { Button } from "@/components/ui";

export const Hero = () => {
  const { scrollToElement } = useScrollToElement();

  return (
    <section className="mt-5.5 bg-gradient-to-b from-white to-gray-100 px-6 py-10">
      <div className="container mx-auto text-center">
        <div className="mb-4 inline-block rounded-full bg-[#10B981] px-4 py-1 text-sm font-semibold text-white">
          Gratis
        </div>
        <h1 className="mb-4 text-3xl font-bold">
          Slim verlanglijstje maken zonder account
        </h1>
        <p className="mx-auto mb-6 max-w-md text-gray-600">
          Maak snel en eenvoudig een online verlanglijstje met AI-suggesties en
          deel het gratis met familie en vrienden!
        </p>
        <Button
          onClick={() => scrollToElement("userForm")}
          className="transform px-8 py-3 font-semibold shadow-md transition hover:scale-105"
        >
          Start je verlanglijstje
        </Button>
      </div>
    </section>
  );
};
