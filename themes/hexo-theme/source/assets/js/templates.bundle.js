import { c as createCommonjsModule, g as getCjsExportFromNamespace } from './chunk__commonjsHelpers.js';

const fs = {};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  let up = 0;
  for (let i = parts.length - 1; i >= 0; i--) {
    let last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }
  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
const splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
const splitPath = function (filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
function resolve() {
  let resolvedPath = '', resolvedAbsolute = false;
  for (let i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    let path = i >= 0 ? arguments[i] : '/';

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }
    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');
  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
}

// path.normalize(path)
// posix version
function normalize(path) {
  let isPathAbsolute = isAbsolute(path), trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isPathAbsolute).join('/');
  if (!path && !isPathAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }
  return (isPathAbsolute ? '/' : '') + path;
}

// posix version
function isAbsolute(path) {
  return path.charAt(0) === '/';
}

// posix version
function join() {
  let paths = Array.prototype.slice.call(arguments, 0);
  return normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
}

// path.relative(from, to)
// posix version
function relative(from, to) {
  from = resolve(from).substr(1);
  to = resolve(to).substr(1);
  function trim(arr) {
    let start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }
    let end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }
    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }
  let fromParts = trim(from.split('/'));
  let toParts = trim(to.split('/'));
  let length = Math.min(fromParts.length, toParts.length);
  let samePartsLength = length;
  for (let i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }
  let outputParts = [];
  for (let i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join('/');
}
const sep = '/';
const delimiter = ':';
function dirname(path) {
  let result = splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }
  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
}
function basename(path, ext) {
  let f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
}
function extname(path) {
  return splitPath(path)[3];
}
const require$$0 = {
  extname: extname,
  basename: basename,
  dirname: dirname,
  sep: sep,
  delimiter: delimiter,
  relative: relative,
  join: join,
  isAbsolute: isAbsolute,
  normalize: normalize,
  resolve: resolve
};
function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  let res = [];
  for (let i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
let substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};

