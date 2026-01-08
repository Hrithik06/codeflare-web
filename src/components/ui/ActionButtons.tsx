// import { Link } from "react-router-dom";

// export type ButtonAction = {
// 	label: string;
// 	onClick?: (
// 		event?: React.MouseEvent<HTMLButtonElement>,
// 	) => void | Promise<void>;
// 	type?: "primary" | "secondary" | "error" | "success";
// 	toolTipLabel?: string | null;
// 	navigateTo?: string | null;
// };

// type ActionButtonsProps = {
// 	actions: ButtonAction[];
// };

// const ActionButtons = ({ actions }: ActionButtonsProps): React.JSX.Element => {
// 	return (
// 		<div className="flex gap-2">
// 			{actions.map((action) => {
// 				const {
// 					label,
// 					onClick,
// 					type = "primary",
// 					toolTipLabel,
// 					navigateTo,
// 					// data,
// 				} = action;
// 				const button = (
// 					<button
// 						className={`btn btn-${type} btn-sm sm:btn-md rounded-full`}
// 						onClick={onClick}
// 						type="button"
// 					>
// 						{label}
// 					</button>
// 				);

// 				const content = navigateTo ? (
// 					<Link to={navigateTo}>{button}</Link>
// 				) : (
// 					button
// 				);

// 				return (
// 					<div
// 						key={label}
// 						className={toolTipLabel ? "tooltip tooltip-top" : undefined}
// 						data-tip={toolTipLabel ?? undefined}
// 					>
// 						{content}
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// };

// export default ActionButtons;

import { Link } from "react-router-dom";
type ButtonType = "primary" | "subtle" | "neutral" | "danger";

export type ButtonAction = {
	label: string;
	onClick?: (
		event?: React.MouseEvent<HTMLButtonElement>,
	) => void | Promise<void>;
	type?: ButtonType;
	toolTipLabel?: string | null;
	navigateTo?: string | null;
};

type ActionButtonsProps = {
	actions: ButtonAction[];
};

// const typeStyles: Record<NonNullable<ButtonAction["type"]>, string> = {
// 	primary:
// 		"bg-violet-100 text-violet-700 border border-violet-200 hover:bg-violet-200",
// 	secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
// 	// success: "bg-green-600 text-white hover:bg-green-700",
// 	success:
// 		"bg-violet-600 text-white border border-violet-600 hover:bg-violet-700",
// 	error: "bg-red-600 text-white hover:bg-red-700",
// };

const typeStyles: Record<ButtonType, string> = {
	// Brand primary action: Accept, Message, Save
	primary:
		"bg-violet-600 text-white border border-violet-600 hover:bg-violet-700",

	// Brand subtle: secondary positive, low pressure
	subtle:
		"bg-violet-100 text-violet-700 border border-violet-200 hover:bg-violet-200",

	// Neutral: cancel, ignore, back
	neutral: "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200",

	// Destructive: reject, remove, delete
	danger: "bg-red-500 text-white border border-red-600 hover:bg-red-600",
};

const ActionButtons = ({ actions }: ActionButtonsProps): React.JSX.Element => {
	return (
		<div className="flex gap-2">
			{actions.map((action) => {
				const {
					label,
					onClick,
					type = "primary",
					toolTipLabel,
					navigateTo,
				} = action;

				const button = (
					<button
						type="button"
						onClick={onClick}
						className={`
              px-4 py-1.5 rounded-full text-sm font-medium
              transition-all
              hover:scale-105 active:scale-95
              ${typeStyles[type]}
            `}
					>
						{label}
					</button>
				);

				const wrapped = navigateTo ? (
					<Link to={navigateTo}>{button}</Link>
				) : (
					button
				);

				return (
					<div key={label} className="relative group">
						{wrapped}

						{toolTipLabel && (
							<div
								className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                           whitespace-nowrap px-2 py-1 text-xs
                           bg-black text-white rounded
                           opacity-0 group-hover:opacity-100
                           transition-opacity"
							>
								{toolTipLabel}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default ActionButtons;
