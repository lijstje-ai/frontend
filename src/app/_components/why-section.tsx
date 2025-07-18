import { whySectionQuestions } from "@/data";

export const WhySection = () => {
  return (
    <section id="features-section" className="px-6 py-10">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Waarom lijstje.ai?
      </h2>

      <div className="mx-auto grid max-w-md grid-cols-1 gap-6">
        {whySectionQuestions.map((question) => (
          <div
            key={question.id}
            className="border-lightgray flex items-start rounded-xl border bg-white p-5 shadow-sm"
          >
            <div
              className={`${question.iconBackgroundColor} ${question.iconColor} mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full`}
            >
              {question.icon}
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">{question.title}</h3>
              <p className="text-gray-600">{question.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
