type LegalLayoutProps = {
	title: string;
	children: React.ReactNode;
};

const LegalLayout = ({ title, children }: LegalLayoutProps) => {
	return (
		<div
			className="min-h-screen bg-gray-50  bg-[linear-gradient(rgba(255,255,255,0.88),rgba(255,255,255,0.2)),url(/background.jpg)]
                   bg-cover bg-center"
		>
			<div className="max-w-3xl mx-auto px-4 py-12">
				<h1 className="text-3xl font-semibold text-gray-900 mb-8">{title}</h1>

				<div className="prose prose-gray max-w-none">{children}</div>
			</div>
		</div>
	);
};

export default LegalLayout;
