/**
 * DIRECTION CONTRACT — «The Drafting Table»
 *
 * THESIS. The page is the engineering drawing of a payment system, not a
 * brochure about one. It refuses the fintech-SaaS arrangement: gradient hero,
 * abstract orb, three icon cards, logo strip.
 *
 * OWN-WORLD. Two grounds — paper white and navy engine room — alternating as
 * full-bleed bands with hard hairline edges. Visible 12-column rules, every
 * third dashed. One saturated ultramarine, under 5% of any viewport. Display
 * type against 11px annotation, nothing in between. One isometric projection
 * for every drawn object. No shadows, square corners, one pill.
 *
 * STORY. A Head of Payments sees a team that lives inside regulated rails,
 * reads banking-first with crypto as the edge, and describes their challenge.
 *
 * FIRST VIEWPORT. Light band. Display H1 left at 5.5rem over the ruled grid;
 * the sub as one hairline-separated line; the primary pill directly beneath —
 * the only accent in the screen. Right two thirds: the payment schematic held
 * in a fixed isometric pose. Trust metrics close the band as a ruled footer.
 *
 * FORM. User-pinned, which beats the roll (seed 7bdc14f4 had assigned the
 * third grounded direction, Clearing Window). Staging: dissection plate —
 * the schematic holds its pose while layers peel to a lettered margin key.
 */
import { AiLayer } from "@/components/sections/ai-layer";
import { Approach } from "@/components/sections/approach";
import { Band, Container } from "@/components/ui/band";
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
import { homeContent } from "@/content/home";

/**
 * СТРУКТУРА СТОРІНКИ
 *
 * Бриф §6 називає свій перелік із дванадцяти блоків «рекомендованим базовим
 * потоком», який дизайнер може запропонувати змінити. Тут він перескладений
 * у вісім смуг. Увесь мандатний вміст лишається на місці — змінюються межі
 * блоків і ритм:
 *
 *  1. Hero        paper    ← сюди вбудовано trust-метрики (були окремою смугою)
 *  2. Positioning engine    один абзац, розділ-перелом
 *  3. Expertise   paper
 *  4. Solutions   engine
 *  5. Work        quiet
 *  6. AI layer    engine
 *  7. Why us      paper
 *  8. Close       engine   ← команда, insights, форма й футер як один темний фінал
 *
 * Дві структурні зміни й підстави до них:
 *
 * — Trust-смуга злита з hero. Два майже однакові набори тих самих чотирьох
 *   цифр підряд читалися як повтор, а не як доказ; метрики тепер закривають
 *   смугу hero підвальним правилом.
 * — Team, Insights і фінальний CTA зведені в один темний фінал. Обидва тизери
 *   мають лише заголовок і опис (контенту клієнт не надав), і окремими
 *   смугами вони провалювалися б порожнечею. Разом вони дають фінальний рух
 *   сторінки, а ґрунти при цьому чергуються без жодного повтору.
 */
export default function Home() {
  return (
    <div id="top">
      <Header nav={homeContent.nav} />

      <main>
        <Band ground="paper" seamless>
          <Hero
            hero={homeContent.hero}
            trustNote={homeContent.trust.certificationsNote}
          />
        </Band>

        <Band ground="engine">
          <PositioningBand text={homeContent.positioningBand} />
        </Band>

        <Band ground="paper" id="expertise">
          <ExpertiseGrid expertise={homeContent.expertise} />
        </Band>

        <Band ground="engine" id="solutions">
          <SolutionsShowcase solutions={homeContent.solutions} />
        </Band>

        <Band ground="quiet" id="work">
          <SelectedWork work={homeContent.selectedWork} />
        </Band>

        <Band ground="engine">
          <AiLayer ai={homeContent.aiLayer} />
        </Band>

        <Band ground="paper">
          <Approach approach={homeContent.approach} />
        </Band>

        {/* Фінальний рух: чотири блоки на спільному темному ґрунті,
            розділені внутрішніми правилами замість зміни зони. */}
        <Band ground="engine">
          <Container>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              <div id="team" className="scroll-mt-24">
                <TeamTeaser team={homeContent.team} />
              </div>
              <div
                id="insights"
                className="scroll-mt-24 border-t border-rule pt-16 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12"
              >
                <InsightsTeaser insights={homeContent.insights} />
              </div>
            </div>

            <div className="mt-24 border-t border-rule pt-24">
              <FinalCta cta={homeContent.finalCta} />
            </div>

            <div className="mt-24">
              <Footer nav={homeContent.nav} />
            </div>
          </Container>
        </Band>
      </main>
    </div>
  );
}
