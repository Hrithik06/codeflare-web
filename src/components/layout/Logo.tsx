const Logo = ({ size = 32 }: { size?: number }) => (
	<div className="flex items-center gap-2">
		<svg
			width={size}
			height={size}
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="2"
				y="2"
				width="44"
				height="44"
				rx="12"
				fill="#7C3AED" /* violet-600 */
			/>
			<path
				d="M16 24c0-4.418 3.582-8 8-8h8"
				stroke="white"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<path
				d="M32 24c0 4.418-3.582 8-8 8h-8"
				stroke="white"
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</svg>

		<span className="text-lg font-semibold text-gray-900">GitTogether</span>
	</div>
);

export default Logo;
