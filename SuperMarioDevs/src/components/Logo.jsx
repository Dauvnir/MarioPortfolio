import styled from "styled-components";
import Warning from "./Warning";
import PropTypes from "prop-types";
const Wrapper = styled.div`
	width: 100%;
	height: 35%;
	position: absolute;
	top: 5rem;
	left: 0;
	z-index: 3;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	transform: translate(0, 2rem);
	#logoBlock {
		border-top: 2px solid white;
		border-left: 2px solid white;
		border-right: 2px solid black;
		border-bottom: 2px solid black;
		background-color: var(--block-color);
		height: clamp(8rem, 25vh, 23rem);
		width: clamp(20rem, 80vw, 35rem);
		position: relative;
		z-index: 2;
		@media (orientation: landscape) {
			height: 100%;
			width: clamp(25rem, 45vw, 50rem);
		}
		.dotContainer {
			z-index: 3;
			position: relative;
			width: 100%;
			height: 50%;
			display: flex;
			justify-content: space-between;
			align-items: start;
			padding-inline: 0.25rem;
			padding-top: 0.25rem;
			div {
				border-radius: 100%;
				width: clamp(5px, 2vw, 10px);
				height: clamp(5px, 2vh, 10px);
				background-color: var(--logo-color);
				box-shadow: 1px 2px 0px 0px black;
			}
		}
		.dotContainerBottom {
			align-items: end;
			padding-top: 0;
			padding-bottom: 0.25rem;
		}
		p {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			padding: 1rem;
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: start;
			flex-direction: column;
			text-shadow: 2px 4px 0px black;
			span {
				color: var(--logo-color);
				line-height: clamp(1.5rem, 10vh, 5rem);
				@media (orientation: landscape) {
					line-height: clamp(1.5rem, 13vh, 5rem);
				}
			}
			#super {
				font-size: clamp(1.8rem, 12vw, 4rem);
				@media (orientation: landscape) {
					font-size: clamp(1rem, 4vw, 3rem);
				}
			}
			#marioLogo {
				font-size: clamp(1rem, 6.9vw, 3rem);
				white-space: nowrap;
				@media (orientation: landscape) {
					font-size: clamp(1rem, 4vw, 3rem);
				}
			}
		}
	}
	#signature {
		width: clamp(20rem, 80vw, 35rem);
		height: auto;
		color: var(--logo-color);
		text-shadow: 1px 2px 0px black;
		font-size: clamp(1rem, 2vw, 2rem);
		text-align: right;
		margin: 0 auto auto auto;
		white-space: nowrap;
		@media (orientation: landscape) {
			width: clamp(25rem, 45vw, 50rem);
		}
	}
`;

const Logo = ({ showWarning = false, handlerShowWarning }) => {
	return (
		<>
			<Wrapper>
				<div id="logoBlock">
					<div className="dotContainer">
						<div></div>
						<div></div>
					</div>
					<div className="dotContainer dotContainerBottom">
						<div></div>
						<div></div>
					</div>
					<p>
						<span id="super">SUPER</span>
						<br />
						<span id="marioLogo">MARIO DEVS.</span>
					</p>
				</div>
				<p id="signature">
					<span>@2024 PATRYK POLAK</span>
				</p>
			</Wrapper>
			{showWarning && <Warning handlerShowWarning={handlerShowWarning} />}
		</>
	);
};

Logo.propTypes = {
	showWarning: PropTypes.bool.isRequired,
	handlerShowWarning: PropTypes.func.isRequired,
};
export default Logo;
