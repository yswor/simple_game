import { useEffect, useReducer, useState } from "react";
import Bottle from "./components/Bottle";
import * as styles from "./index.module.scss";
import { mixColor, resultSettle } from "../utils/tool";
import LEVEL_MAP from "../constant/levelMap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Modal from "../components/Modal";

function bottlesOperationReducer(bottles, action) {
    switch (action.type) {
        case "shift": {
            const bottlesCopy = [...bottles];
            bottlesCopy[action.index] = bottles[action.index].slice(1);
            return bottlesCopy;
        }
        case "unshift": {
            const bottlesCopy = [...bottles];
            bottlesCopy[action.index] = [action.value, ...bottles[action.index]];
            return bottlesCopy;
        }
    }
}

function Level() {
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const navigate = useNavigate();
    const levelConfig = LEVEL_MAP[id].config;
    const mixedBottles = mixColor(levelConfig);
    const [bottles, dispatch] = useReducer(bottlesOperationReducer, mixedBottles);
    const [exporter, setExporter] = useState<{ index: number; value: string[] } | null>(null);

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

            const exporterTopColor = exporter.value[0];
            dispatch({
                type: "shift",
                index: exporter.index,
            });
            dispatch({
                type: "unshift",
                index: i,
                value: exporterTopColor,
            });

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
        navigate(`/level/${Number(id) + 1}`);
    };

    return (
        <div className={styles.container}>
            {bottles.map((e, i) => (
                <Bottle
                    key={i}
                    len={levelConfig.blockNumber}
                    active={i === exporter?.index}
                    blocks={e}
                    onClick={() => clickBottle(i)}
                />
            ))}
            <Modal open={resultSettle(bottles, levelConfig)}>
                <div className={styles.modal}>
                    {Object.keys(LEVEL_MAP).length > Number(id) ? (
                        <>
                            <div className={styles.completeText}>恭喜通关!</div>
                            <div className={styles.nextLevel} onClick={toNextLevel}>
                                下一关
                            </div>
                        </>
                    ) : (
                        <div className={styles.completeText}>目前只有这么多关</div>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default Level;
