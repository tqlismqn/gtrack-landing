/* ============================================================================
   Кольцо готовности «к рейсу NN%» — переиспользуемый мокап-примитив
   (hero-доска; кадры истории, где оно тоже стояло, сняты 04.10.2026). Разметка 1:1 с прототипом;
   stroke-dashoffset = 97.39 · (1 − pct/100), как в захардкоженных значениях.
   ============================================================================ */

const C = 97.39; /* 2π·15.5 */

/* `mid` (янтарное кольцо) ставит вызывающий по порогу приложения:
   ≥ 80 % зелёный, ≥ 50 % янтарный (arcColor в планировании, сверено
   02.10.2026). Анимаций у кольца нет: отсчёт 86 → 98 в Hero снят вместе
   с атрибутом data-live, который нужен был только ему. */
interface RingProps {
  pct: number;
  mid?: boolean;
  big?: boolean;
  cap: string;
}

export function Ring({ pct, mid, big, cap }: RingProps) {
  const offset = (C * (1 - pct / 100)).toFixed(2);
  return (
    <span className="ringbox">
      <span className={`ring${mid ? " mid" : ""}${big ? " big" : ""}`}>
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle className="track" cx="18" cy="18" r="15.5" strokeWidth="3.5" />
          <circle
            className="val"
            cx="18"
            cy="18"
            r="15.5"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="97.39"
            strokeDashoffset={offset}
          />
        </svg>
        <span className="ring-num">{pct}%</span>
      </span>
      <span className="ring-cap">{cap}</span>
    </span>
  );
}
