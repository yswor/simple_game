import { useReducer, useState } from "react";
import Bottle from "../components/Bottle";
import * as styles from "./index.module.scss";
import { mixColor } from "../utils/tool";

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

function App() {
    const [levelConfig, setLevelConfig] = useState({
        bottleNumber: 6,
        blockNumber: 10,
        colorNumber: 5,
        mixCount: 10000,
    });

    const mixedBottles = mixColor(levelConfig);

    console.log(mixedBottles);

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
        </div>
    );
}

export default App;
