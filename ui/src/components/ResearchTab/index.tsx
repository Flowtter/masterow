import axios from 'axios';
import { useState } from "react";
import Button from "../Button";
import Tab from '../Tab';
import styles from './researchtab.module.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Props = {
    setData: any
}


function Research(props: Props) {
    const [username, setUsername] = useState<string>("tagri-2865");
    const [checked, setChecked] = useState(true);


  const notify = (err: string) => toast.error(err);

    function backend(e: any) {
        e.preventDefault();
        axios.get(process.env.REACT_APP_ENDPOINT + "/ranks/" + username, {
            params: {
                "competitive": checked
            }
        }).then(response => {
            props.setData(response.data);
        }).catch(err => {
            notify(err.response.data)
        })
        ;
    }


    return (
        <div>
            <ToastContainer />
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