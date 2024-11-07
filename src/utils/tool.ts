export const COLORS = ["red", "yellow", "green", "blue", "purple", "orange", "pink"];

export type MixColorParams = {
    bottleNumber: number;
    blockNumber: number;
    colorNumber: number;
    mixCount: number;
    emptyBlockNumber: number;
};
// 混淆色块
export function mixColor({
    bottleNumber,
    blockNumber,
    emptyBlockNumber,
    colorNumber,
    mixCount,
}: MixColorParams) {
    if (colorNumber > bottleNumber) {
        throw new Error("颜色数量大于瓶子数量");
    }

    const colors = COLORS.slice(0, colorNumber);
    const emptyList = new Array(emptyBlockNumber).fill("");
    const bottles = new Array(bottleNumber)
        .fill("")
        .map((e, i) => [
            ...emptyList,
            ...new Array(blockNumber - emptyBlockNumber).fill(colors[i] ?? ""),
        ]);

    let stepCount = 1;
    let loopCount = 1;

    const mixedBottles = bottles.map((e) => e.filter((k) => k));

    while (mixCount >= stepCount) {
        loopCount += 1;
        const exporterBottleIndex = Math.round(Math.random() * (bottleNumber - 1));

        const exporterBottle = mixedBottles[exporterBottleIndex];

        // 选中的输出方没有可输出的元素时, 不计算混淆次数, 重新开始
        if (!exporterBottle.length) {
            continue;
        }

        const recieverBottleIndex = Math.round(Math.random() * (bottleNumber - 1));

        // 选中的接收方不能是输出方
        if (recieverBottleIndex === exporterBottleIndex) {
            continue;
        }

        const recieverBottle = mixedBottles[recieverBottleIndex];

        // 选中的接收方不能没有空位
        if (recieverBottle.length === blockNumber) {
            continue;
        }

        mixedBottles[recieverBottleIndex] = [exporterBottle[0], ...recieverBottle];
        mixedBottles[exporterBottleIndex] = [...exporterBottle.slice(1)];

        stepCount += 1;
    }

    return mixedBottles;
}

// 通关检测
export function resultSettle(bottles: string[][], levelConfig: MixColorParams) {
    let index = 0;
    const colorBlockNumber = levelConfig.blockNumber - levelConfig.emptyBlockNumber;
    while (bottles.length > index) {
        const bottle = bottles[index];

        if (
            bottle.length &&
            (bottle.some((e) => e !== bottle[0]) || bottle.length !== colorBlockNumber)
        ) {
            return false;
        }
        index += 1;
    }

    return true;
}

// 关卡生成
export function levelGeneration(i: number) {
    const index = i - 1;
    const primaryLevel = Math.floor(index / 10);
    const level = index % 10;

    const emptyBlockNumberEnum = [1, 1, 2, 2, 3, 3, 3, 3, 3, 3];

    const bottleNumber = 4 + primaryLevel;
    const blockNumber = 6 + level;
    const colorNumber = 4 + primaryLevel;
    const emptyBlockNumber = emptyBlockNumberEnum[level];
    const mixCount = 10000 * (level + 1) * (primaryLevel + 1);

    return {
        bottleNumber,
        blockNumber,
        colorNumber,
        emptyBlockNumber,
        mixCount,
    };
}

const chars = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const units = ["", "十", "百", "千"];
function _handleZero(str) {
    return str.replace(/零{2,}/g, "零").replace(/零+$/, "");
}

export function number2ch(index: number) {
    const bigUnits = ["", "万", "亿"];

    const numStr = index
        .toString()
        .replace(/(?=(\d{4})+$)/g, ",")
        .split(",")
        .filter(Boolean);

    let result = "";
    for (let i = 0; i < numStr.length; i++) {
        const part = numStr[i];
        const c = _transform(part);
        let u = bigUnits[numStr.length - i - 1];
        // 也是需要考虑当四位为0的情况不需要添加单位
        if (c === chars[0]) {
            u = "";
        }
        result += c + u;
    }

    return _handleZero(result);
}

function _transform(n) {
    // 处理四位全部为0
    if (n === "0000") {
        return chars[0];
    }
    let result = "";
    for (let i = 0; i < n.length; i++) {
        // 转换汉字
        const c = chars[+n[i]];
        // 加单位 得到单位
        let u = units[n.length - 1 - i];
        // 处理0不加单位
        if (c === chars[0]) {
            u = "";
        }
        result += c + u;
    }
    // 处理重复零，末尾零情况
    return _handleZero(result);
}
