// const questions = [
//   {
//     id: 1, 
//     title: "AI cadeau suggesties",
//     description: " Krijg slimme cadeautips gebaseerd op leeftijd, interesses en budget.",
//     iconColor: "",
//     iconBackgroundColor: "",
//     icon: "",
//   },
//   {
//     id: 2, 
//     title: "AI cadeau suggesties",
//     description: "",
//     iconColor: "",
//     iconBackgroundColor: "",
//     icon: "",
//   },
//   {
//     id: 3, 
//     title: "AI cadeau suggesties",
//     description: "",
//     iconColor: "",
//     iconBackgroundColor: "",
//     icon: "",
//   },
// ];

export const WhySection = () => {
  return (
    <section id="features-section" className="px-6 py-10">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Waarom lijstje.ai?
      </h2>

      <div className="mx-auto grid max-w-md grid-cols-1 gap-6">
        <div className="border-lightgray flex items-start rounded-xl border bg-white p-5 shadow-sm">
          <div className="bg-secondary mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
            <i className="text-secondary text-xl" data-fa-i2svg="">
              <svg
                className="svg-inline--fa fa-robot"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="robot"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"
                ></path>
              </svg>
            </i>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">AI cadeau suggesties</h3>
            <p className="text-gray-600">
              Krijg slimme cadeautips gebaseerd op leeftijd, interesses en
              budget.
            </p>
          </div>
        </div>

        <div className="border-lightgray flex items-start rounded-xl border bg-white p-5 shadow-sm">
          <div className="bg-secondary mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
            <i className="text-primary text-xl" data-fa-i2svg="">
              <svg
                className="svg-inline--fa fa-user-slash"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="user-slash"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L353.3 251.6C407.9 237 448 187.2 448 128C448 57.3 390.7 0 320 0C250.2 0 193.5 55.8 192 125.2L38.8 5.1zM264.3 304.3C170.5 309.4 96 387.2 96 482.3c0 16.4 13.3 29.7 29.7 29.7H514.3c3.9 0 7.6-.7 11-2.1l-261-205.6z"
                ></path>
              </svg>
            </i>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">Geen account nodig</h3>
            <p className="text-gray-600">
              Direct beginnen zonder registratie of inloggen, vlot en
              gemakkelijk.
            </p>
          </div>
        </div>

        <div className="border-lightgray flex items-start rounded-xl border bg-white p-5 shadow-sm">
          <div className="bg-secondary mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
            <i className="text-accent text-xl" data-fa-i2svg="">
              <svg
                className="svg-inline--fa fa-share-nodes"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="share-nodes"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"
                ></path>
              </svg>
            </i>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">Unieke bewerklink</h3>
            <p className="text-gray-600">
              Ontvang optioneel een bewerklink om jouw lijstje later aan te
              passen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
