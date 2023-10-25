import fs from 'node:fs';
import path from 'node:path';

export function copyUnlessExists(from: string, to: string): boolean {
	if (!fs.existsSync(to)) {
		if (fs.existsSync(from)) {
			fs.copyFileSync(from, to);
			return true;
		}
	}
	return false;
}

export function writeIfNotExists(p: string, content: string): boolean {
	if (!fs.existsSync(p)) {
		fs.writeFileSync(p, content);
		return true;
	}
	return false;
}

export function copyFromDefault(p: string): boolean {
	return copyUnlessExists(`${p}.default`, p);
}

export function copyFromAllDefault(folder: string): boolean {
	if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
		const files = fs
		.readdirSync(folder)
		.filter((v) => v.endsWith('.default'))
		.map((v) => path.join(folder, v.slice(0, v.length - 8)));

		return files.map(copyFromDefault).reduce((prev, curr) => prev || curr, false);
	} else {
		return false;
	}
}