const utils = createCommonjsModule(function (module, exports) {

  const regExpChars = /[|\\{}()[\]^$+*?.]/g;
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = function (obj, key) {
    return hasOwnProperty.apply(obj, [key]);
  };

  /**
   * Escape characters reserved in regular expressions.
   *
   * If `string` is `undefined` or `null`, the empty string is returned.
   *
   * @param {String} string Input string
   * @return {String} Escaped string
   * @static
   * @private
   */
  exports.escapeRegExpChars = function (string) {
    // istanbul ignore if
    if (!string) {
      return '';
    }
    return String(string).replace(regExpChars, '\\$&');
  };
  const _ENCODE_HTML_RULES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&#34;',
    "'": '&#39;'
  };
  const _MATCH_HTML = /[&<>'"]/g;
  function encode_char(c) {
    return _ENCODE_HTML_RULES[c] || c;
  }

  /**
   * Stringified version of constants used by {@link module:utils.escapeXML}.
   *
   * It is used in the process of generating {@link ClientFunction}s.
   *
   * @readonly
   * @type {String}
   */

  const escapeFuncStr = 'var _ENCODE_HTML_RULES = {\n' + '      "&": "&amp;"\n' + '    , "<": "&lt;"\n' + '    , ">": "&gt;"\n' + '    , \'"\': "&#34;"\n' + '    , "\'": "&#39;"\n' + '    }\n' + '  , _MATCH_HTML = /[&<>\'"]/g;\n' + 'function encode_char(c) {\n' + '  return _ENCODE_HTML_RULES[c] || c;\n' + '};\n';

  /**
   * Escape characters reserved in XML.
   *
   * If `markup` is `undefined` or `null`, the empty string is returned.
   *
   * @implements {EscapeCallback}
   * @param {String} markup Input string
   * @return {String} Escaped string
   * @static
   * @private
   */

  exports.escapeXML = function (markup) {
    return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
  };
  function escapeXMLToString() {
    return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
  }
  try {
    if (typeof Object.defineProperty === 'function') {
      // If the Function prototype is frozen, the "toString" property is non-writable. This means that any objects which inherit this property
      // cannot have the property changed using an assignment. If using strict mode, attempting that will cause an error. If not using strict
      // mode, attempting that will be silently ignored.
      // However, we can still explicitly shadow the prototype's "toString" property by defining a new "toString" property on this object.
      Object.defineProperty(exports.escapeXML, 'toString', {
        value: escapeXMLToString
      });
    } else {
      // If Object.defineProperty() doesn't exist, attempt to shadow this property using the assignment operator.
      exports.escapeXML.toString = escapeXMLToString;
    }
  } catch (err) {
    console.warn('Unable to set escapeXML.toString (is the Function prototype frozen?)');
  }

  /**
   * Naive copy of properties from one object to another.
   * Does not recurse into non-scalar properties
   * Does not check to see if the property has a value before copying
   *
   * @param  {Object} to   Destination object
   * @param  {Object} from Source object
   * @return {Object}      Destination object
   * @static
   * @private
   */
  exports.shallowCopy = function (to, from) {
    from = from || {};
    if (to !== null && to !== undefined) {
      for (let p in from) {
        if (!hasOwn(from, p)) {
          continue;
        }
        if (p === '__proto__' || p === 'constructor') {
          continue;
        }
        to[p] = from[p];
      }
    }
    return to;
  };

  /**
   * Naive copy of a list of key names, from one object to another.
   * Only copies property if it is actually defined
   * Does not recurse into non-scalar properties
   *
   * @param  {Object} to   Destination object
   * @param  {Object} from Source object
   * @param  {Array} list List of properties to copy
   * @return {Object}      Destination object
   * @static
   * @private
   */
  exports.shallowCopyFromList = function (to, from, list) {
    list = list || [];
    from = from || {};
    if (to !== null && to !== undefined) {
      for (let i = 0; i < list.length; i++) {
        let p = list[i];
        if (typeof from[p] != 'undefined') {
          if (!hasOwn(from, p)) {
            continue;
          }
          if (p === '__proto__' || p === 'constructor') {
            continue;
          }
          to[p] = from[p];
        }
      }
    }
    return to;
  };

  /**
   * Simple in-process cache implementation. Does not implement limits of any
   * sort.
   *
   * @implements {Cache}
   * @static
   * @private
   */
  exports.cache = {
    _data: {},
    set: function (key, val) {
      this._data[key] = val;
    },
    get: function (key) {
      return this._data[key];
    },
    remove: function (key) {
      delete this._data[key];
    },
    reset: function () {
      this._data = {};
    }
  };

  /**
   * Transforms hyphen case variable into camel case.
   *
   * @param {String} string Hyphen case string
   * @return {String} Camel case string
   * @static
   * @private
   */
  exports.hyphenToCamel = function (str) {
    return str.replace(/-[a-z]/g, function (match) {
      return match[1].toUpperCase();
    });
  };

  /**
   * Returns a null-prototype object in runtimes that support it
   *
   * @return {Object} Object, prototype will be set to null where possible
   * @static
   * @private
   */
  exports.createNullProtoObjWherePossible = function () {
    if (typeof Object.create == 'function') {
      return function () {
        return Object.create(null);
      };
    }
    if (!({
      __proto__: null
    } instanceof Object)) {
      return function () {
        return {
          __proto__: null
        };
      };
    }
    // Not possible, just pass through
    return function () {
      return {};
    };
  }();
  exports.hasOwnOnlyObject = function (obj) {
    const o = exports.createNullProtoObjWherePossible();
    for (const p in obj) {
      if (hasOwn(obj, p)) {
        o[p] = obj[p];
      }
    }
    return o;
  };
});
utils.escapeRegExpChars;
utils.escapeXML;
utils.shallowCopy;
utils.shallowCopyFromList;
utils.cache;
utils.hyphenToCamel;
utils.createNullProtoObjWherePossible;
utils.hasOwnOnlyObject;

const name = "ejs";
const description = "Embedded JavaScript templates";
const keywords = [
	"template",
	"engine",
	"ejs"
];
const version = "3.1.10";
const author = "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)";
const license = "Apache-2.0";
const bin = {
	ejs: "./bin/cli.js"
};
const main = "./lib/ejs.js";
const jsdelivr = "ejs.min.js";
const unpkg = "ejs.min.js";
const repository = {
	type: "git",
	url: "git://github.com/mde/ejs.git"
};
const bugs = "https://github.com/mde/ejs/issues";
const homepage = "https://github.com/mde/ejs";
const dependencies = {
	jake: "^10.8.5"
};
const devDependencies = {
	browserify: "^16.5.1",
	eslint: "^6.8.0",
	"git-directory-deploy": "^1.5.1",
	jsdoc: "^4.0.2",
	"lru-cache": "^4.0.1",
	mocha: "^10.2.0",
	"uglify-js": "^3.3.16"
};
const engines = {
	node: ">=0.10.0"
};
const scripts = {
	test: "npx jake test"
};
const _package = {
	name: name,
	description: description,
	keywords: keywords,
	version: version,
	author: author,
	license: license,
	bin: bin,
	main: main,
	jsdelivr: jsdelivr,
	unpkg: unpkg,
	repository: repository,
	bugs: bugs,
	homepage: homepage,
	dependencies: dependencies,
	devDependencies: devDependencies,
	engines: engines,
	scripts: scripts
};

