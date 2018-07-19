const dirTree = require('directory-tree')
    , fs = require('fs');

fs.writeFileSync('../../src/assets/data/Renders.json', JSON.stringify(dirTree('../../static/map_renders', { extensions: /\.png/})), (err) => {
    if (err) console.log(err);
});
