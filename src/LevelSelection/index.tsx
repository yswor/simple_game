import { useState } from "react";
import * as styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { number2ch } from "../utils/tool";

const LevelSelection = () => {
    const levels = new Array(20).fill("").map((e, i) => ({
        name: `第${number2ch(i + 1)}关`,
        id: i + 1,
    }));

    return (
        <div className={styles.container}>
            <div className={styles.levels}>
                {levels.map((e) => (
                    <Link key={e.id} className={styles.level} to={`/level?id=${e.id}`}>
                        {e.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LevelSelection;
