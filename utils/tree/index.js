const dirTree = require('directory-tree')
    , fs = require('fs');

fs.writeFileSync('../../src/assets/data/Renders.json', JSON.stringify(dirTree('F:\\Github\\Source-Map-Thumbnails\\screenshots\\', { extensions: /\.jpg/})), (err) => {
    if (err) console.log(err);
});
