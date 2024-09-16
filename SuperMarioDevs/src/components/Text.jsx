import styled, { keyframes } from "styled-components";
import coin from "../assets/mariocoin.gif";
import PropTypes from "prop-types";

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
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 4;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: var(--font-color);
	overflow: hidden;
	text-align: center;
	text-shadow: 1px 1px 0px black;

	#grid {
		width: 100%;
		max-width: 60rem;
		padding: 1rem;
		font-size: clamp(14px, 3vw, 1.75rem);
		height: 33%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 0.6fr;
		grid-template-rows: 2rem 2rem;
		column-gap: 1rem;
		overflow: hidden;
		grid-template-areas:
			"mario   empty   world   time"
			"points  coins   level   timeNumber";
		@media (orientation: landscape) {
			row-gap: 0.5rem;
		}
		#mario {
			grid-area: mario;
			justify-self: left;
			align-self: center;
		}
		#world {
			grid-area: world;
			justify-self: center;
			align-self: center;
		}
		#time {
			grid-area: time;
			justify-self: center;
			align-self: center;
		}
		#points {
			grid-area: points;
			justify-self: left;
			align-self: center;
		}
		#coins {
			grid-area: coins;
			justify-self: center;
			align-self: center;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 16px;
				height: auto;
				image-rendering: optimizeQuality;
				width: clamp(16px, 3vw, 32px);
			}
		}
		#level {
			grid-area: "level";
			justify-self: center;
			align-self: center;
		}
		#timeNumber {
			grid-area: timeNumber;
			justify-self: center;
			align-self: center;
		}
		#empty {
			grid-area: empty;
		}
	}
	#button {
		width: 100%;
		height: 30%;
		padding-inline: 0.75rem;
		margin: auto 0;
		@media (orientation: landscape) {
			height: 20%;
			margin-top: 5.5rem;
		}
		button {
			background: none;
			width: 100%;
			height: 100%;
			border: none;
			color: var(--font-color);
			cursor: pointer;
			text-align: center;
			padding: 0;
			position: relative;
			span {
				text-shadow: 1px 1px 0px black;
				font-size: clamp(1rem, 4vw, 1.75rem);
				font-family: "Press Start 2P", system-ui;
				font-weight: 400;
				font-style: normal;
				white-space: nowrap;
				animation: ${fadeInOut} 4s infinite;
				position: absolute;
				left: 50%;
				bottom: 20%;
				transform: translate(-50%, -20%);
				@media (orientation: landscape) {
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translate(-50%, 0);
					font-size: clamp(1rem, 3vw, 1.75rem);
				}
			}
		}
	}
	#highscore {
		width: 100%;
		height: auto;
		padding-inline: 0.75rem;
		flex-grow: 1;
		position: relative;
		p {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: clamp(1rem, 4vw, 1.75rem);
			@media (orientation: landscape) {
				top: 0;
				left: 50%;
				transform: translate(-50%, 0);
				font-size: clamp(1rem, 3vw, 1.75rem);
			}
		}
	}
`;
const Text = ({ handlerShowWarning }) => {
	return (
		<Wrapper>
			<div id="grid">
				<span id="mario">MARIO</span>
				<span id="empty"></span>
				<span id="world">WORLD</span>
				<span id="time">TIME</span>
				<span id="points">000000</span>
				<span id="coins">
					<img
						src={coin}
						alt="coin"
					/>
					x00
				</span>
				<span id="level">1-1</span>
				<span id="timeNumber">000</span>
			</div>
			<div id="button">
				<button onClick={handlerShowWarning}>
					<span>Tap Here to Start</span>
				</button>
			</div>
			<div id="highscore">
				<p>TOP-000000</p>
			</div>
		</Wrapper>
	);
};
Text.propTypes = {
	handlerShowWarning: PropTypes.func.isRequired,
};
export default Text;
