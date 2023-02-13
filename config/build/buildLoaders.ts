import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
	// typescript + babel(jsx)
	const typescriptLoader = {
		test: /\.tsx?$/,
		use: "ts-loader",
		exclude: /node_modules/,
	};

	// css + scss + scss modules
	const cssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			{
				loader: "css-loader",
				options: {
					modules: {
						auto: (resPath: string) => resPath.includes(".module"),
						localIdentName: options.isDev
							? "[path][name]__[local]"
							: "[hash:base64:8]",
					},
				},
			},
			"sass-loader",
		],
	};

	return [typescriptLoader, cssLoader];
}
