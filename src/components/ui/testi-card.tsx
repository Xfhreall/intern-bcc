import Image, { StaticImageData } from "next/image";

interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
  rating: number;
  avatarUrl?: StaticImageData;
}

export function TestimonialCard({
  text,
  author,
  role,
  avatarUrl,
}: TestimonialCardProps) {
  return (
    <div className="w-[320px] h-[169px] sm:w-[520px] sm:h-full py-8 sm:py-10 px-5 sm:px-14 bg-white rounded-xl border shadow-xl mx-4 grid">
      <p className="text-gray-600 mb-3 sm:mb-6 h-full sm:min-h-[80px] text-xs sm:text-base">{text}</p>

      <div className="flex items-center gap-3">
        <Image
          alt={author}
          className="object-cover rounded-full size-6 sm:size-10"
          height={40}
          src={avatarUrl?.src || ""}
          width={40}
        />
        <div>
          <p className="text-xs font-semibold sm:text-base">{author}</p>
          <p className="text-xs text-gray-500 sm:text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}
