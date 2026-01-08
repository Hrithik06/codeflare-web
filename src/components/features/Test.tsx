import type { FC } from "react";
const CardContainer: FC = () => {
	return <div className="card-container" id="cardContainer"></div>;
};
const Test: FC = () => {
	return (
		<div>
			<CardContainer />
		</div>
	);
};

export default Test;
