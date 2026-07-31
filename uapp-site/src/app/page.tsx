/**
 * DIRECTION CONTRACT — home page
 *
 * THESIS: the page is an engineering drawing of the company, not a brochure
 * about it. It refuses the fintech default of a centred claim over a soft
 * gradient and a grid of icon cards.
 * OWN-WORLD: navy ink zones and cool paper zones with hard edges; six visible
 * construction lines running through every zone; hairlines instead of spacing;
 * 11px tracked markers; one rationed ultramarine on the pill action and small
 * indicators; no shadow, gradient or radius above 2px.
 * STORY: a payments decision-maker sees the two shores and the numbers in the
 * first screen, walks down domains → products → engagements → AI → team, and
 * acts on the same one action repeated in every zone.
 * FIRST VIEWPORT: ink zone; marker, then the mandated H1 at display scale over
 * columns 3–10; sub and the ultramarine pill on the left, the fiat ↔ chain
 * schematic on the right; four metrics on a ruled row under a hairline.
 * FORM: brief-pinned technical blueprint (client reference: doss.com structure,
 * UAPP palette). No concept seed was rolled — a pinned direction beats the roll.
 */

import { AiLayer } from "@/components/sections/ai-layer";
import { Approach } from "@/components/sections/approach";
import { CtaStrip } from "@/components/sections/cta-strip";
import { ExpertiseGrid } from "@/components/sections/expertise-grid";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
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
        <TrustStrip trust={homeContent.trust} />
        <PositioningBand band={homeContent.positioningBand} />
        <ExpertiseGrid expertise={homeContent.expertise} />
        <CtaStrip cta={homeContent.ctaStrip} tone="paper" />
        <SolutionsShowcase solutions={homeContent.solutions} />
        <SelectedWork work={homeContent.selectedWork} />
        <AiLayer ai={homeContent.aiLayer} />
        <Approach approach={homeContent.approach} cta={homeContent.ctaStrip} />
        <TeamTeaser team={homeContent.team} />
        <InsightsTeaser insights={homeContent.insights} />
        <FinalCta cta={homeContent.finalCta} />
      </main>
      <Footer footer={homeContent.footer} />
    </>
  );
}
