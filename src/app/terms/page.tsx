"use client";

import NextLink from "next/link";

import { Footer } from "@/components";
import { WishlistHeader } from "@/app/wishlist/_components";

export default function TermsPage() {
  return (
    <div className="mx-auto min-h-screen w-full bg-white sm:max-w-md">
      <WishlistHeader />

      <main className="bg-gray-50 px-6 pt-8">
        <div className="space-y-6">
          <h1 className="mb-8 text-center text-3xl font-extrabold text-zinc-700">
            Gebruiksvoorwaarden
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
                  className="text-main-blue h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="heart"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                  ></path>
                </svg>
                Welkom bij Lijstje.ai
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Welkom bij Lijstje.ai, een gratis dienst waarmee gebruikers snel
                en eenvoudig verlanglijstjes kunnen maken.
              </p>
            </div>

            <div
              id="usage-section"
              className="rounded-lg border border-emerald-600/20 bg-emerald-600/10 p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg
                  className="h-4 w-4 text-emerald-500"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="circle-play"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                  ></path>
                </svg>
                Gebruik van Lijstje.ai
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                U kunt de dienst kosteloos gebruiken zonder account. Optioneel
                kunt u via e-mail een bewerk-link ontvangen. Verlanglijstjes
                worden na 6 maanden automatisch verwijderd.
              </p>
            </div>

            <div className="bg-main-red/10 border-main-red/20 rounded-lg border p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg
                  className="text-main-red h-5 w-5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="link"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
                  ></path>
                </svg>
                Affiliate links
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Op Lijstje.ai worden affiliate links geplaatst, onder andere
                naar Bol.com. Wij ontvangen commissie als u via deze links een
                aankoop doet binnen 5 dagen na aanklikken. Dit beïnvloedt de
                prijs van uw aankoop niet. Wij zijn niet verantwoordelijk voor
                de werking of levering van producten via externe websites.
              </p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg
                  className="h-4.5 w-4.5 text-orange-600"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="triangle-exclamation"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                  ></path>
                </svg>
                Beperkingen van gebruik
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                U mag de dienst niet gebruiken voor illegale activiteiten of
                spam. Misbruik resulteert in blokkering van toegang.
              </p>
            </div>

            <div className="border-lightgray rounded-lg border bg-gray-100 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg
                  className="h-4.5 w-4.5 text-gray-600"
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
                Aansprakelijkheid
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Wij streven naar een goed functionerend platform, maar kunnen
                geen volledige foutloosheid garanderen. Lijstje.ai is niet
                aansprakelijk voor schade voortvloeiend uit het gebruik van de
                dienst of externe links.
              </p>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg
                  className="h-4.5 w-4.5 text-purple-600"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="pen-to-square"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                  ></path>
                </svg>
                Wijzigingen
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Wij behouden ons het recht voor om deze voorwaarden en het
                privacybeleid aan te passen. Wijzigingen worden gepubliceerd op
                deze pagina&#39;s.
              </p>
            </div>

            <div
              id="law-section"
              className="rounded-lg border border-blue-200 bg-blue-50 p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg
                  className="h-4.5 w-4.5 text-blue-600"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="gavel"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z"
                  ></path>
                </svg>
                Toepasselijk recht
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Op deze website en de dienst van Lijstje.ai is Nederlands recht
                van toepassing. Eventuele geschillen worden voorgelegd aan de
                rechtbank Den Haag.
              </p>
            </div>
          </div>

          <div className="bg-main-blue/10 border-main-blue/20 rounded-lg border p-4">
            <div className="flex items-start space-x-3">
              <svg
                className="text-main-blue h-4.5 w-4.5"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="envelope"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                ></path>
              </svg>

              <div>
                <h3 className="text-main-blue mb-1 font-semibold">Vragen?</h3>
                <p className="text-sm text-gray-600">
                  Neem contact op via{" "}
                  <a
                    href="mailto:info@lijstje.ai"
                    target="_blank"
                    className="text-main-blue cursor-pointer underline"
                  >
                    info@lijstje.ai
                  </a>
                  .
                </p>
              </div>
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
