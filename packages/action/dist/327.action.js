"use strict";
exports.id = 327;
exports.ids = [327];
exports.modules = {

/***/ 9327:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toFormData": () => (/* binding */ toFormData)
/* harmony export */ });
/* harmony import */ var _Users_wangchujiang_git_project_github_markdown_to_html_cli_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2723);
/* harmony import */ var _Users_wangchujiang_git_project_github_markdown_to_html_cli_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4795);
/* harmony import */ var _Users_wangchujiang_git_project_github_markdown_to_html_cli_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9249);
/* harmony import */ var _Users_wangchujiang_git_project_github_markdown_to_html_cli_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7371);
/* harmony import */ var _Users_wangchujiang_git_project_github_markdown_to_html_cli_node_modules_babel_runtime_helpers_esm_asyncIterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9621);
/* harmony import */ var fetch_blob_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6002);
/* harmony import */ var formdata_polyfill_esm_min_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7409);







var s = 0;
var S = {
  START_BOUNDARY: s++,
  HEADER_FIELD_START: s++,
  HEADER_FIELD: s++,
  HEADER_VALUE_START: s++,
  HEADER_VALUE: s++,
  HEADER_VALUE_ALMOST_DONE: s++,
  HEADERS_ALMOST_DONE: s++,
  PART_DATA_START: s++,
  PART_DATA: s++,
  END: s++
};
var f = 1;
var F = {
  PART_BOUNDARY: f,
  LAST_BOUNDARY: f *= 2
};
var LF = 10;
var CR = 13;
var SPACE = 32;
var HYPHEN = 45;
var COLON = 58;
var A = 97;
var Z = 122;
var lower = function lower(c) {
  return c | 0x20;
};
var noop = function noop() {};
var MultipartParser = /*#__PURE__*/function () {
  /**
   * @param {string} boundary
   */
  function MultipartParser(boundary) {
    (0,_Users_wangchujiang_git_project_github_markdown_to_html_cli_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(this, MultipartParser);
    this.index = 0;
    this.flags = 0;
    this.onHeaderEnd = noop;
    this.onHeaderField = noop;
    this.onHeadersEnd = noop;
    this.onHeaderValue = noop;
    this.onPartBegin = noop;
    this.onPartData = noop;
    this.onPartEnd = noop;
    this.boundaryChars = {};
    boundary = '\r\n--' + boundary;
    var ui8a = new Uint8Array(boundary.length);
    for (var i = 0; i < boundary.length; i++) {
      ui8a[i] = boundary.charCodeAt(i);
      this.boundaryChars[ui8a[i]] = true;
    }
    this.boundary = ui8a;
    this.lookbehind = new Uint8Array(this.boundary.length + 8);
    this.state = S.START_BOUNDARY;
  }

  /**
   * @param {Uint8Array} data
   */
  (0,_Users_wangchujiang_git_project_github_markdown_to_html_cli_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(MultipartParser, [{
    key: "write",
    value: function write(data) {
      var _this = this;
      var i = 0;
      var length_ = data.length;
      var previousIndex = this.index;
      var lookbehind = this.lookbehind,
        boundary = this.boundary,
        boundaryChars = this.boundaryChars,
        index = this.index,
        state = this.state,
        flags = this.flags;
      var boundaryLength = this.boundary.length;
      var boundaryEnd = boundaryLength - 1;
      var bufferLength = data.length;
      var c;
      var cl;
      var mark = function mark(name) {
        _this[name + 'Mark'] = i;
      };
      var clear = function clear(name) {
        delete _this[name + 'Mark'];
      };
      var callback = function callback(callbackSymbol, start, end, ui8a) {
        if (start === undefined || start !== end) {
          _this[callbackSymbol](ui8a && ui8a.subarray(start, end));
        }
      };
      var dataCallback = function dataCallback(name, clear) {
        var markSymbol = name + 'Mark';
        if (!(markSymbol in _this)) {
          return;
        }
        if (clear) {
          callback(name, _this[markSymbol], i, data);
          delete _this[markSymbol];
        } else {
          callback(name, _this[markSymbol], data.length, data);
          _this[markSymbol] = 0;
        }
      };
      for (i = 0; i < length_; i++) {
        c = data[i];
        switch (state) {
          case S.START_BOUNDARY:
            if (index === boundary.length - 2) {
              if (c === HYPHEN) {
                flags |= F.LAST_BOUNDARY;
              } else if (c !== CR) {
                return;
              }
              index++;
              break;
            } else if (index - 1 === boundary.length - 2) {
              if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                state = S.END;
                flags = 0;
              } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                index = 0;
                callback('onPartBegin');
                state = S.HEADER_FIELD_START;
              } else {
                return;
              }
              break;
            }
            if (c !== boundary[index + 2]) {
              index = -2;
            }
            if (c === boundary[index + 2]) {
              index++;
            }
            break;
          case S.HEADER_FIELD_START:
            state = S.HEADER_FIELD;
            mark('onHeaderField');
            index = 0;
          // falls through
          case S.HEADER_FIELD:
            if (c === CR) {
              clear('onHeaderField');
              state = S.HEADERS_ALMOST_DONE;
              break;
            }
            index++;
            if (c === HYPHEN) {
              break;
            }
            if (c === COLON) {
              if (index === 1) {
                // empty header field
                return;
              }
              dataCallback('onHeaderField', true);
              state = S.HEADER_VALUE_START;
              break;
            }
            cl = lower(c);
            if (cl < A || cl > Z) {
              return;
            }
            break;
          case S.HEADER_VALUE_START:
            if (c === SPACE) {
              break;
            }
            mark('onHeaderValue');
            state = S.HEADER_VALUE;
          // falls through
          case S.HEADER_VALUE:
            if (c === CR) {
              dataCallback('onHeaderValue', true);
              callback('onHeaderEnd');
              state = S.HEADER_VALUE_ALMOST_DONE;
            }
            break;
          case S.HEADER_VALUE_ALMOST_DONE:
            if (c !== LF) {
              return;
            }
            state = S.HEADER_FIELD_START;
            break;
          case S.HEADERS_ALMOST_DONE:
            if (c !== LF) {
              return;
            }
            callback('onHeadersEnd');
            state = S.PART_DATA_START;
            break;
          case S.PART_DATA_START:
            state = S.PART_DATA;
            mark('onPartData');
          // falls through
          case S.PART_DATA:
            previousIndex = index;
            if (index === 0) {
              // boyer-moore derrived algorithm to safely skip non-boundary data
              i += boundaryEnd;
              while (i < bufferLength && !(data[i] in boundaryChars)) {
                i += boundaryLength;
              }
              i -= boundaryEnd;
              c = data[i];
            }
            if (index < boundary.length) {
              if (boundary[index] === c) {
                if (index === 0) {
                  dataCallback('onPartData', true);
                }
                index++;
              } else {
                index = 0;
              }
            } else if (index === boundary.length) {
              index++;
              if (c === CR) {
                // CR = part boundary
                flags |= F.PART_BOUNDARY;
              } else if (c === HYPHEN) {
                // HYPHEN = end boundary
                flags |= F.LAST_BOUNDARY;
              } else {
                index = 0;
              }
            } else if (index - 1 === boundary.length) {
              if (flags & F.PART_BOUNDARY) {
                index = 0;
                if (c === LF) {
                  // unset the PART_BOUNDARY flag
                  flags &= ~F.PART_BOUNDARY;
                  callback('onPartEnd');
                  callback('onPartBegin');
                  state = S.HEADER_FIELD_START;
                  break;
                }
              } else if (flags & F.LAST_BOUNDARY) {
                if (c === HYPHEN) {
                  callback('onPartEnd');
                  state = S.END;
                  flags = 0;
                } else {
                  index = 0;
                }
              } else {
                index = 0;
              }
            }
            if (index > 0) {
              // when matching a possible boundary, keep a lookbehind reference
              // in case it turns out to be a false lead
              lookbehind[index - 1] = c;
            } else if (previousIndex > 0) {
              // if our boundary turned out to be rubbish, the captured lookbehind
              // belongs to partData
              var _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
              callback('onPartData', 0, previousIndex, _lookbehind);
              previousIndex = 0;
              mark('onPartData');

              // reconsider the current character even so it interrupted the sequence
              // it could be the beginning of a new sequence
              i--;
            }
            break;
          case S.END:
            break;
          default:
            throw new Error("Unexpected state entered: ".concat(state));
        }
      }
      dataCallback('onHeaderField');
      dataCallback('onHeaderValue');
      dataCallback('onPartData');

      // Update properties for the next call
      this.index = index;
      this.state = state;
      this.flags = flags;
    }
  }, {
    key: "end",
    value: function end() {
      if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
        this.onPartEnd();
      } else if (this.state !== S.END) {
        throw new Error('MultipartParser.end(): stream ended unexpectedly');
      }
    }
  }]);
  return MultipartParser;
}();
function _fileName(headerValue) {
  // matches either a quoted-string or a token (RFC 2616 section 19.5.1)
  var m = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m) {
    return;
  }
  var match = m[2] || m[3] || '';
  var filename = match.slice(match.lastIndexOf('\\') + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, function (m, code) {
    return String.fromCharCode(code);
  });
  return filename;
}
function toFormData(_x, _x2) {
  return _toFormData.apply(this, arguments);
}
function _toFormData() {
  _toFormData = (0,_Users_wangchujiang_git_project_github_markdown_to_html_cli_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)( /*#__PURE__*/(0,_Users_wangchujiang_git_project_github_markdown_to_html_cli_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)().mark(function _callee(Body, ct) {
    var m, parser, headerField, headerValue, entryValue, entryName, contentType, filename, entryChunks, formData, onPartData, appendToFile, appendFileToFormData, appendEntryToFormData, decoder, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk;
    return (0,_Users_wangchujiang_git_project_github_markdown_to_html_cli_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (/multipart/i.test(ct)) {
            _context.next = 2;
            break;
          }
          throw new TypeError('Failed to fetch');
        case 2:
          m = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
          if (m) {
            _context.next = 5;
            break;
          }
          throw new TypeError('no or bad content-type header, no multipart boundary');
        case 5:
          parser = new MultipartParser(m[1] || m[2]);
          entryChunks = [];
          formData = new formdata_polyfill_esm_min_js__WEBPACK_IMPORTED_MODULE_1__/* .FormData */ .Ct();
          onPartData = function onPartData(ui8a) {
            entryValue += decoder.decode(ui8a, {
              stream: true
            });
          };
          appendToFile = function appendToFile(ui8a) {
            entryChunks.push(ui8a);
          };
          appendFileToFormData = function appendFileToFormData() {
            var file = new fetch_blob_from_js__WEBPACK_IMPORTED_MODULE_0__/* .File */ .$B(entryChunks, filename, {
              type: contentType
            });
            formData.append(entryName, file);
          };
          appendEntryToFormData = function appendEntryToFormData() {
            formData.append(entryName, entryValue);
          };
          decoder = new TextDecoder('utf-8');
          decoder.decode();
          parser.onPartBegin = function () {
            parser.onPartData = onPartData;
            parser.onPartEnd = appendEntryToFormData;
            headerField = '';
            headerValue = '';
            entryValue = '';
            entryName = '';
            contentType = '';
            filename = null;
            entryChunks.length = 0;
          };
          parser.onHeaderField = function (ui8a) {
            headerField += decoder.decode(ui8a, {
              stream: true
            });
          };
          parser.onHeaderValue = function (ui8a) {
            headerValue += decoder.decode(ui8a, {
              stream: true
            });
          };
          parser.onHeaderEnd = function () {
            headerValue += decoder.decode();
            headerField = headerField.toLowerCase();
            if (headerField === 'content-disposition') {
              // matches either a quoted-string or a token (RFC 2616 section 19.5.1)
              var _m = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
              if (_m) {
                entryName = _m[2] || _m[3] || '';
              }
              filename = _fileName(headerValue);
              if (filename) {
                parser.onPartData = appendToFile;
                parser.onPartEnd = appendFileToFormData;
              }
            } else if (headerField === 'content-type') {
              contentType = headerValue;
            }
            headerValue = '';
            headerField = '';
          };
          _iteratorAbruptCompletion = false;
          _didIteratorError = false;
          _context.prev = 20;
          _iterator = (0,_Users_wangchujiang_git_project_github_markdown_to_html_cli_node_modules_babel_runtime_helpers_esm_asyncIterator_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(Body);
        case 22:
          _context.next = 24;
          return _iterator.next();
        case 24:
          if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
            _context.next = 30;
            break;
          }
          chunk = _step.value;
          parser.write(chunk);
        case 27:
          _iteratorAbruptCompletion = false;
          _context.next = 22;
          break;
        case 30:
          _context.next = 36;
          break;
        case 32:
          _context.prev = 32;
          _context.t0 = _context["catch"](20);
          _didIteratorError = true;
          _iteratorError = _context.t0;
        case 36:
          _context.prev = 36;
          _context.prev = 37;
          if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
            _context.next = 41;
            break;
          }
          _context.next = 41;
          return _iterator["return"]();
        case 41:
          _context.prev = 41;
          if (!_didIteratorError) {
            _context.next = 44;
            break;
          }
          throw _iteratorError;
        case 44:
          return _context.finish(41);
        case 45:
          return _context.finish(36);
        case 46:
          parser.end();
          return _context.abrupt("return", formData);
        case 48:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[20, 32, 36, 46], [37,, 41, 45]]);
  }));
  return _toFormData.apply(this, arguments);
}

/***/ })

};
;