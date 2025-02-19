import { useState } from "react";
import * as styles from "./index.module.scss";
import expandIcon from "../../asset/svg/expandIcon.svg";
import { Link, useNavigate } from "react-router-dom";

const ExtraAction = () => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const expandMenu = () => {};

    const backHome = () => {
        navigate;
    };

    return (
        <div className={`${styles.container} ${expanded ? styles.expanded : ""}`}>
            <div className={`${styles.signal}`} onClick={() => setExpanded((e) => !e)}>
                <img className={styles.icon} src={expandIcon} />
                <div className={`${styles.line} `} />
            </div>
            <div className={`${styles.menuBox}`} onClick={(e) => e.stopPropagation()}>
                <Link className={styles.menu} to="/">
                    返回首页
                </Link>
                <div className={styles.menu}>重新开始</div>
                <div className={styles.menu}>下一关</div>
            </div>
        </div>
    );
};

export default ExtraAction;
