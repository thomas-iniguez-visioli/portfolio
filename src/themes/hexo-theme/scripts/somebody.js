'use strict';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const somebody = require('somebody');

hexo.extend.helper.register('somebody', somebody.parse.bind(somebody));
