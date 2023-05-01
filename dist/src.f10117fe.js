// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/ComputerPlayer.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComputerPlayer = void 0;
var ComputerPlayer = /*#__PURE__*/function () {
  function ComputerPlayer(name) {
    _classCallCheck(this, ComputerPlayer);
    this.name = name;
    this.selectedMatches = [];
    this.isHuman = false;
  }
  _createClass(ComputerPlayer, [{
    key: "takeTurn",
    value: function takeTurn() {
      var availableMatches = _toConsumableArray(document.querySelectorAll(".matches__heap__match:not(.matches__heap__match--selected):not(.matches__heap__match--removed)"));
      var cpuRandomAmountMatches = 0;
      var totalMatches = availableMatches.length;
      var remainingMatches = totalMatches - this.selectedMatches.length;
      if (remainingMatches > 1) {
        cpuRandomAmountMatches = (remainingMatches - 1) % 4; // module 4 winning strategy for nim
        if (cpuRandomAmountMatches === 0) {
          // just two matches left
          cpuRandomAmountMatches = 1;
        }
      }
      for (var i = 0; i < cpuRandomAmountMatches; i++) {
        var randomIndex = Math.floor(Math.random() * availableMatches.length - 1) + 1;
        var cpuSelectedMatch = availableMatches.splice(randomIndex, 1)[0];
        cpuSelectedMatch.classList.add("matches__heap__match--selected");
        this.selectedMatches.push({
          id: this.getMatchId(cpuSelectedMatch),
          isSelected: true,
          isRemoved: false
        });
      }
      console.log("Computer selected random matches: ".concat(this.selectedMatches.length));
      return this.selectedMatches.length;
    }
  }, {
    key: "endTurn",
    value: function endTurn() {
      this.selectedMatches = [];
    }
  }, {
    key: "getMatchId",
    value: function getMatchId(match) {
      var _a;
      return +((_a = match.getAttribute("id")) !== null && _a !== void 0 ? _a : 0);
    }
  }]);
  return ComputerPlayer;
}();
exports.ComputerPlayer = ComputerPlayer;
},{}],"src/HumanPlayer.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HumanPlayer = void 0;
var HumanPlayer = /*#__PURE__*/function () {
  function HumanPlayer(name) {
    _classCallCheck(this, HumanPlayer);
    this.name = name;
    this.selectedMatches = [];
    this.isHuman = true;
  }
  _createClass(HumanPlayer, [{
    key: "takeTurn",
    value: function takeTurn(selectedMatch) {
      var _this = this;
      var _a;
      var isMatchAlreadySelected = selectedMatch.classList.contains("matches__heap__match--selected");
      var isMatchSelectionMaxed = ((_a = this.selectedMatches) === null || _a === void 0 ? void 0 : _a.length) === 3;
      if (!isMatchAlreadySelected && isMatchSelectionMaxed) {
        alert("Only 3 cards are allowed to be selected per each round. Please unselect a card to continue");
        return this.selectedMatches.length;
      }
      if (isMatchAlreadySelected) {
        selectedMatch.classList.remove("matches__heap__match--selected");
        this.selectedMatches = this.selectedMatches.filter(function (match) {
          return match.id !== _this.getMatchId(selectedMatch);
        });
      } else {
        selectedMatch.classList.add("matches__heap__match--selected");
        this.selectedMatches.push({
          id: this.getMatchId(selectedMatch),
          isSelected: true,
          isRemoved: false
        });
      }
      return this.selectedMatches.length;
    }
  }, {
    key: "endTurn",
    value: function endTurn() {
      this.selectedMatches = [];
    }
  }, {
    key: "getMatchId",
    value: function getMatchId(match) {
      var _a;
      return +((_a = match.getAttribute("id")) !== null && _a !== void 0 ? _a : 0);
    }
  }]);
  return HumanPlayer;
}();
exports.HumanPlayer = HumanPlayer;
},{}],"src/NimGame.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NimGame = void 0;
var NimGame = /*#__PURE__*/function () {
  function NimGame(humanPlayer, computerPlayer) {
    _classCallCheck(this, NimGame);
    this.players = [];
    this.matchesLeft = 13;
    this.currentPlayerIndex = 0;
    this.players.push(humanPlayer, computerPlayer);
  }
  _createClass(NimGame, [{
    key: "start",
    value: function start() {
      var _this = this;
      var domMatches = _toConsumableArray(document.querySelectorAll(".matches__heap__match"));
      var domRemoveBtn = document.querySelector(".actions__btn--remove");
      domMatches.forEach(function (domMatch) {
        return domMatch.addEventListener("click", function ($event) {
          return _this.takeTurn($event);
        });
      });
      domRemoveBtn === null || domRemoveBtn === void 0 ? void 0 : domRemoveBtn.addEventListener("click", function () {
        return _this.removeMatches();
      });
    }
  }, {
    key: "takeTurn",
    value: function takeTurn($event) {
      this.currentPlayer = this.players[this.currentPlayerIndex];
      var pickedMatch = $event.target;
      var numMatches = this.currentPlayer.takeTurn(pickedMatch);
      console.log("".concat(this.currentPlayer.name, " takes ").concat(numMatches, " matches."));
    }
  }, {
    key: "removeMatches",
    value: function removeMatches() {
      var _this2 = this;
      var _a, _b;
      this.matchesLeft -= this.currentPlayer.selectedMatches.length;
      var availableMatches = document.querySelectorAll(".matches__heap__match:not(.matches__heap__match--selected):not(.matches__heap__match--removed)");
      if (availableMatches.length <= 1) {
        alert("".concat(this.currentPlayer.name, " wins!"));
        return this.restartGame();
      }
      // hide removed matches
      var domMatchesNotRemoved = document.querySelectorAll(".matches__heap__match:not(.matches__heap__match--removed)");
      (_b = (_a = this.currentPlayer) === null || _a === void 0 ? void 0 : _a.selectedMatches) === null || _b === void 0 ? void 0 : _b.forEach(function (selectedMatch) {
        domMatchesNotRemoved.forEach(function (matchElement) {
          if (selectedMatch.id === _this2.getMatchId(matchElement)) {
            matchElement.classList.add("matches__heap__match--removed");
          }
        });
      });
      // pass turn to other player
      this.endTurn();
    }
  }, {
    key: "getMatchesLeft",
    get: function get() {
      return this.matchesLeft;
    }
  }, {
    key: "getMatchId",
    value: function getMatchId(match) {
      var _a;
      return +((_a = match.getAttribute("id")) !== null && _a !== void 0 ? _a : 0);
    }
  }, {
    key: "restartGame",
    value: function restartGame() {
      var allMatches = document.querySelectorAll(".matches__heap__match");
      allMatches.forEach(function (match) {
        match.classList.remove("matches__heap__match--removed");
        match.classList.remove("matches__heap__match--selected");
      });
      this.endTurn();
    }
  }, {
    key: "endTurn",
    value: function endTurn() {
      var _this3 = this;
      this.currentPlayer.endTurn();
      var nextPlayerIndex = (this.currentPlayerIndex + 1) % 2;
      this.currentPlayerIndex = nextPlayerIndex;
      this.currentPlayer = this.players[this.currentPlayerIndex];
      if (!this.currentPlayer.isHuman) {
        this.currentPlayer.takeTurn();
        setTimeout(function () {
          // timeout just to make it visible CPU is making his move
          _this3.removeMatches();
        }, 1500);
      }
    }
  }]);
  return NimGame;
}();
exports.NimGame = NimGame;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

