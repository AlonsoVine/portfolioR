#!/usr/bin/env node
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "public";
const EXTENSIONS = [".png", ".jpg", ".jpeg"];
const QUALITY = 85;
const DELETE_ORIGINALS = process.argv.includes("--delete-originals");

function walk(dir, files = []) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			walk(full, files);
		} else if (EXTENSIONS.includes(extname(entry).toLowerCase())) {
			files.push(full);
		}
	}
	return files;
}

const files = walk(ROOT);
let beforeTotal = 0;
let afterTotal = 0;
let converted = 0;
let skipped = 0;

for (const file of files) {
	const target = file.replace(/\.(png|jpe?g)$/i, ".webp");

	if (existsSync(target) && !process.argv.includes("--force")) {
		skipped++;
		if (DELETE_ORIGINALS) {
			unlinkSync(file);
		}
		continue;
	}

	const before = statSync(file).size;

	try {
		await sharp(file)
			.webp({ quality: QUALITY, effort: 6, smartSubsample: true })
			.toFile(target);

		const after = statSync(target).size;
		beforeTotal += before;
		afterTotal += after;
		converted++;

		const pct = ((1 - after / before) * 100).toFixed(0);
		const beforeKb = (before / 1024).toFixed(0);
		const afterKb = (after / 1024).toFixed(0);
		console.log(`${file.padEnd(70)} ${beforeKb.padStart(5)}KB → ${afterKb.padStart(5)}KB  (-${pct}%)`);

		if (DELETE_ORIGINALS) {
			unlinkSync(file);
		}
	} catch (err) {
		console.error(`FAIL ${file}: ${err.message}`);
	}
}

console.log(`\nConverted: ${converted}   Skipped: ${skipped}`);
console.log(
	`Total: ${(beforeTotal / 1024).toFixed(0)} KB → ${(afterTotal / 1024).toFixed(0)} KB`,
);
console.log(
	`Saved:  ${((beforeTotal - afterTotal) / 1024).toFixed(0)} KB (${((1 - afterTotal / beforeTotal) * 100).toFixed(0)}%)`,
);

if (DELETE_ORIGINALS) {
	console.log(`\nOriginals deleted.`);
} else {
	console.log(`\nOriginals kept. Re-run with --delete-originals to remove them.`);
}
