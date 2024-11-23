"use client";

import AboutMe from "@components/AboutMe";
import Header from "@components/Header";
import HomePageWrapper from "@components/HOC/HomePageWrapper";
import Introduction from "@components/Introduction";
import TechStack from "@components/Techstack";

export default function Home() {
  return (
    <HomePageWrapper className="h-full w-full flex flex-col gap-10">
      <Header />
      <Introduction />
      <TechStack />
      <AboutMe />
    </HomePageWrapper>
  );
}
