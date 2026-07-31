# UAPP — редизайн uapp.group

Матеріали редизайну головної сторінки uapp.group: зміна позиціонування з «дженераліст-аутсорсу» на сфокусовану команду **regulated fintech & payments (banking-first)** з крипто-компетенцією як перевагою. Тут зібрано все, що зроблено на етапі дослідження та підготовки візуального напрямку: аудит поточного сайту, бенчмаркінг конкурентів і еталонних fintech-сайтів, UX-стратегія під нову ЦА, стильові токени за брендбуком і візуальні референси.

## З чого почати

1. **[Figma-концепт](https://www.figma.com/design/Y4hZIZjrpGokO2m0mYgYBC/UAPP-GROUP-Redesign-Concept?node-id=19-57&t=eMWeNJblJlgjnbw0-11)** — референс-сайти та зібрані приклади (ілюстрації, діаграми) в одному файлі.
2. **[Styleguide](docs/brand-style-guide.md)** — токени бренду та візуальні референси з розбором «що беремо для UAPP» (розд. 8).
3. **[Бриф](docs/task/uapp-redesign-brief.md)** — бізнес-ціль, ЦА, потік 12 блоків головної, мандатний копірайт.
4. **[Консолідований звіт дослідження](docs/research/uapp-redesign-research.md)** — TL;DR-висновки та навігація по повному ресьорчу.

## Мапа репозиторію

| Шлях | Що всередині |
|---|---|
| [`docs/task/`](docs/task/) | Бриф редизайну (ТЗ v7) + оригінальний PDF від клієнта |
| [`docs/brand-style-guide.md`](docs/brand-style-guide.md) | Стильові токени за брендбуком + семантичні пари світла/темна поверхня + візуальні референси |
| [`docs/brand-style-guide-palette.html`](docs/brand-style-guide-palette.html) | Інтерактивне превʼю палітри (відкрити в браузері) · [PNG-знімок](docs/brand-style-guide-palette.png) для швидкого перегляду без браузера |
| [`docs/design-style.md`](docs/design-style.md) | Стилістика «технічний блюпринт» (рішення дизайнера над токенами): сітка, ритм зон, типографіка, компоненти, ізометричні ілюстрації, моушн |
| [`docs/frontend-foundation.md`](docs/frontend-foundation.md) | База для сетапу frontend-проєкту: статус вхідних матеріалів, токени → код, групування секцій/компонентів, інвентар асетів, порядок денний сетап-дискусії |
| [`docs/research/`](docs/research/) | Дослідження: [звіт-індекс](docs/research/uapp-redesign-research.md) → [01 аудит сайту](docs/research/01-current-site-audit.md) · [02 візуальний бенчмаркінг](docs/research/02-visual-benchmark.md) · [03 UX-стратегія](docs/research/03-ux-audience-strategy.md) · [04 візуальна концепція](docs/research/04-visual-redesign-concept.md) · [05 бренд-гіпотези](docs/research/05-brand-strategy-hypotheses.md) |
| [`docs/research/screenshots/`](docs/research/screenshots/) | 35 скриншотів аудиту поточного сайту (докази до звіту 01) |
| [`docs/research/assets/`](docs/research/assets/) | Фінальне лого ([`logo-uapp.svg`](docs/research/assets/logo-uapp.svg) — джерело правди; копія для сайту — `uapp-site/public/`) + hero-скриншоти референс-сайтів |

> **Статус матеріалів.** Фінальні документи — Styleguide, бриф і Figma-концепт: на них можна спиратися. Нумеровані звіти 01–05 у `docs/research/` — робочі дослідницькі матеріали: аналіз, гіпотези та чернетки, на яких ґрунтуються фінальні рішення. Вони показують хід думки, але не є узгодженими рекомендаціями — зокрема стратегічні варіанти у звіті 05 потребують окремого обговорення.
