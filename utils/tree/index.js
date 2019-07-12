const dirTree = require('directory-tree')
    , sharp = require('sharp')
    , fs = require('fs');

const sSource = 'F:\\Github\\Source-Map-Thumbnails\\screenshots_blurred\\';

const treeItems = dirTree(sSource, { extensions: /^(?=.*(?:\.jpg))(?!.*(?:blurred\.jpg)).*$/});

fs.writeFileSync('../../src/assets/data/Renders.json', JSON.stringify(treeItems), (err) => {
    if (err) console.log(err);
});

for (const sMap of treeItems.children) {
    for (const Image of sMap.children) {
        let baseName = Image.name.replace(/\.[^/.]+$/, "");
        let blurredPath = sMap.path + '/' + baseName + '_blurred' + Image.extension;

        if (fs.existsSync(blurredPath)) {
            continue;
        }

        sharp(Image.path)
            .blur(10)
            .toFile(blurredPath);
    }
}
