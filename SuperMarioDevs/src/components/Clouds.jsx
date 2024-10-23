import styled from "styled-components";
import clouds from "../assets/welcomePage/cloud3.png";
import cloud from "../assets/welcomePage/cloud2.png";
import cloud2 from "../assets/welcomePage/cloud1.png";
const Wrapper = styled.div`
	height: auto;
	width: 100%;
	position: relative;
	z-index: 1;
	flex-grow: 1;
	display: flex;
	justify-content: space-between;
	align-items: start;
	#clouds {
		height: auto;
		width: 10rem;
		image-rendering: pixelated;
		margin-left: -3rem;
		margin-top: 4rem;
		@media (orientation: landscape) {
			margin-bottom: -5rem;
			margin-top: 0;
		}
	}
	#cloud {
		height: auto;
		width: 7rem;
		image-rendering: pixelated;
		margin-top: 3rem;
		margin-right: 0rem;
		@media (orientation: landscape) {
			margin-bottom: -5rem;
			margin-top: 0;
		}
	}
	#cloud2 {
		height: auto;
		width: 12rem;
		image-rendering: pixelated;
		margin-top: 3rem;
		@media (max-width: 999px) {
			display: none;
		}
	}
`;
const Clouds = () => {
	return (
		<Wrapper>
			<img
				id="clouds"
				src={clouds}
				alt="clouds"
			/>
			<img
				id="cloud2"
				src={cloud2}
				alt="cloud"
			/>
			<img
				id="cloud2"
				src={clouds}
				alt="cloud"
			/>
			<img
				id="cloud"
				src={cloud}
				alt="cloud"
			/>
		</Wrapper>
	);
};

export default Clouds;
