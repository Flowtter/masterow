import styles from './button.module.scss'

type Props = {
    title: string
    size?: number
    onClick?: () => void
}

export default function Button(props: Props) {
    return (
        <button
            className={styles.button}
            style={{height: props.size}}
            onClick={props.onClick}>
                {props.title}
        </button>
    )
}