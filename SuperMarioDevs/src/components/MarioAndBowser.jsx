import styled from "styled-components";
import mountains from "../assets/mountains2.png";
import pipeline from "../assets/pipe.png";
import bowser from "../assets/bowser.png";
import mario from "../assets/mario.png";

const MARIO_MEDIA_WIDTH_400 = 55;
const MARIO = 40;

const Wrap = styled.div`
	height: 10rem;
	width: 100vw;
	display: flex;
	justify-content: left;
	align-items: flex-end;
	gap: 1rem;
	position: relative;
	z-index: 1;
	#marioMountain {
		height: 100%;
		width: 65%;
		position: relative;
		z-index: 1;
		#mountain {
			width: 100%;
			height: auto;
			image-rendering: crisp-edges;
			/* max-width: ;  set later to set max width*/
			max-width: 240px;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 1;
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
		/* @media (min-width: 400px) {
			#mario {
				width: ${MARIO_MEDIA_WIDTH_400}px;
			}
		} */
	}
	#bowserAndPipe {
		height: 100%;
		width: 35%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		#bowser {
			width: auto;
			height: 50%;
			image-rendering: optimizeQuality;
			margin-bottom: -5px;
			z-index: 2;
		}
		#pipeline {
			width: auto;
			height: calc(50% + 5px);
			image-rendering: optimizeQuality;
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
