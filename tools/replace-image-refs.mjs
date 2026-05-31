#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const files = execSync("git ls-files src/", { encoding: "utf8" })
	.split("\n")
	.filter((f) => /\.(ts|tsx)$/.test(f));

let totalReplacements = 0;
for (const file of files) {
	const before = readFileSync(file, "utf8");
	const matches = before.match(/\.(png|jpe?g)(["'`])/g) || [];
	if (matches.length === 0) continue;

	const after = before.replace(/\.(png|jpe?g)(["'`])/g, (_m, _ext, q) => `.webp${q}`);
	writeFileSync(file, after);
	totalReplacements += matches.length;
	console.log(`${file}: ${matches.length} replacement(s)`);
}

console.log(`\nTotal: ${totalReplacements} replacements across files.`);
