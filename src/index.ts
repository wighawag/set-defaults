import {copyFromAllDefault} from './utils/files';

export type Config = {
	folders?: string[];
};

type ResolvedConfig = Config & {folders: string[]};

export async function copyDefaults(config: Config) {
	const resolvedConfig: ResolvedConfig = {folders: ['.'], ...config};

	let anyChanges = false;
	for (const folder of resolvedConfig.folders) {
		anyChanges = copyFromAllDefault(folder) || anyChanges;
	}

	// TODO option to show message ?
	// if (anyChanges) {
	// 	console.log('setting up defaults...');
	// }
}
