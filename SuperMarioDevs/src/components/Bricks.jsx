import { useEffect, useState } from "react";
import styled from "styled-components";
import block from "../assets/block.png";

const BLOCK_SIZE = 45;
const SMALL_BLOCK_HEIGHT = 20;

const Wrap = styled.div`
	width: 100vw;
	display: grid;
	grid-template-columns: repeat(auto-fill, ${BLOCK_SIZE}px);
	grid-template-rows: ${BLOCK_SIZE}px ${SMALL_BLOCK_HEIGHT}px;
	grid-auto-flow: column;
	overflow: hidden;
	grid-gap: 0;
	padding: 0;
	margin: 0;
	#fullBlock {
		width: ${BLOCK_SIZE}px;
		height: ${BLOCK_SIZE}px;
		background-image: url(${block});
		background-size: cover;
		background-position: center top;
		grid-row: 1;
	}
	#block {
		width: ${BLOCK_SIZE}px;
		height: ${SMALL_BLOCK_HEIGHT}px;
		background-image: url(${block});
		background-position: top;
		background-size: cover;
		grid-row: 2;
	}
`;
// function logIt(text = "Blocks number:", arg) {
// 	console.log(text, arg);
// }

const Bricks = () => {
	const [blocks, setBlocks] = useState([]);

	useEffect(() => {
		const calculateBlocks = () => {
			const blockSize = BLOCK_SIZE;
			const screenWidth = window.innerWidth;
			const numberOfFullBlocks = (Math.floor(screenWidth / blockSize) + 2) * 2; // + 2 cause i do not want a gap;
			if (numberOfFullBlocks !== blocks.length)
				setBlocks(new Array(numberOfFullBlocks).fill(null)); // need to fill to have aa placeholder value and to iterate
		};

		calculateBlocks();
		window.addEventListener("resize", calculateBlocks);

		return () => window.removeEventListener("resize", calculateBlocks);
	}, [blocks]);

	return (
		<Wrap>
			{blocks.map((_, index) => (
				<div key={index}>
					<div id="fullBlock" />
					<div id="block" />
				</div>
			))}
		</Wrap>
	);
};

export default Bricks;
