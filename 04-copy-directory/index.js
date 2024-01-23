const fs = require('node:fs');
const path = require('node:path');

const fromFolder = path.join(__dirname, 'files');
const toFolder = path.join(__dirname, 'files-copy');

function copyDir() {

    fs.mkdir(toFolder, { recursive: true }, (error) => {
        if (error) {
            return console.error(error);
        }
        fs.readdir(toFolder, (error, files) => {
            files.forEach((file) => {
                const filePath = path.join(toFolder, file);
                fs.unlink(filePath, () => { });
            });
        });
        fs.readdir(fromFolder, { withFileTypes: true }, (error, files) => {
            if (error) {
                console.log(error.message)
            } else {
                files.forEach((file) => {
                    const fromFile = path.join(fromFolder, file.name);
                    const toFile = path.join(toFolder, file.name);
                    fs.copyFile(fromFile, toFile, () => { });
                });

            }
        });

    });
}

copyDir();