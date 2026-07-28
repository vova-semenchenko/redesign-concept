import { AiLayer } from "@/components/sections/ai-layer";
import { Approach } from "@/components/sections/approach";
import { ExpertiseGrid } from "@/components/sections/expertise-grid";
import { FinalCta } from "@/components/sections/final-cta";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { InsightsTeaser } from "@/components/sections/insights-teaser";
import { PositioningBand } from "@/components/sections/positioning-band";
import { SelectedWork } from "@/components/sections/selected-work";
import { SolutionsShowcase } from "@/components/sections/solutions-showcase";
import { TeamTeaser } from "@/components/sections/team-teaser";
import { TrustStrip } from "@/components/sections/trust-strip";
import { homeContent } from "@/content/home";

export default function Home() {
  return (
    <>
      <Header nav={homeContent.nav} />
      <main>
        <Hero hero={homeContent.hero} />
        <PositioningBand text={homeContent.positioningBand} />
        <TrustStrip trust={homeContent.trust} />
        <ExpertiseGrid expertise={homeContent.expertise} />
        <SolutionsShowcase solutions={homeContent.solutions} />
        <SelectedWork work={homeContent.selectedWork} />
        <AiLayer ai={homeContent.aiLayer} />
        <Approach approach={homeContent.approach} />
        <TeamTeaser team={homeContent.team} />
        <InsightsTeaser insights={homeContent.insights} />
        <FinalCta cta={homeContent.finalCta} />
      </main>
    </>
  );
}
