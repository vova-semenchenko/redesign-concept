# Каталог скілів репо

> Оновлено: 2026-07-30. Джерело: `.agents/skills/` (проєктні, симлінки в
> `.claude/skills/`) та плагін superpowers v6.2.0. Колонка «Роль у
> пайплайні» — за спекою
> [`specs/2026-07-30-ui-subagent-pipeline-design.md`](specs/2026-07-30-ui-subagent-pipeline-design.md).

## Проєктні скіли (`.agents/skills/`)

| Скіл | Що робить | Режим | Виклик | Роль у пайплайні |
|------|-----------|-------|--------|------------------|
| `vercel-react-best-practices` | 70 правил React/Next-перформансу у 8 категоріях, по файлу на правило (lazy-load) | advisory | авто | frontend-implementer (при написанні), ui-qa (лінза ревʼю), plan-challenger (tech-лінза) |
| `shadcn` | Управління shadcn/ui: додавання/пошук/фікс компонентів, правила стилізації й композиції | write | авто (модельний) | frontend-implementer |
| `pick-ui-library` | Довідник вибору бібліотек (motion, cmdk, Sonner, zustand…); спершу перевіряє `package.json` | advisory | лише явно | frontend-implementer (при потребі нової залежності) |
| `emil-design-eng` | Філософія UI-полішу Emil Kowalski: анімаційні рішення, компонентні правила, чекліст ревʼю | advisory | авто | frontend-implementer (поліш) |
| `apple-design` | Apple-принципи fluid interfaces для вебу: жести, springs, interruptibility, reduced-motion | advisory | авто | frontend-implementer (motion/жести) |
| `review-animations` | Diff-ревʼю motion проти 10 стандартів; вердикт Block/Approve з `file:line` | read-only | лише явно | ui-qa (стандарт motion-перевірки) |
| `find-animation-opportunities` | Шукає місця, де motion відсутній, але доречний; ≤5–7 пропозицій + відхилені | read-only | авто | поза пайплайном, за запитом |
| `improve-animations` | Аудит motion (сам фан-аутить read-only сабагентів) → пронумеровані плани в `plans/` | read-only (пише лише плани) | авто | поза пайплайном, за запитом |
| `animation-vocabulary` | Глосарій ~120 термінів motion: опис ефекту → точна назва | advisory | авто | довідка за потреби |
| `impeccable` | Дизайн-директорський фреймворк, 24 підкоманди (critique, audit, polish, live…); **2.9М, write-capable, ставить хуки** | write | явно (меню) | точково з головного лупа; не в сабагентах |
| `prototype` | 3–5 справді різних варіантів одного UI за візуальним пікером; продакшн не чіпає до промоуту | write (пісочниця) | лише явно | етап 0/2 для дивергенції дизайну, за запитом |
| `migrate-radix-to-base` | Механічна міграція Radix UI → Base UI («golden pair», three-way merge) | write | авто | поза пайплайном |
| `grill-me` | Стаб «Run a `/grilling` session» — безжальне інтерв'ю для загострення плану; команди `/grilling` в репо немає | interactive | лише явно | етап 0, альтернатива/доповнення brainstorming |

## Superpowers (плагін, v6.2.0)

| Скіл | Що робить | Роль у пайплайні |
|------|-----------|------------------|
| `brainstorming` | Діалог → затверджена дизайн-спека в `docs/superpowers/specs/`; hard-gate: без коду до затвердження | етап 0 (веде головний агент) |
| `writing-plans` | Спека → покроковий план у `docs/superpowers/plans/` (bite-sized задачі, без плейсхолдерів) | етап 1 |
| `subagent-driven-development` | Виконання плану: бриф → імплементатор → ревʼю → fix-цикл (≤5 раундів) → фінальне ревʼю; артефакти файлами | етап 3 (скелет; шов імплементатора → frontend-implementer) |
| `executing-plans` | Інлайн-виконання плану без сабагентів | запасний варіант етапу 3 |
| `dispatching-parallel-agents` | Патерн фан-ауту незалежних задач | етапи 2 (challenge-панель) і 4 (QA) |
| `requesting-code-review` | Диспатч ревʼюера за шаблоном `code-reviewer.md` | етапи 3–4 (штатне код-ревʼю) |
| `receiving-code-review` | Дисципліна прийому ревʼю: верифікація перед імплементацією, без запобігання | обробка знахідок у fix-циклах |
| `test-driven-development` | RED-GREEN-REFACTOR; без тесту немає продакшн-коду | обмежено: прототип верстки без юніт-тестів (спека сетапу §8) |
| `verification-before-completion` | Жодних заяв «готово» без свіжого доказу командою | етап 6 + правило для всіх звітів сабагентів |
| `using-git-worktrees` | Ізольований воркспейс (нативні тули → git fallback) | старт етапу 3 |
| `finishing-a-development-branch` | Тести → меню інтеграції → прибирання | етап 6 (інтеграція лише за явним запитом) |
| `writing-skills` | TDD для скілів: baseline → SKILL.md → перевірка тиском | створення/правка дефініцій агентів і скілів системи |
| `systematic-debugging` | Фазовий пошук кореневої причини перед фіксом | будь-який баг у ході етапів 3–5 |
| `using-superpowers` | Бутстрап: перевіряй скіли перед будь-якою дією | загальне правило сесії |

## Нюанси, які легко забути

- `.claude/` і `.agents/` — у `.gitignore`: скіли й майбутні агенти
  **local-only**, у репо їх не видно. Джерело правди про систему — спека.
- `impeccable` існує у двох копіях (`.agents/` — Codex-варіант,
  `.claude/` — Claude-варіант) — при оновленні синхронізувати обидві.
- Скіли з `disable-model-invocation: true` (grill-me, pick-ui-library,
  prototype, review-animations) самі не тригеряться — лише явний виклик.
- Хуки impeccable у `.claude/settings.local.json` спрацьовують на кожен
  Edit/Write UI-файлів — враховувати в очікуваннях від етапу 3.
