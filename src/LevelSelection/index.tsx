import { useState } from "react";
import * as styles from "./index.module.scss";
import { Link } from "react-router-dom";
import LEVEL_MAP from "../constant/levelMap";

const LevelSelection = () => {
    const levels = Object.keys(LEVEL_MAP).map((e) => ({
        name: LEVEL_MAP[e].name,
        id: Number(e),
    }));

    return (
        <div className={styles.container}>
            <div className={styles.levels}>
                {levels.map((e) => (
                    <Link key={e.id} className={styles.level} to={`/level/${e.id}`}>
                        {e.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LevelSelection;
