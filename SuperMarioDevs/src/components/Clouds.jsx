import styled from "styled-components";
import clouds from "../assets/cloud3.png";
import cloud from "../assets/cloud2.png";
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
		image-rendering: optimizeQuality;
		margin-left: -3rem;
		margin-top: 4rem;
	}
	#cloud {
		height: auto;
		width: 7rem;
		image-rendering: optimizeQuality;
		margin-top: 4rem;
		margin-right: 2rem;
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
				id="cloud"
				src={cloud}
				alt="cloud"
			/>
		</Wrapper>
	);
};

export default Clouds;
