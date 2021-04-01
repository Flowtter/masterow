import styles from './charactertab.module.scss'
import stylesBar from '../RankTab/progressbar.module.scss'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Tab from '../Tab'
import { CharacterProps } from '../../types/character'


type FieldTabProps = {
    progressBar: boolean
    bold?: number
    info?: string
    additionnalBold?: string
    max?: number
    inverted?: boolean
}

type ArrayCharacter = {
    array: Array<CharacterProps>
}

function FieldTab(props: FieldTabProps) {
    var max = props.max;
    if (!max) {
        max = 100;
    }
    var inverted = props.inverted;

    if (props.bold !== undefined) {
        var value: number | undefined = parseFloat(props.bold.toFixed(2));
    } else {
        value = undefined;
    }

    var progressBar: JSX.Element | null;
    
    if (inverted) {
        var bold = props.bold;
        if (bold === undefined) {
            bold = 9;
        }
        bold = 18 - bold * 1.9
        if (bold < 0) {
            bold = 0;
        }
        progressBar = props.progressBar ?
            <div className={[stylesBar.progressBar, styles.progressBar].join(' ')}>
                <ProgressBar animated now={bold} max={9} />
            </div>
            : null;
    } else {
        progressBar = props.progressBar ? <div className={[stylesBar.progressBar, styles.progressBar].join(' ')}>
            <ProgressBar animated now={value} max={max} />
        </div> : null;
    }



    return (
        <div className={styles.fieldContainer}>
            <p className={styles.bold}>{value}{props.additionnalBold}</p>
            {progressBar}
            <p className={styles.info}>{props.info}</p>
        </div>
    );
}

function Character(props: CharacterProps) {
    return (
        <div>
            <div className={styles.splitContainer}>
                <div className={styles.split}>
                    <div className={styles.name}>
                            <p className={styles.bold}>{props.name}</p>
                    </div>
                    <FieldTab
                        progressBar={true}
                        bold={props.onfire}
                        additionnalBold="%"
                        info="on fire"
                    />
                </div>
                <div className={styles.split}>
                    <div className={styles.splitContainer}>
                        <FieldTab
                            progressBar={false}
                            bold={props.winrate}
                            info="winrate"
                            additionnalBold="%"
                        />
                        <FieldTab
                            progressBar={false}
                            additionnalBold={props.records}
                            info="records"
                        />
                        <FieldTab
                            progressBar={false}
                            bold={props.goldpergame}
                            info="gold/game"
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div className={styles.splitContainer}>
                <div className={styles.split}>
                    <div className={styles.fieldsContainer}>
                        <FieldTab
                            progressBar={true}
                            bold={props.elimination}
                            info="eliminations"
                            max={30}
                        />
                        <FieldTab
                            progressBar={true}
                            bold={props.objkills}
                            info="obj kills"
                            max={15}
                        />
                        <FieldTab
                            progressBar={true}
                            bold={props.objtime}
                            info="obj time"
                            max={5}
                        />
                    </div>
                    <div className={styles.fieldsContainer}>
                        <FieldTab
                            progressBar={true}
                            bold={props.damage}
                            info="damage"
                            max={18000}
                        />
                        {props.healing !== 0 && <FieldTab
                            progressBar={true}
                            bold={props.healing}
                            info="healing"
                            max={18000}
                        />}
                        <FieldTab
                            progressBar={true}
                            bold={props.deaths}
                            info="deaths"
                            max={9}
                            inverted={true}
                        />
                    </div>
                </div>
                <div className={styles.vl}></div>
                <div className={styles.split}>
                    <div className={styles.fieldsContainer}>
                        <FieldTab
                            progressBar={true}
                            bold={props.weaponacc}
                            additionnalBold={"%"}
                            info="Weapon acc"
                            max={60}
                        />
                        <FieldTab
                            progressBar={true}
                            bold={props.criticalhits}
                            additionnalBold={"%"}
                            info="critical hits"
                            max={20}
                        />
                        <FieldTab
                            progressBar={true}
                            bold={props.finalblows}
                            info="final blows"
                            max={15}
                        />
                    </div>
                    <div className={styles.fieldsContainer}>
                        <FieldTab
                            progressBar={true}
                            bold={props.solokills}
                            info="solo kills"
                            max={5}
                        />
                        <FieldTab
                            progressBar={true}
                            bold={props.shielddamage}
                            info="Shield damage"
                            max={5000}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function AllCharacters(props: ArrayCharacter) {
    var value = props.array.map(character => {
        return (
            <div key={character.name}>
                <Character
                    {...character}
                />
                <hr />
            </div>);
    })
    return (<div>{value}</div>
    );
}

export default function CharacterTab(props: ArrayCharacter) {
    console.log(props);
    return (
        <Tab
            title="Character Tab"
            component={
                <AllCharacters
                    array={props.array}
                />
            }
        />
    );
}