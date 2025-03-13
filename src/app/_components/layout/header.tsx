"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/quiz", label: "Quiz" },
    { href: "/config", label: "Configurator" },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="fixed bg-blue-600 text-white"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="text-xl font-bold text-inherit">
            EduFaces
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href}>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="text-white hover:text-gray-200"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {navItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item.label}-${index}`}
            isActive={pathname === item.href}
          >
            <Link
              className="w-full text-black hover:text-gray-800"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
