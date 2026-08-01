# Інформаційна архітектура головної — текст по блоках (пропозиція)

Статус: **пропозиція після UX-copy аудиту**, не текст прототипу. Для мандатних блоків
(бриф §8) це «записана окремо пропозиція» в сенсі `voice-and-tone.md` §0 — у прототип
такі правки потрапляють лише після погодження з клієнтом; зведений список того, що
потребує погодження, — у §14. Editable- і free-блоки можна переносити в
`uapp-site/src/content/home.ts` без додаткових погоджень.

Джерела: [бриф](raw-briefs/uapp-redesign-brief.md) (§6 потік, §8 мандатний копірайт),
[voice-and-tone.md](voice-and-tone.md), PDF-брифи продуктів
(`raw-briefs/brief-product-1.pdf` … `brief-product-4.pdf`), поточний корпус
`uapp-site/src/content/home.ts` + рядки в компонентах.

Мова копірайту — US English (мандат брифу §1). Анотації — українською.

---

## 0. Потік сторінки і покриття брифу

Порядок смуг — як у прототипі (8 смуг, перекомпоноване з 12 блоків брифу §6;
бриф дозволяє змінювати порядок і склад):

| # | Смуга | Блоки брифу §6, які вона закриває | Рівень свободи тексту |
|---|---|---|---|
| 1 | Hero + trust-метрики | 1 Header · 2 Hero · 4 Trust | мандатний |
| 2 | Positioning band | 3 | мандатний (verbatim) |
| 3 | Expertise | 5 | мандатний |
| 4 | Solutions | 6 | **editable** (у брифі «draft, editable») |
| 5 | Selected work | 7 | мандатний |
| 6 | AI across every layer | 8 | мандатний statement |
| 7 | Why us | 9 | мандатний |
| 8 | Team · Insights · Final CTA · Footer | 10 · 11 · 12 | вільний (структурні вимоги: без FE/BE) |

**Звірка з брифом §8 — усе враховано:**

- [x] Hero: H1 (перший рекомендований варіант), sub, CTA "Describe your challenge", 4 метрики
- [x] Positioning band — verbatim
- [x] Expertise — 4 картки (Fintech & Payments · Compliance & AML · Security · Crypto & Web3)
- [x] Solutions — 4 продукти, Embedded Crypto — флагман (не заголовок сайту)
- [x] Selected work — усі 6 анонімних кейсів, NDA-бейдж
- [x] AI across every layer — мандатний statement
- [x] Approach / Why us — 3 пілари
- [x] Team без поділу FE/BE, Insights, форма
- [ ] Партнери/логотипи trust-смуги — **відкрите питання брифу §11.4** (дозволів немає; не вигадуємо)
- [ ] Перелік AI-сертифікацій — **відкрите питання брифу §11.2** (клієнт не надав; блок виходить без цього рядка — див. §6)

---

## 1. Header

Рівень: вільний. Без змін — працює.

| Елемент | Текст |
|---|---|
| Навігація | Expertise · Solutions · Selected work · Team · Insights |
| Sticky CTA | Describe your challenge |
| Мобільне меню | Menu / Close |
| Skip-link (**додати**, зараз відсутній — WCAG 2.4.1) | Skip to main content |

## 2. Hero

Рівень: мандатний. H1 і метрики — без змін; **sub скорочено** (потребує погодження, §14).

```
H1:            Engineering for regulated finance.

Sub:           We design and ship payment rails, card programs and core banking
               integrations — with deep crypto and on-chain engineering where it counts.

CTA primary:   Describe your challenge
CTA secondary: See our work

Metrics:       8+ years in regulated finance · 170+ projects delivered ·
               15 countries · $1B+ in clients' annual revenue

Trust note:    Security documentation available under NDA.
```

Що змінено і чому:

