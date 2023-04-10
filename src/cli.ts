#! /usr/bin/env node

import {Command, Option} from 'commander';
import pkg from '../package.json';
import {copyDefaults} from '.';
const name = pkg.name;

const program = new Command();
program
	.name(name)
	.version(pkg.version)
	.usage(`[dirs...]`)
	.argument(`[dirs...]`)
	.description('copy default files to their respective filename')
	.action((dirs) => {
		copyDefaults({folders: dirs || ['.']});
	});

program.parse();
