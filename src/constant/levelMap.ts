import { MixColorParams } from "../utils/tool";

const LEVEL_MAP: {
    [key: string]: {
        name: string;
        config: MixColorParams;
    };
} = {
    1: {
        name: "第一关",
        config: {
            bottleNumber: 3,
            blockNumber: 5,
            colorNumber: 3,
            emptyBlockNumber: 1,
            mixCount: 100,
        },
    },
    2: {
        name: "第二关",
        config: {
            bottleNumber: 3,
            blockNumber: 5,
            colorNumber: 3,
            emptyBlockNumber: 1,
            mixCount: 1000,
        },
    },
    3: {
        name: "第三关",
        config: {
            bottleNumber: 4,
            blockNumber: 6,
            colorNumber: 4,
            emptyBlockNumber: 1,
            mixCount: 1000,
        },
    },
    4: {
        name: "第四关",
        config: {
            bottleNumber: 6,
            blockNumber: 10,
            colorNumber: 6,
            emptyBlockNumber: 2,
            mixCount: 10000,
        },
    },
};

export default LEVEL_MAP;
