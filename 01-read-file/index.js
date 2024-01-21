const fs = require('node:fs');
const path = require('node:path');

const readFile = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(readFile, 'utf-8');

readableStream.on('data', (chunk) => console.log(chunk));