- **Вилучено друге речення sub** — "Banks and fintechs have trusted us across 170+
  projects in 15 countries." Ті самі 170+ і 15 стоять у рядку метрик на тому ж екрані;
  цифра, повторена двічі поспіль, читається як прийом, а не як факт (voice §1:
  «метрика без коментаря сильніша»). Зміст мандату збережено — носієм цифр лишається
  мандатний рядок метрик.
- "expertise" → "engineering" у sub: дієслівніша мова, і слово "expertise" звільняється
  для однойменного розділу нижче.
- Підписи схеми в hero-візуалі (margin key): `A — ISO 20022 rails · B — Card programs ·
  C — Compliance · D — On-chain settlement`. Було "Payment" і "On-chain" — вирівняно
  з переліком у sub (rails / card programs / on-chain). Опційно, LOW.

## 3. Positioning band

Рівень: мандатний, verbatim. **Без змін** — це єдине місце образності, і воно вже в мандаті.

```
Banking first, crypto where you need it. Eight years in regulated finance —
ISO 20022, cards, SEPA, reconciliation and bank-grade security — and just as
deeply in wallets, exchanges and on-chain compliance. One team, both sides.
```

Конвенція чисел (зафіксовано): у прозі — словами ("Eight years"), у метриках — цифрами
("8+"). Це не розбіжність, а прийнятий формат.

## 4. Expertise

Рівень: мандатний. Дві картки без змін, дві — точкові правки проти повторів (§14).

| Картка | Опис | Теги |
|---|---|---|
| Fintech & Payments | Payment rails, card programs and core banking integrations built to bank-grade standards. | ISO 20022 · SEPA Instant · Card tokenization |
| Compliance & AML | KYC/AML flows, transaction monitoring and regulatory reporting designed in from day one. | PSD2 / SCA · AML / KYC · Regulatory reporting |
| Security | Security architecture, audit readiness and secure delivery across the stack. | Secure SDLC · Audit readiness · On-device cryptography |
| Crypto & Web3 | Wallets, exchanges and on-chain compliance — built with the same discipline as our banking work. | Multi-chain wallets · On-chain compliance · Settlement webhooks |

Що змінено і чому:

- **Security:** прибрано "Bank-grade" з початку — "bank-grade" уже стоїть у сусідній
  картці Fintech & Payments і в positioning band над розділом; тричі на одному розвороті
  термін стирається. Там, де він лишився, він має об'єкт.
- **Crypto & Web3:** хвіст "deep crypto competence where you need it" дослівно повторював
  positioning band ("crypto where you need it"). Замінено на "built with the same
  discipline as our banking work" — та сама суть («один рівень інженерії по обидва
  береги») без повтору фрази-диференціатора.

## 5. Solutions — продукти

Рівень: **editable** (бриф §8 позначає блок "draft"). Переписано повністю з PDF-брифів
продуктів №1–4. Порядок — за готовністю: два «робимо зараз», готовий SDK, перспективний
агент наприкінці зі статусом "In development" (показувати його як доступний — нечесно).

Формат картки: title · статусна мітка · audience (для кого) · body ≤ 40 слів ·
3 proof-теги. Body відповідає полю `problem` у `home.ts`; статуси й теги потребують
розширення типу картки.

### 5.1 Embedded Crypto for Banks — `Flagship`

```
Audience: For banks and EMIs adding regulated crypto services

Body:     Buy, sell and custody inside your banking app, on top of a regulated
          provider. UAPP runs the orchestration, reconciliation and audit
          layer — licenses and keys stay with the provider, control stays
          with the bank.

Proofs:   Orchestration & settlement webhooks · Reconciliation workers ·
          MiCA-aware audit trail
```

- Ключова теза PDF №1: ми — не провайдер і не конкуруємо за ліцензії, ми оркестраційний
  + звірочний + аудит-шар. Стара картка ("without building the infrastructure yourself")
  цього не казала — тепер розмежування "provider / layer" явне.
- Імена провайдерів (Bitpanda Enterprise, Fireblocks) у публічний текст **не внесено** —
  потрібен дозвіл клієнта на публічне згадування партнерств (§14). Якщо дозвіл є,
  proof-тег: "Bitpanda Enterprise & Fireblocks integrations".
