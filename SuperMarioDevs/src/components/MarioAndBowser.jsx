import styled from "styled-components";
import mountains from "../assets/welcomePage/mountains2.png";
import pipeline from "../assets/welcomePage/pipe.png";
import bowser from "../assets/welcomePage/bowser.png";
import mario from "../assets/welcomePage/mario.png";
import bushes from "../assets/welcomePage/bushes.png";
import goomba from "../assets/welcomePage/goomba.png";

const MARIO_MEDIA_WIDTH_1600 = 40;
const MARIO_MEDIA_WIDTH_1330 = 35;
const GOOMBA_MEDIA_WIDTH_1600 = 45;
const GOOMBA_MEDIA_WIDTH_1330 = 40;
const GOOMBA = 35;
const MARIO = 30;

const Wrap = styled.div`
	height: 10rem;
	width: 100vw;
	display: flex;
	justify-content: left;
	align-items: flex-end;
	gap: 1rem;
	position: relative;
	z-index: 1;
	flex-grow: 1;
	#marioMountain {
		height: 100%;
		width: 40%;
		position: relative;
		z-index: 1;
		flex-grow: 1;
		#mountain {
			width: 100%;
			height: auto;
			image-rendering: crisp-edges;
			max-width: 240px;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 1;
			@media (min-width: 1000px) {
				max-width: 360px;
				image-rendering: pixelated;
			}
		}
		#mario {
			position: absolute;
			bottom: 0;
			left: 3rem;
			height: auto;
			z-index: 2;
			image-rendering: optimizeQuality;
		}

		@media (min-width: 1px) {
			#mario {
				width: ${MARIO}px;
			}
		}
		@media (min-width: 1330px) {
			#mario {
				width: ${MARIO_MEDIA_WIDTH_1330}px;
			}
		}
		@media (min-width: 1600px) {
			#mario {
				width: ${MARIO_MEDIA_WIDTH_1600}px;
			}
		}
	}
	#bush {
		display: none;
		@media (orientation: landscape) {
			display: block;
			width: 30%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: flex-end;
		}
		#bushes {
			@media (orientation: landscape) {
				display: block;
				width: clamp(12rem, 20vw, 15rem);
				height: auto;
				image-rendering: optimizeQuality;
				z-index: 2;
			}
		}
	}
	#bowserAndPipe {
		height: clamp(8rem, 8rem + 4vh, 12rem);
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		#bowser {
			width: auto;
			height: 52%;
			image-rendering: optimizeQuality;
			margin-bottom: -10px;
			z-index: 2;
		}
		#pipeline {
			width: auto;
			height: calc(48% + 10px);
			image-rendering: optimizeQuality;
		}
	}
	#goomba {
		display: none;
		height: auto;
		width: ${GOOMBA}px;
		image-rendering: pixelated;
		@media (min-width: 700px) {
			display: block;
		}
		@media (min-width: 1330px) {
			width: ${GOOMBA_MEDIA_WIDTH_1330}px;
		}
		@media (min-width: 1600px) {
			width: ${GOOMBA_MEDIA_WIDTH_1600}px;
		}
	}
`;

const MarioAndBowser = () => {
	return (
		<Wrap>
			<div id="marioMountain">
				<img
					src={mountains}
					alt="mountain"
					id="mountain"
				/>
				<img
					src={mario}
					alt="mario"
					id="mario"
				/>
			</div>
			<img
				id="goomba"
				src={goomba}
				alt="goomba"
			/>
			<img
				id="goomba"
				src={goomba}
				alt="goomba"
			/>
			<img
				id="goomba"
				src={goomba}
				alt="goomba"
			/>
			<div id="bush">
				<img
					id="bushes"
					src={bushes}
					alt="bush"
				/>
			</div>
			<img
				id="goomba"
				src={goomba}
				alt="goomba"
			/>
			<img
				id="goomba"
				src={goomba}
				alt="goomba"
			/>
			<div id="bowserAndPipe">
				<img
					id="bowser"
					src={bowser}
					alt="bowser"
				/>
				<img
					id="pipeline"
					src={pipeline}
					alt="pipeline"
				/>
			</div>
		</Wrap>
	);
};

export default MarioAndBowser;
