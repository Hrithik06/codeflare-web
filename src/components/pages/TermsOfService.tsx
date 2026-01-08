import { Link } from "react-router-dom";
import LegalLayout from "../layout/LegalLayout";

const TermsOfService = () => {
	return (
		<LegalLayout title="Terms of Service">
			<p className="mb-4">
				Welcome to <strong>GitTogether</strong>. By using our website and
				services, you agree to comply with and be bound by the following Terms
				and Conditions. Please read them carefully.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Services</h2>
			<p className="mb-4">
				You agree to use our website and services only for lawful purposes and
				in accordance with all applicable laws and regulations.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">2. Payment Terms</h2>
			<p className="mb-4">
				All payments made through our payment gateway are subject to validation
				checks and authorization. We are not liable for any delays caused by
				third-party services.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				3. Intellectual Property
			</h2>
			<p className="mb-4">
				All content, trademarks, and logos on this website are the property of{" "}
				<strong>GitTogether</strong> and may not be used without prior written
				consent.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				4. Limitation of Liability
			</h2>
			<p className="mb-4">
				We are not liable for any indirect, incidental, or consequential damages
				arising from the use of our services or website.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
			<p className="mb-4">
				We reserve the right to update these Terms & Conditions at any time.
				Changes will be posted on this page.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">6. Contact Us</h2>
			<p>
				For questions about these Terms & Conditions, please contact us at{" "}
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

export default TermsOfService;
