import NextLink from "next/link";

export const WishlistHeader = () => {
  return (
    <header className="border-lightgray sticky top-0 z-50 min-w-md border-b bg-gray-50/70 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <NextLink href="/" className="flex items-center">
          <span className="text-main-red cursor-pointer text-2xl font-bold">
            lijstje<span className="text-main-blue">.ai</span>
          </span>
        </NextLink>
      </div>
    </header>
  );
};
