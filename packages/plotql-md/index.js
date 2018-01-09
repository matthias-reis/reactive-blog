const glob = require('glob');
const { readFile } = require('fs');
const frontMatter = require('front-matter');

const cache = {};

const typize = obj => {
  let type = typeof obj;

  if (type === 'object' && Array.isArray(obj)) {
    type = 'array';
  }
};

module.exports = (name, folder) =>
  new Promise((resolve, reject) => {
    const dataStructure = {};
    glob(`${folder}/*.md`, (err, files) => {
      files.forEach(file => {
        readFile(file, 'utf8', function(err, data) {
          if (err) reject(err);

          const content = frontMatter(data);
          cache[file] = {
            ...content.attributes,
            body: content.body,
            file: file
          };

          Object.keys(cache[file]).forEach(key => {
            let type = typeof cache[file][key];
            if (type === 'object' && Array.isArray(cache[file][key])) {
              type = 'array';
            }
            dataStructure[key] = type;
          });

          console.log(dataStructure);
        });
      });
    });
    // parse the metadata structure
    // convert it to a type system
    // create a resolver for that
  });
