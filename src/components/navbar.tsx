"use client"

import { Navbar as HeroUINavbar, NavbarContent, NavbarBrand, NavbarItem } from "@heroui/navbar"
import { Button } from "@heroui/button"
import { Link } from "@heroui/link"
import NextLink from "next/link"
import { Menu, X } from "lucide-react"

import { LogoWhite } from "@/public/icon/logo"
import { siteConfig } from "@/config/site"
import { useNavbar } from "@/hooks/useNavbar"

export const Navbar = () => {
  const { isOpen, visible, toggleSidebar, closeSidebar } = useNavbar()

  return (
    <>
      <HeroUINavbar
        className={`bg-primary fixed w-full transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
          }`}
        maxWidth="xl"
        position="sticky"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <LogoWhite className="w-9 h-9" />
            <NextLink className="flex items-center justify-start" href="/">
              <p className="text-2xl font-bold text-white">Nautikara</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="center">
          <div className="py-2 text-white px-11">
            <ul className="justify-start hidden gap-12 font-normal md:flex">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink className="transition-all duration-300 hover:font-bold" color="foreground" href={item.href}>
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          </div>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden md:flex">
            <Button as={Link} className="px-16 text-sm font-semibold bg-white text-primary rounded-[5px]" href="/login">
              Login
            </Button>
          </NavbarItem>
          <NavbarItem className="flex md:hidden">
            <button aria-label="Toggle menu" className="p-2 text-white focus:outline-none" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
          </NavbarItem>
        </NavbarContent>
      </HeroUINavbar>
      <div className="h-[72px]" />
      <span
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        role="button"
        tabIndex={0}
        onClick={toggleSidebar}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleSidebar()
          }
        }}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-screen w-64 bg-primary transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <NextLink className="flex items-center gap-2" href="/" onClick={closeSidebar}>
            <LogoWhite className="w-8 h-8" />
            <span className="text-xl font-bold text-white">Nautikara</span>
          </NextLink>
          <button aria-label="Close menu" className="p-2 text-white focus:outline-none" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="px-4 py-6">
          <ul className="flex flex-col space-y-4">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <NextLink
                  className="block py-2 text-white transition-all duration-300 hover:font-bold"
                  href={item.href}
                  onClick={closeSidebar}
                >
                  {item.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute w-full p-4 border-t bottom-2 border-white/20">
          <Button
            as={Link}
            className="w-full py-2 text-sm font-semibold bg-white text-primary rounded-[5px]"
            href="/login"
            onPress={closeSidebar}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  )
}

