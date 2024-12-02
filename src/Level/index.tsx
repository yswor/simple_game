import { useEffect, useState } from "react";
import Bottle from "./components/Bottle";
import * as styles from "./index.module.scss";
import { levelGeneration, mixColor, number2ch, resultSettle } from "../utils/tool";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../components/Modal";

function Level() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate();
    const levelConfig = levelGeneration(Number(id));
    const [bottles, setBottles] = useState([]);
    const [exporter, setExporter] = useState<{ index: number; value: string[] } | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            const mixedBottles = mixColor(levelConfig);
            setBottles(mixedBottles);
        }
    }, [id]);

    const pourWater = (exporterIndex: number, recieverIndex: number) => {
        const bottlesCopy = [...bottles];

        const exporterItem = bottles[exporterIndex];
        bottlesCopy[exporterIndex] = bottles[exporterIndex].slice(1);
        bottlesCopy[recieverIndex] = [exporterItem[0], ...bottles[recieverIndex]];
        setBottles(bottlesCopy);
        return bottlesCopy;
    };

    const clickBottle = (i: number) => {
        const bottle = bottles[i];

        if (exporter) {
            // 选中的瓶子是输出方
            if (exporter.index === i) {
                setExporter(null);
                return;
            }

            // 选中的瓶子没有空位
            if (bottle.length === levelConfig.blockNumber) {
                alert("没有空位");
                setExporter(null);
                return;
            }

            const handledBottles = pourWater(exporter.index, i);

            if (resultSettle(handledBottles, levelConfig)) {
                setModalOpen(true);
            }

            setExporter(null);
            return;
        }

        // 选中的瓶子没有元素
        if (!bottle?.length) {
            alert("没有色块");
            return;
        }

        setExporter({
            index: i,
            value: bottle,
        });
    };

    const toNextLevel = () => {
        setModalOpen(false);
        navigate(`/level?id=${Number(id) + 1}`, { replace: true });
    };

    return (
        <div className={styles.container}>
            <div className={styles.levelTitle}>第{number2ch(Number(id))}关</div>
            <div className={styles.bottles}>
                {bottles.map((e, i) => (
                    <Bottle
                        key={i}
                        len={levelConfig.blockNumber}
                        active={i === exporter?.index}
                        blocks={e}
                        onClick={() => clickBottle(i)}
                    />
                ))}
            </div>
            <div className={styles.footer} onClick={toNextLevel}>
                下一关
            </div>
            <Modal open={modalOpen}>
                <div className={styles.modal}>
                    <div className={styles.completeText}>恭喜通关!</div>
                    <div className={styles.nextLevel} onClick={toNextLevel}>
                        下一关
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Level;
