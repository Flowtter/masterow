import styles from './ranktab.module.scss'
import stylesBar from './progressbar.module.scss'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Tab from '../Tab'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { RankInfo } from '../../types/rank_info'

type Props = {
    type: "damage" | "tank" | "support" | "open queue"
    variant: "success" | "danger" | "warning" | "info"
    rank: number
    maxRank: number
}



function Rank(props: Props) {
    var value: number = props.rank / props.maxRank * 100;
    console.log(props.maxRank);
    return (
        <div className={styles.container} >
            <p className={styles.name}>{props.type}</p>
            <div className={stylesBar.progressBar}>
                <ProgressBar animated now={value} />
            </div>
            <p className={styles.sr}>{props.rank}</p>
        </div>
    );
}

function AllRanks(props: RankInfo) {
    var maxRank = 0;

    maxRank = Math.max(props.damage, props.tank, props.support, props.openqueue)
    console.log(maxRank)

    return (
        <div>
            <Rank
                maxRank={maxRank}
                rank={props.damage}
                type="damage"
                variant="danger"
            />
            <Rank
                maxRank={maxRank}
                rank={props.tank}
                type="tank"
                variant="success"
            />
            <Rank
                maxRank={maxRank}
                rank={props.support}
                type="support"
                variant="warning"
            />
            <Rank
                maxRank={maxRank}
                rank={props.openqueue}
                type="open queue"
                variant="info"
            />
        </div>
    );
}

export default function RankTab(props: RankInfo) {
    return (
        <Tab
            title="Rank Tab"
            component={
                <AllRanks
                    {...props}
                />
            }
        />
    );
}