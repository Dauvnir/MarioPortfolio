import styled from "styled-components";
const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	@media (orientation: landscape) {
		display: none;
	}
	@media (min-width: 800px) {
		display: none;
	}

	width: 100%;
	height: fit-content;

	margin-top: 4rem;
	#message {
		width: clamp(15rem, 80%, 30rem);
		height: auto;

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

	h1,
	h2 {
		padding-inline: 1rem;
		margin-top: 1.5rem;
	}
	h1 {
	}
	h2 {
	}
	p {
		height: fit-content;
		width: 100%;

		margin-block: 1rem;
		padding-inline: 1rem;

		text-align: left;
		font-size: clamp(0.75rem, 0.75rem + 1vw, 2rem);
		line-height: 1.5rem;
		overflow: scroll;
	}
`;
const Warning = () => {
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
				<div className="dotContainer dotContainerBottom">
					<div></div>
					<div></div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Warning;
