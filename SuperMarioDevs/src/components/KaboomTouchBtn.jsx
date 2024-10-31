import styled from "styled-components";

import left from "../assets/inputs/tile_0760.png";
import right from "../assets/inputs/tile_0758.png";
import jump from "../assets/inputs/tile_0004.png";
import sprint from "../assets/inputs/tile_0005.png";
import { useEffect } from "react";

const Wrapper = styled.div`
	width: 100%;
	height: 5rem;

	display: flex;
	@media (min-width: 1024px) {
		display: none;
	}
	justify-content: space-between;
	align-items: center;

	padding: 0 1rem 1rem 1rem;
	/* margin-bottom: 1rem; */ // add if needed

	div {
		height: 100%;
		width: 50%;

		display: flex;
		align-items: center;
		justify-content: right;
		flex-direction: row;
		button {
			width: 25%;
			height: 100%;

			border: none;
			background: none;

			-webkit-tap-highlight-color: transparent;
			outline: none;
			user-select: none;

			img {
				max-width: 100%;
				height: 100%;

				opacity: 50%;

				image-rendering: pixelated;
				object-fit: contain;

				user-select: none;
			}
		}
		#alignRight {
			display: flex;
			justify-content: right;
			align-items: center;
		}
		.alignLeft {
			display: flex;
			justify-content: left;
			align-items: center;
		}
	}
	#arrowBtns {
		justify-content: left !important;
	}
`;
function dispatchDirection(direction = null) {
	const event = new CustomEvent("direction", {
		detail: direction,
	});
	document.dispatchEvent(event);
}

function dispatchJump(jump = false) {
	const event = new CustomEvent("jump", {
		detail: jump,
	});
	document.dispatchEvent(event);
}

function dispatchSprint(sprint = false) {
	const event = new CustomEvent("sprint", {
		detail: sprint,
	});
	document.dispatchEvent(event);
}

// Define KaboomTouchBtn component
const KaboomTouchBtn = () => {
	useEffect(() => {
		document.addEventListener("contextmenu", (e) => e.preventDefault());

		return () => {
			document.removeEventListener("contextmenu", (e) => e.preventDefault());
		};
	}, []);
	return (
		<Wrapper>
			<div id="arrowBtns">
				<button
					id="alignRight"
					onTouchStart={() => dispatchDirection("left")}
					onTouchEnd={() => dispatchDirection(null)}
				>
					<img
						src={left}
						alt="left"
						draggable="false"
					/>
				</button>
				<button
					onTouchStart={() => dispatchDirection("right")}
					onTouchEnd={() => dispatchDirection(null)}
				>
					<img
						src={right}
						alt="right"
						draggable="false"
					/>
				</button>
			</div>
			<div>
				<button
					className="alignLeft"
					onTouchStart={() => dispatchJump(true)}
					onTouchEnd={() => dispatchJump(false)}
				>
					<img
						src={jump}
						alt="jump"
						draggable="false"
					/>
				</button>
				<button
					className="alignLeft"
					onTouchStart={() => dispatchSprint(true)}
					onTouchEnd={() => dispatchSprint(false)}
				>
					<img
						src={sprint}
						alt="sprint"
						draggable="false"
					/>
				</button>
			</div>
		</Wrapper>
	);
};

export default KaboomTouchBtn;
