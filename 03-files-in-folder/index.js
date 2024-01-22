const fs = require('node:fs');
const path = require('node:path');
const { stdin, stdout } = process;

const readFolder = path.join(__dirname, 'secret-folder');

fs.readdir(readFolder, { withFileTypes: true }, (error, files) => {
    if (error) {
        console.log(error.message)
    } else {
        files.forEach((file) => {
            if (file.isFile()) {
                const filePath = path.join(readFolder, file.name);
                const extension = path.extname(filePath).slice(1);
                const name = file.name.replace(`.${extension}`, '');

                fs.stat(filePath, (error, stat) => {
                    let size = stat.size;
                    console.log(`${name} - ${extension} - ${size} bytes`);
                })
            }
        });
    }
});