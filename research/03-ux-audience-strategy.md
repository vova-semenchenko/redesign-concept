# UX-дослідження: аудиторія та стратегія головної сторінки uapp.group

---

## 0. Резюме (TL;DR)

1. **Buyer journey нелінійний**: технічні й комплаєнс-ОПР у regulated finance проходять 6 «buying jobs» (Gartner), 70–80% дослідження роблять самостійно до першого контакту, а рішення ухвалює комітет із 6–10 людей. Сайт — не «вітрина», а **пакет доказів**, який чемпіон угоди (найчастіше CTO/Head of Payments) розносить по комітету.
2. **Вирішальні trust-сигнали** (в порядку ваги для цієї ЦА): сертифікації/комплаєнс-документація (ISO 27001, SOC 2, PCI DSS) → кейси з метриками (навіть анонімні) → технічна глибина контенту (домени ISO 20022/SEPA/картки, а не «технології») → люди/сеньйорність команди → безпекові практики й готовність до due diligence (DORA/EBA) → партнерства.
3. **12-блоковий потік з брифу валідний** — він відповідає канонічній структурі high-converting B2B-сервісного лендінга. Дві головні корекції: (а) **сертифікації не ховати у блоці 8** — продублювати їх у Trust-смузі (блок 4); (б) розглянути **обмін місцями блоків 3 і 4** або їх злиття, щоб соц-доказ став максимально раннім.
4. **Форма**: 4–5 полів (ім'я, робочий email, компанія, опис задачі + опційний select сегмента). Кожне зайве поле — ~-4% конверсії; після 7 полів — обвал (abandonment ~68%). Обов'язково: обіцянка NDA, SLA відповіді, кнопка не "Submit". CTA повторювати після кожного «доказового» блоку; sticky CTA у хедері — так, але стримано.
5. **NDA-кейси працюють**, якщо компенсувати анонімність специфічністю: точний профіль клієнта («EU-licensed payments institution»), константи (регуляторний контекст, масштаб), метрики у відсотках, verification path («details available under NDA on a call»).
6. **Анімований hero** має жорсткий WCAG-контур: `prefers-reduced-motion` + видима кнопка pause (SC 2.2.2 — медіа-запит сам по собі не закриває критерій), ≤3 спалахи/сек, контраст тексту 4.5:1 у **кожному кадрі** анімації.

---

## 1. Buyer journey: як ОПР у regulated finance обирають інженерного партнера

### 1.1. Модель процесу (Gartner)

Gartner описує B2B-закупівлю не як воронку, а як **6 «buying jobs»**, які команда покупця виконує паралельно й з поверненнями («looping»): *problem identification → solution exploration → requirements building → supplier selection → validation → consensus creation* ([Gartner — B2B Buying Journey](https://www.gartner.com/en/sales/insights/b2b-buying-journey)).

Ключові числа:

- **77%** покупців називають останню закупівлю «дуже складною або важкою» ([Gartner CSO Update, огляд](https://candidcreative.ca/kb/gartner-77pct-b2b-purchase-very-complex-2019)).
- Покупці витрачають лише **17%** часу на зустрічі з усіма потенційними постачальниками разом (5–6% на одного вендора) і **27%** — на самостійний онлайн-рісерч; **75%** воліють rep-free experience ([Gartner](https://www.gartner.com/en/sales/insights/b2b-buying-journey)).
- **70–80%** шляху пройдено до першого контакту з sales ([Brixon Group — Gartner 80% rule](https://brixongroup.com/en/the-modern-b2b-buying-journey-why-buyers-complete-80-of-their-journey-alone-and-how-you-can-still-remain-visible)).

**Висновок для UAPP:** сайт конкурує в ті 27% часу, коли живої розмови ще немає. Якщо головна не дає відповіді «чи можна їм довірити гроші» без дзвінка — компанія не потрапляє в shortlist.

### 1.2. Хто в кімнаті: buying committee

Типовий комітет у складній B2B-угоді — **6–10 осіб**, кожен приходить із 4–5 самостійно знайденими матеріалами ([Traction Complete](https://tractioncomplete.com/articles/mapping-the-b2b-buying-committee/); [Bullseye](https://www.bullseye.so/glossary/buying-committee)). В enterprise-угодах із security/legal/procurement review — 10+ ([Attainment Labs](https://www.attainmentlabs.com/blog/b2b-buying-committees-doubled)). Угоди, «прошиті» через 4+ членів комітету, закриваються ~вдвічі частіше за single-threaded ([Attainment Labs](https://www.attainmentlabs.com/blog/b2b-buying-committees-doubled)).

Для сегментів UAPP (банки/EMI/PSP/VASP) до заявлених у брифі ОПР додаються **приховані впливові ролі**:

| Роль | Що шукає на сайті | Блок Home, який на неї працює |
|---|---|---|
| CTO / Head of Engineering (чемпіон) | технічну глибину, стек стандартів (ISO 20022, SCA), сеньйорність | Expertise, Selected work, Team |
| Head of Payments / Digital | доменні кейси «як у нас», time-to-market | Solutions, Selected work |
| Head of Compliance / CISO (veto-роль) | сертифікації, безпекові практики, аудитованість, готовність до вендор-DD | Trust-смуга, AI/certifications, Approach |
| Procurement / vendor-risk | юридичну особу, стабільність (8 років, 60 осіб), реф-перевірність | Trust-смуга, Team, футер |
| CEO/CFO (economic buyer) | ризик і трек: «$1B+ clients' revenue», масштаб проєктів | Hero-метрики, Trust-смуга |
| Юристи / DPO | NDA-практику, поводження з даними | форма + текст біля неї |

**Регуляторний контекст, який робить комплаєнс-ролі сильнішими:** з 17.01.2025 у ЄС повністю діє **DORA** — фінустанови зобов'язані вести Register of Information щодо всіх ICT-підрядників і проводити **незалежну pre-contractual due diligence**, а не лише опитувальники ([Legiscope — DORA third-party risk](https://www.legiscope.com/blog/dora-third-party-risk-management.html); [EBA — DORA](https://www.eba.europa.eu/activities/direct-supervision-and-oversight/digital-operational-resilience-act); [Pillsbury](https://www.pillsburylaw.com/en/news-and-insights/dora-eu-financial-entities-service-providers.html)). Паралельно діють EBA Guidelines on outsourcing. Банки-спонсори у BaaS-угодах ганяють вендорів через опитувальники на 200+ пунктів ([vCISO.com](https://www.vciso.com/services/vciso-for-fintech)). **Тобто для банку найняти UAPP = взяти на себе регуляторне зобов'язання.** Сайт, який заздалегідь знімає питання DD (сертифікації, безпекові практики, «security documentation available under NDA»), напряму скорочує цикл угоди.

### 1.3. Роль сайту на кожному етапі

| Етап (Gartner job) | Що робить ОПР | Що має дати головна |
|---|---|---|
| Problem identification | «Нам треба SEPA Instant / embedded crypto / пройти аудит» | Hero + Positioning: миттєве «вони про це» (наші домени, наша лексика) |
| Solution exploration | Google/AI-пошук, лонглист 5–10 вендорів, peer-рекомендації | SEO/AEO-читабельний контент, Expertise, Insights |
| Requirements building | Формують критерії: комплаєнс, стек, модель роботи | Solutions, Approach, сертифікації |
| Supplier selection | Shortlist 2–3; порівняння доказів | Selected work з метриками, Team |
| Validation | Compliance/CISO перевіряють ризик; референси | Trust-смуга, security-практики, «report/details under NDA» |
| Consensus creation | Чемпіон збирає внутрішній кейс | Шерабельні артефакти: кейс-PDF, сторінка Approach, метрики |

### 1.4. Які trust-сигнали вирішальні (з джерелами)

1. **Сертифікації та комплаєнс-документація.** SOC 2 звіт — рутинна вимога procurement; ISO 27001 має більшу вагу в міжнародних regulated-контекстах; для карткових проєктів очікують PCI DSS ([Drummond Group — SOC 2 vs ISO 27001](https://www.drummondgroup.com/blog/soc-2-vs-iso-27001-different-paths-to-security-and-governance/); [cSquare GRC — Fintech compliance assessments](https://csquaregrc.com/en-US/insights/article/top-7-fintech-compliance-assessments-2026)). Верифіковані компліанс-документи, а не бейджі-картинки: «logo walls and generic badges don't move buying committees anymore» ([Everything Design](https://www.everything.design/blog/trust-signals-b2b-website); [Vendict — verifiable trust](https://vendict.com/blog/b2b-buyer-behavior-why-verifiable-trust-digital-transparency-are-the-real-dealbreakers)). Практика trust-центрів показує, що доступність security-доказів онлайн скорочує security review з тижнів до годин і знімає 30–50% вхідних опитувальників ([Drata](https://drata.com/learn/assurance/what-is-a-trust-center); [Secureframe](https://secureframe.com/blog/what-is-a-trust-center); [Conveyor](https://www.conveyor.com/blog/the-ultimate-guide-to-trust-centers-showcase-your-security-posture-and-build-trust-faster)). Формула для NDA-середовища: бейдж + точний scope + «full report available under NDA» ([SecureSlate](https://getsecureslate.com/blog/how-to-take-advantage-of-your-soc-2-badge)).
2. **Кейси з метриками.** ~42% B2B-покупців називають кейси найвпливовішим типом контенту ([Trajectory Web Design](https://www.trajectorywebdesign.com/blog/b2b-website-trust-signals); [Square Root SEO](https://squarerootseo.com/blog/website-trust-signals-that-convert/)); «outcome-anchored case studies» — один із небагатьох сигналів, що працюють на весь комітет ([Everything Design](https://www.everything.design/blog/trust-signals-b2b-website)).
3. **Технічна глибина без маркетингового шуму.** У CTO «highly tuned fluff detectors»: специфіка, докази, чесні обмеження > гасла; слабкий інженерний контент вбиває довіру ще до зустрічі ([Uplift GTM — Selling to CTOs](https://www.upliftgtm.com/blog/selling-to-ctos); [daily.dev for business](https://business.daily.dev/resources/developer-tools-marketing-engineering-leaders-ctos-vps-evaluate/)). 82% технічних покупців довіряють peer-джерелам більше, ніж сайту вендора — тому кейс «у схожій компанії» переконливіший за будь-який слоган ([DemandWorks](https://www.dwmedia.com/blog/how-do-you-reach-technical-buyers-in-2026/)).
4. **Люди.** Сторінка команди — одна з найвідвідуваніших у professional services; «buyers buy people as much as firms», слабкі профілі = слабка експертиза в очах покупця ([Hinge Marketing](https://hingemarketing.com/blog/story/5-essential-features-of-an-architecture-firms-website)).
5. **Thought leadership.** 73% ОПР вважають thought-leadership-контент надійнішою основою для оцінки компетенцій, ніж маркетингові матеріали; 9/10 більш сприйнятливі до outreach компанії, що системно його публікує ([Edelman–LinkedIn B2B Thought Leadership Impact Report](https://www.edelman.com/expertise/Business-Marketing/2024-b2b-thought-leadership-report); [2025 edition](https://www.edelman.com/expertise/Business-Marketing/2025-b2b-thought-leadership-report)). Це пряме обґрунтування блоку Insights.
6. **Ранні маркери на awareness-етапі**: впізнавані сертифікації та індустріальні партнерства формують ~60% первинного інтересу ([Valasys Martech](https://valasysmartech.com/b2b-brand-trust-signals/)).

---

## 2. Валідація 12-блокового потоку головної

### 2.1. Еталон, з яким порівнюємо

Канон high-converting B2B-лендінга: **hero з benefit-заголовком (<8 слів) і CTA above the fold → trust-смуга одразу під hero → соц-доказ раніше за фічі → секції доказів із числами → кілька шляхів конверсії під різні стадії готовності** ([SaaS Hero — landing page best practices](https://www.saashero.net/design/saas-landing-page-best-practices/); [Directive Consulting](https://directiveconsulting.com/blog/blog-b2b-landing-page-best-practices-examples/); [Spaced Digital — B2B landing page guide](https://spaced.digital/b2b-landing-page-guide/)). Принцип: «trust signals buried at the bottom only help visitors who already scrolled past your CTA» ([SaaS Hero — social proof](https://www.saashero.net/content/landing-page-social-proof-examples/)).

**Вердикт: потік із брифу структурно валідний** — він повторює еталон (позиціонування → ранній соц-доказ → релевантність → продукти → докази → люди → CTA) і додає правильні для regulated-ніші акценти. Нижче — поблочні рекомендації та два обґрунтовані відхилення.

### 2.2. Поблочні рекомендації

**1. Header (навігація + sticky CTA)** — ✅ валідно.
- Sticky CTA «Describe your challenge» — постійно видимий, але візуально другорядний за вагою відносно навігації (див. розділ 3.3 про докази й застереження щодо desktop).
- Навігація — за доменами/рішеннями (Expertise, Solutions, Case studies, Team), **не** за технологіями — це прямо лікує ваду старого сайту («таксономія за технологією», бриф §4).
- У header'і не більше 5–6 пунктів: комітет має за секунди знайти «свій» розділ.

**2. Hero** — ✅ валідно, найкритичніший блок.
- H1 "Engineering for regulated finance." — 4 слова, benefit/категорія, відповідає правилу <8 слів ([SaaS Hero](https://www.saashero.net/design/saas-landing-page-best-practices/)).
- Ієрархія контенту: H1 → sub (домени: payment rails, cards, core integrations + crypto) → CTA → метрики (8+ років · 170+ проєктів · 15 країн · $1B+). Метрики в hero — це «highest-impact social proof in the hero», що best practice прямо рекомендує ([SaaS Hero — social proof](https://www.saashero.net/content/landing-page-social-proof-examples/)).
- «Вау»-анімація не повинна конкурувати з читабельністю H1 (див. WCAG-чек-лист, розділ 6): текст поверх анімації = контраст у кожному кадрі.
- Другий, «м'якший» шлях поруч із CTA (напр., "See our work") — сторінки з двома шляхами під різну готовність конвертують краще за one-action ([SaaS Hero — high-converting examples](https://www.saashero.net/design/high-converting-landing-page-examples/)).

**3. Positioning band («Banking first, crypto where you need it»)** — ✅ валідно, з умовою.
- Це головний диференціатор і анти-«робимо все» меседж — його місце одразу після hero виправдане.
- Ризик: два «текстових» блоки поспіль (hero → band) без соц-доказу між ними. Рекомендація: band має бути **коротким** (1–2 рядки мандатного копірайту, без розгортання) і візуально зшитим із hero, щоб Trust-смуга лишалась у зоні першого-другого скролу.

**4. Trust-смуга (метрики + партнери)** — ✅ валідно, але **посилити і, за потреби, підняти**.
- ⚠️ **Головна корекція потоку №1:** сертифікації (ISO 27001 / SOC 2 / PCI DSS — фактичний перелік уточнюється, бриф §11.2) зараз згадані лише у блоці 8. Для ЦА, де Head of Compliance має право вето, компліанс-сигнали — це awareness-рівневий маркер (60% первинного інтересу — [Valasys](https://valasysmartech.com/b2b-brand-trust-signals/)), їх **обов'язково дублювати в Trust-смузі**: `метрики + сертифікаційні бейджі + "security documentation available under NDA"`.
- Якщо клієнтських лого немає через NDA (відкрите питання брифу §11.4) — trust-смугу будувати на: метриках, сертифікаціях, технологічних/індустріальних партнерствах (card schemes, регульовані крипто-провайдери, хмарні партнерства), членствах в асоціаціях. Це чесніше й сильніше за сумнівні лого.
- Опційний swap: якщо positioning band виходить довгим — поміняти місцями блоки 3 і 4 (hero → trust → positioning), щоб соц-доказ став максимально раннім, як радить еталон ([SaaS Hero](https://www.saashero.net/content/landing-page-social-proof-examples/)). Якщо band короткий — порядок брифу лишається кращим, бо диференціація підсилює релевантність метрик.

**5. Expertise (4 домени)** — ✅ валідно.
- Для services-компанії «вони в моєму світі» логічно передує «що вони продають»: технічний покупець спершу шукає доменну релевантність ([Uplift GTM](https://www.upliftgtm.com/blog/selling-to-ctos)).
- Ієрархія картки: домен → 2–3 конкретики стандартів (ISO 20022, SEPA Instant, PSD2/SCA, AML/KYC, HSM/Secure Enclave…) → лінк у розділ. Конкретика стандартів = «специфіка замість гасел» для fluff-детектора CTO.
- Порядок карток banking-first: Fintech & Payments → Compliance & AML → Security → Crypto & Web3 (крипта четверта = «лезо, не 50/50», бриф §2).

**6. Solutions / showcase** — ✅ валідно.
- Інтерактивні таби/картки (не авто-слайдер) — відповідає і брифу, і WCAG 2.2.2 (авто-рух вимагає pause-контролів, розділ 6).
- Embedded Crypto for Banks — перша/акцентна картка, але заголовок блоку — про банківські продукти загалом (флагман ≠ айдентика, бриф §2).
- Ієрархія картки: назва → для кого (сегмент) → яку проблему знімає → 1 метрика/доказ → CTA "Learn more". Product-first покупцям (Head of Payments/Digital) цей блок часто важливіший за Expertise — забезпечити прямий anchor-лінк із header.

**7. Selected work (3–6 анонімних кейсів)** — ✅ валідно, позиція правильна.
- Класична рекомендація «кейси якомога раніше» тут компенсована метриками в hero і Trust-смугою, тож позиція 7 (після «що ми вміємо» і «що продаємо») — обґрунтована: кейси відповідають на «це реально», коли релевантність уже встановлена.
- Структуру кейс-тизерів див. розділ 4. У кожного тизера — метрика в заголовку.
- 3–6 тизерів; сітка, не карусель.

**8. AI across every layer + сертифікації** — ✅ валідно як диференціатор, ❗ з корекцією.
- ⚠️ **Корекція №2:** не змішувати два різні меседжі. AI-native — це диференціатор швидкості/сучасності; сертифікації — це компліанс-довіра. Сертифікації винести (продублювати) у блок 4; тут лишити AI-практику + AI-сертифікації команди саме як підтвердження AI-компетентності.
- Обережно з тоном: для банківської ЦА AI-меседж формулювати через контроль і якість («AI-assisted, senior-reviewed»), не через «магію» — regulated-покупець читає неконтрольований AI як ризик.

**9. Approach / Why us** — ✅ валідно.
- Три стовпи з брифу (Both sides of the bridge · Regulated-grade · AI-native delivery) — це готова структура. Під «Regulated-grade» дати процесні докази: security by design, аудитованість, документація, готовність до вендор-DD (DORA-контекст, [Legiscope](https://www.legiscope.com/blog/dora-third-party-risk-management.html)) — це блок для CISO/Compliance-читача.

**10. Team teaser** — ✅ валідно (деталі — розділ 5).

**11. Insights teaser** — ✅ валідно; обґрунтування — Edelman/LinkedIn: 73% ОПР довіряють thought leadership більше, ніж маркетинговим матеріалам ([Edelman](https://www.edelman.com/expertise/Business-Marketing/2024-b2b-thought-leadership-report)). 2–3 матеріали строго в доменах (ISO 20022, on-chain compliance, SCA) — недоменний контент тут шкодить позиціонуванню.

**12. Final CTA + форма** — ✅ валідно (деталі — розділ 3).

### 2.3. Підсумок валідації

| # | Блок | Вердикт | Ключова корекція |
|---|---|---|---|
| 1 | Header | ✅ | sticky CTA другорядної ваги; навігація за доменами |
| 2 | Hero | ✅ | метрики в hero; 2-й м'який шлях; контраст поверх анімації |
| 3 | Positioning band | ✅ | максимум 1–2 рядки; не відсувати trust-смугу |
| 4 | Trust-смуга | ✅❗ | **додати сертифікації + "docs under NDA"**; опційний swap із блоком 3 |
| 5 | Expertise | ✅ | конкретика стандартів у картках; крипта — 4-та |
| 6 | Solutions | ✅ | anchor з header; метрика в кожній картці |
| 7 | Selected work | ✅ | метрика в заголовку тизера; сітка, не карусель |
| 8 | AI layer | ✅❗ | **сертифікації безпеки — у блок 4**; AI = «assisted + senior-reviewed» |
| 9 | Approach | ✅ | стовп Regulated-grade писати під CISO/DD-читача |
| 10 | Team | ✅ | див. розділ 5 |
| 11 | Insights | ✅ | тільки доменний контент |
| 12 | Final CTA | ✅ | див. розділ 3 |

---

## 3. Конверсія: форма, CTA, benchmarks

### 3.1. Форма «Describe your challenge»

**Дані про поля:**
- Оптимум для B2B lead-форм — **3–5 полів**; кожне додаткове поле коштує в середньому **-4.1%** конверсії; при >7 полях abandonment ≈ **67.8%** ([Brixon Group — B2B lead forms](https://brixongroup.com/en/lead-forms-in-b2b-the-perfect-balancing-act-between-data-depth-and-conversion-rate); [Digital Applied — Form benchmarks](https://www.digitalapplied.com/blog/form-conversion-rate-benchmarks-2026-data-points)).
- Конверсія падає плавно з ~23% (3 поля) до ~17% (5 полів), далі «обрив»: ~11% (7) і ~7% (10+) ([Digital Applied](https://www.digitalapplied.com/blog/form-conversion-rate-benchmarks-2026-data-points)).
- Скорочення з 4 до 3 полів у дослідженні HubSpot давало ~+50% конверсії; кнопки з написом "Submit" конвертують гірше ([HubSpot](https://blog.hubspot.com/marketing/optimize-conversion-forms); [HubSpot — form fields](https://blog.hubspot.com/blog/tabid/6307/bid/6746/which-types-of-form-fields-lower-landing-page-conversions.aspx)). Поля phone/адреса — найбільш «токсичні» для конверсії; телефон не питати або зробити явно опційним.

**Рекомендований склад (5 елементів, 4 обов'язкові):**
1. Full name
2. Work email (валідація корпоративного домену — м'яка, без блокування)
3. Company
4. "Describe your challenge" — textarea з підказкою-прикладом (placeholder на кшталт "e.g. We need SEPA Instant readiness by Q2…")
5. (опційно) select «What's this about?» — Payments / Compliance / Security / Crypto / Other — це самокваліфікація ліда без friction і місток до маршрутизації в CRM (склад полів — відкрите питання брифу §11.5).

**Зниження friction навколо форми (специфіка regulated-ЦА):**
- Мікрокопі довіри біля кнопки: **"We'll sign an NDA before any details"** + **"Response within one business day"** — прибирає два головні страхи цієї ЦА (конфіденційність і «чорна діра»).
- Кнопка: "Describe your challenge" / "Send your challenge" — не "Submit" ([HubSpot](https://blog.hubspot.com/marketing/optimize-conversion-forms)).
- Альтернативні канали поруч: пряма пошта + (опційно) лінк на календар — частина ОПР принципово не заповнює форм.
- Швидкість реакції — найсильніший предиктор конверсії ліда (відповідь <60 сек дає до +391% до конверсії у контакт; [Landbase](https://www.landbase.com/blog/conversion-rate-statistics)) — до запуску вирішити, куди падають ліди і хто відповідає (бриф §11.5).
- Не вимагати згод понад необхідне; privacy-нотатка одним рядком.

### 3.2. Розміщення і повторення CTA

- Primary CTA — один на сторінку за змістом («Describe your challenge»), повторений: hero → після Solutions → після Selected work → фінальний блок 12. Правило: CTA з'являється після кожного «стрибка довіри», щоб готовий користувач ніколи не скролив більше 1.5–2 екранів до дії.
- Secondary CTA — м'які переходи ("See case studies", "Meet the team") для не-готових: multi-path перевершує single-action ([SaaS Hero](https://www.saashero.net/design/high-converting-landing-page-examples/); [Directive](https://directiveconsulting.com/blog/blog-b2b-landing-page-best-practices-examples/)).
- Фінальний блок 12 — форма прямо на головній (не лінк на Contact): кожен зайвий клік — втрата.

### 3.3. Sticky CTA: докази та застереження

- Sticky CTA дають +15–40% кліків/конверсій **переважно на мобайлі** ([StickyCTAs — data](https://www.stickyctas.com/articles/sticky-ctas-data)); Contentsquare-дослідження 58 млн сесій: +31% конверсій для sticky bottom-bar на мобайлі ([StickyCTAs](https://www.stickyctas.com/articles/sticky-ctas-data)).
- **Застереження для desktop-first ітерації:** у частині A/B-тестів desktop-ефект нульовий ([Online Dialogue](https://www.onlinedialogue.nl/en/blogs/sticky-cta-guaranteed-conversion-uplift/); [Speero](https://speero.com/post/are-sticky-ctas-really-that-sticky-that-was-the-next-question-tacked-in-our-series-it-depends)), а sticky-елементи, що «кричать», можуть дратувати. Висновок: sticky header з CTA — так (це і навігаційна цінність), але компактний, без анімацій-пульсацій; на довгій сторінці він забезпечує шлях до дії з будь-якої точки скролу.

### 3.4. Benchmarks (щоб виставити KPI lead-engine, бриф §11.6)

- Середня конверсія B2B-сайту: **2–5%** ([Grow Conversions](https://grow-conversions.com/blog/conversion-rate-benchmarks-by-industry/)).
- B2B services / professional services: ~**4.6%** у середньому, діапазон 1.7–10.8% залежно від джерела трафіку ([First Page Sage](https://firstpagesage.com/reports/b2b-conversion-rates-by-industry-fc/); [Unbounce](https://unbounce.com/conversion-rate-optimization/b2b-conversion-rates/)).
- Конверсія критично залежить від каналу: email ~19%, paid search ~11% ([Unbounce](https://unbounce.com/conversion-rate-optimization/b2b-conversion-rates/)) — тому KPI ставити по каналах, а не «по сайту загалом».
- Реалістична мета для нової головної UAPP: **2–4% visitor→lead** на цільовому (не брендовому) трафіку, з подальшим CRO.

---

## 4. NDA-кейси: як показувати анонімну роботу, щоб вона будувала довіру

### 4.1. Принципи анонімізації

- «Абстрагуй на один рівень»: не назва компанії, а точний профіль — "an EU-licensed payments institution", "a US prepaid card program" ([Pravin Kumar](https://www.pravinkumar.co/blog/webflow-case-study-anonymous-client-solo-practice-2026); [1827 Marketing](https://1827marketing.com/smart-thinking/client-confidential-how-to-showcase-success-without-naming-names/)). Кейси в брифі §8 уже сформульовані саме так — це правильно.
- Можна показувати: вертикаль, розмірний діапазон, регуляторний контекст, бізнес-виклик, підхід, **відсоткові** метрики. Не можна: точні revenue, деталі, що деанонімізують, пропрієтарні назви ([ProofMap — anonymous case studies](https://proofmap.com/insights/how-to-write-anonymous-case-studies); [IxDF — NDA case studies](https://ixdf.org/literature/article/how-to-handle-non-disclosure-agreements-ndas-when-you-write-your-ux-case-study)).
- Письмове погодження анонімної версії з клієнтом — до публікації ([ENNclick](https://ennclick.com/how-to-write-a-case-study-about-a-sensitive-client/)).
- Анонімність компенсується **специфічністю обмежень**: саме перелік constraint'ів (комплаєнс, SLA, масштаб транзакцій, аудит) робить кейс правдоподібним для технічного читача ([Appricotsoft — fintech case studies](https://appricotsoft.com/blog/fintech-case-studies-that-actually-prove-value-not-just-we-built-an-app/)).

### 4.2. Структура кейса (тизер на Home / повна версія на Case studies)

Канон — Challenge → Solution → Results; кейси з повним набором елементів (контекст, виклик, шлях рішення, метрики, «голос клієнта») конвертують на ~37% краще ([Brixon — B2B case studies](https://brixongroup.com/en/compelling-case-studies-how-to-create-impactful-b2b-success-stories-in); [Scopic Studios](https://scopicstudios.com/blog/8-proven-b2b-case-study-examples-and-frameworks/)).

**Тизер на головній (картка):**
1. Хто: "EU-licensed payments institution" + плашка `Client withheld under NDA` (плашка = сигнал серйозності, не сором'язливе виправдання).
2. Що зробили: 1 рядок із доменною конкретикою ("full ISO 20022 message lifecycle for SEPA Instant").
3. Метрика/факт-якір: число в заголовку або перше, що бачить око ("7+ chains", "on-device ECDSA in Secure Enclave").
4. CTA: "Read the case".

**Повний кейс (сторінка):** Контекст (профіль, регуляторне середовище, масштаб) → Challenge мовою бізнесу + технічні constraints → Solution (архітектурні рішення, стандарти, як інтегрувалось) → Results (кількісні % + якісні: пройдений аудит, запуск у строк, скорочення reconciliation-часу) → якщо можливо, знеособлена цитата ролі ("Head of Payments, the client company") → **verification path**: "Detailed architecture and references available under NDA on an intro call" — перетворює анонімність на запрошення до контакту.

### 4.3. Хто робить це добре (приклади для референс-аналізу)

- **ScienceSoft** — велика бібліотека фінтех-кейсів із метриками без імен: [scnsoft.com/case-studies/fintech](https://www.scnsoft.com/case-studies/fintech).
- **Silicon Mint** — NDA-позначені проєкти в портфоліо + "Send me an NDA" як CTA: [siliconmint.com/work](https://siliconmint.com/work/).
- **Moravio** — окремі сторінки NDA-кейсів ("NDA fintech application…"): [moravio.com/portfolio/nda-fintech-application-for-investment-portfolios](https://www.moravio.com/portfolio/nda-fintech-application-for-investment-portfolios).
- **Itexus** — описи PCI DSS-compliant рішень із доменною специфікою без клієнтських імен: [itexus.com](https://itexus.com/).

---

## 5. Команда: «8–10 сеньйорів-архітекторів» без поділу FE/BE

Обґрунтування ваги блоку: сторінки команди — серед найвідвідуваніших у professional services; покупці «купують людей»; іменні профілі з демонстрованими компетенціями будують довіру, анонімні «our team»-фото — ні ([Hinge Marketing](https://hingemarketing.com/blog/story/5-essential-features-of-an-architecture-firms-website); [Silvermine — About page](https://www.silvermine.ai/newsletter/architecture-firm-about-page-how-to-introduce-the-practice-without-sounding-generic)).

**Рекомендації:**

1. **Ролі за доменом відповідальності, не за стеком**: "Payments Architect", "Security & Compliance Lead", "On-chain Systems Engineer", "Core Banking Integrations Lead" — це водночас виконує вимогу «без Frontend/Backend» і продає доменну глибину. Титул за технологією («React dev») сигналізує аутстаф-модель; титул за доменом — сигнал партнера, якому довіряють систему цілком.
2. **Формула профілю**: фото (професійне, єдиний стиль) + ім'я + доменна роль + 1–2 рядки: роки у фінтеху, стандарти/сертифікації (напр., AWS SA, CISSP, AI-сертифікації з блоку 8), тип систем, які вів. Зв'язка «людина → тип кейса» ("led the SEPA Instant delivery for an EU payments institution") — сильніша за перелік дипломів ([Silvermine](https://www.silvermine.ai/newsletter/architecture-firm-about-page-how-to-introduce-the-practice-without-sounding-generic)).
3. **Фрейм «who you'll work with»**: тизер на Home підписати не "Our team", а "The architects who'll work on your system" — це знімає типовий страх аутсорсу «продають сеньйорів, роблять джуни». Підкріпити правилом-фактом: senior-only delivery, no hand-offs.
4. **Кількість — це фіча**: «8–10 senior engineers & architects» подавати як свідому модель (small senior core + delivery teams), сусідячи з метрикою 170+ проєктів: мала команда з великим треком = щільність експертизи.
5. На Home — тизер: 4–6 облич + агрегати (сумарні роки у фінтеху, сертифікації) + лінк на повну сторінку Team. LinkedIn-лінки у повних профілях — верифікованість для DD (procurement реально перевіряє людей).

---

## 6. Доступність: WCAG 2.1 AA чек-лист для анімованого hero

Бриф вимагає «вау»-анімацію + reduced-motion fallback (§7) і WCAG AA (§9). Нормативні критерії рівня A/AA, які зачіпає анімований hero, + best-practice AAA-критерій 2.3.3.

### Чек-лист для дизайнерів і фронтенду

**A. Reduced motion (SC 2.3.3 — AAA, але мандат брифу; галузевий стандарт для hero-анімацій)**
- [ ] Реалізовано `@media (prefers-reduced-motion: reduce)`: анімація замінюється **змістовним статичним кадром** (той самий меседж/композиція), а не порожнечею ([W3C — Understanding 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html); [CSS-Tricks — WCAG on animation](https://css-tricks.com/accessible-web-animation-the-wcag-on-animation-explained/)).
- [ ] При reduced motion WebGL/particles **не ініціалізуються взагалі** (це і performance-виграш).
- [ ] Прибрано/зменшено: паралакс, scroll-triggered рух, масштабні zoom/пани — головні тригери вестибулярних розладів ([Pope Tech — accessible animation](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/)).
- [ ] Дизайнер здає **обидва стани**: motion і static — статичний кадр є частиною макета, не «як вийде».

**B. Pause / Stop / Hide (SC 2.2.2 — Level A, нормативно)**
- [ ] Якщо анімація стартує автоматично, триває **>5 секунд** і йде паралельно з іншим контентом — потрібен **видимий механізм pause/stop/hide** ([W3C — Understanding 2.2.2](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html); [Yale Usability](https://usability.yale.edu/digital-accessibility/accessibility-resources/accessibility-articles/animated-content-and-timing)).
- [ ] **Важливо:** `prefers-reduced-motion` сам по собі не закриває 2.2.2 — pause-контрол має бути доступний усім користувачам, не лише тим, хто увімкнув OS-налаштування ([w3c/wcag discussion #3766](https://github.com/w3c/wcag/issues/3766), [#4319](https://github.com/w3c/wcag/issues/4319); [Accessibility Craft](https://accessibilitycraft.com/104-wcag-pause-stop-hide-prefers-reduced-motion-fallout-nuka-cola-quantum/)). Дизайн-рішення: делікатна кнопка pause/play у куті hero.
- [ ] Кнопка pause: доступна з клавіатури (SC 2.1.1), з видимим фокусом (SC 2.4.7), з aria-label ("Pause background animation"), стан зберігається при поверненні.
- [ ] Альтернатива, що знімає вимогу контролу: анімація сама зупиняється/деградує до ambient-стану за ≤5 сек.
- [ ] Заборона з брифу підтверджена нормативно: жодних авто-каруселей (карусель = auto-moving content → ті самі вимоги 2.2.2).

**C. Seizure safety (SC 2.3.1 — Level A)**
- [ ] **≤3 спалахи за будь-яку секунду**; без різких змін яскравості на великих площах, без стробів і насичених червоних спалахів ([W3C — Understanding 2.3.1](https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html); [CSS-Tricks](https://css-tricks.com/accessible-web-animation-the-wcag-on-animation-explained/)).
- [ ] Particles/мережеві ефекти: обмежити частоту «мерехтіння» вузлів; перевірити фінальний рендер PEAT-аналізатором (Photosensitive Epilepsy Analysis Tool) на відеозаписі hero.

**D. Контраст поверх анімації (SC 1.4.3, 1.4.11 — Level AA)**
- [ ] Текст hero (H1, sub, метрики) — контраст **≥4.5:1** (large text ≥3:1) відносно фону в **кожному кадрі** анімації, не лише в «середньому» ([W3C — Understanding 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)). Прийом: напівпрозорий scrim/градієнт під текстовою зоною або «заборонена зона» для частинок під текстом.
- [ ] CTA-кнопка та pause-контрол — non-text contrast **≥3:1** до прилеглого фону в усіх фазах анімації ([W3C — Understanding 1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)).
- [ ] Перевірити контраст у стані reduced-motion/static окремо.

**E. Смисл і семантика**
- [ ] Анімація — декоративна: не єдиний носій меседжу «обидва береги»; меседж дубльовано текстом (SC 1.1.1). Canvas/SVG-шар — `aria-hidden="true"`, без фокусованих елементів усередині.
- [ ] Якщо анімація реагує на курсор — вона не має бути єдиним способом отримати будь-який контент (hover-only контент порушує очікування 1.4.13).
- [ ] Автовідтворюваного звуку немає (SC 1.4.2).

**F. Продуктивність як доступність (зв'язка з performance-бюджетом, бриф §11.3)**
- [ ] Анімація не блокує LCP hero-тексту (текст рендериться до/незалежно від canvas).
- [ ] Деградація на слабких GPU: static fallback, а не фриз.
- [ ] `requestAnimationFrame`-пауза, коли hero поза в'юпортом і коли вкладка неактивна.

---

## 7. Джерела

**Buyer journey / комітет**
- https://www.gartner.com/en/sales/insights/b2b-buying-journey
- https://candidcreative.ca/kb/gartner-77pct-b2b-purchase-very-complex-2019
- https://brixongroup.com/en/the-modern-b2b-buying-journey-why-buyers-complete-80-of-their-journey-alone-and-how-you-can-still-remain-visible
- https://tractioncomplete.com/articles/mapping-the-b2b-buying-committee/
- https://www.attainmentlabs.com/blog/b2b-buying-committees-doubled
- https://www.bullseye.so/glossary/buying-committee

**Trust-сигнали / комплаєнс / DD**
- https://www.drummondgroup.com/blog/soc-2-vs-iso-27001-different-paths-to-security-and-governance/
- https://csquaregrc.com/en-US/insights/article/top-7-fintech-compliance-assessments-2026
- https://www.vciso.com/services/vciso-for-fintech
- https://www.legiscope.com/blog/dora-third-party-risk-management.html
- https://www.eba.europa.eu/activities/direct-supervision-and-oversight/digital-operational-resilience-act
- https://www.pillsburylaw.com/en/news-and-insights/dora-eu-financial-entities-service-providers.html
- https://vendict.com/blog/b2b-buyer-behavior-why-verifiable-trust-digital-transparency-are-the-real-dealbreakers
- https://www.everything.design/blog/trust-signals-b2b-website
- https://squarerootseo.com/blog/website-trust-signals-that-convert/
- https://www.trajectorywebdesign.com/blog/b2b-website-trust-signals
- https://valasysmartech.com/b2b-brand-trust-signals/
- https://drata.com/learn/assurance/what-is-a-trust-center
- https://secureframe.com/blog/what-is-a-trust-center
- https://www.conveyor.com/blog/the-ultimate-guide-to-trust-centers-showcase-your-security-posture-and-build-trust-faster
- https://getsecureslate.com/blog/how-to-take-advantage-of-your-soc-2-badge

**Технічні покупці / thought leadership**
- https://www.upliftgtm.com/blog/selling-to-ctos
- https://business.daily.dev/resources/developer-tools-marketing-engineering-leaders-ctos-vps-evaluate/
- https://www.dwmedia.com/blog/how-do-you-reach-technical-buyers-in-2026/
- https://www.edelman.com/expertise/Business-Marketing/2024-b2b-thought-leadership-report
- https://www.edelman.com/expertise/Business-Marketing/2025-b2b-thought-leadership-report

**Структура лендінга / CTA / форми / benchmarks**
- https://www.saashero.net/design/saas-landing-page-best-practices/
- https://www.saashero.net/content/landing-page-social-proof-examples/
- https://www.saashero.net/design/high-converting-landing-page-examples/
- https://directiveconsulting.com/blog/blog-b2b-landing-page-best-practices-examples/
- https://spaced.digital/b2b-landing-page-guide/
- https://brixongroup.com/en/lead-forms-in-b2b-the-perfect-balancing-act-between-data-depth-and-conversion-rate
- https://www.digitalapplied.com/blog/form-conversion-rate-benchmarks-2026-data-points
- https://blog.hubspot.com/marketing/optimize-conversion-forms
- https://blog.hubspot.com/blog/tabid/6307/bid/6746/which-types-of-form-fields-lower-landing-page-conversions.aspx
- https://www.stickyctas.com/articles/sticky-ctas-data
- https://www.onlinedialogue.nl/en/blogs/sticky-cta-guaranteed-conversion-uplift/
- https://speero.com/post/are-sticky-ctas-really-that-sticky-that-was-the-next-question-tacked-in-our-series-it-depends
- https://grow-conversions.com/blog/conversion-rate-benchmarks-by-industry/
- https://firstpagesage.com/reports/b2b-conversion-rates-by-industry-fc/
- https://unbounce.com/conversion-rate-optimization/b2b-conversion-rates/
- https://www.landbase.com/blog/conversion-rate-statistics

**NDA-кейси**
- https://proofmap.com/insights/how-to-write-anonymous-case-studies
- https://ixdf.org/literature/article/how-to-handle-non-disclosure-agreements-ndas-when-you-write-your-ux-case-study
- https://1827marketing.com/smart-thinking/client-confidential-how-to-showcase-success-without-naming-names/
- https://ennclick.com/how-to-write-a-case-study-about-a-sensitive-client/
- https://www.pravinkumar.co/blog/webflow-case-study-anonymous-client-solo-practice-2026
- https://appricotsoft.com/blog/fintech-case-studies-that-actually-prove-value-not-just-we-built-an-app/
- https://brixongroup.com/en/compelling-case-studies-how-to-create-impactful-b2b-success-stories-in
- https://scopicstudios.com/blog/8-proven-b2b-case-study-examples-and-frameworks/
- Приклади: https://www.scnsoft.com/case-studies/fintech · https://siliconmint.com/work/ · https://www.moravio.com/portfolio/nda-fintech-application-for-investment-portfolios · https://itexus.com/

**Команда**
- https://hingemarketing.com/blog/story/5-essential-features-of-an-architecture-firms-website
- https://www.silvermine.ai/newsletter/architecture-firm-about-page-how-to-introduce-the-practice-without-sounding-generic

**Доступність**
- https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html
- https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html
- https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
- https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
- https://css-tricks.com/accessible-web-animation-the-wcag-on-animation-explained/
- https://github.com/w3c/wcag/issues/3766 · https://github.com/w3c/wcag/issues/4319
- https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/
- https://usability.yale.edu/digital-accessibility/accessibility-resources/accessibility-articles/animated-content-and-timing
- https://accessibilitycraft.com/104-wcag-pause-stop-hide-prefers-reduced-motion-fallout-nuka-cola-quantum/
