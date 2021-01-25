'use strict';

// had enabled by egg
// exports.static = true;

exports.assets = {
  enable: false,
  package: 'egg-view-assets',
};

exports.nunjucks = {
  enable: false,
  package: 'egg-view-nunjucks',
};

exports.alinode = {
  enable: true,
  package: 'egg-alinode'
};
