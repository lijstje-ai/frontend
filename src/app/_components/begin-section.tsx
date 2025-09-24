import { useScrollToElement } from "@/hooks/ui";

import { Button } from "@/components";

export const BeginSection = () => {
  const { scrollToElement } = useScrollToElement();

  return (
    <div className="container mx-auto max-w-md px-6 py-8 text-center">
      <h2 className="mb-4 text-2xl font-bold">Klaar om te beginnen?</h2>
      <p className="mb-6 text-gray-600">
        Maak in enkele minuten je persoonlijke verlanglijstje en deel het met je
        dierbaren.
      </p>
      <Button
        onClick={() => scrollToElement("userForm")}
        className="transition hover:scale-105"
      >
        Start je lijstje
      </Button>
    </div>
  );
};
