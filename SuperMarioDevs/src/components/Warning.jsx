import styled from "styled-components";
import PropTypes from "prop-types";
const Wrapper = styled.div`
	width: 100%;
	height: 65%;
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 5;
	display: flex;
	justify-content: center;
	align-items: start;
	#message {
		width: 20rem;
		height: 85%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		background-color: var(--block-color);
		color: var(--logo-color);
		text-shadow: 2px 3px 0px black;
		text-align: center;
		border-top: white 2px solid;
		border-left: white 2px solid;
		border-right: black 2px solid;
		border-bottom: black 2px solid;
	}
	.dotContainer {
		width: 100%;
		height: 5px;
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
	h1,
	h2 {
		margin-bottom: 0rem;
	}
	h1 {
		margin-top: 0;
	}
	p {
		text-align: left;
		padding: 0.5rem;
		flex-grow: 1;
		font-size: 1rem;
		line-height: 1.8rem;
	}
	#confirm {
		background-color: green;
		border: none;
		width: 60%;
		height: 3rem;
		border-radius: 25px;
		margin-bottom: 1rem;
		cursor: pointer;
		span {
			font-size: 1.25rem;
			color: var(--font-color);
			font-family: "Press Start 2P", system-ui;
			font-weight: 400;
			font-style: normal;
		}
	}
`;
const Warning = ({ handlerShowWarning }) => {
	return (
		<Wrapper>
			<div id="message">
				<div className="dotContainer">
					<div></div>
					<div></div>
				</div>

				<h1>Warning!</h1>
				<h2>Rotate your device</h2>
				<p>
					<span>
						For the best experience, please rotate your phone to landscape mode.
					</span>
				</p>
				<button
					id="confirm"
					onClick={handlerShowWarning}
				>
					<span>CONFIRM</span>
				</button>
				<div className="dotContainer dotContainerBottom">
					<div></div>
					<div></div>
				</div>
			</div>
		</Wrapper>
	);
};

Warning.propTypes = {
	handlerShowWarning: PropTypes.func.isRequired,
};
export default Warning;
