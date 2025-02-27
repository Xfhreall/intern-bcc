export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "AQUAVERSE",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "About",
      href: "/",
    },
    {
      label: "Services",
      href: "/docs",
    },
    {
      label: "Testimonial",
      href: "/pricing",
    },
    {
      label: "News",
      href: "/blog",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
