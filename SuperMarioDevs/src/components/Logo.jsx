import styled from "styled-components";
import Warning from "./Warning";
import PropTypes from "prop-types";

const Wrapper = styled.div`
	position: absolute;
	z-index: 4;
	@media (orientation: landscape) {
		z-index: 3;
	}
	height: 100%;
	width: 100%;

	display: flex;
	flex-direction: column;

	#logoBlock {
		height: fit-content;
		width: clamp(15rem, 80%, 30rem);

		background-color: var(--block-color);

		margin-inline: auto;
		margin-top: clamp(2.5rem, 2.5rem + 5vw, 6rem); /// maybe clamp
		@media (max-height: 450px) {
			margin-top: 1rem;
		}

		border-top: 2px solid white;
		border-left: 2px solid white;
		border-right: 2px solid black;
		border-bottom: 2px solid black;
		@media (min-width: 1000px) {
			border-top: 4px solid white;
			border-left: 4px solid white;
			border-right: 4px solid black;
			border-bottom: 4px solid black;
		}

		overflow: hidden;

		p {
			width: 100%;
			height: auto;

			padding: 0.5rem 1rem;
			span {
				text-shadow: 2px 4px 0px black;
				color: var(--logo-color);
			}
			#super {
				font-size: clamp(2rem, 2rem + 5vw, 5rem);

				@media (orientation: landscape) {
					font-size: clamp(1rem, 1rem + 6vh, 5rem);
				}
			}
			#marioDevs {
				font-size: clamp(0.75rem, 0.75rem + 3vw, 2.5rem);
				white-space: nowrap;

				@media (orientation: landscape) {
					font-size: clamp(0.75rem, 0.75rem + 4vh, 2.5rem);
				}
			}
		}

		.dotContainer {
			width: 100%;
			height: auto;

			display: flex;
			justify-content: space-between;
			align-items: start;

			padding: 0.5rem 0.5rem 0 0.5rem;

			div {
				border-radius: 100%;

				width: clamp(5px, 5px + 2vw, 10px);
				height: clamp(5px, 5px + 2vw, 10px);

				background-color: var(--logo-color);
				box-shadow: 1px 2px 0px 0px black;
			}
		}
		.dotContainerBottom {
			align-items: end;

			padding-top: 0;
			padding-bottom: 0.5rem;
		}
	}

	#signature {
		width: clamp(15rem, 80%, 30rem);
		height: auto;

		margin-inline: auto;
		margin-top: 0.25rem;

		text-align: right;
		color: var(--logo-color);
		text-shadow: 1px 2px 0px black;
		white-space: nowrap;
		font-size: clamp(0.75rem, 0.75rem + 1vw, 2rem);

		@media (orientation: landscape) {
			font-size: clamp(0.5rem, 0.5rem + 1vw, 2rem);
		}
	}
`;
const Logo = ({ showWarning }) => {
	return (
		<Wrapper>
			<div id="logoBlock">
				<div className="dotContainer">
					<div></div>
					<div></div>
				</div>
				<p>
					<span id="super">SUPER</span>
					<br />
					<br />
					<span id="marioDevs">MARIO DEVS.</span>
				</p>
				<div className="dotContainer dotContainerBottom">
					<div></div>
					<div></div>
				</div>
			</div>
			<p id="signature">
				<span>@2024 PATRYK POLAK</span>
			</p>
			{showWarning && <Warning />}
		</Wrapper>
	);
};

Logo.propTypes = {
	showWarning: PropTypes.bool,
};
export default Logo;
