const fs = require('node:fs');
const path = require('node:path');

const componentsFolder = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');
const projectFolder = path.join(__dirname, 'project-dist');
const projectAssetsFolder = path.join(projectFolder, 'assets');


function buildHTML() {

    fs.mkdir(projectFolder, { recursive: true }, (error) => {
        if (error) {
            return console.error(error);
        }

        copyAssets(assetsFolder, projectAssetsFolder);
        copyCSS();
        createHTML();

    });
}

function copyAssets(sourceFolder, targetFolder) {
    fs.mkdir(targetFolder, { recursive: true }, (error) => {
        if (error) {
            return console.error(error);
        }
        fs.readdir(sourceFolder, { withFileTypes: true }, (error, files) => {
            if (error) {
                console.log(error.message)
            } else {
                files.forEach((file) => {
                    const fromFile = path.join(sourceFolder, file.name);
                    const toFile = path.join(targetFolder, file.name);
                    if (file.isDirectory()) {
                        copyAssets(fromFile, toFile);
                    }
                    else {
                        fs.copyFile(fromFile, toFile, () => { });
                    }
                });

            }
        });

    });
}

function copyCSS() {

    const bundleFile = path.join(projectFolder, 'style.css');
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
}

function createHTML() {

    const templateFile = path.join(__dirname, 'template.html');
    const HTMLFile = path.join(projectFolder, 'index.html');


    const templateFileStream = fs.createReadStream(templateFile, 'utf-8');
    let HTMLContent = '';
    templateFileStream.on('data', (chunk) => HTMLContent = chunk.toString());


    fs.readdir(componentsFolder, { withFileTypes: true }, (error, files) => {
        if (error) {
            console.log(error.message)
        } else {
            files.forEach((file) => {
                const componentFile = path.join(componentsFolder, file.name);
                const componentExtension = path.extname(componentFile).slice(1);
                const componentName = file.name.replace(`.${componentExtension}`, '');

                if (file.isFile() && componentExtension === 'html') {

                    const componentsContent = fs.createReadStream(componentFile, 'utf-8');
                    componentsContent.on('data', (chunk) => {
                        HTMLContent = HTMLContent.replaceAll(`{{${componentName}}}`, chunk);
                        fs.writeFile(HTMLFile, HTMLContent, () => { });

                    });

                }
            });

        }
    });
}


buildHTML();