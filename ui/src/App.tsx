import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import styles from './app.module.scss';
import CharacterTab from './components/CharacterTab';
import OverallPerformanceTab from './components/OverallPerformanceTab';
import Panel from './components/Panel';
import RankTab from './components/RankTab';
import ResearchTab from './components/ResearchTab';
import { CharacterProps } from './types/character';
import { OverallPerformances } from './types/overall_performances';
import { RankInfo } from './types/rank_info';

type Data = {
	rating: RankInfo
	overallperformance: OverallPerformances
	characters: Array<CharacterProps>
}

function App() {
	const [data, setData] = useState<Data>();

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
