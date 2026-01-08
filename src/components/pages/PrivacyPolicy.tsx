import { Link } from "react-router-dom";
import LegalLayout from "../layout/LegalLayout";

const PrivacyPolicy = () => {
	return (
		<LegalLayout title="Privacy Policy">
			<p className="mb-4">
				At <strong>GitTogether</strong>, we value your privacy and are committed
				to protecting your personal information. This Privacy Policy outlines
				how we collect, use, and safeguard your data when you use our website or
				services.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				1. Information We Collect
			</h2>
			<p className="mb-4">
				We may collect information such as your name, email address, phone
				number, and payment details when you use our services, contact us, or
				interact with our website.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				2. How We Use Your Information
			</h2>
			<p className="mb-4">
				We use the collected information to provide services, process payments,
				communicate with you, improve user experience, and comply with legal and
				regulatory requirements.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				3. Data Privacy & Security
			</h2>
			<p className="mb-4">
				Your data is stored securely, and we follow strict security protocols to
				prevent unauthorized access, loss, or misuse. We use encryption and
				other industry-standard measures to protect your information.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				4. Sharing of Information
			</h2>
			<p className="mb-4">
				We do not sell, rent, or trade your personal information to third
				parties. Your data is shared only with trusted service providers (such
				as payment gateways) strictly for fulfilling services you have
				requested, under confidentiality agreements.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				5. Third-Party Services
			</h2>
			<p className="mb-4">
				Our website may use third-party services such as analytics or payment
				processors. These services have their own privacy policies, and we
				recommend reviewing them separately.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				6. Cookies & Tracking Technologies
			</h2>
			<p className="mb-4">
				We use cookies to enhance your browsing experience, analyze site
				traffic, and understand user behavior. You can choose to disable cookies
				through your browser settings, though this may limit certain features of
				the website.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				7. Compliance with Laws
			</h2>
			<p className="mb-4">
				We comply with applicable data protection laws, including India’s
				Information Technology Act and global data protection standards where
				relevant.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">8. Your Rights</h2>
			<p className="mb-4">
				You have the right to access, modify, or request deletion of your
				personal data. To exercise these rights, please contact us at{" "}
				<Link
					to={"/contact-us"}
					className="text-violet-600 underline hover:text-violet-700"
				>
					contact us
				</Link>
				.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				9. Changes to This Policy
			</h2>
			<p className="mb-4">
				We may update this Privacy Policy from time to time. Changes will be
				posted on this page with the updated date. We encourage you to review
				this policy periodically.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
			<p>
				If you have any questions about this Privacy Policy, please reach out to
				us at{" "}
				<Link
					to={"/contact-us"}
					className="text-violet-600 underline hover:text-violet-700"
				>
					contact us
				</Link>
				.
			</p>
		</LegalLayout>
	);
};

export default PrivacyPolicy;
