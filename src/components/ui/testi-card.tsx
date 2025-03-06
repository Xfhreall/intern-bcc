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
    <div className="w-[520px] py-10 px-14 bg-white rounded-xl border shadow-xl mx-4 grid">
      <p className="text-gray-600 mb-6 min-h-[80px]">{text}</p>

      <div className="flex items-center gap-3">
        <Image
          alt={author}
          className="object-cover w-10 h-10 rounded-full"
          height={40}
          src={avatarUrl?.src || ""}
          width={40}
        />
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
