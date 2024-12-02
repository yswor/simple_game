import * as webpack from "webpack";
import * as path from "path";
import { merge } from "webpack-merge";
import common from "./webpack.common";

const config: webpack.Configuration = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "product"),
        filename: "[name].bundle.js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: path.resolve(__dirname, 'src/index.scss'),
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[path][name]__[local][hash:base64:5]",
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