const _package$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name,
  description: description,
  keywords: keywords,
  version: version,
  author: author,
  license: license,
  bin: bin,
  main: main,
  jsdelivr: jsdelivr,
  unpkg: unpkg,
  repository: repository,
  bugs: bugs,
  homepage: homepage,
  dependencies: dependencies,
  devDependencies: devDependencies,
  engines: engines,
  scripts: scripts,
  'default': _package
});

const require$$1 = getCjsExportFromNamespace(_package$1);

const ejs = createCommonjsModule(function (module, exports) {

  /**
   * @file Embedded JavaScript templating engine. {@link http://ejs.co}
   * @author Matthew Eernisse <mde@fleegix.org>
   * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
   * @project EJS
   * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
   */

  /**
   * EJS internal functions.
   *
   * Technically this "module" lies in the same file as {@link module:ejs}, for
   * the sake of organization all the private functions re grouped into this
   * module.
   *
   * @module ejs-internal
   * @private
   */

  /**
   * Embedded JavaScript templating engine.
   *
   * @module ejs
   * @public
   */
  const path = require$$0;
  const scopeOptionWarned = false;
  /** @type {string} */
  const _VERSION_STRING = require$$1.version;
  const _DEFAULT_OPEN_DELIMITER = '<';
  const _DEFAULT_CLOSE_DELIMITER = '>';
  const _DEFAULT_DELIMITER = '%';
  const _DEFAULT_LOCALS_NAME = 'locals';
  const _NAME = 'ejs';
  const _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
  const _OPTS_PASSABLE_WITH_DATA = ['delimiter', 'scope', 'context', 'debug', 'compileDebug', 'client', '_with', 'rmWhitespace', 'strict', 'filename', 'async'];
  // We don't allow 'cache' option to be passed in the data obj for
  // the normal `render` call, but this is where Express 2 & 3 put it
  // so we make an exception for `renderFile`
  const _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat('cache');
  const _BOM = /^\uFEFF/;
  const _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;

  /**
   * EJS template function cache. This can be a LRU object from lru-cache NPM
   * module. By default, it is {@link module:utils.cache}, a simple in-process
   * cache that grows continuously.
   *
   * @type {Cache}
   */

  exports.cache = utils.cache;

  /**
   * Custom file loader. Useful for template preprocessing or restricting access
   * to a certain part of the filesystem.
   *
   * @type {fileLoader}
   */

  exports.fileLoader = fs.readFileSync;

  /**
   * Name of the object containing the locals.
   *
   * This variable is overridden by {@link Options}`.localsName` if it is not
   * `undefined`.
   *
   * @type {String}
   * @public
   */

  exports.localsName = _DEFAULT_LOCALS_NAME;

  /**
   * Promise implementation -- defaults to the native implementation if available
   * This is mostly just for testability
   *
   * @type {PromiseConstructorLike}
   * @public
   */

  exports.promiseImpl = new Function('return this;')().Promise;

  /**
   * Get the path to the included file from the parent file path and the
   * specified path.
   *
   * @param {String}  name     specified path
   * @param {String}  filename parent file path
   * @param {Boolean} [isDir=false] whether the parent file path is a directory
   * @return {String}
   */
  exports.resolveInclude = function (name, filename, isDir) {
    let dirname = path.dirname;
    let extname = path.extname;
    let resolve = path.resolve;
    let includePath = resolve(isDir ? filename : dirname(filename), name);
    let ext = extname(name);
    if (!ext) {
      includePath += '.ejs';
    }
    return includePath;
  };

  /**
   * Try to resolve file path on multiple directories
   *
   * @param  {String}        name  specified path
   * @param  {Array<String>} paths list of possible parent directory paths
   * @return {String}
   */
  function resolvePaths(name, paths) {
    let filePath;
    if (paths.some(function (v) {
      filePath = exports.resolveInclude(name, v, true);
      return fs.existsSync(filePath);
    })) {
      return filePath;
    }
  }

  /**
   * Get the path to the included file by Options
   *
   * @param  {String}  path    specified path
   * @param  {Options} options compilation options
   * @return {String}
   */
  function getIncludePath(path, options) {
    let includePath;
    let filePath;
    let views = options.views;
    let match = /^[A-Za-z]+:\\|^\//.exec(path);

    // Abs path
    if (match && match.length) {
      path = path.replace(/^\/*/, '');
      if (Array.isArray(options.root)) {
        includePath = resolvePaths(path, options.root);
      } else {
        includePath = exports.resolveInclude(path, options.root || '/', true);
      }
    }
    // Relative paths
    else {
      // Look relative to a passed filename first
      if (options.filename) {
        filePath = exports.resolveInclude(path, options.filename);
        if (fs.existsSync(filePath)) {
          includePath = filePath;
        }
      }
      // Then look in any views directories
      if (!includePath && Array.isArray(views)) {
        includePath = resolvePaths(path, views);
      }
      if (!includePath && typeof options.includer !== 'function') {
        throw new Error('Could not find the include file "' + options.escapeFunction(path) + '"');
      }
    }
    return includePath;
  }

  /**
   * Get the template from a string or a file, either compiled on-the-fly or
   * read from cache (if enabled), and cache the template if needed.
   *
   * If `template` is not set, the file specified in `options.filename` will be
   * read.
   *
   * If `options.cache` is true, this function reads the file from
   * `options.filename` so it must be set prior to calling this function.
   *
   * @memberof module:ejs-internal
   * @param {Options} options   compilation options
   * @param {String} [template] template source
   * @return {(TemplateFunction|ClientFunction)}
   * Depending on the value of `options.client`, either type might be returned.
   * @static
   */

  function handleCache(options, template) {
    let func;
    let filename = options.filename;
    let hasTemplate = arguments.length > 1;
    if (options.cache) {
      if (!filename) {
        throw new Error('cache option requires a filename');
      }
      func = exports.cache.get(filename);
      if (func) {
        return func;
      }
      if (!hasTemplate) {
        template = fileLoader(filename).toString().replace(_BOM, '');
      }
    } else if (!hasTemplate) {
      // istanbul ignore if: should not happen at all
      if (!filename) {
        throw new Error('Internal EJS error: no file name or template ' + 'provided');
      }
      template = fileLoader(filename).toString().replace(_BOM, '');
    }
    func = exports.compile(template, options);
    if (options.cache) {
      exports.cache.set(filename, func);
    }
    return func;
  }

  /**
   * Try calling handleCache with the given options and data and call the
   * callback with the result. If an error occurs, call the callback with
   * the error. Used by renderFile().
   *
   * @memberof module:ejs-internal
   * @param {Options} options    compilation options
   * @param {Object} data        template data
   * @param {RenderFileCallback} cb callback
   * @static
   */

  function tryHandleCache(options, data, cb) {
    let result;
    if (!cb) {
      if (typeof exports.promiseImpl == 'function') {
        return new exports.promiseImpl(function (resolve, reject) {
          try {
            result = handleCache(options)(data);
            resolve(result);
          } catch (err) {
            reject(err);
          }
        });
      } else {
        throw new Error('Please provide a callback function');
      }
    } else {
      try {
        result = handleCache(options)(data);
      } catch (err) {
        return cb(err);
      }
      cb(null, result);
    }
  }

  /**
   * fileLoader is independent
   *
   * @param {String} filePath ejs file path.
   * @return {String} The contents of the specified file.
   * @static
   */

  function fileLoader(filePath) {
    return exports.fileLoader(filePath);
  }

  /**
   * Get the template function.
   *
   * If `options.cache` is `true`, then the template is cached.
   *
   * @memberof module:ejs-internal
   * @param {String}  path    path for the specified file
   * @param {Options} options compilation options
   * @return {(TemplateFunction|ClientFunction)}
   * Depending on the value of `options.client`, either type might be returned
   * @static
   */

  function includeFile(path, options) {
    let opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options);
    opts.filename = getIncludePath(path, opts);
    if (typeof options.includer === 'function') {
      let includerResult = options.includer(path, opts.filename);
      if (includerResult) {
        if (includerResult.filename) {
          opts.filename = includerResult.filename;
        }
        if (includerResult.template) {
          return handleCache(opts, includerResult.template);
        }
      }
    }
    return handleCache(opts);
  }

  /**
   * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
   * `lineno`.
   *
   * @implements {RethrowCallback}
   * @memberof module:ejs-internal
   * @param {Error}  err      Error object
   * @param {String} str      EJS source
   * @param {String} flnm     file name of the EJS file
   * @param {Number} lineno   line number of the error
   * @param {EscapeCallback} esc
   * @static
   */

  function rethrow(err, str, flnm, lineno, esc) {
    let lines = str.split('\n');
    let start = Math.max(lineno - 3, 0);
    let end = Math.min(lines.length, lineno + 3);
    let filename = esc(flnm);
    // Error context
    let context = lines.slice(start, end).map(function (line, i) {
      let curr = i + start + 1;
      return (curr == lineno ? ' >> ' : '    ') + curr + '| ' + line;
    }).join('\n');

    // Alter exception message
    err.path = filename;
    err.message = (filename || 'ejs') + ':' + lineno + '\n' + context + '\n\n' + err.message;
    throw err;
  }
  function stripSemi(str) {
    return str.replace(/;(\s*$)/, '$1');
  }

  /**
   * Compile the given `str` of ejs into a template function.
   *
   * @param {String}  template EJS template
   *
   * @param {Options} [opts] compilation options
   *
   * @return {(TemplateFunction|ClientFunction)}
   * Depending on the value of `opts.client`, either type might be returned.
   * Note that the return type of the function also depends on the value of `opts.async`.
   * @public
   */

  exports.compile = function compile(template, opts) {
    let templ;

    // v1 compat
    // 'scope' is 'context'
    // FIXME: Remove this in a future version
    if (opts && opts.scope) {
      if (!scopeOptionWarned) {
        console.warn('`scope` option is deprecated and will be removed in EJS 3');
        scopeOptionWarned = true;
      }
      if (!opts.context) {
        opts.context = opts.scope;
      }
      delete opts.scope;
    }
    templ = new Template(template, opts);
    return templ.compile();
  };

  /**
   * Render the given `template` of ejs.
   *
   * If you would like to include options but not data, you need to explicitly
   * call this function with `data` being an empty object or `null`.
   *
   * @param {String}   template EJS template
   * @param {Object}  [data={}] template data
   * @param {Options} [opts={}] compilation and rendering options
   * @return {(String|Promise<String>)}
   * Return value type depends on `opts.async`.
   * @public
   */

  exports.render = function (template, d, o) {
    let data = d || utils.createNullProtoObjWherePossible();
    let opts = o || utils.createNullProtoObjWherePossible();

    // No options object -- if there are optiony names
    // in the data, copy them to options
    if (arguments.length == 2) {
      utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
    }
    return handleCache(opts, template)(data);
  };

  /**
   * Render an EJS file at the given `path` and callback `cb(err, str)`.
   *
   * If you would like to include options but not data, you need to explicitly
   * call this function with `data` being an empty object or `null`.
   *
   * @param {String}             path     path to the EJS file
   * @param {Object}            [data={}] template data
   * @param {Options}           [opts={}] compilation and rendering options
   * @param {RenderFileCallback} cb callback
   * @public
   */

  exports.renderFile = function () {
    let args = Array.prototype.slice.call(arguments);
    let filename = args.shift();
    let cb;
    let opts = {
      filename: filename
    };
    let data;
    let viewOpts;

    // Do we have a callback?
    if (typeof arguments[arguments.length - 1] == 'function') {
      cb = args.pop();
    }
    // Do we have data/opts?
    if (args.length) {
      // Should always have data obj
      data = args.shift();
      // Normal passed opts (data obj + opts obj)
      if (args.length) {
        // Use shallowCopy so we don't pollute passed in opts obj with new vals
        utils.shallowCopy(opts, args.pop());
      }
      // Special casing for Express (settings + opts-in-data)
      else {
        // Express 3 and 4
        if (data.settings) {
          // Pull a few things from known locations
          if (data.settings.views) {
            opts.views = data.settings.views;
          }
          if (data.settings['view cache']) {
            opts.cache = true;
          }
          // Undocumented after Express 2, but still usable, esp. for
          // items that are unsafe to be passed along with data, like `root`
          viewOpts = data.settings['view options'];
          if (viewOpts) {
            utils.shallowCopy(opts, viewOpts);
          }
        }
        // Express 2 and lower, values set in app.locals, or people who just
        // want to pass options in their data. NOTE: These values will override
        // anything previously set in settings  or settings['view options']
        utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
      }
      opts.filename = filename;
    } else {
      data = utils.createNullProtoObjWherePossible();
    }
    return tryHandleCache(opts, data, cb);
  };

  /**
   * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
   * @public
   */

  /**
   * EJS template class
   * @public
   */
  exports.Template = Template;
  exports.clearCache = function () {
    exports.cache.reset();
  };
  function Template(text, optsParam) {
    let opts = utils.hasOwnOnlyObject(optsParam);
    let options = utils.createNullProtoObjWherePossible();
    this.templateText = text;
    /** @type {string | null} */
    this.mode = null;
    this.truncate = false;
    this.currentLine = 1;
    this.source = '';
    options.client = opts.client || false;
    options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
    options.compileDebug = opts.compileDebug !== false;
    options.debug = !!opts.debug;
    options.filename = opts.filename;
    options.openDelimiter = opts.openDelimiter || exports.openDelimiter || _DEFAULT_OPEN_DELIMITER;
    options.closeDelimiter = opts.closeDelimiter || exports.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
    options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
    options.strict = opts.strict || false;
    options.context = opts.context;
    options.cache = opts.cache || false;
    options.rmWhitespace = opts.rmWhitespace;
    options.root = opts.root;
    options.includer = opts.includer;
    options.outputFunctionName = opts.outputFunctionName;
    options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
    options.views = opts.views;
    options.async = opts.async;
    options.destructuredLocals = opts.destructuredLocals;
    options.legacyInclude = typeof opts.legacyInclude != 'undefined' ? !!opts.legacyInclude : true;
    if (options.strict) {
      options._with = false;
    } else {
      options._with = typeof opts._with != 'undefined' ? opts._with : true;
    }
    this.opts = options;
    this.regex = this.createRegex();
  }
  Template.modes = {
    EVAL: 'eval',
    ESCAPED: 'escaped',
    RAW: 'raw',
    COMMENT: 'comment',
    LITERAL: 'literal'
  };
  Template.prototype = {
    createRegex: function () {
      let str = _REGEX_STRING;
      let delim = utils.escapeRegExpChars(this.opts.delimiter);
      let open = utils.escapeRegExpChars(this.opts.openDelimiter);
      let close = utils.escapeRegExpChars(this.opts.closeDelimiter);
      str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
      return new RegExp(str);
    },
    compile: function () {
      /** @type {string} */
      let src;
      /** @type {ClientFunction} */
      let fn;
      let opts = this.opts;
      let prepended = '';
      let appended = '';
      /** @type {EscapeCallback} */
      let escapeFn = opts.escapeFunction;
      /** @type {FunctionConstructor} */
      let ctor;
      /** @type {string} */
      let sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : 'undefined';
      if (!this.source) {
        this.generateSource();
        prepended += '  var __output = "";\n' + '  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
        if (opts.outputFunctionName) {
          if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
            throw new Error('outputFunctionName is not a valid JS identifier.');
          }
          prepended += '  var ' + opts.outputFunctionName + ' = __append;' + '\n';
        }
        if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
          throw new Error('localsName is not a valid JS identifier.');
        }
        if (opts.destructuredLocals && opts.destructuredLocals.length) {
          let destructuring = '  var __locals = (' + opts.localsName + ' || {}),\n';
          for (let i = 0; i < opts.destructuredLocals.length; i++) {
            let name = opts.destructuredLocals[i];
            if (!_JS_IDENTIFIER.test(name)) {
              throw new Error('destructuredLocals[' + i + '] is not a valid JS identifier.');
            }
            if (i > 0) {
              destructuring += ',\n  ';
            }
            destructuring += name + ' = __locals.' + name;
          }
          prepended += destructuring + ';\n';
        }
        if (opts._with !== false) {
          prepended += '  with (' + opts.localsName + ' || {}) {' + '\n';
          appended += '  }' + '\n';
        }
        appended += '  return __output;' + '\n';
        this.source = prepended + this.source + appended;
      }
      if (opts.compileDebug) {
        src = 'var __line = 1' + '\n' + '  , __lines = ' + JSON.stringify(this.templateText) + '\n' + '  , __filename = ' + sanitizedFilename + ';' + '\n' + 'try {' + '\n' + this.source + '} catch (e) {' + '\n' + '  rethrow(e, __lines, __filename, __line, escapeFn);' + '\n' + '}' + '\n';
      } else {
        src = this.source;
      }
      if (opts.client) {
        src = 'escapeFn = escapeFn || ' + escapeFn.toString() + ';' + '\n' + src;
        if (opts.compileDebug) {
          src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
        }
      }
      if (opts.strict) {
        src = '"use strict";\n' + src;
      }
      if (opts.debug) {
        console.log(src);
      }
      if (opts.compileDebug && opts.filename) {
        src = src + '\n' + '//# sourceURL=' + sanitizedFilename + '\n';
      }
      try {
        if (opts.async) {
          // Have to use generated function for this, since in envs without support,
          // it breaks in parsing
          try {
            ctor = new Function('return (async function(){}).constructor;')();
          } catch (e) {
            if (e instanceof SyntaxError) {
              throw new Error('This environment does not support async/await');
            } else {
              throw e;
            }
          }
        } else {
          ctor = Function;
        }
        fn = new ctor(opts.localsName + ', escapeFn, include, rethrow', src);
      } catch (e) {
        // istanbul ignore else
        if (e instanceof SyntaxError) {
          if (opts.filename) {
            e.message += ' in ' + opts.filename;
          }
          e.message += ' while compiling ejs\n\n';
          e.message += 'If the above error is not helpful, you may want to try EJS-Lint:\n';
          e.message += 'https://github.com/RyanZim/EJS-Lint';
          if (!opts.async) {
            e.message += '\n';
            e.message += 'Or, if you meant to create an async function, pass `async: true` as an option.';
          }
        }
        throw e;
      }

      // Return a callable function which will execute the function
      // created by the source-code, with the passed data as locals
      // Adds a local `include` function which allows full recursive include
      let returnedFn = opts.client ? fn : function anonymous(data) {
        let include = function (path, includeData) {
          let d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
          if (includeData) {
            d = utils.shallowCopy(d, includeData);
          }
          return includeFile(path, opts)(d);
        };
        return fn.apply(opts.context, [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]);
      };
      if (opts.filename && typeof Object.defineProperty === 'function') {
        let filename = opts.filename;
        let basename = path.basename(filename, path.extname(filename));
        try {
          Object.defineProperty(returnedFn, 'name', {
            value: basename,
            writable: false,
            enumerable: false,
            configurable: true
          });
        } catch (e) {/* ignore */}
      }
      return returnedFn;
    },
    generateSource: function () {
      let opts = this.opts;
      if (opts.rmWhitespace) {
        // Have to use two separate replace here as `^` and `$` operators don't
        // work well with `\r` and empty lines don't work well with the `m` flag.
        this.templateText = this.templateText.replace(/[\r\n]+/g, '\n').replace(/^\s+|\s+$/gm, '');
      }

      // Slurp spaces and tabs before <%_ and after _%>
      this.templateText = this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');
      let self = this;
      let matches = this.parseTemplateText();
      let d = this.opts.delimiter;
      let o = this.opts.openDelimiter;
      let c = this.opts.closeDelimiter;
      if (matches && matches.length) {
        matches.forEach(function (line, index) {
          let closing;
          // If this is an opening tag, check for closing tags
          // FIXME: May end up with some false positives here
          // Better to store modes as k/v with openDelimiter + delimiter as key
          // Then this can simply check against the map
          if (line.indexOf(o + d) === 0 // If it is a tag
          && line.indexOf(o + d + d) !== 0) {
            // and is not escaped
            closing = matches[index + 2];
            if (!(closing == d + c || closing == '-' + d + c || closing == '_' + d + c)) {
              throw new Error('Could not find matching close tag for "' + line + '".');
            }
          }
          self.scanLine(line);
        });
      }
    },
    parseTemplateText: function () {
      let str = this.templateText;
      let pat = this.regex;
      let result = pat.exec(str);
      let arr = [];
      let firstPos;
      while (result) {
        firstPos = result.index;
        if (firstPos !== 0) {
          arr.push(str.substring(0, firstPos));
          str = str.slice(firstPos);
        }
        arr.push(result[0]);
        str = str.slice(result[0].length);
        result = pat.exec(str);
      }
      if (str) {
        arr.push(str);
      }
      return arr;
    },
    _addOutput: function (line) {
      if (this.truncate) {
        // Only replace single leading linebreak in the line after
        // -%> tag -- this is the single, trailing linebreak
        // after the tag that the truncation mode replaces
        // Handle Win / Unix / old Mac linebreaks -- do the \r\n
        // combo first in the regex-or
        line = line.replace(/^(?:\r\n|\r|\n)/, '');
        this.truncate = false;
      }
      if (!line) {
        return line;
      }

      // Preserve literal slashes
      line = line.replace(/\\/g, '\\\\');

      // Convert linebreaks
      line = line.replace(/\n/g, '\\n');
      line = line.replace(/\r/g, '\\r');

      // Escape double-quotes
      // - this will be the delimiter during execution
      line = line.replace(/"/g, '\\"');
      this.source += '    ; __append("' + line + '")' + '\n';
    },
    scanLine: function (line) {
      let self = this;
      let d = this.opts.delimiter;
      let o = this.opts.openDelimiter;
      let c = this.opts.closeDelimiter;
      let newLineCount = 0;
      newLineCount = line.split('\n').length - 1;
      switch (line) {
        case o + d:
        case o + d + '_':
          this.mode = Template.modes.EVAL;
          break;
        case o + d + '=':
          this.mode = Template.modes.ESCAPED;
          break;
        case o + d + '-':
          this.mode = Template.modes.RAW;
          break;
        case o + d + '#':
          this.mode = Template.modes.COMMENT;
          break;
        case o + d + d:
          this.mode = Template.modes.LITERAL;
          this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")' + '\n';
          break;
        case d + d + c:
          this.mode = Template.modes.LITERAL;
          this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")' + '\n';
          break;
        case d + c:
        case '-' + d + c:
        case '_' + d + c:
          if (this.mode == Template.modes.LITERAL) {
            this._addOutput(line);
          }
          this.mode = null;
          this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
          break;
        default:
          // In script mode, depends on type of tag
          if (this.mode) {
            // If '//' is found without a line break, add a line break.
            switch (this.mode) {
              case Template.modes.EVAL:
              case Template.modes.ESCAPED:
              case Template.modes.RAW:
                if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
                  line += '\n';
                }
            }
            switch (this.mode) {
              // Just executing code
              case Template.modes.EVAL:
                this.source += '    ; ' + line + '\n';
                break;
              // Exec, esc, and output
              case Template.modes.ESCAPED:
                this.source += '    ; __append(escapeFn(' + stripSemi(line) + '))' + '\n';
                break;
              // Exec and output
              case Template.modes.RAW:
                this.source += '    ; __append(' + stripSemi(line) + ')' + '\n';
                break;
              case Template.modes.COMMENT:
                // Do nothing
                break;
              // Literal <%% mode, append as raw output
              case Template.modes.LITERAL:
                this._addOutput(line);
                break;
            }
          }
          // In string mode, just add the output
          else {
            this._addOutput(line);
          }
      }
      if (self.opts.compileDebug && newLineCount) {
        this.currentLine += newLineCount;
        this.source += '    ; __line = ' + this.currentLine + '\n';
      }
    }
  };

  /**
   * Escape characters reserved in XML.
   *
   * This is simply an export of {@link module:utils.escapeXML}.
   *
   * If `markup` is `undefined` or `null`, the empty string is returned.
   *
   * @param {String} markup Input string
   * @return {String} Escaped string
   * @public
   * @func
   * */
  exports.escapeXML = utils.escapeXML;

  /**
   * Express.js support.
   *
   * This is an alias for {@link module:ejs.renderFile}, in order to support
   * Express.js out-of-the-box.
   *
   * @func
   */

  exports.__express = exports.renderFile;

  /**
   * Version of EJS.
   *
   * @readonly
   * @type {String}
   * @public
   */

  exports.VERSION = _VERSION_STRING;

  /**
   * Name for detection of EJS.
   *
   * @readonly
   * @type {String}
   * @public
   */

  exports.name = _NAME;

  /* istanbul ignore if */
  if (typeof window != 'undefined') {
    window.ejs = exports;
  }
});
ejs.cache;
ejs.fileLoader;
ejs.localsName;
ejs.promiseImpl;
ejs.resolveInclude;
let ejs_6 = ejs.compile;
ejs.render;
ejs.renderFile;
ejs.Template;
ejs.clearCache;
ejs.escapeXML;
ejs.__express;
ejs.VERSION;
ejs.name;

