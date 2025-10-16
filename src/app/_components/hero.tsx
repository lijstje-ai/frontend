import { useScrollToElement } from "@/hooks/ui";

import { Button } from "@/components/ui";

export const Hero = () => {
  const { scrollToElement } = useScrollToElement();

  return (
    <section className="bg-gradient-to-b from-white to-gray-100 px-6 py-10 mt-5.5">
      <div className="container mx-auto text-center">
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
          Start je lijstje
        </Button>
      </div>
    </section>
  );
};
