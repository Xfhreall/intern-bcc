"use client";

import { useState, useEffect } from "react";

export const useNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos <= 10) {
        setVisible(true);
        setPrevScrollPos(currentScrollPos);

        return;
      }

      const isScrollingDown = currentScrollPos > prevScrollPos;

      if (
        currentScrollPos > 70 &&
        Math.abs(currentScrollPos - prevScrollPos) > 10
      ) {
        setVisible(!isScrollingDown);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return {
    isOpen,
    visible,
    toggleSidebar,
    closeSidebar,
  };
};
