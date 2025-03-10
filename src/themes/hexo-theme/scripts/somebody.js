'use strict';

const requir = module.createRequire(import.meta.url);
const somebody = requir('somebody');

hexo.extend.helper.register('somebody', somebody.parse.bind(somebody));
