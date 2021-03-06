import styles from './panel.module.scss'

type Props = {
    position: "left" | "right"
    children: React.ReactNode
}

export default function Panel(props: Props) {
    return (
        <div className={`${styles.split} ${styles[props.position]}`}>
            {
                props.children
            }
        </div>
    );
}