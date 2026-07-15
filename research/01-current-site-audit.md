# Аудит поточного сайту uapp.group (для редизайну під banking-first позиціонування)

---

## TL;DR

Поточний сайт — це класичний **«дженераліст-аутсорс» дарк-теми**: «A technology and digital solutions provider focusing on bespoke software development, consultancy and audit» (H1-суб на https://uapp.group). Слова *fintech, payments, banking, compliance, ISO 20022, SEPA* **не зустрічаються ніде** — ні в навігації, ні в таксономії експертизи, ні в кейсах. Найбільший домен експертизи — «Digital Presence» (79 проєктів), а головний слайдер кейсів відкривається тату-студією, піцою та плагінами для Elementor. Водночас база для редизайну краща, ніж здається: стриманий чорно-синій візуал без крипто-естетики, шрифт Manrope, анонімні NDA-кейси як формат уже існують, метрики «170+ проєктів / 15 країн / $1B+» вже є на головній, а в хіро вже стоїть форма «Describe your business problem». Головні проблеми: розмита ідентичність, таксономія «за технологією», відсутність Case Studies у головній навігації, 22-слайдова карусель кейсів (бриф прямо забороняє каруселі), нульові regulated-grade сигнали (жодного логотипа, сертифікації, testimonial), суперечливі цифри (5 vs 8+ років, 15 vs 35+ країн) і сміттєвий контент («test test test» на сторінці Team). З 12 рекомендованих блоків нової головної повноцінно існує лише 1 (фінальна CTA-форма), частково — 5, повністю відсутні — 6.

---

## 1. Візуальна система

### 1.1 Кольорова палітра (computed styles, знято через DevTools/JS на https://uapp.group)

| Роль | Значення | Де використовується |
|---|---|---|
| Основний фон | `#000000` (main), `#050505`, `#121212`, `#2A2A2A` | вся поверхня сайту, картки |
| Акцентний navy | `#00173F` (rgb 0,23,63) | блоки форм, підкладки карток (23 входження) |
| Головний градієнт заголовків | `linear-gradient(90deg, #2980B9 → #6DD5FA 50% → #FFFFFF)` | перше слово H1: «Empowering», «Case Studies», «Expertise», «Our team» (скр. 01, 04, 05, 06) |
| Сині акценти | `#1851F0`, `#1863DC`, `#2980B9`, `#0056A7` | кнопки, glow-плями, hover |
| Текст | `#FFFFFF` + прозорості 0.6/0.7/0.8 | основний текст — білий на чорному |
| Сірі | `#D0D0D0`, `#CCCCCC`, `#333` | другорядний текст, бордери |

Технічна неохайність: у 680 елементів computed color = `rgb(0,0,238)` — дефолтний браузерний колір посилань, глобально не перевизначений (візуально перекривається стилями дочірніх span'ів, але це показник якості CSS).

**Висновок:** палітра вже «bank-dark» — чорний + синій, без неону/монет/кіберпанку. Це актив, який можна еволюціонувати, а не ламати. Бракує світлої «paper»-поверхні для контрасту секцій та системності (немає токенів, все ad-hoc).

### 1.2 Типографіка

- Єдина гарнітура: **Manrope, sans-serif** (усі рівні). Фолбеки місцями голий `Arial` (кнопки date-picker).
- Шкала (computed, головна): H1 48/62.4 · H2 40/46 · H3 20/28 · H4 18/26 · body 16/24. Вага майже всюди **700** — навіть параграфи, тому ієрархія «плоска»: все жирне → ніщо не жирне.
- H1 48px для повноекранного хіро — скромно; «преміальні» фінтех-сайти працюють у діапазоні 64–96px або з кінетичною типографікою.
- Немає моноширинного шрифта / табличних цифр — для бренду «інженерна точність» (ISO-повідомлення, суми, реквізити) це втрачена можливість.

### 1.3 Сітка / layout

- Стандартний центрований контейнер (~1200px), 100vh-хіро на всіх сторінках (через це навіть службові сторінки відкриваються повноекранною «шпалерою» без контенту — скр. 03, 04, 06).
- Секції = «стрічка» однакових повноширинних блоків; ритм монотонний, без модульної сітки чи виразних розривів.
- На Services є одна цікава механіка — sticky-«switcher» етапів процесу (скр. 03b), але вона захована на підсторінці.

### 1.4 Імеджері

- **Хіро головної:** фонове відео `hero_video.mp4` (autoplay/loop/muted) — синя «хмара частинок» (скр. 01). Виглядає як сток «data particles», без метафори (не «рух грошей», не «два береги»).
- **Хіро підсторінок:** абстрактні стокові wave/mesh-рендери — сині хвилясті лінії (Expertise, скр. 04), боке-мережа (Team, скр. 06), синій дим (Contact, скр. 09). Красиво, але взаємозамінно з будь-яким IT-аутсорсом.
- **Кейси:** фото ноутбуків/планшетів з накладеними скринами на бетонному фоні (скр. 02d, 05a) — класичний mockup-сток-прийом.
- **Команда:** студійні фото в повний зріст на сірому фоні (скр. 02e, 06a, 06b) — найякісніший імеджері сайту, людяний і власний.
- **Іконки/діаграми:** «орбітальна» діаграма трифекти (скр. 02a), точкова мапа світу (скр. 02c), синій glow-blob (spotAnimation).

### 1.5 Анімації та моушн

- Фонове відео хіро; glow-пляма, що рухається (`spotAnimation.js`); лічильники метрик (`customerResultsAnimation.js` — скриншот 02c впіймав анімацію в русі: «$4M+» по дорозі до «$1B+»); Swiper-слайдери (`sliders.js`).
- Слайдер кейсів: 22–24 слайди, fade, ручні стрілки з лічильником «01 / 22» (скр. 02d). Слайдер команди: 8 слайдів.
- **`prefers-reduced-motion` не підтримується ніде** (перевірено grep по `front-page.min.css`, `services.min.css`, `common.min.css` — 0 входжень). Бриф вимагає reduced-motion fallback як must-have.

### 1.6 Загальне враження преміальності

Сайт «пристойний темний IT-аутсорс 2023 року»: акуратний, але без жодного сигнатурного елемента. Преміальність підривають: сток-абстракції, плоска типографіка, WordPress-артефакти (reCAPTCHA-бейдж, CookieYes-віджет поверх контенту зліва внизу — скр. 04, 06), сміттєвий текст «test test test» на /team/, дефолтні лічильники слайдів «05 / 0-2» в DOM, і найголовніше — жодного натяку на «нам можна довірити гроші».

---

## 2. UX / Інформаційна архітектура

### 2.1 Навігація (header, sticky)

`Services ▾ · Expertise ▾ · Insights · U-Camp · Careers · Our Team · [Get in touch]`

- **Case Studies відсутні в головній навігації.** Головний trust-актив досяжний лише через тизери «Read full case study» у мега-меню та слайдер на головній. (https://uapp.group/case-studies/ існує і навіть має фільтри — скр. 05.)
- Мега-меню Services/Expertise містить випадкові кейси-тизери (Widgets for Elementor, Apart Hotel, Blogging Platform…) — перше, що бачить CTO у дропдауні, це плагін для Elementor.
- Пункт «Solutions/Products» відсутній як клас — продуктової полиці немає взагалі.
- У пункті меню «Marketplaces, Auctions and Сrowdfunding» літера «С» — кирилична (видно в HTML; SEO/якість).

### 2.2 Таксономія

- **Services** (6, за функцією): Business Analysis · UI/UX Design · Software Engineering · Cybersecurity · Technical Support · **Digital Marketing**. Це «робимо все», аж до маркетингу.
- **Expertise** (7, за типом продукту): Digital Presence (79 проєктів!) · User Interfaces, Digital Wallets (25) · Business Management Systems (21) · Marketplaces/Auctions/Crowdfunding (17) · Blockchain-based Development (10) · Automation, Bots and AI (9) · Loyalty and MLM (8). **Жодного домену Fintech & Payments, Compliance & AML чи Security** (Cybersecurity лише як сервіс). Банківська глибина структурно невидима.

### 2.3 Потік головної (фактичний порядок секцій, https://uapp.group)

1. **Hero** — H1 «Empowering Innovation. Delivering Excellence.» + суб «A technology and digital solutions provider…» + «A provider that actually listens.» + **лід-форма праворуч** (скр. 01)
2. **Why us?** — трифекта Tech Stack / Domain Expertise / Top Talent (скр. 02a) — генеричні чесноти будь-якого вендора
3. **Services** — 6 сервісів з лічильниками проєктів (30/44/107/74/25/21) (скр. 02b)
4. **Clients' Results** — «A non-humble brag…» + точкова мапа світу + лічильники 1.5M+ / $1B+ / 35+ / 12+ (скр. 02c)
5. **Case study слайдер** — 22–24 фейд-слайди упереміш: Tattoo Studio, Auctions, Nutrition App, Pizza Delivery, Elementor-плагіни, Debt Management, Crypto Marketplace… (скр. 02d)
6. **Our Leadership** — слайдер 8 осіб (скр. 02e)
7. **Insights** — банер «Discover how the latest technologies times top talent can boost your business» + 3 пости (скр. 02f)
8. **CEO-квоут** — фото Олександра Жмурка + «Let's get in touch» (скр. 02g)
9. **Footer** — «UAPP is a company that offers the best solutions in the digital service lines, including software development and marketing services.» (скр. 02h)

### 2.4 CTA

- Тексти: «Get in touch» (header) · «Share with us» (хіро-форма) · «Learn More» ×4 · «Read More» · «Let's get in touch» (CEO) · «Contact us» (передфутерна смуга «Hi! We'd love to hear from you. Ready to adapt, grow, optimize or disrupt with us?»).
- Плюс: хіро-форма з заголовком «Describe your business problem and see if we can help out» — концептуально це вже «Describe your challenge» з брифу.
- Мінуси: CTA-різнобій (5 формулювань), «Learn More» домінує (слабке, неспецифічне), кнопки візуально тихі (текст-лінк або тонкий бордер), єдина «гучна» — біла «Share with us».

### 2.5 Форми

- **Хіро-форма (головна):** Name + Email + Message, submit «Share with us», reCAPTCHA v3, поля без `required`-атрибутів (валідація на боці CF7). Мінімальний friction — добре.
- **Contact Us (https://uapp.group/contact-us/):** чекбокс «Schedule a meeting» **увімкнений за замовчуванням** → одразу вимагає Day + Time (UTC) + тривалість (15m/30m/45m/1h) + платформу (Zoom/GoogleMeet) + Name + Email + Inquiry + обов'язковий consent-чекбокс + опційна підписка (скр. 09, 09a). Для «просто написати» це надлишковий friction; замість Calendly-патерну — саморобний date-picker без показу доступності.
- Фолбек помилки: «Sorry, the service isn't available right now. Please write on our email» — сигнал крихкості пайплайна лідів.

### 2.6 Каруселі/слайдери (бриф: заборонені)

1. Кейси на головній — 22–24 слайди, fade (найкритичніше: соц-доказ захований у слайдер, який ніхто не догорне).
2. Команда на головній — 8 слайдів.
3. Тизери кейсів у мега-меню — ротація.

---

## 3. Trust-сигнали

| Сигнал | Стан | Деталі |
|---|---|---|
| Метрики | ✅ є, але суперечливі | Головна: «170 projects / 15 countries» і поруч «35+ clients' countries presence»; /expertise/: «75 experts, 12+ years IT experience»; /team/: «more than 5 years worth of impact»; бриф каже «8+ years». Числа воюють між собою |
| Логотипи клієнтів/партнерів | ❌ немає | жодного логотипа на сайті |
| Testimonials | ❌ немає | цитат клієнтів нуль; є лише квоут власного CEO |
| Кейси | ⚠️ формат є, зміст проти нас | Формат «Client: NDA» вже існує (https://uapp.group/portfolio/debt-collection-platform/ — скр. 12a/12b: Overview, метрики 5K+ B2B clients, Tech Stack, Business Imperatives, Outcomes). Але «Related cases» до фінтех-кейсу — Elementor-віджети і поштові листівки |
| Сертифікації / комплаєнс | ❌ немає | жодного ISO/SOC2/PCI DSS/аудиту; слово compliance відсутнє |
| Безпека як тема | ⚠️ мінімум | Cybersecurity лише як сервіс-картка «25 projects»; ні bank-grade практик, ні процесів |
| Команда | ⚠️ є, з мінусами | Реальні фото і імена (сильно!), але титули діляться на Frontend/Backend («Technical Lead of Frontend», «Team Lead of Frontend» ×2, «Lead Frontend Engineer») — бриф прямо вимагає прибрати поділ FE/BE; на /team/ висить «test test test» |
| Домен-авторитет (Insights) | ❌ мертвий | 4 пости, останнє оновлення 2024-04-11 (sitemap) — блог стоїть 2+ роки; теми: банківська лояльність (1 релевантна!), AI-загальники, marketing trends, SEO |

---

## 4. GAP-аналіз: 12 рекомендованих блоків Home (бриф, розділ 6) vs поточний сайт

| # | Блок з брифу | Є зараз? | Що є на поточному сайті | Що суперечить новому позиціонуванню |
|---|---|---|---|---|
| 1 | **Header** — навігація + sticky CTA | ⚠️ частково | Sticky-хедер, CTA «Get in touch» | Нема Case Studies і Solutions у меню; дропдауни ведуть на 6 сервісів (вкл. Digital Marketing) і 7 «технологічних» доменів; мега-меню підсовує Elementor-кейси |
| 2 | **Hero** — один меседж + CTA + метрики + сигнатурний «вау»-ефект, НЕ слайдер | ⚠️ частково | Відео-фон з частинками, H1 + суб, лід-форма (близько до «Describe your challenge») | H1 «Empowering Innovation. Delivering Excellence.» — порожнє гасло (бриф: «порожній меседж» — прямо названий недоліком); суб = «дженераліст»-формула; метрик у хіро немає; відео-сток ≠ сигнатурний ефект, метафори «рух грошей / два береги» нуль; reduced-motion відсутній |
| 3 | **Positioning band** «Banking first, crypto where needed» | ❌ немає | — | Позиціонування протилежне: «technology and digital solutions provider»; крипта захована як «Blockchain-based Development» (10 проєктів) на рівні з «Loyalty and MLM» |
| 4 | **Trust-смуга** — метрики + партнери (ранній соц-доказ) | ⚠️ частково | «Clients' Results»: мапа + 1.5M+/$1B+/35+/12+ — але аж 4-ю секцією | Метрики хвалять «12+ industries» — це антиаргумент для ніші; партнерів/логотипів немає; цифри суперечать одна одній (15 vs 35+ країн) |
| 5 | **Expertise (4 домени: Fintech & Payments · Compliance & AML · Security · Crypto & Web3)** | ❌ немає | Є «Services» (6 функцій) та «Expertise» (7 продуктових категорій) | Жоден з 4 цільових доменів не існує; найбільша категорія — Digital Presence (79); Compliance/AML не згадані на сайті взагалі |
| 6 | **Solutions / showcase** (таби/картки, Embedded Crypto — флагман) | ❌ немає | Продуктового блоку немає в принципі | Сайт продає години/функції, а не продукти; Embedded Crypto for Banks, ISO 20022 Toolkit, Reconciliation Agent, SCA — ніщо з цього не представлено |
| 7 | **Selected work** — 3–6 анонімних фінтех-кейсів | ⚠️ частково | Слайдер 22–24 кейсів; формат NDA-кейса існує (Debt Management, Crypto Marketplace, Crowdfunding, Land Auctions) | Кейси не відібрані: піца, тату, косметика, Elementor-плагіни в одному ряду з фінтехом; карусель замість грида (бриф забороняє); жодного з 6 кейсів брифу (SEPA Instant, Mastercard tokenization, CAMT, Secure Enclave SCA, embedded crypto, multi-chain wallet) на сайті немає |
| 8 | **AI across every layer** + сертифікації | ❌ немає | «Automation, Bots and AI» — категорія експертизи (9 проєктів) + 1 старий пост про AI | AI подано як нішеву послугу, а не спосіб роботи (AI-assisted discovery/design-to-code/QA); сертифікацій нуль |
| 9 | **Approach / Why us** — regulated-grade, обидва береги, AI | ⚠️ частково | «Why us?» — Tech Stack / Domain Expertise / Top Talent (скр. 02a); на /services/ — 6-етапний процес та «What we Offer» (Team extension, Product research…) | Аргументи універсального вендора; ні слова про безпеку/комплаєнс/аудит у процесі; «Team extension» — мова бодішопу, що суперечить преміальному продуктовому тону |
| 10 | **Team teaser** — 8–10 сеньйорів, без поділу FE/BE | ⚠️ частково | Слайдер лідершипу на головній (8), повна сторінка /team/ з фото | Титули «Technical Lead of Frontend/Backend», «Lead Frontend Engineer» — прямо заборонений брифом поділ; «5 years worth of impact» замість 8+ |
| 11 | **Insights teaser** | ⚠️ частково | 3 пости на головній (скр. 02f) | Теми: marketing trends, SEO — транслюють «диджитал-агенцію»; контент мертвий з 04.2024; лише «Do loyalty programs work for banks?» натякає на банкінг |
| 12 | **Final CTA + форма «Describe your challenge»** | ✅ найближче до брифу | Хіро-форма «Describe your business problem…» + передфутер «Hi! We'd love to hear from you» + CEO CTA | Формулювання «Ready to adapt, grow, optimize or disrupt» — генерик; на /contact-us/ дефолтний «Schedule a meeting» додає friction |

**Підсумок:** 1 блок ✅ · 7 блоків ⚠️ (є оболонка, зміст проти брифу) · 4 блоки ❌ (Positioning band, Expertise-4-домени, Solutions/showcase, AI-layer) — **відсутні саме ті блоки, які несуть нове позиціонування**.

### Де сайт транслює «робимо все» замість banking-first (конкретні місця)

1. Хіро-суб: «A technology and digital solutions provider focusing on bespoke software development, consultancy and audit» (https://uapp.group).
2. Футер на кожній сторінці: «…best solutions in the digital service lines, including software development **and marketing services**».
3. Digital Marketing як core-сервіс нарівні з інженерією (https://uapp.group/services/, 21 проєкт).
4. «Clients' Results»: гордість за «12+ industries» — антитеза фокусу.
5. Слайдер кейсів головної: Pizza Delivery, Tattoo Studio, Cosmetic Marketplace, Blogging Platform, Elementor-плагіни ×3.
6. /expertise/: «We've completed 170 projects … across 12 industries», Digital Presence = 79 зі 170 проєктів (46% портфеля — «сайти й еко-системи присутності»).
7. Insights: «How to use marketing trends…», «Maximizing your SEO…» (https://uapp.group/insights/).
8. Careers наймає Junior/Middle FE/BE/QA «for a full-time office position» (https://uapp.group/careers/) — дисонанс зі стратегією «60 сеньйорів, преміум».

---

## 5. Топ-10 проблем, пріоритезовано за впливом на нову ЦА (CTO/Head of Payments/Compliance у банках, EMI, PSP, VASP)

1. **Позиціонування-генераліст у хіро.** Перші 5 секунд: «Empowering Innovation. Delivering Excellence» + «digital solutions provider». CTO банку не бачить себе. Це проблема №1, вона знецінює решту сайту. (https://uapp.group)
2. **Банківська/платіжна експертиза структурно не існує.** Немає доменів Fintech & Payments / Compliance & AML / Security; немає слів ISO 20022, SEPA, cards, reconciliation ніде на сайті. Head of Payments не має жодної сторінки, куди приземлитись. (https://uapp.group/expertise/)
3. **Нульові regulated-grade сигнали.** Ні сертифікацій, ні комплаєнс-практик, ні security-процесів, ні логотипів, ні testimonials. Для ЦА «нам можна довірити гроші» — це дискваліфікація на етапі шортліста.
4. **Соц-доказ похований у каруселі з нерелевантним контентом.** 22-слайдовий fade-слайдер, де фінтех-кейси змішані з піцою і тату; Case Studies немає в навігації. Бриф прямо вимагає грид 3–6 анонімних фінтех-кейсів і забороняє каруселі. (https://uapp.group, /case-studies/)
5. **Продуктової полиці (Solutions) немає взагалі.** Embedded Crypto for Banks — флагман нової стратегії — не має жодного носія на сайті; сайт продає ресурси («Team extension»), а не системи/продукти. (https://uapp.group/services/)
6. **Суперечливі й дрібні цифри руйнують інституційну довіру.** 15 vs 35+ країн, 5 vs 8/12+ років, «$1B+ clients' annual revenue» поруч з «12+ industries»; лічильник на скриншоті застигає на «$4M+». Банківська авдиторія читає цифри прискіпливо. (https://uapp.group, /team/, /expertise/)
7. **Якість виконання підриває «інженерну точність»:** «test test test» на /team/, typo «Define soluting and planning» (/services/), кирилична «С» у «Сrowdfunding» (меню), «serviceallows» без пробілу, 4×H1 на /insights/, глобально неперевизначений дефолтний колір посилань, відсутній prefers-reduced-motion. Кожна дрібниця — мінус до «bank-grade».
8. **AI-native не транслюється.** AI — це категорія з 9 проєктами та 1 постом 2023 року, а не наскрізний спосіб роботи; для брифу це окремий обов'язковий блок з сертифікаціями. (https://uapp.group/expertise/)
9. **Хіро-ефект не сигнатурний і без метафори.** Стокове відео частинок ≠ «рух грошей / два береги»; немає reduced-motion fallback (must-have брифу); H1 48px і плоска вага 700 не дають преміальної типографічної ієрархії.
10. **Contact-friction і слабкі CTA.** «Schedule a meeting» з Day/Time(UTC)/Zoom за замовчуванням замість легкого «Describe your challenge»; п'ять різних CTA-формулювань, домінує безлике «Learn More»; команда презентується з поділом FE/BE — все це проти патернів конверсії й вимог брифу. (https://uapp.group/contact-us/, /team/)

### Що варто зберегти/успадкувати при редизайні

- Чорно-синю стриману палітру (без крипто-неону) і Manrope як основу — за умов узгодження з брендбуком.
- Формат NDA-кейса (Overview → метрики → Tech Stack → Imperatives → Outcomes) — готовий каркас для 6 анонімних кейсів брифу.
- Живі студійні фото команди — рідкісний актив довіри, треба лише прибрати FE/BE-титули.
- Метрики 170+ / 15 країн / $1B+ — вже збігаються з мандатним hero-копірайтом брифу; лишилося звести цифри до єдиної версії.
- Патерн «форма прямо в хіро» — прямий місток до «Describe your challenge».

---

## Додаток: інвентар скриншотів (research/screenshots/)

| Файл | Що показує |
|---|---|
| 01-home-hero.png | Хіро головної: відео-частинки, градієнтний H1, лід-форма |
| 02-home-full.png | Повна висота вікна 12000px — демонструє 100vh-хіро |
| 02a…02h-home-*.png | Секції головної: Why us, Services, Clients' Results (мапа+лічильники), слайдер кейсів («01/22»), Leadership, Insights, CEO-CTA, футер |
| 03-services.png, 03a–03c | /services/: хіро, список сервісів з лічильниками, sticky-процес, «What we Offer» |
| 04-expertise.png, 04a–04b | /expertise/: хіро «75 experts…», 7 доменів з метриками |
| 05-case-studies.png, 05a–05b | /case-studies/: фільтри-таби і повний грид ~27 кейсів |
| 06-team.png, 06a–06b | /team/: хіро, лідершип (FE/BE-титули), грид експертів |
| 07-insights.png, 07a | /insights/: 4 пости, останній — 04.2024 |
| 08-careers.png, 08a | /careers/: Junior/Middle вакансії, Candidate Journey |
| 09-contact-us.png, 09a | /contact-us/: форма «Schedule a meeting» з date/time/Zoom |
| 10-u-camp.png | /u-camp/: освітній продукт |
| 11-service-software-engineering.png | Сторінка сервісу: Tech Stack, Core Focus Areas |
| 12-case-debt-collection.png, 12a–12b | NDA-кейс Debt Management: структура кейса, метрики, аутками |
| 13-case-crypto-marketplace.png | Кейс Cryptocurrency Marketplace |
