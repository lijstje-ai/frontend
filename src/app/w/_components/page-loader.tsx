import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

export const PageLoader = () => {
  return (
    <div className="p-4 -mt-16 bg-gray-50 min-h-screen flex flex-col justify-center items-center">
      <div className="flex items-center justify-center gap-2 text-zinc-600">
        <Ring size={20} stroke={2.3} color="#52525c" />
        <span>Laden...</span>
      </div>
    </div>
  )
}