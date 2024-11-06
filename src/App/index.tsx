import { useNavigate } from "react-router-dom";
import * as styles from "./index.module.scss";

function App() {
    const navigate = useNavigate();

    const toLevelSelection = () => {
        navigate("/levelSelection");
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>倒水游戏</div>
            <div className={styles.startBtn} onClick={toLevelSelection}>
                开始游戏
            </div>
        </div>
    );
}

export default App;
