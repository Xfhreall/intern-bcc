import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
  rating: number;
  avatarUrl?: string;
  colorScheme: "blue" | "green";
}

export function TestimonialCard({
  text,
  author,
  role,
  avatarUrl,
  colorScheme,
}: TestimonialCardProps) {
  return (
    <div className="w-[350px] p-6 bg-white rounded-xl border shadow-lg mx-4">
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-lg ${colorScheme === "blue" ? "bg-blue-500" : "bg-green-500"}`}
          />
        ))}
      </div>

      <p className="text-gray-600 mb-6 min-h-[80px]">{text}</p>

      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
