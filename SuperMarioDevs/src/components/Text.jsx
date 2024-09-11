import styled from "styled-components";
import coin from "../assets/coin.png";
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
		grid-template-columns: 6rem 5rem 5rem 5rem;
		grid-template-rows: 2rem 2rem;
		grid-template-areas:
			"mario   empty   world   time"
			"points  coins   level   timeNumber";
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
				width: 24px;
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
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			background: none;
			width: 100%;
			height: 100%;
			border: none;
			color: var(--font-color);
			cursor: pointer;
			text-align: center;
			padding: 0;

			span {
				font-size: 1rem;
				font-family: "Press Start 2P", system-ui;
				font-weight: 400;
				font-style: normal;
				white-space: nowrap;
			}
		}
	}
	#highscore {
		width: 100%;
		height: auto;
		padding-inline: 0.75rem;
		margin-top: 1rem;
		flex-grow: 1;
	}
`;
const Text = () => {
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
				<button>
					<span>Tap Anywhere to Start</span>
				</button>
			</div>
			<div id="highscore">
				<span>TOP-000000</span>
			</div>
		</Wrapper>
	);
};

export default Text;
