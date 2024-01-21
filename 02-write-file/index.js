const fs = require('node:fs');
const path = require('node:path');
const { stdin, stdout } = process;

const writeFile = path.join(__dirname, 'out.txt');

const writableStream = fs.createWriteStream(writeFile, 'utf-8');

stdout.write("Please, enter the text\n");


stdin.on('data', (data) => {
    if (data.toString().toLowerCase().trim() === 'exit') {
        exitProgram();
    } else {
        writableStream.write(data, 'utf-8');
    }
});

process.on('SIGINT', () => exitProgram());

function exitProgram() {
    stdout.write('See you later! Bye-Bye!');
    process.exit();
}