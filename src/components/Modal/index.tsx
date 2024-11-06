import * as styles from "./index.module.scss";

const Modal = ({ children, open }) => {

    if (!open) {
        return null
    }

    return (
        <div className={styles.container}>
            <div className={styles.mask} />
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Modal;