- Дати MiCA-дедлайнів на сайт не виносимо: дедлайн 01.07.2026 уже минув, і на сторінці
  дата постаріє. "MiCA-aware" — стабільне формулювання з PDF.

### 5.2 ISO 20022 Toolkit

```
Audience: For banks and PSPs migrating to ISO 20022

Body:     Validate, translate and sign payment messages — one engine behind a
          real-time API, batch processing and a web tool. Covers MT→MX
          translation where SWIFT doesn't, and structures addresses ahead of
          the November 2026 deadline.

Proofs:   pacs · camt · pain schema validation · MT↔MX translation ·
          Stateless — messages aren't stored
```

- З PDF №2: три режими (Instant API / Batch / Web-tool), покриття там, де SWIFT не
  транслює (camt.105/106, pain.008), remediation адрес під дедлайн 14.11.2026.
- Дедлайн адрес лишаємо: він у майбутньому і є реальним драйвером inbound-трафіку
  (роль продукту — SEO-магніт). Після 11.2026 рядок треба буде оновити.
- "Stateless — messages aren't stored" — головний аргумент довіри для банку, з базових
  вимог PDF.

### 5.3 SCA / Transaction-Signing SDK

```
Audience: For banks and fintechs replacing SMS OTP

Body:     Push, transaction details, biometrics — then an ECDSA signature in
          the phone's secure hardware. The key never leaves the device, and
          each signature binds amount and payee, as PSD2 dynamic linking
          requires. An SDK for your existing iOS and Android apps.

Proofs:   Secure Enclave / StrongBox · Dynamic linking (PSD2) ·
          Root & tamper detection
```

- З PDF №3: «approve-on-phone» флоу, ключ не залишає пристрій, dynamic linking,
  цілісність пристрою. Роль — пруф безпеки («нам можна довірити гроші»).
