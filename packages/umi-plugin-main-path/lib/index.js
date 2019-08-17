"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("./utils/utils");

function noop() {
  return true;
}

function _default(api) {
  const log = api.log,
        config = api.config;
  log.success('reset main path plugin success!');

  api._registerConfig(() => {
    return () => {
      return {
        name: 'mainPath',
        validate: noop,

        onChange() {
          api.restart(`mainPath change`);
        }

      };
    };
  });

  console.log(config['mainPath']);

  if (config['mainPath']) {
    api.modifyRoutes(routes => {
      return (0, _utils.resetMainPath)(routes, config['mainPath']);
    });
  }
}