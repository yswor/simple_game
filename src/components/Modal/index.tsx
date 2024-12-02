import * as styles from "./index.module.scss";

const Modal = ({ children, open, onClose = () => {} }) => {

    if (!open) {
        return null
    }

    return (
        <div className={styles.container}>
            <div className={styles.mask} onClick={onClose} />
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Modal;
