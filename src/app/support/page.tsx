import Link from "next/link";

import {
  Footer,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components";
import { WishlistHeader } from "@/app/w/_components";

import { supportQuestions } from "@/data";

export default function SupportPage() {
  return (
    <div className="mx-auto min-h-screen w-full bg-white sm:max-w-md">
      <WishlistHeader />

      <main className="bg-gray-50 px-6 pt-8">
        <h1
          id="page-title"
          className="mb-8 text-center text-3xl font-extrabold"
        >
          Support
        </h1>
        <div
          id="intro-section"
          className="bg-main-blue/10 border-main-blue/20 mb-8 rounded-lg border p-6"
        >
          <div className="mb-3 flex items-center">
            <i className="text-secondary mr-3 text-xl" data-fa-i2svg="">
              <svg
                className="text-main-blue h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="circle-question"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                ></path>
              </svg>
            </i>
            <h3 className="text-lg font-bold text-gray-800">
              Veelgestelde vragen
            </h3>
          </div>
          <p className="text-sm text-gray-700">
            Hieronder vind je antwoorden op de meest gestelde vragen over
            lijstje.ai.
          </p>
        </div>

        <Accordion type="multiple" className="space-y-5">
          {supportQuestions.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id.toString()}
              className="rounded-md border"
            >
              <AccordionTrigger className="cursor-pointer p-5 text-lg font-semibold text-gray-800 hover:bg-gray-100 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-5 pt-2 pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="border-lightgray border-t px-6 py-6">
          <div>
            <Link
              href="/"
              className="text-main-blue hover:text-main-blue/80 mx-auto flex w-fit items-center justify-center gap-2 font-semibold transition"
            >
              <svg
                className="text-main-blue h-3.5 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-left"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                ></path>
              </svg>
              Terug naar home
            </Link>
          </div>
        </div>
      </main>

      <Footer className="bg-gray-50" />
    </div>
  );
}
