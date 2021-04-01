import styles from './overallperformancetab.module.scss'
import Tab from '../Tab'
import { OverallPerformances } from '../../types/overall_performances';
import Odometer from '../Odometer'

export default function OverallPannelTab(props: OverallPerformances) {
    const cmpt =
        <div className={styles.container}>
            <div className={styles.odometer}>
                <Odometer
                    min={0}
                    value={props.winrate}
                    max={100}
                    name="winrate"
                />
            </div>
            <div className={styles.odometer}>
                <Odometer
                    min={0}
                    value={props.ratio}
                    max={6}
                    name="eliminations per life"
                />
            </div>
        </div>

    return (
        <Tab
            title="Overall Performance Tab"
            component={cmpt}
        />
    );
}