import { useEffect, useState } from "react";
import styled from "styled-components";
import block from "../assets/welcomePage/block.png";

const BLOCK_SIZE = 45;
const SMALL_BLOCK_HEIGHT = 20;
const BLOCK_SIZE_MEDIA_WIDTH1330 = 50;
const SMALL_BLOCK_HEIGHT_MEDIA_WIDTH1330 = 23;

const BLOCK_SIZE_MEDIA_WIDTH1600 = 55;
const SMALL_BLOCK_HEIGHT_MEDIA_WIDTH1600 = 25;

const Wrap = styled.div`
	width: 100vw;
	display: grid;
	grid-auto-flow: column;
	overflow: hidden;
	grid-gap: 0;
	padding: 0;
	margin: 0;
	flex-shrink: 0;
	div {
		#fullBlock {
			background-image: url(${block});
			background-size: cover;
			background-position: center top;
			grid-row: 1;
		}
		#block {
			background-image: url(${block});
			background-position: top;
			background-size: cover;
			grid-row: 2;
		}
	}
	@media (min-width: 1px) {
		grid-template-columns: repeat(auto-fill, ${BLOCK_SIZE}px);
		grid-template-rows: ${BLOCK_SIZE}px ${SMALL_BLOCK_HEIGHT}px;
		#fullBlock {
			width: ${BLOCK_SIZE}px;
			height: ${BLOCK_SIZE}px;
		}
		#block {
			width: ${BLOCK_SIZE}px;
			height: ${SMALL_BLOCK_HEIGHT}px;
		}
	}
	@media (min-width: 1330px) {
		grid-template-columns: repeat(auto-fill, ${BLOCK_SIZE_MEDIA_WIDTH1330}px);
		grid-template-rows: ${BLOCK_SIZE_MEDIA_WIDTH1330}px ${SMALL_BLOCK_HEIGHT_MEDIA_WIDTH1330}px;
		#fullBlock {
			width: ${BLOCK_SIZE_MEDIA_WIDTH1330}px;
			height: ${BLOCK_SIZE_MEDIA_WIDTH1330}px;
		}
		#block {
			width: ${BLOCK_SIZE_MEDIA_WIDTH1330}px;
			height: ${SMALL_BLOCK_HEIGHT_MEDIA_WIDTH1330}px;
		}
	}
	@media (min-width: 1600px) {
		grid-template-columns: repeat(auto-fill, ${BLOCK_SIZE_MEDIA_WIDTH1600}px);
		grid-template-rows: ${BLOCK_SIZE_MEDIA_WIDTH1600}px ${SMALL_BLOCK_HEIGHT_MEDIA_WIDTH1600}px;
		#fullBlock {
			width: ${BLOCK_SIZE_MEDIA_WIDTH1600}px;
			height: ${BLOCK_SIZE_MEDIA_WIDTH1600}px;
		}
		#block {
			width: ${BLOCK_SIZE_MEDIA_WIDTH1600}px;
			height: ${SMALL_BLOCK_HEIGHT_MEDIA_WIDTH1600}px;
		}
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
