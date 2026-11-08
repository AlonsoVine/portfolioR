// Sirve el export estático (`out/`) bajo /portfolioR, como en GitHub Pages.
// Solo escucha en 127.0.0.1. Uso: npm run serve:out [-- <puerto>]
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, resolve, sep } from "node:path";

const root = resolve(process.argv[3] ?? "out");
const port = Number(process.argv[2] ?? 4400);
const types = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript",
	".css": "text/css",
	".json": "application/json",
	".txt": "text/plain",
	".xml": "application/xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".webp": "image/webp",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
	".pdf": "application/pdf",
	".mp4": "video/mp4",
	".woff2": "font/woff2",
};

if (!existsSync(root)) {
	console.error(`No existe ${root}. Ejecuta antes \`npm run build\`.`);
	process.exit(1);
}

createServer((req, res) => {
	let url = decodeURIComponent((req.url ?? "/").split("?")[0]);
	if (!url.startsWith("/portfolioR")) {
		res.writeHead(302, { Location: "/portfolioR/" });
		return res.end();
	}
	url = url.replace(/^\/portfolioR/, "") || "/";
	let file = join(root, url);
	if (file !== root && !file.startsWith(root + sep)) {
		res.writeHead(403);
		return res.end();
	}
	if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
	if (!existsSync(file)) file = join(root, "404.html");
	const status = file.endsWith("404.html") && !url.endsWith("404.html") ? 404 : 200;
	res.writeHead(status, { "Content-Type": types[extname(file).toLowerCase()] ?? "application/octet-stream" });
	createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => {
	console.log(`Sirviendo ${root} en http://127.0.0.1:${port}/portfolioR/`);
});
