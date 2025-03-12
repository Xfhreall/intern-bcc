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
    <Card className="flex flex-col justify-center py-8 shadow-lg aspect-square sm:py-0 hover:shadow-xl duration-250">
      <CardHeader className="py-2 sm:py-6">
        <Icon classname="size-6 sm:size-10" />
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <h4 className="text-sm font-bold sm:text-lg line-clamp-2">{title}</h4>
        <p className="hidden font-light text-md sm:block">{description}</p>
      </CardContent>
    </Card>
  );
}
