export const WishlistHeader = () => {
  return (
    <header className="border-lightgray sticky top-0 z-50 border-b bg-gray-50/70 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <span className="text-main-red cursor-pointer text-2xl font-bold">
            lijstje<span className="text-main-blue">.ai</span>
          </span>
        </div>
      </div>
    </header>
  );
};
