"use client";

/* ============================================================================
   TRUST — продуктовые факты, а не социальное доказательство.
   Каждое число проверяемо по коду продукта:
     16 — типов документов водителя (gtrack-tms/src/config/documentTypes.ts)
     30 — дней демо (`subscription_plans.trial_days`)
     12 — локалей интерфейса (src/lib/landing-i18n.ts + приложение)
   Клиентские метрики (число водителей/документов) сюда НЕ возвращать без
   письменного согласия клиента: до 28.07.2026 здесь висели цифры прототипа.
   count-up анимируется MotionRoot по [data-target] / .cnum.
   ============================================================================ */

import { useLanding } from "./LandingProvider";

export function TrustStrip() {
  const { d } = useLanding();
  return (
    <section className="trust" data-screen-label="Метрики доверия">
      <div className="wrap trust-grid">
        <div className="metric reveal" data-target="16">
          <div className="num"><span className="cnum">16</span></div>
          <div className="lbl">{d.trust.m1}</div>
        </div>
        <div className="metric reveal" data-delay="80" data-target="30">
          <div className="num"><span className="cnum">30</span></div>
          <div className="lbl">{d.trust.m2}</div>
        </div>
        <div className="metric reveal" data-delay="160" data-target="12">
          <div className="num"><span className="cnum">12</span></div>
          <div className="lbl">{d.trust.m3}</div>
        </div>
      </div>
    </section>
  );
}