const searchResultEjs = "<% if (post.layout === 'post') { %>\n<time class=\"metadata\" datetime=\"<%= post.date %>\"><%= new Date(post.date_as_int * 1000).toLocaleDateString(post.lang, {month: 'long', year: 'numeric'}) %></time>\n<% } %>\n<div>\n  <a href=\"<%= post.permalink %>\" rel=\"bookmark\"><%= post.title %></a>\n  <% if (post.excerpt) { %>\n  <details>\n    <summary>Display_summary</summary>\n    <%- post.excerpt %>\n  </details>\n  <% } %>\n<div>\n";

const nodebookUpdateEjs = "<span class=\"metadata\">\n  <img src=\"<%= commit.author.avatar_url %>&amp;size=30\" class=\"is-avatar\" alt=\"<%= commit.author.login %>\">\n  <time datetime=\"<%= commit.commit.author.date %>\"><%= new Date(commit.commit.author.date).toLocaleDateString('fr', {month: 'long', year: 'numeric'})%></time>\n</span>\n\n\n<pre class=\"message\"><a href=\"<%= commit.html_url %>\" rel=\"noreferrer noopener nofollow\" target=\"_blank\"><%= commit.commit.message %></a></pre>\n";

const photographyTileEjs = "<article class=\"tile is-square\">\n  <img src=\"<%= post.image %>\" alt=\"\" loading=\"auto\">\n  <a href=\"<%= post.permalink %>\" rel=\"bookmark\"><%= post.title %></a>\n</article>\n";

// import searchResultString from '../../../layout/common/search-result.ejs';

let searchResultTemplate = ejs_6(searchResultEjs, {
  client: false
});
let nodebookUpdateTemplate = ejs_6(nodebookUpdateEjs, {
  client: false
});
let photographyTileTemplate = ejs_6(photographyTileEjs, {
  client: false
});
let search = function search(data) {
  return searchResultTemplate(data, {});
};
let nodebookUpdate = function nodebookUpdate(data) {
  return nodebookUpdateTemplate(data, {});
};
let photography = function photography(data) {
  return photographyTileTemplate(data, {});
};

export { nodebookUpdate, photography, search };
