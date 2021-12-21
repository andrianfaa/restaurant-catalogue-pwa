/* eslint-disable import/no-extraneous-dependencies */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, 'src/public/media/heros');
const destination = path.resolve(__dirname, 'src/public/media/heros');

if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
}

fs.readdirSync(source)
    .forEach((image) => {
        // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
        sharp(`${source}/${image}`)
            .resize(800)
            .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
                .slice(0, -1)
                .join('.')}-large.jpg`));

        // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
        sharp(`${source}/${image}`)
            .resize(480)
            .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
                .slice(0, -1)
                .join('.')}-small.jpg`));
    });
