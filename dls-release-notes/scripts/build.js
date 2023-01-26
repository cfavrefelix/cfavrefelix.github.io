const rewire = require("rewire");
const defaults = rewire("react-scripts/scripts/build.js");
let config = defaults.__get__("config");

// This disables code splitting of the built application files
config.optimization.splitChunks = {
  cacheGroups: {
    default: false,
  },
};
config.optimization.runtimeChunk = false;

// Sets the out javascript name
config.output.filename = 'static/js/sds-release-note.min.js'

// Renames main.b100e6da.css to main.css
config.plugins[5].options.filename = 'static/css/sds-release-note.min.css'
config.plugins[5].options.moduleFilename = () => 'static/css/sds-release-note.min.css'
