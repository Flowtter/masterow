import styles from './tab.module.scss'

// nuf
type Props = {
    title: string
    component: JSX.Element
}

export default function panel(props: Props) {
    return (
        <div className={styles.tab}>
            <div>
                <h2 className={styles.mainTitle}>{props.title}</h2>
                <hr />
            </div>
            <div className={styles.children}>
                {props.component}
            </div>
        </div>
    );
}