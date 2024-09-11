import styled from "styled-components";

const Wrapper = styled.div`
	width: 100%;
	height: 35%;
	position: absolute;
	top: 2rem;
	left: 0;
	z-index: 2;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	#logoBlock {
		border-top: 2px solid white;
		border-left: 2px solid white;
		border-right: 2px solid black;
		border-bottom: 2px solid black;
		background-color: var(--block-color);
		height: 8rem;
		width: 20rem;
		position: relative;
		z-index: 2;
		margin: auto auto 0 auto;
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
				width: 5px;
				height: 5px;
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
			padding: 1rem 0.9rem;
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: start;
			flex-direction: column;
			text-shadow: 2px 4px 0px black;
			span {
				color: var(--logo-color);
				line-height: 2.5rem;
			}
			#super {
				font-size: 24px;
			}
			#marioLogo {
				font-size: 26px;
			}
		}
	}
	#signature {
		width: 19rem;
		height: auto;
		color: var(--logo-color);
		text-shadow: 1px 2px 0px black;
		font-size: 13px;
		text-align: right;
		margin: 0 auto auto auto;
	}
`;

const Logo = () => {
	return (
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
	);
};

export default Logo;
