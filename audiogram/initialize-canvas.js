var fs = require("fs"),
    path = require("path"),
    Canvas = require("canvas"),
    logger = require("../lib/logger/"),

    getRenderer = require("../renderer/");
    

    const download = require('image-downloader');

function initializeCanvas(theme, cb) {

  // Fonts pre-registered in bin/worker
  var renderer = getRenderer(theme);

  if (!theme.backgroundImage) {
    return cb(null, renderer);
  }

  const options = {
    url: theme.imageURL,
    dest: '/tmp/',               // will be saved to /path/to/dest/image.jpg
  };
  
  download.image(options)
    .then(({ filename }) => {
      logger.debug('Saved to', filename); // saved to /path/to/dest/image.jpg

      var bg = new Canvas.Image;
      bg.src = filename; //raw;
      renderer.backgroundImage(bg);

      return cb(null, renderer);

    })
    .catch((err) => console.error(err));

    /*
  // Load background image from file (done separately so renderer code can work in browser too)
  fs.readFile(path.join(__dirname, "..", "settings", "backgrounds", theme.backgroundImage), function(err, raw){

    if (err) {
      return cb(err);
    }

    var bg = new Canvas.Image;
    bg.src = raw;
    renderer.backgroundImage(bg);

    return cb(null, renderer);

  }); */

}

module.exports = initializeCanvas;
