import path from 'path';
import webpack from 'webpack';
import type { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';

function getApiUrl(mode: BuildMode, apiUrl?: string) {
	if (apiUrl) return apiUrl;
	if (mode === 'production') return '/api';
	return 'http://localhost:8443';
}

export default (env: BuildEnv) => {
	const paths: BuildPaths = {
		build: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		locales: path.resolve(__dirname, 'public', 'locales'),
		buildLocales: path.resolve(__dirname, 'build', 'locales'),
	};

	const mode = env.mode || 'development';
	const PORT = env.port || 3000;
	const apiUrl = getApiUrl(env.mode, env.apiUrl);

	const isDev = mode === 'development';

	const config: webpack.Configuration = buildWebpackConfig({
		mode,
		paths,
		isDev,
		port: PORT,
		apiUrl,
		environment: 'frontend',
	});

	return config;
};
