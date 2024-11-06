import * as webpack from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common";

const config: webpack.Configuration = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[path][name]__[local]",
                                namedExport: true,
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
});

export default config;