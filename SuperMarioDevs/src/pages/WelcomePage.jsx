import styled from "styled-components";
import MarioAndBowser from "../components/MarioAndBowser";
import Bricks from "../components/Bricks";
import Blocks from "../components/Blocks";
import Clouds from "../components/Clouds";
import Logo from "../components/Logo";
import Text from "../components/Text";
import { useEffect, useState } from "react";

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
const WelcomePage = () => {
	const [showWarning, setShowWarning] = useState(false);

	const handlerShowWarning = () => {
		setShowWarning((prev) => !prev);
	};

	useEffect(() => {
		function disableWarning() {
			const isLandscape = window.matchMedia("(orientation: landscape)").matches;

			if (isLandscape) {
				setShowWarning(false);
			}
		}

		disableWarning();

		window.addEventListener("resize", disableWarning);

		return () => {
			window.removeEventListener("resize", disableWarning);
		};
	}, []);
	return (
		<Wrapper>
			<Text handlerShowWarning={handlerShowWarning} />
			<Logo
				showWarning={showWarning}
				handlerShowWarning={handlerShowWarning}
			/>
			<Clouds />
			<Blocks />
			<MarioAndBowser />
			<Bricks />
		</Wrapper>
	);
};

export default WelcomePage;
