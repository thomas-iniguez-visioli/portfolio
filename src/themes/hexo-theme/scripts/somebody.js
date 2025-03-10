'use strict';

const somebody = import('somebody');

hexo.extend.helper.register('somebody', somebody.parse.bind(somebody));
