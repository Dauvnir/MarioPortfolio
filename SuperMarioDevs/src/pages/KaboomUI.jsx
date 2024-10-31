import styled from "styled-components";
import KaboomTopUI from "../components/KaboomTopUI";
import KaboomTouchBtn from "../components/KaboomTouchBtn";

const Wrapper = styled.div`
	position: absolute;
	z-index: 2;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: start;
	justify-content: space-between;
	flex-direction: column;
`;

const KaboomUI = () => {
	return (
		<Wrapper>
			<KaboomTopUI />
			<KaboomTouchBtn />
		</Wrapper>
	);
};
export default KaboomUI;
