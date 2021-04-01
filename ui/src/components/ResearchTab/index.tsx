import styles from './researchtab.module.scss'
import axios from 'axios';
import { useEffect, useState } from "react";
import Button from "../Button";
import Tab from '../Tab';


type Props = {
    setData: any
}

function Research(props: Props) {
    const [username, setUsername] = useState<string>("tagri-2865");
    const [checked, setChecked] = useState(true);

    function backend(e: any) {
        e.preventDefault();
        axios.get(process.env.REACT_APP_ENDPOINT + "/ranks/" + username, {
            params: {
                "competitive": checked
            }
        }).then(response => {
            props.setData(response.data)
        });
    }


    return (
        <div>
            <form onSubmit={backend}>
                <input 
                    className={styles.form}
                    type="text"
                    id="fname"
                    name="fname"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <label className={styles.container}><p className={styles.name}>Competitive</p>               
                <input className={styles.checkbox}
                    type="checkbox"
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                />
                    <span className={styles.checkmark}></span>
                </label>


                <Button title="Go" />
            </form>
        </div>
    );
}

export default function ResearchTab(props: Props) {
    return (
        <Tab
            title="Research Tab"
            component={
                <Research
                    setData={props.setData}
                />
            }
        />
    );
}