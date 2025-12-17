import { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy - G-Track TMS",
  description: "Privacy Policy for G-Track Transport Management System",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="December 18, 2025">
      {/* Draft Warning */}
      <div className="not-prose mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <p className="text-amber-800 dark:text-amber-200 text-sm">
          <strong>Note:</strong> This is a draft document. Please consult with a legal
          professional before final publication.
        </p>
      </div>

      <p className="lead">
        G-Track (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, and safeguard your information
        when you use our Transport Management System.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect information that you provide directly to us:</p>
      <ul>
        <li><strong>Account Information:</strong> Name, email address, company name, phone number</li>
        <li><strong>Driver Information:</strong> Driver details, license information, documents</li>
        <li><strong>Usage Data:</strong> How you interact with our services</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information to:</p>
      <ul>
        <li>Provide and maintain our TMS services</li>
        <li>Process and manage driver and fleet data</li>
        <li>Send service-related communications</li>
        <li>Improve and optimize our platform</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>3. Data Storage and Security</h2>
      <p>
        Your data is stored securely on servers located in the European Union.
        We implement industry-standard security measures including encryption,
        access controls, and regular security audits.
      </p>

      <h2>4. Data Sharing</h2>
      <p>We do not sell your personal data. We may share data with:</p>
      <ul>
        <li>Service providers who assist in operating our platform</li>
        <li>Legal authorities when required by law</li>
        <li>Business partners with your explicit consent</li>
      </ul>

      <h2>5. Your Rights (GDPR)</h2>
      <p>Under GDPR, you have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Rectify inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Object to data processing</li>
        <li>Data portability</li>
        <li>Withdraw consent at any time</li>
      </ul>

      <h2>6. Cookies</h2>
      <p>
        We use essential cookies for authentication and security.
        Analytics cookies are used only with your consent to improve our services.
      </p>

      <h2>7. Data Retention</h2>
      <p>
        We retain your data for as long as your account is active or as needed
        to provide services. Upon account deletion, data is removed within 30 days,
        except where retention is required by law.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        For privacy-related inquiries or to exercise your rights, contact us at:
      </p>
      <ul>
        <li>Email: <a href="mailto:it@g-track.eu">it@g-track.eu</a></li>
        <li>Address: [Company Address, Czech Republic]</li>
      </ul>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. We will notify you of
        significant changes via email or through the application.
      </p>
    </LegalLayout>
  );
}
