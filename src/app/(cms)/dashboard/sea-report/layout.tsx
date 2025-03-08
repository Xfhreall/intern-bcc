import { Metadata } from "next";

type LayoutProps = {
    children: React.ReactNode;
};

export const generateMetadata = (): Metadata => {
    return {
        title: "Sea Report",
        description: "Sea Report pages",
    };
};

export default function Layout({ children }: LayoutProps) {
    return <>{children}</>;
}
