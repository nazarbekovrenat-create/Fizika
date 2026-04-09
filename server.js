const http = require('http');
const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname);
const PORT = 5500;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
};

http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';
    const filePath = path.join(ROOT, urlPath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }
        const ext  = path.extname(filePath);
        const mime = MIME[ext] || 'application/octet-stream';
        res.writeHead(200, {
            'Content-Type': mime,
            'Cache-Control': 'no-cache',
        });
        res.end(data);
    });
}).listen(PORT, '127.0.0.1', () => {
    console.log('');
    console.log('  PHYS-X Server ishga tushdi!');
    console.log('  Brauzerda oching: http://localhost:' + PORT);
    console.log('');
    console.log('  Toxtatish uchun: Ctrl+C');
    console.log('');
});
