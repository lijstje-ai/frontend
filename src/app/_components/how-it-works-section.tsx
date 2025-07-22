import { howItWorksItems } from "@/data";

export const HowItWorksSection = () => {
  return (
    <section className="scroll-mt-20 bg-gray-100 px-6 py-10" id="howItWorksBox">
      <h2 className="mb-8 text-center text-2xl font-bold">Hoe het werkt</h2>

      <div className="mx-auto flex max-w-md flex-col">
        {howItWorksItems.map((item, index) => (
          <div key={item.id} className="relative mb-10 flex items-center">
            <div
              className={`${item.iconBackgroundColor} z-10 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white`}
            >
              {index + 1}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="mb-1 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
