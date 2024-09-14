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
	font-size: 15px;
	overflow: hidden;
	text-align: center;
	#grid {
		margin: 0.5rem;
		width: auto;
		height: 33%;
		display: grid;
		grid-template-columns: 7rem 5rem 5rem 4rem;
		grid-template-rows: 2rem 2rem;
		grid-template-areas:
			"mario   empty   world   time"
			"points  coins   level   timeNumber";
		@media (orientation: landscape) {
			grid-template-columns: 8rem 6rem 6rem 5rem;
			font-size: 1.1rem;
			column-gap: 0.25rem;
		}
		@media (min-height: 800px) {
			font-size: 1.25rem;
			grid-template-columns: 7.5rem 5.5rem 6rem 6rem;
			row-gap: 0.4rem;
			margin-top: 2rem;
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
		height: 33.3%;
		padding-inline: 0.75rem;

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
				font-size: 1rem;
				font-family: "Press Start 2P", system-ui;
				font-weight: 400;
				font-style: normal;
				white-space: nowrap;
				animation: ${fadeInOut} 4s infinite;
				@media (orientation: landscape) {
					width: 100%;
					position: absolute;
					bottom: 10px;
					left: 0;
				}
				@media (min-height: 700px) {
					font-size: 1.25rem;
				}
			}
		}
	}
	#highscore {
		width: 100%;
		height: auto;
		padding-inline: 0.75rem;
		flex-grow: 1;
		p {
			font-size: 1.25rem;
			margin-top: 0rem;
			@media (min-height: 700px) {
				margin-top: 1rem;
			}
			@media (min-height: 750px) {
				margin-top: 2rem;
			}
			@media (min-height: 800px) {
				font-size: 1.25rem;
				margin-top: 3rem;
			}
			@media (orientation: landscape) {
				font-size: 1rem;
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
