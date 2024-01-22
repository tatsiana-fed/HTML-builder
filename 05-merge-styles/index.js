const fs = require('node:fs');
const path = require('node:path');

const stylesFolder = path.join(__dirname, 'styles');
const bundleFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(bundleFolder, 'bundle.css');
const writableStream = fs.createWriteStream(bundleFile, 'utf-8');


fs.readdir(stylesFolder, { withFileTypes: true }, (error, files) => {
    if (error) {
        console.log(error.message)
    } else {
        files.forEach((file) => {
            const stylesFile = path.join(stylesFolder, file.name);

            if (file.isFile() && path.extname(stylesFile).slice(1) === 'css') {
                const styleFile = path.join(stylesFolder, file.name);

                fs.createReadStream(styleFile, 'utf8').pipe(writableStream);
            }
        });

    }
});


