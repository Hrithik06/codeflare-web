import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
	return (
		<footer className="bg-neutral text-neutral-content border-t border-neutral/20">
			<div className="max-w-6xl mx-auto px-4 py-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
					<div>
						<Logo />
						<p className="mt-1 text-sm text-gray-500">
							Build meaningful connections.
						</p>
					</div>

					<div>
						<h6 className="text-sm font-medium mb-3">Terms & Policies</h6>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									to="/terms-of-service"
									className="text-gray-600 hover:text-violet-600 transition"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									to="/privacy-policy"
									className="text-gray-600 hover:text-violet-600 transition"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									to="/refunds"
									className="text-gray-600 hover:text-violet-600 transition"
								>
									Refund Policy
								</Link>
							</li>
							<li>
								<Link
									to="/contact-us"
									className="text-gray-600 hover:text-violet-600 transition"
								>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<p className="mt-8 text-xs text-gray-400">
					© {new Date().getFullYear()} GitTogether. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
