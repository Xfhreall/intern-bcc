import { StaticImageData } from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
  rating: number;
  avatarUrl?: StaticImageData;
  colorScheme: string;
}

export function TestimonialCard({
  text,
  author,
  role,
  avatarUrl,
  colorScheme,
}: TestimonialCardProps) {
  return (
    <div className="w-[350px] p-6 bg-white rounded-xl border shadow-lg mx-4 grid">
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`w-5 h-5 rounded-md ${colorScheme}`} />
        ))}
      </div>

      <p className="text-gray-600 mb-6 min-h-[80px]">{text}</p>

      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={avatarUrl?.src} />
        </Avatar>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
