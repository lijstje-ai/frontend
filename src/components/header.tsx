import { useScrollToElement } from "@/hooks";

export const Header = () => {
  const { scrollToElement } = useScrollToElement();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center text-2xl font-bold">
          <span className="text-main-red">lijstje</span>
          <span className="text-main-blue">.ai</span>
        </div>

        <nav>
          <button
            onClick={() => scrollToElement("howItWorksBox")}
            className="hover:text-primary cursor-pointer text-gray-700 transition"
          >
            Hoe werkt het?
          </button>
        </nav>
      </div>
    </header>
  );
};
