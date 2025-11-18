import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

export const PageLoader = () => {
  return (
    <div className="-mt-16 flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex items-center justify-center gap-2 text-zinc-600">
        <Ring size={20} stroke={2.3} color="#52525c" />
        <span>Laden...</span>
      </div>
    </div>
  );
};
