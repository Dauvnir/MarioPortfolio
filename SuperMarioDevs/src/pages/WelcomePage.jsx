import styled from "styled-components";
import MarioAndBowser from "../components/MarioAndBowser";
import Bricks from "../components/Bricks";
import Blocks from "../components/Blocks";
import Clouds from "../components/Clouds";
import Logo from "../components/Logo";
import Text from "../components/Text";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
	background-color: rgb(99, 160, 253);
	overflow: hidden;
`;
const WelcomePage = () => {
	const [showWarning, setShowWarning] = useState(null);
	const navigate = useNavigate();
	const handleShowWarning = () => {
		const isLandscape = window.matchMedia("(orientation: landscape)").matches;
		if (isLandscape) {
			setShowWarning(false);
		} else {
			setShowWarning(true);
		}
	};

	const handleShowWarningAndNavigate = () => {
		const isLandscape = window.matchMedia("(orientation: landscape)").matches;
		if (isLandscape) {
			setShowWarning(false);
			navigate("game");
		} else {
			setShowWarning(true);
		}
	};
	useEffect(() => {
		window.addEventListener("resize", handleShowWarning);
		return () => {
			window.removeEventListener("resize", handleShowWarning);
		};
	}, []);

	return (
		<Wrapper>
			<Text handleShowWarningAndNavigate={handleShowWarningAndNavigate} />
			<Logo showWarning={showWarning} />
			<Clouds />
			<Blocks />
			<MarioAndBowser />
			<Bricks />
		</Wrapper>
	);
};

export default WelcomePage;
