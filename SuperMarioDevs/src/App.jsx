import styled from "styled-components";
import MarioAndBowser from "./components/MarioAndBowser";
import Bricks from "./components/Bricks";
import Blocks from "./components/Blocks";
import Clouds from "./components/Clouds";
import Logo from "./components/Logo";
import Text from "./components/Text";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: center;
	position: absolute;
	z-index: 1;
	bottom: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
`;
function App() {
	return (
		<Wrapper>
			<Text />
			<Logo />
			<Clouds />
			<Blocks />
			<MarioAndBowser />
			<Bricks />
		</Wrapper>
	);
}

export default App;
