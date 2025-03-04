import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { LogoWhite } from "@/public/icon/logo";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  return (
    <HeroUINavbar className="py-1 bg-primary" maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <LogoWhite className="w-9 h-9" />
          <NextLink className="flex items-center justify-start " href="/">
            <p className="text-2xl font-bold text-white">Nautikara</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center">
        <div className="py-2 text-white rounded-lg px-11">
          <ul className="justify-start hidden gap-12 font-normal md:flex">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink color="foreground" href={item.href}>
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="px-16 text-sm font-semibold bg-white text-primary rounded-[10px]"
            href="/login"
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
