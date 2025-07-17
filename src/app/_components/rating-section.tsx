import Image from "next/image";

import { RatingStars } from "@/components";
import { Check } from "lucide-react";

export const RatingSection = () => {
  return (
    <div className="w-full">
      <div className="border-lightgray border-t border-b bg-white px-6 py-6 shadow-sm">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex -space-x-3">
            <Image
              className="h-10 w-10 rounded-full border-2 border-white ring-2 ring-blue-600"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0b1f2360fa-a2329c80384397c1e20b.png"
              alt="happy mother with young child both smiling warmly, family portrait, professional photo style"
              width={40}
              height={40}
            />
            <Image
              className="h-10 w-10 rounded-full border-2 border-white ring-2 ring-blue-600"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4f6f625068-fadab581aaea5ef05e9d.png"
              alt="cheerful woman in her 30s smiling alone, friendly portrait, warm lighting"
              width={40}
              height={40}
            />
            <Image
              className="h-10 w-10 rounded-full border-2 border-white ring-2 ring-blue-600"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4b9d7e5810-c517ffb1adace45c636d.png"
              alt="joyful mom holding toddler both laughing together, family photo, natural lighting"
              width={40}
              height={40}
            />
            <Image
              className="h-10 w-10 rounded-full border-2 border-white ring-2 ring-blue-600"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6abdfc26f0-9fcecb90432b6931ed93.png"
              alt="happy woman portrait smiling brightly, 30s age, professional photo style"
              width={40}
              height={40}
            />
          </div>
          <div className="flex flex-col text-sm">
            <RatingStars rating={5} />
            <div className="flex items-center gap-1">
              <Check size={15} strokeWidth={2.5} className="text-emerald-600" />
              <span className="text-sm font-semibold text-gray-600">
                100.000+ &nbsp;gebruikers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
