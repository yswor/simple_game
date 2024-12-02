import { useState } from "react";
import * as styles from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { number2ch } from "../utils/tool";
import Modal from "../components/Modal";

const LevelSelection = () => {
    const navigate = useNavigate();
    const [inputLevel, setInputLevel] = useState("");
    const [levelModal, setLevelModal] = useState(false);
    const [inputErrMsg, setInputErrMsg] = useState("");

    const levels = new Array(10).fill("").map((e, i) => ({
        name: `第${number2ch(i + 1)}关`,
        id: i + 1,
    }));

    const showLevelModal = () => {
        setLevelModal(true);
    };

    const onInputChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setInputErrMsg("");
            setInputLevel("");
            return;
        }
        const levelNumber = Number(value.trim());
        if (isNaN(levelNumber)) {
            setInputErrMsg("请输入数字");
            return;
        }

        if (levelNumber < 1 || value.trim().split(".").length > 1) {
            setInputErrMsg("请输入正整数");
            return;
        }

        setInputErrMsg("");

        setInputLevel(String(levelNumber));
    };

    const closeModal = () => {
        setLevelModal(false);
        setInputLevel("");
    };

    const confirmChooseLevel = () => {
        if (inputErrMsg) {
            return;
        }
        if (!inputLevel) {
            return;
        }
        const id = Number(inputLevel);
        setLevelModal(false);
        setInputLevel("");
        navigate(`/level?id=${id}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>选择关卡</div>
            <div className={styles.levels}>
                {levels.map((e) => (
                    <Link key={e.id} className={styles.level} to={`/level?id=${e.id}`}>
                        {e.name}
                    </Link>
                ))}
            </div>
            <div className={styles.bottomBar} onClick={showLevelModal}>
                跳转特定关卡
            </div>
            <Modal open={levelModal} onClose={closeModal}>
                <div className={styles.modal}>
                    <div className={styles.input}>
                        <div className={styles.label}>请输入选择的关卡</div>
                        <input onInput={onInputChange} />
                        <div className={styles.errMsg}>{inputErrMsg}</div>
                    </div>
                    <div className={styles.modalFooter}>
                        <div
                            className={`${styles.modalFooterBtn} ${styles.cancel}`}
                            onClick={closeModal}
                        >
                            取消
                        </div>
                        <div
                            className={`${styles.modalFooterBtn} ${styles.confirm}`}
                            onClick={confirmChooseLevel}
                        >
                            确定跳转
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default LevelSelection;
