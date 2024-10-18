import { useEffect, useState } from "react";
import styled from "styled-components";
import coin from "../assets/welcomePage/coinCount.gif";
const Wrapper = styled.div`
	position: absolute;
	z-index: 2;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: end;
	width: 80%;
	height: auto;
	margin-inline: 10%;
	font-size: clamp(0.75rem, 1vw + 6px, 2.5rem);
	p {
		width: 25%;
		text-align: center;
		height: auto;
		img {
			height: auto;
			width: 16px;
			margin-right: 0.5rem;
			transform: scale(2.5);
			image-rendering: pixelated;
		}
	}
	#coinCount {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#marioPoints {
		text-align: left;
	}
	#time {
		text-align: right;
	}
`;
const KaboomUI = () => {
	const [points, setPoints] = useState(0);
	const [enabledTimer, setEnabledTimer] = useState(null); // true false null
	const [timer, setTimer] = useState(200);
	const [sumPoints, setSumPoints] = useState(false);
	const [playerDied, setPlayerDied] = useState(false);
	const [coinCoint, setCoinCount] = useState(0);
	let formattedCoinCount = coinCoint.toString().padStart(2, "0");
	let formattedPoints = points.toString().padStart(6, "0");
	useEffect(() => {
		const handleCollectedPoints = (e) => {
			const collectedPoints = e.detail.points;
			setPoints((prevPoints) => prevPoints + collectedPoints);
		};
		const handleTimer = (e) => {
			const fetchedTimeValue = e.detail.timer;
			if (fetchedTimeValue !== null) {
				setEnabledTimer(fetchedTimeValue);
			}
		};
		const handleDeathOfPlayerByMonster = (e) => {
			const playerDied = e.detail.death;
			setPlayerDied(playerDied);
		};
		const handleCoinCount = (e) => {
			const coin = e.detail.coin;
			setCoinCount((prevCoin) => prevCoin + coin);
		};
		document.addEventListener("playerDied", handleDeathOfPlayerByMonster);
		document.addEventListener("timer", handleTimer);
		document.addEventListener("pointsCollected", handleCollectedPoints);
		document.addEventListener("coinCount", handleCoinCount);
		return () => {
			document.removeEventListener("coinCount", handleCoinCount);

			document.removeEventListener("playerDied", handleDeathOfPlayerByMonster);
			document.removeEventListener("timer", handleTimer);
			document.removeEventListener("pointsCollected", handleCollectedPoints);
		};
	}, []);
	useEffect(() => {
		if (timer === 0) {
			const playerDeath = new CustomEvent("deathTimer", {
				detail: {
					death: true,
				},
			});
			document.dispatchEvent(playerDeath);
			setEnabledTimer(false);
			setPoints(0);
			setCoinCount(0);
			if (points !== 0) setPoints(0);
		}
	}, [timer, points]);
	useEffect(() => {
		let countdownInterval;
		if (enabledTimer === true) {
			countdownInterval = setInterval(() => {
				setTimer((prevCount) => {
					if (prevCount > 0) {
						return prevCount - 1;
					} else {
						clearInterval(countdownInterval);
						return 0;
					}
				});
			}, 1000);
		}
		return () => clearInterval(countdownInterval);
	}, [enabledTimer]);

	useEffect(() => {
		if (enabledTimer === false) {
			setPoints((prevPoints) => prevPoints + timer * 10);
			setEnabledTimer(null);
			setTimer(200);
			setSumPoints(true);
		}
	}, [timer, enabledTimer]);

	useEffect(() => {
		if (sumPoints === true) {
			const higscore = points.toString().padStart(6, "0");
			localStorage.setItem("highscore", higscore);
			setPoints(0);
			setCoinCount(0);
			setSumPoints(false);
		}
	}, [points, sumPoints]);
	useEffect(() => {
		if (playerDied) {
			setPoints(0);
			setCoinCount(0);
			setTimer(200);
			setEnabledTimer(null);
			setSumPoints(false);
			setPlayerDied(false);
		}
	}, [playerDied]);
	return (
		<Wrapper>
			<p id="marioPoints">
				Mario <br /> {formattedPoints}
			</p>

			<p id="coinCount">
				<br />
				<img
					src={coin}
					alt="coin"
				/>
				x{formattedCoinCount}
			</p>

			<p>
				World <br />
				1-1
			</p>
			<p id="time">
				Time <br />
				{enabledTimer ? timer.toString().padStart(3, "0") : <br />}
			</p>
		</Wrapper>
	);
};

export default KaboomUI;
