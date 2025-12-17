import { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service - G-Track TMS",
  description: "Terms of Service for G-Track Transport Management System",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="December 18, 2025">
      <p className="lead">
        These Terms of Service (&quot;Terms&quot;) govern your use of the G-Track Transport
        Management System. By accessing or using our services, you agree to be bound
        by these Terms.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By creating an account or using G-Track, you acknowledge that you have read,
        understood, and agree to be bound by these Terms and our Privacy Policy.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        G-Track provides a cloud-based Transport Management System that enables
        businesses to manage their fleet operations, including:
      </p>
      <ul>
        <li>Driver management and documentation</li>
        <li>Fleet tracking and management</li>
        <li>Document storage and compliance tracking</li>
        <li>Operational reporting and analytics</li>
      </ul>

      <h2>3. User Accounts</h2>
      <p>You are responsible for:</p>
      <ul>
        <li>Maintaining the confidentiality of your account credentials</li>
        <li>All activities that occur under your account</li>
        <li>Notifying us immediately of any unauthorized access</li>
        <li>Ensuring all information provided is accurate and current</li>
      </ul>

      <h2>4. Acceptable Use</h2>
      <p>You agree NOT to:</p>
      <ul>
        <li>Use the service for any unlawful purpose</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Interfere with or disrupt the service</li>
        <li>Upload malicious code or content</li>
        <li>Resell or redistribute the service without authorization</li>
      </ul>

      <h2>5. Data Ownership</h2>
      <p>
        You retain all rights to your data. By using our service, you grant us
        a limited license to process your data solely for providing the service.
        We do not claim ownership of your content.
      </p>

      <h2>6. Service Availability</h2>
      <p>
        We strive to maintain 99.9% uptime but do not guarantee uninterrupted
        access. We may perform maintenance with reasonable notice. We are not
        liable for service interruptions beyond our control.
      </p>

      <h2>7. Payment Terms</h2>
      <p>
        Subscription fees are billed according to your selected plan.
        Fees are non-refundable except as required by law. We reserve the
        right to modify pricing with 30 days notice.
      </p>

      <h2>8. Termination</h2>
      <p>
        Either party may terminate this agreement with 30 days written notice.
        We may suspend or terminate accounts that violate these Terms.
        Upon termination, you may export your data within 30 days.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, G-Track shall not be liable
        for any indirect, incidental, special, or consequential damages.
        Our total liability shall not exceed the fees paid in the preceding 12 months.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless G-Track from any claims
        arising from your use of the service or violation of these Terms.
      </p>

      <h2>11. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the Czech Republic.
        Any disputes shall be resolved in the courts of Prague, Czech Republic.
      </p>

      <h2>12. Changes to Terms</h2>
      <p>
        We may modify these Terms at any time. Material changes will be
        communicated via email or in-app notification at least 30 days in advance.
      </p>

      <h2>13. Contact</h2>
      <p>For questions about these Terms, contact us at:</p>
      <ul>
        <li>Email: <a href="mailto:it@g-track.eu">it@g-track.eu</a></li>
      </ul>

      <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <p className="text-amber-800 dark:text-amber-200 text-sm">
          <strong>Note:</strong> This is a draft document. Please consult with a legal
          professional before final publication.
        </p>
      </div>
    </LegalLayout>
  );
}
