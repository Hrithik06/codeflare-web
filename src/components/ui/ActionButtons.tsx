export type ButtonAction = {
	label: string;
	onClick: (
		event?: React.MouseEvent<HTMLButtonElement>,
	) => void | Promise<void>;
	type?: string;
	toolTipLabel?: string | null;
};
type ActionButtonsProps = {
	actions: [ButtonAction, ButtonAction];
};
const ActionButtons = ({ actions }: ActionButtonsProps): React.JSX.Element => {
	return (
		<div className="flex gap-2">
			{actions.map((action) => {
				return (
					<div
						className={action.toolTipLabel ? "tooltip tooltip-top" : ""}
						data-tip={action.toolTipLabel}
						key={action.label}
					>
						<button
							className={`btn btn-${action.type || "primary"} rounded-full`}
							onClick={action.onClick}
						>
							{action.label}
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default ActionButtons;
