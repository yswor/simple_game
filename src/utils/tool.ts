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

export function resultSettle(bottles: string[][], levelConfig: MixColorParams) {
    let index = 0;
    const colorBlockNumber = levelConfig.blockNumber - levelConfig.emptyBlockNumber
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