- Стара картка ("Sign transactions on-device to meet SCA requirements without hurting
  UX") називала механізм без доказів; нова показує сам флоу і апаратний рівень.
- "without hurting UX" вилучено — неперевірюване твердження (voice §1: прикметник або
  доводиться сусіднім фактом, або видаляється).

### 5.4 Bank–Crypto Reconciliation Agent — `In development`

```
Audience: For teams operating across fiat and on-chain ledgers

Body:     Matches transactions across bank core, crypto provider, chain and
          internal ledgers; investigates each break and drafts the correcting
          entry. A human approves every correction — with a full audit trail.

Proofs:   Multi-source matching · Human-in-the-loop by design ·
          On-chain counterparty screening
```

- З PDF №4 — з урахуванням його «червоних прапорців»: продавати **вузький HITL-асистент
  скорочення часу звірки, не «повну автономність»**. Тому «A human approves every
  correction» стоїть у тілі картки, а не в дрібному шрифті, і старе "automatically"
  з поточної картки прибрано.
- Статус "In development": продукт у категорії «перспективні» (18–36 міс); показ без
  статусу означав би продаж неіснуючого.
- Chainalysis/Elliptic/TRM у публічний текст не виносимо до погодження (це інтеграції,
  не партнерства, але правило те саме — §14).

## 6. AI across every layer

Рівень: мандатний statement. Statement без змін; **службовий рядок — прибрати з UI**.

```
Heading:   AI across every layer

Statement: AI runs through how we work — from AI-assisted discovery and
           design-to-code to AI-augmented QA, and into the products we
           build for you.
```

- **BLOCKER поточного прототипу:** рядок "Team AI certifications — list to be provided
  by the client." — це примітка з ТЗ, яка витекла в інтерфейс. Прибрати з рендеру.
  Слот під сертифікації лишається в макеті порожнім до отримання переліку
  (відкрите питання брифу §11.2); плейсхолдер користувачу не показуємо.

## 7. Approach / Why us

Рівень: мандатний (3 пілари). Один пілар переформульовано (§14), два — без змін.

| Пілар | Опис |
|---|---|
| Both sides of the bridge | One team owns both the fiat leg and the on-chain leg — no handoff between a banking vendor and a crypto vendor. |
| Regulated-grade | Security, compliance and auditability built into the process, not bolted on. |
| AI-native delivery | AI-assisted, senior-reviewed — faster delivery without losing engineering control. |

- **Both sides of the bridge:** старий опис ("Banking-first depth with genuine crypto
  fluency — one team across fiat and on-chain") був переказом positioning band третій
  раз на сторінці. Новий текст тримає суть мандату (обидва береги, одна команда) і
  додає новий аргумент — відсутність стику двох підрядників, тобто *чому* це вигідно
  читачу, а не ще одне самоописання.

## 8. Selected work

Рівень: мандатний (6 кейсів). Кейси без змін; **бейдж — граматична правка** (§14).

```
NDA badge: Client names withheld under NDA
```

| Кейс | Domain line | Fact anchor |
|---|---|---|
| EU-licensed payments institution | SEPA Instant — full ISO 20022 message lifecycle | End-to-end SEPA Instant processing |
| US prepaid card program | Web & mobile — Mastercard tokenization, Apple/Google Pay, real-time KYC | Card issuing across web and mobile |
| EU debt-collection & reconciliation platform | CAMT/ISO 20022 statements, multi-jurisdiction VAT | Automated reconciliation at scale |
| Mobile transaction-signing (SCA) | On-device ECDSA in Secure Enclave | Bank-grade signing on consumer devices |
| Embedded crypto in a banking app | Regulated provider integration, settlement webhooks | Crypto features inside a regulated bank |
| Multi-chain wallet & on-chain compliance | 7+ networks supported | Compliance-first wallet infrastructure |

- Бейдж: "Client withheld under NDA" → "Client names withheld under NDA" — у
  формулюванні брифу пропущено "names"; без нього фраза читається як «клієнта
  притримали за NDA».
- Кейси 4–6 названі за проєктом, а не профілем клієнта (так у брифі; профілів
  організацій ми не знаємо і не вигадуємо). Зафіксовано як прийнята
  неоднорідність, не дефект.
- Кейси 3 (reconciliation), 4 (SCA/Secure Enclave) і 5 (embedded crypto) — це
  референси продуктів 5.4, 5.3 і 5.1: у макеті варто дати перехресний зв'язок
  (тег продукту на картці кейсу), без нового тексту.

## 9. Team

Рівень: вільний (структурна вимога: домени, без FE/BE). Заголовок без змін,
**опис переписано** — він дублював теги ролей під собою.

```
Heading:     The architects who'll work on your system

Description: A senior team of 8–10, organized by domain, not by stack.

Roles:       Payments architects · Security & compliance leads ·
             On-chain systems engineers
```

- "8–10" — цифра з брифу §5 (Team: «8–10 архітекторів/інженерів»).
- "by domain, not by stack" — вимога «без поділу Frontend/Backend» перетворена
  з внутрішнього правила на публічний аргумент.

## 10. Insights

Рівень: вільний. **Без змін.**

```
Heading:     Insights
Description: Engineering notes on ISO 20022, on-chain compliance and SCA.
```

## 11. Final CTA + форма

Рівень: заголовок і CTA — мандатні; решта — вільна. Наявний текст добрий — основне
доповнення тут — **стани, яких бракувало** (§12).

```
Heading:      Describe your challenge

Microcopy:    We'll sign an NDA before you share any details.
              Response within one business day.

Labels:       Name · Work email · Company · Your challenge
Placeholder:  name@company.com          (лише у Work email — зразок формату)

Submit:       Send your challenge
Success:      Thanks — we'll get back to you within one business day.
```

- Обіцянки в microcopy ("NDA before details", "one business day") — **підтвердити з
  клієнтом**, що це правда операційно (voice §4: не пишемо неперевірених обіцянок).
- Опційний третій рядок microcopy — "Your message goes to an engineer, not a sales
  queue." — закриває «хто відповість» із тон-мапи §3, але це твердження про процес:
  додавати лише після підтвердження клієнтом.

## 12. Системні стани і помилки

Рівень: вільний. Валідація вже в прототипі і відповідає voice §4 — **залишити як є**;
стани надсилання — нові (у прототипі бекенду немає — це специфікація під продакшн).

### Валідація полів (показ після виходу з поля; без invalid/incorrect; існуюча)

| Поле | Стан | Текст |
|---|---|---|
| Name | порожнє | Add your name so we know who is writing. |
| Work email | порожнє | Add a work email so we can reply. |
| Work email | не email | Enter a work email, like name@company.com |
| Company | порожнє | Add the company you are writing from. |
| Your challenge | порожнє | Tell us what you are building, in a line or two. |

### Надсилання (нове)

| Стан | Текст | Примітка |
|---|---|---|
| Надсилається | Sending… | на кнопці; кнопка disabled + `aria-busy` |
| Помилка мережі/сервера | Your message didn't send. Check your connection and try again — everything you typed is still here. | `role="alert"`; поля не очищати — інакше друге речення стане неправдою |
| Успіх | Thanks — we'll get back to you within one business day. | існуючий; `role="status"` |

Структура повідомлення про помилку — за voice §4: факт → дія → контекст. Без вибачень
("Oops", "Sorry") — тон serious, no exceptions (§2).

### Інші технічні рядки

| Місце | Текст |
|---|---|
| Skip-link (додати першим фокусованим елементом) | Skip to main content |
| Мобільне меню | Menu / Close |
| Футер | © 2026 UAPP |
| `<title>` | UAPP — Engineering for regulated finance |
| Meta description | Payments-grade engineering for banks and fintechs. Banking first, crypto where you need it. |

## 13. Наскрізні правила, зафіксовані цим аудитом

1. **Одна цифра — один носій на екран.** Метрики живуть у рядку метрик; проза їх не
   переказує (виправлено в hero).
2. **Фраза-диференціатор "crypto where you need it" звучить один раз** — у positioning
   band (meta description — окрема поверхня, там допустимо). Синоніми-двійники
   ("where it counts", "where you need it") у сусідніх блоках не ставимо.
3. **"bank-grade" ≤ 2 рази на сторінку**, завжди з об'єктом (standards, security).
4. Службові примітки ("list to be provided…", "TBD") ніколи не рендеряться користувачу.
5. Продукт без готовності до продажу отримує чесний статус ("In development").
6. Імена третіх сторін (провайдери, вендори скринінгу) — лише після дозволу клієнта.
7. Числа: у прозі словами, у метриках цифрами. Sentence case скрізь; без Title Case
   у навігації та CTA.

## 14. Потребує погодження з клієнтом (мандатні правки та обіцянки)

| # | Блок | Пропозиція | Підстава |
|---|---|---|---|
| 1 | Hero sub | зняти дублювання цифр (речення "Banks and fintechs have trusted us…"), цифри лишаються в мандатному рядку метрик | повтор на одному екрані |
| 2 | Expertise · Security | прибрати "Bank-grade" з початку опису | третє "bank-grade" на розвороті |
| 3 | Expertise · Crypto & Web3 | хвіст "deep crypto competence where you need it" → "built with the same discipline as our banking work" | дослівний повтор positioning band |
| 4 | Why us · Both sides | новий опис пілара (без переказу band) | повтор меседжу третій раз |
| 5 | Selected work | бейдж → "Client names withheld under NDA" | граматика |
| 6 | Solutions 5.1 | чи можна публічно називати Bitpanda Enterprise / Fireblocks | партнерства |
| 7 | Final CTA | підтвердити правдивість "NDA before details" і "one business day"; опційний рядок "goes to an engineer, not a sales queue" | неперевірені обіцянки |
| 8 | AI layer | слот сертифікацій порожній до надання переліку (бриф §11.2) | плейсхолдер у UI |
