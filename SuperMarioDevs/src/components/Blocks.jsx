import styled from "styled-components";
import hitblock from "../assets/hitBlock.png";
import box from "../assets/box.png";
const BLOCK_SIZE = 45;
const BLOCK_SIZE_MEDIA_WIDTH1000 = 55;
const Wrapper = styled.div`
	width: 100%;
	height: auto;
	position: absolute;
	left: 2rem;
	bottom: 14rem;
	z-index: 1;
	#block,
	#box {
		width: ${BLOCK_SIZE}px;
		height: ${BLOCK_SIZE}px;
		image-rendering: crisp-edges;
	}
	@media (orientation: landscape) {
		position: absolute;
		z-index: 2;
		bottom: 12rem;
		left: -4rem;
		margin-left: ${BLOCK_SIZE * 4}px;
		#block,
		#box {
			width: ${BLOCK_SIZE}px;
			height: ${BLOCK_SIZE}px;
		}
	}

	@media (min-width: 1px) and (orientatation: potrait) {
		margin-left: ${BLOCK_SIZE * 1}px;
		#block,
		#box {
			width: ${BLOCK_SIZE}px;
			height: ${BLOCK_SIZE}px;
		}
	}
	@media (min-width: 1000px) {
		margin-left: ${BLOCK_SIZE_MEDIA_WIDTH1000 * 4}px;
		#block,
		#box {
			width: ${BLOCK_SIZE_MEDIA_WIDTH1000}px;
			height: ${BLOCK_SIZE_MEDIA_WIDTH1000}px;
		}
	}
`;

const Blocks = () => {
	return (
		<Wrapper>
			<img
				id="box"
				src={box}
				alt="box"
			/>
			<img
				id="block"
				src={hitblock}
				alt="hitblock"
			/>
			<img
				id="box"
				src={box}
				alt="box"
			/>
		</Wrapper>
	);
};

export default Blocks;
