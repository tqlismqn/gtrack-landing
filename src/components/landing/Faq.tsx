"use client";

/* ============================================================================
   ВОПРОСЫ И ОТВЕТЫ (Б4).

   Десять вопросов — формулировки реальных возражений перевозчика, а не
   маркетинговые «а чем вы хороши». Плюс отдельный блок «чего G-Track не делает»:
   самая частая подмена понятий — принять учёт документов за тахограф-анализ,
   и дешевле отсечь это здесь, чем на тридцатый день демо.

   JSON-LD FAQPage сознательно НЕ добавляется: Google выключил FAQ rich results
   7 мая 2026 и удалил документацию 15 июня, а контролируемый тест Ahrefs
   (1885 страниц против 4000 контрольных) не нашёл прироста цитируемости в
   AI-ответах. При нулевой отдаче остаётся ненулевой риск: manual action за
   разметку, не соответствующую контенту, снимает rich-result eligibility со
   всей страницы — включая работающие Organization и SoftwareApplication.

   Раскрытие — нативный <details>, без JS и без библиотек: доступно с
   клавиатуры, ищется через Cmd+F в закрытом виде, деградирует в обычный текст
   при выключенном JS.
   ============================================================================ */

import { useLanding } from "./LandingProvider";
import { SALES_MAILTO } from "./urls";

type Item = { q: string; a: readonly string[] };

export function Faq() {
  const { d } = useLanding();
  const f = d.faq;

  const groups: ReadonlyArray<{ head: string; items: readonly Item[] }> = [
    {
      head: f.g1,
      items: [
        { q: f.q1, a: [f.a1, f.a1b] },
        { q: f.q2, a: [f.a2] },
        { q: f.q3, a: [f.a3] },
      ],
    },
    {
      head: f.g2,
      items: [
        { q: f.q4, a: [f.a4, f.a4b] },
        { q: f.q5, a: [f.a5] },
        { q: f.q6, a: [f.a6] },
        { q: f.q7, a: [f.a7, f.a7b] },
      ],
    },
    {
      head: f.g3,
      items: [
        { q: f.q8, a: [f.a8] },
        { q: f.q9, a: [f.a9] },
        { q: f.q10, a: [f.a10, f.a10b] },
      ],
    },
  ];

  return (
    <section className="sect" id="faq" data-screen-label="Вопросы и ответы">
      <div className="wrap">
        <div className="faq-cols">
          <div className="faq-aside">
            <span className="overline">{f.overline}</span>
            <h2 className="h2 reveal">{f.h2}</h2>
            <p className="sect-sub reveal" data-delay="60">{f.sub}</p>
            <p className="faq-ask reveal" data-delay="120">
              {f.askLead} <a href={SALES_MAILTO}>{f.askCta}</a>
            </p>
          </div>

          <div>
            {groups.map((g, gi) => (
              <div className="faq-group" key={g.head}>
                <div className="faq-group-head reveal" data-delay={gi * 40}>{g.head}</div>
                {g.items.map((it) => (
                  <details className="faq-q reveal" key={it.q}>
                    <summary>
                      <span className="faq-qt">{it.q}</span>
                      <span className="faq-mark" aria-hidden="true" />
                    </summary>
                    <div className="faq-a">
                      {it.a.map((p) => <p key={p}>{p}</p>)}
                    </div>
                  </details>
                ))}
              </div>
            ))}

            {/* «чего не делает» — не аккордеон: это ровно тот текст, который
                должен прочитаться без клика */}
            <div className="faq-group faq-not">
              <div className="faq-group-head reveal">{f.notHead}</div>
              <p className="faq-not-sub reveal">{f.notSub}</p>
              <ul className="faq-not-list">
                <li className="reveal">{f.not1}</li>
                <li className="reveal" data-delay="60">{f.not2}</li>
                <li className="reveal" data-delay="120">{f.not3}</li>
                <li className="reveal" data-delay="180">{f.not4}</li>
              </ul>
              <p className="faq-bridge reveal">{f.notBridge}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
