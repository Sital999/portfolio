"use client";

import AboutMe from "@components/AboutMe";
import Footer from "@components/Footer";
import Header from "@components/Header";
import HomePageWrapper from "@components/HOC/HomePageWrapper";
import Introduction from "@components/Introduction";
import Projects from "@components/Projects";
import TechStack from "@components/Techstack";
import { themeAtom } from "@store/theme";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function Home() {
  const [, setTheme] = useAtom(themeAtom);
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
      setTheme({ darkMode });
    }
  }, []);
  return (
    <HomePageWrapper>
      <Header />
      <Introduction />
      <TechStack />
      <AboutMe />
      <Projects />
      <Footer />
    </HomePageWrapper>
  );
}
