import { Link } from "react-router-dom";

const RefundPolicy = () => {
	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Refund & Cancellation Policy</h1>

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
				<Link to={"/contact-us"} className="text-blue-600 underline">
					contact us
				</Link>
				.
			</p>
		</div>
	);
};

export default RefundPolicy;
