import { CTA } from "@/components/portfolio/CTA";
import { Expertise } from "@/components/portfolio/Expertise";
import { Footer } from "@/components/portfolio/Footer";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { InteractiveCareerTimeline } from "@/components/portfolio/InteractiveCareerTimeline";
import { LiveTechFeed } from "@/components/portfolio/LiveTechFeed";
import { Profiles } from "@/components/portfolio/Profiles";
import { SelectedWorks } from "@/components/portfolio/SelectedWorks";
import { StackGrid } from "@/components/portfolio/StackGrid";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { careerTimelineData } from "@/lib/career-timeline-data";
import { portfolioData } from "@/lib/portfolio-data";

export default function Home() {
  return (
    <CursorSpotlight className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <main className="mx-auto max-w-[1240px] px-5 pb-10 sm:px-8 lg:px-10">
        <Header data={portfolioData.header} />
        <Hero data={portfolioData.hero} />
        <Expertise data={portfolioData.expertise} />
        <StackGrid data={portfolioData.stack} />
        <SelectedWorks data={portfolioData.works} />
        <LiveTechFeed />
        <InteractiveCareerTimeline data={careerTimelineData} />
        {/* <Highlights data={portfolioData.highlights} /> */}
        {/* <Testimonials data={portfolioData.testimonials} /> */}
        <Profiles data={portfolioData.profiles} />
        <CTA data={portfolioData.cta} />
        <Footer data={portfolioData.footer} />
      </main>
    </CursorSpotlight>
  );
}
