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
import ResearchTab from './components/ResearchTab';

type Data = {
	rating: RankInfo
	overallperformance: OverallPerformances
	characters: Array<CharacterProps>
}

function App() {
	const[data, setData] = useState<Data>();

	return (
		<div>
			<div className={styles.containerPannel}>
				<Panel
					position="left">
						<ResearchTab 
							setData={setData}
						/>
					{data && <RankTab
						{...data.rating}
					/>}

				</Panel>
				<Panel
					position="right">
					{data && <OverallPerformanceTab
						{...data.overallperformance}
					/>}
					{data && <CharacterTab
						array={data.characters}
					/>
					}
				</Panel>
			</div>

		</div>
	);
}

export default App;
