import styled from "styled-components";
import Background from "./components/Background";
import Bricks from "./components/Bricks";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 1;
	bottom: 0;
	left: 0;
`;
function App() {
	return (
		<>
			<Wrapper>
				<Background />
				<Bricks />
			</Wrapper>
		</>
	);
}

export default App;