// import { Match } from "./Match";
// import { NimGame } from "./NimGame";
// import { Player } from "./Player";
Object.defineProperty(exports, "__esModule", {
  value: true
});
var ComputerPlayer_1 = require("./ComputerPlayer");
var HumanPlayer_1 = require("./HumanPlayer");
var NimGame_1 = require("./NimGame");
// // interface Player {
// //   name: string;
// //   selectedMatches: Match[];
// //   numberOfGames?: number;
// //   numberOfWins?: number;
// //   numberOfLosses?: number;
// //   playerTurn: boolean;
// // }
// const domMatches: NodeListOf<Element> = document.querySelectorAll(
//   ".matches__heap__match"
// );
// const domGoButton: HTMLElement | null = document.querySelector(
//   ".actions__btn--start"
// );
// const players: Player[] = [
//   {
//     name: "Fábio",
//     numberOfWins: 0,
//     numberOfLosses: 0,
//     selectedMatches: [],
//   },
//   {
//     name: "John",
//     numberOfWins: 0,
//     numberOfLosses: 0,
//     selectedMatches: [],
//   },
// ];
// const newGame = new NimGame(players);
// newGame.start();
// let domPlayerOneName: HTMLElement | null =
//   document.querySelector(".player__one");
// let domPlayerTwoName: HTMLElement | null =
//   document.querySelector(".player__two");
// if (domPlayerOneName)
//   domPlayerOneName.innerText = `Player 1: ${players[0].name}`;
// if (domPlayerTwoName)
//   domPlayerTwoName.innerText = `Player 2: ${players[1].name}`;
// domMatches.forEach((match) => {
//   match.addEventListener("click", selectMatch);
// });
// domGoButton?.addEventListener("click", onGoClick);
// function onGoClick($event: Event) {
//   // if 0 match left = lost game
//   let numberOfAvailableMatches = 0;
//   const domMatches: NodeListOf<Element> | null = document.querySelectorAll(
//     ".matches__heap__match:not(.matches__heap__match--selected):not(.matches__heap__match--removed)"
//   );
//   numberOfAvailableMatches = domMatches.length;
//   if (numberOfAvailableMatches === 0) {
//     alert("You lost the game");
//     newGame.playerLose(players[0]);
//     const domMatchesClearing: NodeListOf<Element> | null =
//       document.querySelectorAll(".matches__heap__match");
//     domMatchesClearing.forEach((matchClear) => {
//       matchClear.classList.remove("matches__heap__match--removed");
//       matchClear.classList.remove("matches__heap__match--selected");
//     });
//     return;
//   }
//   // hide removed matches
//   const playerAtGame: Player | undefined = players.find(
//     (player) => player.playerTurn === true
//   );
//   debugger;
//   const domMatchesNotRemoved: NodeListOf<Element> | null =
//     document.querySelectorAll(
//       ".matches__heap__match:not(.matches__heap__match--removed)"
//     );
//   playerAtGame?.selectedMatches?.forEach((selectedMatch: Match) => {
//     domMatchesNotRemoved.forEach((matchElement: Element) => {
//       if (selectedMatch.matchId === getMatchId(matchElement)) {
//         matchElement.classList.add("matches__heap__match--removed");
//       }
//     });
//   });
//   // pass turn to other player
//   newGame.nextTurn();
// }
// function selectMatch($event: Event) {
//   debugger;
//   const domSelectedMatch = $event.target as HTMLElement;
//   const isMatchAlreadySelected = domSelectedMatch.classList.contains(
//     "matches__heap__match--selected"
//   );
//   const isMatchSelectionMaxed =
//     newGame.currentPlayer.selectedMatches?.length === 3;
//   if (!isMatchAlreadySelected && isMatchSelectionMaxed) {
//     alert(
//       "Only 3 cards are allowed to be selected per each round. Please unselect a card to continue"
//     );
//     return;
//   }
//   if (isMatchAlreadySelected) {
//     debugger;
//     domSelectedMatch.classList.remove("matches__heap__match--selected");
//     newGame.currentPlayer.selectedMatches =
//       newGame.currentPlayer.selectedMatches?.filter(
//         (match: Match) => match.matchId !== getMatchId(domSelectedMatch)
//       );
//   } else {
//     domSelectedMatch.classList.add("matches__heap__match--selected");
//     newGame.selectMatch([
//       {
//         matchId: getMatchId(domSelectedMatch),
//         isSelected: true,
//       },
//     ]);
//   }
//   console.log(newGame.currentPlayer);
// }
// function getMatchId(match: Element) {
//   return +(match.getAttribute("id") ?? 0);
// }
var humanPlayer = new HumanPlayer_1.HumanPlayer("Fábio");
var computerPlayer = new ComputerPlayer_1.ComputerPlayer("CPU");
var game = new NimGame_1.NimGame(humanPlayer, computerPlayer);
game.start();
},{"./ComputerPlayer":"src/ComputerPlayer.ts","./HumanPlayer":"src/HumanPlayer.ts","./NimGame":"src/NimGame.ts"}],"../../../../.nvm/versions/node/v14.15.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57290" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v14.15.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map