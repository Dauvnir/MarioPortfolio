import styled from "styled-components";
import mountains from "../assets/mountains2.png";
const Wrap = styled.div`
	height: 9rem;
	width: 100vw;
`;
const Mountains = styled.div`
	background-image: url(${mountains});
	width: 18rem;
	height: 9rem;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
`;
const Background = () => {
	return (
		<Wrap>
			<Mountains></Mountains>
		</Wrap>
	);
};

export default Background;
