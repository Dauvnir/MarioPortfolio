import styled from "styled-components";
import hitblock from "../assets/hitBlock.png";
import box from "../assets/box.png";
const BLOCK_SIZE = 45;

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	position: relative;
	z-index: 1;
	margin-left: ${BLOCK_SIZE * 4}px;
	#block,
	#box {
		width: ${BLOCK_SIZE}px;
		height: ${BLOCK_SIZE}px;
		image-rendering: crisp-edges;
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
