import { Link } from "react-router-dom";

export type ButtonAction = {
	label: string;
	onClick?: (
		event?: React.MouseEvent<HTMLButtonElement>,
	) => void | Promise<void>;
	type?: "primary" | "secondary" | "error" | "success";
	toolTipLabel?: string | null;
	navigateTo?: string | null;
};

type ActionButtonsProps = {
	actions: ButtonAction[];
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
					// data,
				} = action;
				const button = (
					<button
						className={`btn btn-${type} btn-sm sm:btn-md rounded-full`}
						onClick={onClick}
						type="button"
					>
						{label}
					</button>
				);

				const content = navigateTo ? (
					<Link to={navigateTo}>{button}</Link>
				) : (
					button
				);

				return (
					<div
						key={label}
						className={toolTipLabel ? "tooltip tooltip-top" : undefined}
						data-tip={toolTipLabel ?? undefined}
					>
						{content}
					</div>
				);
			})}
		</div>
	);
};

export default ActionButtons;
