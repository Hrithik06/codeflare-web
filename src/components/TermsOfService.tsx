import { Link } from "react-router-dom";
const TermsOfService = () => {
	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

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
				<Link to={"/contact-us"} className="text-blue-600 underline">
					contact us
				</Link>
				.
			</p>
		</div>
	);
};

export default TermsOfService;
