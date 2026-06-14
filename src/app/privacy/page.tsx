import { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy — G-Track",
  description:
    "Privacy Policy for G-Track Software s.r.o. — how we process personal data as controller and processor under the GDPR.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="May 6, 2026">
      <p className="lead">
        This Privacy Policy explains how <strong>G-Track Software s.r.o.</strong> processes
        personal data. It applies to visitors of g-track.eu, prospective customers, individuals
        representing our customers, and recipients of our communications.{" "}
        <strong>
          It does NOT apply to data we process on behalf of our customers in the G-Track TMS
          platform
        </strong>{" "}
        — see section 2 below.
      </p>

      <h2>1. Who we are</h2>
      <p>
        <strong>G-Track Software s.r.o.</strong>, a Czech limited liability company, registered
        office Dagmar Burešové 2923/1, Žižkov, 130 00 Praha 3, Czech Republic, IČO 14237890,
        registered in the Commercial Register at the Municipal Court in Prague (&quot;G-Track&quot;,
        &quot;we&quot;).
      </p>
      <p>
        Contact for privacy matters:{" "}
        <a href="mailto:privacy@g-track.eu">privacy@g-track.eu</a>
      </p>
      <p>
        We have not appointed a Data Protection Officer (Article 37 GDPR) because our processing
        activities do not meet the mandatory thresholds.
      </p>

      <h2>2. Two roles</h2>
      <p>
        <strong>Role A — Controller of our own data.</strong> When you visit our website, send us
        an enquiry, become our paying customer, sign in as a customer administrator, or receive
        our marketing communications, <strong>we act as the data controller</strong>. This Policy
        describes those activities.
      </p>
      <p>
        <strong>Role B — Processor on behalf of our customers.</strong> Our customers (transport
        companies) upload data about their drivers, employees, vehicles and operations to G-Track
        TMS. <strong>For that data, our customer is the controller and G-Track is the processor.</strong>{" "}
        This Policy does NOT govern such data. If you are a driver/employee of one of our customers,
        please contact your employer. The contractual basis is set out in a Data Processing Agreement
        (DPA) per Article 28 GDPR.
      </p>

      <h2>3. Personal data we process (as controller)</h2>
      <h3>3.1 Categories</h3>
      <ul>
        <li>
          <strong>Identification data</strong> — name, surname, date of birth (where applicable for
          KYC).
        </li>
        <li>
          <strong>Contact data</strong> — business email, phone, postal address, emergency contact.
        </li>
        <li>
          <strong>Account data</strong> — username, password hash or SSO identifier (Microsoft Azure
          AD), role, language/timezone, registration date, account status.
        </li>
        <li>
          <strong>Billing data</strong> — company name, VAT/IČO, billing address, currency, plan,
          invoice line items. <strong>Card numbers and full bank-account numbers are NOT stored by
          us</strong> — Stripe handles them.
        </li>
        <li>
          <strong>Device data</strong> — IP (truncated where supported), user agent, browser, OS,
          approx. location, timezone, session/auth cookies.
        </li>
        <li>
          <strong>Usage data</strong> — pages viewed, features used, clicks, analytics.{" "}
          <strong>Collected only with consent.</strong>
        </li>
        <li>
          <strong>Email interaction data</strong> — open/click on marketing emails only; operational
          emails not tracked beyond delivery.
        </li>
        <li>
          <strong>Job applicant data</strong> — CV, cover letter, education, interview notes,
          references.
        </li>
        <li>
          <strong>Communications content</strong> — content of any communications between us.
        </li>
      </ul>
      <h3>3.2 Sources</h3>
      <p>
        Mostly from you or derived from your use. External sources include: (a) limited billing data
        from Stripe; (b) identity claims from Microsoft Azure AD on SSO; (c) job applicant data from
        LinkedIn/agencies; (d) data from public registers/courts where needed for legal claims.
      </p>
      <h3>3.3 Consequences of not providing data</h3>
      <p>
        You are not obliged to provide data, but failure may mean we cannot conclude/perform a
        contract, complete a paid subscription, consider a job application, or fulfil a rights
        request.
      </p>

      <h2>4. Why and on what legal basis we process your data</h2>
      <p>
        <strong>4.1 Website operation and security</strong> — Art. 6(1)(f) — legitimate interest.
      </p>
      <p>
        <strong>4.2 Website analytics</strong> — Art. 6(1)(a) — consent via cookie banner.
      </p>
      <p>
        <strong>4.3 Enquiries and demo requests</strong> — Art. 6(1)(b) pre-contractual / 6(1)(f)
        legitimate interest.
      </p>
      <p>
        <strong>4.4 Provision of G-Track TMS service</strong> — Art. 6(1)(b) — performance of
        contract.
      </p>
      <p>
        <strong>4.5 Billing, invoicing, accounting compliance</strong> — Art. 6(1)(b) AND Art.
        6(1)(c) — Czech Acts 563/1991, 235/2004 (VAT), 586/1992 (Income Tax).
      </p>
      <p>
        <strong>4.6 Marketing</strong> — (a) direct marketing to existing customers: Art. 6(1)(f) +
        opt-out under Czech Act 480/2004 § 7(3); (b) newsletter to prospects: Art. 6(1)(a) consent;
        (c) email interaction analytics: Art. 6(1)(f).
      </p>
      <p>
        <strong>4.7 Recruitment</strong> — Art. 6(1)(b) pre-contractual; database retention Art.
        6(1)(a) consent (up to 5 years, revocable).
      </p>
      <p>
        <strong>4.8 Defence of legal claims, fraud prevention, security</strong> — Art. 6(1)(f).
      </p>
      <p>
        <strong>4.9.1 General communications</strong> — Art. 6(1)(a) or (f).
      </p>
      <p>
        <strong>4.9.2 Mergers and acquisitions</strong> — limited due-diligence access and
        post-transaction transfer to an investor; Art. 6(1)(f) legitimate interest.
      </p>
      <p>
        <strong>4.9.3 Internal analytics</strong> — Art. 6(1)(f).
      </p>
      <p>
        <strong>4.9.4 Free use of anonymized data</strong> — once properly anonymized, data falls
        outside GDPR. Basis for the anonymization step itself: Art. 6(1)(f).
      </p>

      <h2>5. Cookies and tracking</h2>
      <p>
        We use cookies and similar technologies on g-track.eu and within the application. Cookies
        fall into two groups: <strong>strictly necessary</strong> (set without consent, cannot be
        disabled) and <strong>analytics/preference</strong> (set only with consent via cookie
        banner).
      </p>
      <h3>5.1 Essential (strictly necessary)</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Type</th>
            <th>Lifetime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>sb-*-auth-token</code>
            </td>
            <td>Supabase authentication session</td>
            <td>localStorage</td>
            <td>Session</td>
          </tr>
          <tr>
            <td>
              <code>sb-*-auth-token-code-verifier</code>
            </td>
            <td>PKCE verifier for secure auth flow</td>
            <td>localStorage</td>
            <td>Temporary</td>
          </tr>
        </tbody>
      </table>
      <h3>5.2 Functional (preferences)</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Type</th>
            <th>Lifetime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>i18nextLng</code>
            </td>
            <td>Selected language preference</td>
            <td>localStorage</td>
            <td>Persistent</td>
          </tr>
          <tr>
            <td>
              <code>theme</code>
            </td>
            <td>Light/dark theme preference</td>
            <td>localStorage</td>
            <td>Persistent</td>
          </tr>
          <tr>
            <td>
              <code>sidebar:state</code>
            </td>
            <td>Sidebar collapsed/expanded state</td>
            <td>cookie</td>
            <td>7 days</td>
          </tr>
        </tbody>
      </table>
      <h3>5.3 Analytics, advertising, tracking</h3>
      <p>
        We do <strong>not</strong> currently use any analytics, advertising or cross-site tracking
        cookies. Any future addition would require activation of a consent banner. We do not use
        cookies for cross-site behavioural advertising.
      </p>

      <h2>6. Recipients of personal data</h2>
      <p>
        We share personal data with carefully selected providers acting as our processors:
      </p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Provider</th>
            <th>Service</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <strong>Supabase, Inc.</strong> (EU entity)
            </td>
            <td>Database hosting, authentication, storage, edge functions</td>
            <td>EEA (Ireland — eu-west-1)</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <strong>Microsoft Ireland Operations Limited</strong>
            </td>
            <td>
              Identity provider (Azure AD / Entra ID), transactional email via noreply@g-track.eu
            </td>
            <td>EEA</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              <strong>Stripe Payments Europe, Limited</strong>
            </td>
            <td>Payment processing, subscription billing, invoicing</td>
            <td>EEA (Ireland) with onward processing in the United States</td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              <strong>Amazon Web Services EMEA SARL</strong> (AWS Bedrock)
            </td>
            <td>AI-assisted document field extraction (Service Personal Data — see DPA)</td>
            <td>EEA (Frankfurt — eu-central-1)</td>
          </tr>
        </tbody>
      </table>
      <p>
        We may also disclose personal data to: (a) <strong>Affiliates</strong> (currently including
        Mesartim Plus s.r.o., a sister entity providing technical development services); (b){" "}
        <strong>professional advisors</strong>; (c) <strong>public authorities and courts</strong>;
        (d) <strong>law-enforcement bodies</strong>; (e) <strong>buyers and their advisors</strong>{" "}
        in case of M&amp;A — see 4.9.2; (f) any other recipients you specifically authorise.
      </p>
      <p>
        <strong>We do not sell personal data.</strong>
      </p>

      <h2>7. International transfers</h2>
      <p>
        Our default position is to process personal data within the EEA. Where transfer outside the
        EEA is necessary — currently only Stripe&apos;s onward processing in the US — we rely on the{" "}
        <strong>Standard Contractual Clauses</strong> (Commission Implementing Decision (EU)
        2021/914) supplemented by additional measures (encryption, contractual undertakings,
        transparency reports). Where applicable, we may also rely on adequacy decisions (e.g.
        EU-U.S. Data Privacy Framework).
      </p>

      <h2>8. Retention</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Website logs</td>
            <td>Up to 12 months</td>
          </tr>
          <tr>
            <td>Analytics (with consent)</td>
            <td>Up to 14 months</td>
          </tr>
          <tr>
            <td>Enquiries / demo requests</td>
            <td>24 months from last contact</td>
          </tr>
          <tr>
            <td>Customer account, transactions, support data</td>
            <td>Duration of relationship + 10 years</td>
          </tr>
          <tr>
            <td>Invoices and accounting records</td>
            <td>10 years (Czech Act 563/1991)</td>
          </tr>
          <tr>
            <td>Tax records</td>
            <td>10 years (Czech VAT Act § 35)</td>
          </tr>
          <tr>
            <td>Marketing email subscriptions</td>
            <td>Until unsubscribe (suppression list maintained)</td>
          </tr>
          <tr>
            <td>Job applications (closed without offer)</td>
            <td>6 months (or up to 5 years with consent)</td>
          </tr>
          <tr>
            <td>Anonymized data</td>
            <td>No retention limit</td>
          </tr>
          <tr>
            <td>Data needed for defence of legal claims</td>
            <td>Until full settlement and expiry of limitation periods</td>
          </tr>
        </tbody>
      </table>

      <h2>9. Your rights</h2>
      <ul>
        <li>
          <strong>Access (Art. 15)</strong>, <strong>rectification (Art. 16)</strong>,{" "}
          <strong>erasure (Art. 17)</strong>, <strong>restriction (Art. 18)</strong>,{" "}
          <strong>portability (Art. 20)</strong>, <strong>object (Art. 21)</strong> incl. absolute
          right against direct marketing, <strong>withdraw consent (Art. 7(3))</strong>,{" "}
          <strong>not to be subject to solely automated decisions (Art. 22)</strong>.
        </li>
        <li>
          <strong>Lodge a complaint</strong> — Czech Office for Personal Data Protection (ÚOOÚ),
          Pplk. Sochora 27, 170 00 Praha 7,{" "}
          <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">
            www.uoou.cz
          </a>
          .
        </li>
      </ul>
      <p>
        To exercise rights, write to{" "}
        <a href="mailto:privacy@g-track.eu">privacy@g-track.eu</a>. We respond within one month
        (extendable by two months for complex requests). If you are a data subject of one of our
        customers, please contact your employer first — see section 2.
      </p>

      <h2>10. Children</h2>
      <p>
        G-Track is a B2B service. Not directed to children under 16; we do not knowingly collect
        data from children. Contact{" "}
        <a href="mailto:privacy@g-track.eu">privacy@g-track.eu</a> if you become aware of such data.
      </p>

      <h2>11. Security</h2>
      <p>
        Article 32 GDPR measures: encryption in transit (TLS 1.2+) and at rest, RBAC, audit logging,
        least privilege, row-level tenant isolation, regular backups, personnel confidentiality and
        training. Detailed measures for Service Personal Data are in Annex II of our DPA.
      </p>
      <p>
        If we become aware of a personal data breach likely to result in a high risk to your rights,
        we will notify you per Article 34 GDPR.
      </p>

      <h2>12. Automated decision-making</h2>
      <p>
        We do not use solely automated decision-making (incl. profiling) producing legal or
        similarly significant effects in relation to website visitors, prospects, customer
        administrators or other data subjects covered by this Policy.
      </p>
      <p>
        The G-Track TMS platform uses AI-assisted extraction of data fields from documents uploaded
        by customers (e.g. driving licences). This is performed on Service Personal Data and is
        governed by the DPA with the relevant customer.
      </p>

      <h2>13. Changes to this Policy</h2>
      <p>
        We may update this Policy. The updated version is posted at this URL with a new effective
        date. For material changes affecting your data, we provide additional notice (email or
        in-app banner) where appropriate.
      </p>

      <h2>14. Languages and contact</h2>
      <p>
        This Privacy Policy is provided in English and Czech.{" "}
        <strong>In case of any inconsistency, the Czech version shall prevail</strong> for matters
        governed by Czech law and concerning data subjects in the Czech Republic.
      </p>
      <p>
        <strong>G-Track Software s.r.o.</strong>
        <br />
        Dagmar Burešové 2923/1, Žižkov, 130 00 Praha 3, Czech Republic
        <br />
        IČO: 14237890
        <br />
        Privacy: <a href="mailto:privacy@g-track.eu">privacy@g-track.eu</a> · Support:{" "}
        <a href="mailto:support@g-track.eu">support@g-track.eu</a>
      </p>
    </LegalLayout>
  );
}
