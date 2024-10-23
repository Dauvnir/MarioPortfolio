import styled, { keyframes } from "styled-components";
import coin from "../assets/welcomePage/coinCount.gif"; // change to coin Count .gif
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const fadeInOut = keyframes`
  0% {
    opacity: 0.01  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.01;
  }
`;

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 4;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	color: var(--font-color);
	overflow: hidden;
	text-align: center;
	text-shadow: 1px 1px 0px black;
	padding-inline: 10%;

	#points {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: space-between;
		align-items: end;
		flex-direction: row;
		font-size: clamp(1rem, 0.5rem + 1vw, 3rem);
		padding: 2rem;
		margin-bottom: 5rem;
		@media (orientation: portrait) {
			opacity: 0;
		}
		p {
			margin: 0;
		}
	}
	#coinCount {
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			height: auto;
			width: 16px;
			image-rendering: pixelated;
			transform: scale(3);
			margin-right: 12px;
		}
	}
	#marioPoints {
		text-align: left;
	}
	#time {
		text-align: right;
	}

	#button {
		width: 100%;
		padding-inline: 0.75rem;
		flex-grow: 1;
		background: none;
		border: none;
		cursor: pointer;
		position: relative;
		span {
			color: var(--font-color);
			position: absolute;
			left: 50%;
			top: 60%;
			transform: translate(-50%, -50%);
			text-shadow: 1px 1px 0px black;
			font-size: clamp(1rem, 0.85rem + 1vw, 4rem);
			font-family: "Press Start 2P", system-ui;
			font-weight: 400;
			font-style: normal;
			white-space: nowrap;
			animation: ${fadeInOut} 4s infinite;
		}
	}

	#highscore {
		margin-bottom: 1rem;
		width: 100%;
		height: auto;
		@media (orientation: portrait) {
			opacity: 0;
		}
		span {
			font-size: clamp(1rem, 0.75rem + 1vw, 3rem);
		}
	}
`;
const Text = ({ handleShowWarningAndNavigate }) => {
	const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1300);
	let points = localStorage.getItem("highscore");
	if (points === null || points === undefined) {
		points = "000000";
	}

	useEffect(() => {
		const handleResize = () => {
			setIsLargeScreen(window.innerWidth > 1300);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return (
		<Wrapper>
			<div id="points">
				<p id="marioPoints">
					Mario <br /> 000000
				</p>

				<p id="coinCount">
					<img
						src={coin}
						alt="coin"
					/>
					x00
				</p>

				<p>
					World <br />
					1-1
				</p>
				<p id="time">
					Time <br />
					000
				</p>
			</div>
			<button
				id="button"
				onClick={handleShowWarningAndNavigate}
			>
				{isLargeScreen ? (
					<span>Click Here to Start</span>
				) : (
					<span>Tap Here to Start</span>
				)}
			</button>
			<p id="highscore">
				<span>Highscore - {points}</span>
			</p>
		</Wrapper>
	);
};
Text.propTypes = {
	handleShowWarningAndNavigate: PropTypes.func.isRequired,
};
export default Text;
