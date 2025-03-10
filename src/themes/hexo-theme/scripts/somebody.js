'use strict';

const require = module.createRequire(import.meta.url);
const somebody = require('somebody');

hexo.extend.helper.register('somebody', somebody.parse.bind(somebody));
