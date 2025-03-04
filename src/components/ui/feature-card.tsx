import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconProps } from "@/public/icon/aboutIcon";

interface FeatureCardProps {
  icon: React.FC<IconProps>;
  title: string;
  description: string;
  iconColor: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="flex flex-col shadow-lg h-[302px]">
      <CardHeader>
        <Icon classname="w-10 h-10" />
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <h4 className="text-lg font-bold line-clamp-2">{title}</h4>
        <p className="font-light text-md">{description}</p>
      </CardContent>
    </Card>
  );
}
