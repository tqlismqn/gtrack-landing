import { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service — G-Track",
  description:
    "Terms of Service for G-Track TMS — the fleet compliance management platform operated by G-Track Software s.r.o.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="May 6, 2026">
      <p className="lead">
        G-Track TMS — Fleet Compliance Management Platform
      </p>

      <h2>1. Introduction</h2>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of G-Track TMS, a
        fleet compliance management platform (&quot;Service&quot;), operated by G-Track Software
        s.r.o., a company incorporated under the laws of the Czech Republic, with registered office
        at Dagmar Burešové 2923/1, Žižkov, 130 00 Praha 3, IČO: 14237890, registered in the
        Commercial Register maintained by the Municipal Court in Prague, file no. C 362529
        (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
      </p>
      <p>
        By creating an account, subscribing to a plan, or otherwise accessing the Service, you
        (&quot;Customer&quot;, &quot;you&quot;) agree to be bound by these Terms. If you are entering
        into these Terms on behalf of a company or other legal entity, you represent that you have
        authority to bind that entity.
      </p>
      <p>
        The Service is available at{" "}
        <a href="https://app.g-track.eu" target="_blank" rel="noopener noreferrer">
          https://app.g-track.eu
        </a>
        .
      </p>

      <h2>2. Definitions</h2>
      <ul>
        <li>
          <strong>&quot;Account&quot;</strong> means the account created by the Customer to access
          the Service.
        </li>
        <li>
          <strong>&quot;Authorized User&quot;</strong> means any individual granted access to the
          Service under the Customer&apos;s Account.
        </li>
        <li>
          <strong>&quot;Customer Data&quot;</strong> means any data, including personal data,
          uploaded by the Customer or Authorized Users through the Service.
        </li>
        <li>
          <strong>&quot;Subscription&quot;</strong> means the paid plan selected by the Customer.
        </li>
        <li>
          <strong>&quot;Billing Period&quot;</strong> means the recurring interval for which the
          Customer is charged.
        </li>
      </ul>

      <h2>3. Service Description</h2>
      <p>
        G-Track TMS is a cloud-based, multi-tenant B2B SaaS platform designed for transport and
        logistics companies. The Service provides tools for managing personnel records, vehicle and
        fleet data, document compliance, permit and certificate tracking, expiry notifications,
        reporting, and team collaboration.
      </p>
      <p>
        The Service is provided &quot;as is&quot; and &quot;as available.&quot; We continuously
        improve the Service and may add, modify, or remove features at our discretion. We will
        provide reasonable notice of material changes that significantly reduce functionality.
      </p>

      <h2>4. Account Registration and Security</h2>
      <p>
        4.1. To use the Service, you must create an Account by providing accurate and complete
        registration information.
      </p>
      <p>
        4.2. You are responsible for maintaining the confidentiality of your Account credentials and
        for all activities that occur under your Account.
      </p>
      <p>
        4.3. You must notify us immediately at{" "}
        <a href="mailto:support@g-track.eu">support@g-track.eu</a> if you become aware of any
        unauthorized use of your Account.
      </p>
      <p>
        4.4. We reserve the right to suspend or terminate any Account that we reasonably believe has
        been compromised or is being used in violation of these Terms.
      </p>

      <h2>5. Subscriptions and Billing</h2>
      <p>
        5.1. <strong>Free Trial.</strong> We may offer a free trial period of up to 30 days. At the
        end of the trial, you must subscribe to a paid plan to continue using the Service.
      </p>
      <p>
        5.2. <strong>Subscription Plans.</strong> The Service is offered under subscription plans
        (Pro, Advanced, Business). Optional add-on packs may be purchased to extend capacity.
      </p>
      <p>
        5.3. <strong>Billing.</strong> Subscriptions are billed in advance at the beginning of each
        Billing Period. Payments are processed through Stripe. All prices are in Euros (EUR) and are
        exclusive of applicable taxes unless stated otherwise.
      </p>
      <p>
        5.4. <strong>Auto-Renewal.</strong> Subscriptions automatically renew at the end of each
        Billing Period unless cancelled before the renewal date.
      </p>
      <p>
        5.5. <strong>Price Changes.</strong> We may change subscription prices with at least 30
        days&apos; prior notice.
      </p>
      <p>
        5.6. <strong>Taxes.</strong> The Customer is responsible for any applicable taxes, including
        VAT, except for taxes based on our net income.
      </p>

      <h2>6. Cancellation and No Refunds</h2>
      <p>
        6.1. <strong>Cancellation by Customer.</strong> You may cancel your Subscription at any time.
        Upon cancellation, you will retain access until the end of your current Billing Period.
      </p>
      <p>
        6.2. <strong>No Refunds.</strong> All fees are non-refundable. We do not provide refunds or
        credits for partial billing periods, unused time, or downgrades.
      </p>
      <p>
        6.3. <strong>Effect of Cancellation.</strong> After the current Billing Period ends:
      </p>
      <ul>
        <li>
          Your Account will enter a 30-day grace period during which data remains accessible in
          read-only mode.
        </li>
        <li>
          After the grace period, the Account and all associated Customer Data will be permanently
          deleted.
        </li>
      </ul>

      <h2>7. Payment Failure</h2>
      <p>
        7.1. If a payment fails, we will attempt to collect up to three (3) times over a 7-day
        period.
      </p>
      <p>
        7.2. If payment remains unsuccessful, your Account enters a &quot;past due&quot; state. Write
        access may be restricted.
      </p>
      <p>
        7.3. If payment is not resolved within 30 days, your Account will be blocked. After 90 days
        of blocked status, the Account and all Customer Data will be permanently deleted.
      </p>
      <p>
        7.4. You may reactivate your Account at any time before deletion by updating your payment
        method and settling any outstanding balance.
      </p>

      <h2>8. Acceptable Use</h2>
      <p>8.1. You agree not to use the Service to:</p>
      <ul>
        <li>Violate any applicable law or regulation;</li>
        <li>Infringe on the intellectual property rights of any third party;</li>
        <li>Upload or transmit malicious code, viruses, or harmful data;</li>
        <li>Attempt to gain unauthorized access to the Service or other accounts;</li>
        <li>Use the Service for purposes other than legitimate business operations;</li>
        <li>Resell, sublicense, or redistribute the Service without our written consent;</li>
        <li>Interfere with or disrupt the integrity or performance of the Service.</li>
      </ul>

      <h2>9. Customer Data and Data Ownership</h2>
      <p>
        9.1. <strong>Ownership.</strong> You retain all rights, title, and interest in your Customer
        Data.
      </p>
      <p>
        9.2. <strong>License.</strong> By uploading Customer Data, you grant us a limited,
        non-exclusive license to process, store, and display your data solely to provide the
        Service.
      </p>
      <p>
        9.3. <strong>Data Export.</strong> You may export your Customer Data at any time through the
        export functionality.
      </p>
      <p>
        9.4. <strong>Data Processing.</strong> We process personal data contained in Customer Data as
        a data processor on your behalf. A Data Processing Agreement (DPA) is available on the DPA
        tab.
      </p>
      <p>
        9.5. <strong>Data Deletion.</strong> Upon termination and expiration of the applicable
        retention period, all Customer Data will be permanently deleted. Backups are purged within 30
        days of deletion.
      </p>

      <h2>10. Intellectual Property</h2>
      <p>
        10.1. The Service, including its design, code, features, documentation, and trademarks, is
        and remains the exclusive property of G-Track Software s.r.o.
      </p>
      <p>
        10.2. These Terms grant you a limited, revocable, non-exclusive, non-transferable right to
        use the Service in accordance with these Terms for the duration of your Subscription.
      </p>
      <p>
        10.3. You may not copy, modify, distribute, reverse engineer, decompile, or create
        derivative works from the Service.
      </p>

      <h2>11. Availability and Support</h2>
      <p>
        11.1. We will use commercially reasonable efforts to maintain the availability of the
        Service. We do not guarantee uninterrupted or error-free operation.
      </p>
      <p>11.2. Planned maintenance will be scheduled during off-peak hours when possible.</p>
      <p>
        11.3. Support is available via email at{" "}
        <a href="mailto:support@g-track.eu">support@g-track.eu</a> during business hours
        (CET/CEST, Mon–Fri).
      </p>

      <h2>12. Limitation of Liability</h2>
      <p>
        12.1. <strong>Disclaimer of Warranties.</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE
        SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
        KIND.
      </p>
      <p>
        12.2. <strong>Limitation.</strong> IN NO EVENT SHALL THE COMPANY BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
      </p>
      <p>
        12.3. <strong>Cap.</strong> THE COMPANY&apos;S TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE
        TOTAL AMOUNT PAID BY THE CUSTOMER DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT.
      </p>
      <p>
        12.4. The limitations do not apply to liability arising from willful misconduct or gross
        negligence, as required under Czech law.
      </p>

      <h2>13. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless the Company from any claims arising from:
        your use of the Service in violation of these Terms; your violation of any law; any
        third-party claim related to your Customer Data.
      </p>

      <h2>14. Termination</h2>
      <p>
        14.1. <strong>By Customer.</strong> You may terminate at any time by cancelling your
        Subscription and deleting your Account.
      </p>
      <p>
        14.2. <strong>By Company.</strong> We may suspend or terminate access immediately if you
        materially breach these Terms and fail to cure within 14 days, fail to pay, or where required
        by law.
      </p>
      <p>
        14.3. <strong>Survival.</strong> Sections 6, 9, 10, 12, 13, and 16 shall survive termination.
      </p>

      <h2>15. Modifications to Terms</h2>
      <p>
        15.1. We may modify these Terms with at least 30 days&apos; prior notice for material
        changes.
      </p>
      <p>
        15.2. Your continued use of the Service after the effective date constitutes acceptance.
      </p>

      <h2>16. Governing Law and Dispute Resolution</h2>
      <p>16.1. These Terms are governed by the laws of the Czech Republic.</p>
      <p>
        16.2. Disputes shall be submitted to the exclusive jurisdiction of the courts of the Czech
        Republic, with the Municipal Court in Prague as the court of first instance.
      </p>
      <p>
        16.3. Both parties agree to attempt amicable resolution through good-faith negotiations for
        at least 30 days before any legal proceedings.
      </p>

      <h2>17. Force Majeure</h2>
      <p>
        Neither party shall be liable for any failure or delay caused by circumstances beyond
        reasonable control, including natural disasters, war, terrorism, pandemics, government
        actions, power failures, internet outages, or third-party service provider failures.
      </p>

      <h2>18. General Provisions</h2>
      <p>
        18.1. <strong>Entire Agreement.</strong> These Terms, together with the Privacy Policy,
        constitute the entire agreement.
      </p>
      <p>
        18.2. <strong>Severability.</strong> If any provision is unenforceable, the remaining
        provisions continue in full force.
      </p>
      <p>
        18.3. <strong>Waiver.</strong> Failure to enforce any right shall not constitute a waiver.
      </p>
      <p>
        18.4. <strong>Assignment.</strong> You may not assign your rights without our prior written
        consent.
      </p>
      <p>
        18.5. <strong>Language.</strong> These Terms are drafted in English. In case of any
        discrepancy with translations, the English version shall prevail.
      </p>

      <h2>19. Contact Information</h2>
      <p>
        G-Track Software s.r.o.
        <br />
        Dagmar Burešové 2923/1, Žižkov, 130 00 Praha 3, Czech Republic
        <br />
        IČO: 14237890
        <br />
        Email: <a href="mailto:support@g-track.eu">support@g-track.eu</a>
      </p>
    </LegalLayout>
  );
}
