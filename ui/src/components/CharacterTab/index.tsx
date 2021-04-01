import styles from './charactertab.module.scss'
import stylesBar from '../RankTab/progressbar.module.scss'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Tab from '../Tab'


function FieldTab() {
    var testBool = true;
    var progressBar = testBool ? <div className={[stylesBar.progressBar, styles.progressBar].join(' ')}>
        <ProgressBar animated now={10} />
    </div> : null;

    return (
        <div className={styles.fieldContainer}>
            <p className={styles.bold}>test</p>
            {progressBar}
            <p className={styles.info}>info</p>
        </div>
    );
}

function Character() {
    return (
        <div>
            <div className={styles.splitContainer}>
                <div className={styles.split}>
                    <div className={styles.name}>
                        <p>Widowmaker</p>
                    </div>
                    <FieldTab />
                    <FieldTab />
                </div>
                <div className={styles.split}>
                    <div className={styles.splitContainer}>
                        <FieldTab />
                        <p className={styles.blank}></p>
                        <div className={styles.subsplit}>
                            <p>Name</p>
                        </div>
                        <div className={styles.subsplit}>
                            <p>Name</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className={styles.splitContainer}>
                <div className={styles.split}>
                    <div className={styles.fieldsContainer}>
                        <FieldTab />
                        <FieldTab />
                        <FieldTab />
                    </div>
                    <div className={styles.fieldsContainer}>
                        <FieldTab />
                        <FieldTab />
                        <FieldTab />
                    </div>
                </div>
                <div className={styles.vl}></div>
                <div className={styles.split}>
                    <div className={styles.fieldsContainer}>
                        <FieldTab />
                        <FieldTab />
                        <FieldTab />
                    </div>
                    <div className={styles.fieldsContainer}>
                        <FieldTab />
                        <FieldTab />
                        <FieldTab />
                    </div>
                </div>
            </div>
        </div>
    );
}

function AllCharacters() {
    return (
        <div>
            <Character />
            <hr />
            <Character />
            <hr />
            <Character />
        </div>
    );
}

export default function CharacterTab() {
    return (
        <Tab
            title="Character Tab"
            component={
                <AllCharacters />
            }
        />
    );
}