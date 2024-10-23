import styled from "styled-components";
import KaboomTopUI from "../components/KaboomTopUI";
const Wrapper = styled.div`
	position: absolute;
	z-index: 2;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: start;
	justify-content: start;
	flex-direction: column;
`;

const KaboomUI = () => {
	return (
		<Wrapper>
			<KaboomTopUI />
		</Wrapper>
	);
};
export default KaboomUI;
