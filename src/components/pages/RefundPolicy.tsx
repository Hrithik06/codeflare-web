import { Link } from "react-router-dom";
import LegalLayout from "../layout/LegalLayout";

const RefundPolicy = () => {
	return (
		<LegalLayout title="Refund & Cancellation Policy">
			<p className="mb-4">
				At <strong>GitTogether</strong>, all sales are final. Once a payment is
				made, it is <strong>non-refundable</strong> and{" "}
				<strong>non-cancellable</strong> under any circumstances.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">No Refunds</h2>
			<p className="mb-4">
				We do not provide refunds or accept cancellation requests after a
				payment is successfully processed. Please ensure you review your order
				carefully before completing the transaction.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
			<p>
				For any queries related to payments, you can reach us at{" "}
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

export default RefundPolicy;
