import styles from './app.module.scss'
import Panel from './components/Panel'
import OverallPerformanceTab from './components/OverallPerformanceTab'
import RankTab from './components/RankTab';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RankInfo } from './types/rank_info';
import { OverallPerformances } from './types/overall_performances';
import CharacterTab from './components/CharacterTab';
import { CharacterProps } from './types/character';

function App() {

	const [rank, setRank] = useState<RankInfo>();
	const [overallPerformance, setOverallPerformance] = useState<OverallPerformances>();
	const [characters, setCharacters] = useState<CharacterProps[]>();

	useEffect(() => {
		axios.get("http://localhost:8080/ranks").then(Response => {
			setRank(Response.data.rating);
			setOverallPerformance(Response.data.overallperformance);
			setCharacters(Response.data.characters)
		})
	}, []);


	return (
		<div>
			<div className={styles.containerPannel}>
				<Panel
					position="left">
					{rank && <RankTab
						{...rank}
					/>}

				</Panel>
				<Panel
					position="right">
					{characters && 
					characters.map(character => {
						return <CharacterTab 
							{...character}
						/>
						})
					}

					{overallPerformance && <OverallPerformanceTab
						{...overallPerformance}
					/>}

				</Panel>
			</div>

		</div>
	);
}

export default App;
