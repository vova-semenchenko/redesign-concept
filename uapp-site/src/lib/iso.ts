/**
 * Ізометрія 2:1 — єдина проєкція для всієї графіки сайту.
 *
 * Осі моделі (x, y — підлога; z — вгору) на екран:
 *   x → ( 1,  0.5)   углиб, вниз-праворуч
 *   y → (−1,  0.5)   углиб, вниз-ліворуч
 *   z → ( 0, −1)     вгору, від підлоги
 *
 * Звідси sx = x − y, sy = 0.5·(x + y) − z.
 *
 * Ці три вектори — єдине джерело істини. DESIGN.md називає сталість кута
 * правилом, яке не обговорюється: щойно один об'єкт намальовано в іншій
 * проєкції, окремі малюнки перестають читатися як одна система.
 *
 * Хелпери повертають шляхи вже в координатах viewBox: `frame` бере на себе
 * масштаб і зсув. Це не косметика. Якби масштаб жив у transform групи,
 * разом із ним їхали б stroke-dasharray і товщина ліній масок, і пунктир
 * у великій схемі не збігався б із пунктиром в іконці.
 */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export type Pt = readonly [number, number];

export interface Frame {
  /** Модельних одиниць → одиниць viewBox. */
  scale: number;
  /** Куди в viewBox потрапляє початок координат моделі. */
  ox: number;
  oy: number;
}

export function frame(scale: number, ox: number, oy: number): Frame {
  return { scale, ox, oy };
}

/** Точка моделі → точка viewBox. Відсутні осі вважаються нулем. */
export function pt(v: Partial<Vec3>, f: Frame): Pt {
  const x = v.x ?? 0;
  const y = v.y ?? 0;
  const z = v.z ?? 0;
  return [f.ox + (x - y) * f.scale, f.oy + (0.5 * (x + y) - z) * f.scale];
}

const fmt = (n: number) => Math.round(n * 1000) / 1000;

/** Замкнений полігон із точок viewBox. */
export function poly(points: Pt[]): string {
  return (
    points.map((p, i) => `${i ? "L" : "M"}${fmt(p[0])} ${fmt(p[1])}`).join("") +
    "Z"
  );
}

/** Відрізок між двома точками моделі. */
export function seg(a: Partial<Vec3>, b: Partial<Vec3>, f: Frame): string {
  const [x1, y1] = pt(a, f);
  const [x2, y2] = pt(b, f);
  return `M${fmt(x1)} ${fmt(y1)}L${fmt(x2)} ${fmt(y2)}`;
}

export interface BoxSpec {
  /** Дальній нижній кут у моделі. */
  x?: number;
  y?: number;
  z?: number;
  /** Розміри по осях моделі. */
  w?: number;
  d?: number;
  h?: number;
}

export interface BoxPaths {
  /** Три видимі грані — для єдиного заливного об'єкта композиції. */
  top: string;
  left: string;
  right: string;
  /** Контур усіх видимих ребер — для каркасних об'єктів. */
  wire: string;
  /** Три приховані ребра — «наскрізна» конструкція, як у CAD. */
  hidden: string;
  /** Верхня центральна точка — до неї чіпляються лідер-лінії. */
  anchor: Pt;
}

/**
 * Куб — атом системи. Модулі, продукти, шари — це коробка або стос коробок;
 * значення іконки будується модифікацією куба, а не окремим символом.
 */
export function box(spec: BoxSpec, f: Frame): BoxPaths {
  const { x = 0, y = 0, z = 0, w = 1, d = 1, h = 1 } = spec;

  // Вісім вершин: n — нижня грань, u — верхня.
  const n000 = { x, y, z };
  const n100 = { x: x + w, y, z };
  const n110 = { x: x + w, y: y + d, z };
  const n010 = { x, y: y + d, z };
  const u000 = { ...n000, z: z + h };
  const u100 = { ...n100, z: z + h };
  const u110 = { ...n110, z: z + h };
  const u010 = { ...n010, z: z + h };

  const P = (v: Vec3) => pt(v, f);

  const top = poly([P(u000), P(u100), P(u110), P(u010)]);
  const right = poly([P(u100), P(n100), P(n110), P(u110)]);
  const left = poly([P(u010), P(u110), P(n110), P(n010)]);

  // Видимі ребра: верхня грань плюс три вертикалі плюс дві нижні.
  const wire = [
    poly([P(u000), P(u100), P(u110), P(u010)]),
    seg(u100, n100, f),
    seg(u110, n110, f),
    seg(u010, n010, f),
    seg(n100, n110, f),
    seg(n110, n010, f),
  ].join("");

  // Прихована вершина n000 і три ребра до неї.
  const hidden = [
    seg(u000, n000, f),
    seg(n000, n100, f),
    seg(n000, n010, f),
  ].join("");

  return {
    top,
    left,
    right,
    wire,
    hidden,
    anchor: P({ x: x + w / 2, y: y + d / 2, z: z + h }),
  };
}

/**
 * Коло в площині підлоги проєктується в еліпс із відношенням осей рівно 2:1
 * (rx = r√2, ry = r√2⁄2) — те саме відношення, що й у самої проєкції.
 * Використовується для пунктирних орбіт і кілець зв'язку.
 */
export function orbit(center: Partial<Vec3>, r: number, f: Frame) {
  const [cx, cy] = pt(center, f);
  const rx = r * Math.SQRT2 * f.scale;
  return { cx: fmt(cx), cy: fmt(cy), rx: fmt(rx), ry: fmt(rx / 2) };
}

/**
 * Ізометрична підлога-сітка: два пучки паралельних ліній уздовж осей моделі.
 * Об'єкти висять над нею на пунктирних стійках — це і дає глибину без тіней.
 */
export function floorGrid(
  f: Frame,
  { size = 6, step = 1, z = 0 }: { size?: number; step?: number; z?: number } = {},
): string {
  const out: string[] = [];
  for (let i = -size; i <= size; i += step) {
    out.push(seg({ x: i, y: -size, z }, { x: i, y: size, z }, f));
    out.push(seg({ x: -size, y: i, z }, { x: size, y: i, z }, f));
  }
  return out.join("");
}

/** Стійка від об'єкта до підлоги — пунктирна, читається як розмірна лінія. */
export function standoff(v: Partial<Vec3>, floorZ: number, f: Frame): string {
  return seg(v, { ...v, z: floorZ }, f);
}

/**
 * Лідер-лінія від точки на схемі до поля з ключем: короткий похилий відрізок
 * у напрямку поля, далі горизонтальна поличка під підпис.
 */
export function leader(
  from: Pt,
  { dx, dy = 0 }: { dx: number; dy?: number },
): string {
  const kink = 10 * Math.sign(dx);
  const [x, y] = from;
  return `M${fmt(x)} ${fmt(y)}L${fmt(x + kink)} ${fmt(y + dy)}L${fmt(x + dx)} ${fmt(y + dy)}`;
}
