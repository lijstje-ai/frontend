"use client";

import { Footer } from "@/components";
import { WishlistHeader } from "@/app/w/_components";
import NextLink from "next/link";

export const PrivacyPolicyContent = () => {
  return (
    <div className="mx-auto min-h-screen w-full bg-white sm:max-w-md">
      <WishlistHeader />

      <main className="bg-gray-50 px-6 pt-8">
        <div className="space-y-6">
          <h1 className="mb-8 text-center text-3xl font-extrabold text-zinc-700">
            Privacy &amp; Cookies
          </h1>

          <div className="space-y-4">
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600">
                Laatst bijgewerkt: september 2025
              </p>
            </div>

            <div className="bg-main-blue/10 border-main-blue/20 rounded-lg border p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg
                  className="text-main-blue h-4.5 w-4.5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="shield-halved"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z"
                  ></path>
                </svg>
                Privacy Respect
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Lijstje.ai respecteert uw privacy. Wij verzamelen minimale
                persoonsgegevens en gebruiken cookies en tracking om onze dienst
                te verbeteren. Hieronder leest u hoe wij omgaan met uw gegevens.
              </p>
            </div>

            <div className="rounded-lg border border-emerald-600/20 bg-emerald-600/10 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg
                  className="h-4 w-4 text-emerald-600"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="database"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"
                  ></path>
                </svg>
                Gegevensverzameling
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="rounded border-l-4 border-emerald-600 bg-white/50 p-3">
                  <strong>Verlanglijstjes:</strong> Verlanglijstjes worden
                  anoniem opgeslagen en automatisch na 6 maanden verwijderd.
                </div>
                <div className="rounded border-l-4 border-emerald-600 bg-white/50 p-3">
                  <strong>E-mailadressen:</strong> Alleen opgeslagen wanneer u
                  kiest voor een bewerk-link. Dit e-mailadres wordt maximaal 1
                  keer per jaar gebruikt voor een herinnering. Afmelden kan via
                  de link in de e-mail.
                </div>
                <div className="rounded border-l-4 border-emerald-600 bg-white/50 p-3">
                  <strong>Gebruiksdata:</strong> Wij gebruiken Microsoft
                  Clarity, Google Analytics en Google Search Console om anoniem
                  gebruiksgedrag te analyseren. Data wordt maximaal 16 maanden
                  bewaard.
                </div>
              </div>
            </div>

            <div className="bg-main-red/10 border-main-red/20 rounded-lg border p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg
                  className="text-main-red h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="cookie-bite"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8zM208 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM144 336a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                  ></path>
                </svg>
                Cookies en tracking
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-gray-700">
                Wij gebruiken cookies voor:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="items- flex">
                    <svg
                      className="text-main-red h-3 w-3"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="circle-check"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                      ></path>
                    </svg>
                  </div>
                  Functioneel gebruik van de verlanglijstjes-tool
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex items-center">
                    <svg
                      className="text-main-red h-3 w-3"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="circle-check"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                      ></path>
                    </svg>
                  </div>
                  Analyse van bezoekersgedrag
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex items-center bg-gray-200">
                    <svg
                      className="text-main-red h-3 w-3"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="circle-check"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                      ></path>
                    </svg>
                  </div>
                  Affiliate marketing via externe links, bijvoorbeeld naar
                  Bol.com
                </li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                Bij eerste bezoek krijgt u een cookiebanner met
                instelmogelijkheden.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-100 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg
                  className="h-5 w-5 text-gray-600"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="user-shield"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c1.8 0 3.5-.2 5.3-.5c-76.3-55.1-99.8-141-103.1-200.2c-16.1-4.8-33.1-7.3-50.7-7.3H178.3zm308.8-78.3l-120 48C358 277.4 352 286.2 352 296c0 63.3 25.9 168.8 134.8 214.2c5.9 2.5 12.6 2.5 18.5 0C614.1 464.8 640 359.3 640 296c0-9.8-6-18.6-15.1-22.3l-120-48c-5.7-2.3-12.1-2.3-17.8 0zM591.4 312c-3.9 50.7-27.2 116.7-95.4 149.7V273.8L591.4 312z"
                  ></path>
                </svg>
                Uw rechten
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Conform de AVG kunt u inzage vragen in uw gegevens of een
                verzoek tot verwijdering doen via.
              </p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg
                  className="h-4.5 w-4.5 text-orange-600"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="handshake"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8V128h-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48V352h28.2l91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16V352c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V128H16zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128V352c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V144c0-8.8-7.2-16-16-16H544zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"
                  ></path>
                </svg>
                Derde partijen
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Uw gegevens worden uitsluitend gedeeld met dienstverleners die
                helpen met analytics en affiliate tracking, allen volgens
                AVG-richtlijnen.
              </p>
            </div>
          </div>

          <div className="border-lightgray border-t px-6 py-6">
            <div>
              <NextLink
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
              </NextLink>
            </div>
          </div>
        </div>
      </main>

      <Footer className="bg-gray-50" />
    </div>
  );
}
