import * as styles from "./index.module.scss";

interface BottleProps {
    blocks: string[];
    onClick: () => void;
    active: boolean;
    len: number;
}

const Bottle: React.FC<BottleProps> = ({ blocks, onClick, active, len }) => {
    const bottle = new Array(len)
        .fill("")
        .map((_, i) => blocks[blocks.length - i - 1] ?? "")
        .reverse();

    return (
        <div className={`${styles.container} ${active ? styles.active : ""}`} onClick={onClick}>
            {bottle.map((e, i) => (
                <div className={styles.block} key={i}>
                    <div className={styles.color} style={{ backgroundColor: e }} />
                </div>
            ))}
        </div>
    );
};

export default Bottle;
