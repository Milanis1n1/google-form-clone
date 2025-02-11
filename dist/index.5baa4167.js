// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"eCF1U":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "138b6a135baa4167";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"igcvL":[function(require,module,exports,__globalThis) {
"use strict";
// Select DOM elements
const $ca89da83071998c6$var$fieldsContainer = document.getElementById("fields-container");
const $ca89da83071998c6$var$addFieldButton = document.getElementById("add-field");
const $ca89da83071998c6$var$saveFormButton = document.getElementById("save-form");
const $ca89da83071998c6$var$savedFormsList = document.getElementById("saved-forms");
const $ca89da83071998c6$var$formPreviewSection = document.getElementById("form-preview");
const $ca89da83071998c6$var$previewContainer = document.getElementById("preview-container");
const $ca89da83071998c6$var$backToBuilderButton = document.getElementById("back-to-builder");
// DOM Elements for Responses
const $ca89da83071998c6$var$formResponseSection = document.getElementById("form-responses");
const $ca89da83071998c6$var$responseContainer = document.getElementById("response-container");
// Centralized storage for current form responses
let $ca89da83071998c6$var$currentFormResponse = {};
// Store forms in localStorage
const $ca89da83071998c6$var$localStorageKey = "forms";
const $ca89da83071998c6$var$getFormsFromStorage = ()=>JSON.parse(localStorage.getItem($ca89da83071998c6$var$localStorageKey) || "[]");
const $ca89da83071998c6$var$saveFormsToStorage = (forms)=>localStorage.setItem($ca89da83071998c6$var$localStorageKey, JSON.stringify(forms));
// Get and Save Responses from Storage
const $ca89da83071998c6$var$localStorageResponseKey = "formResponses";
const $ca89da83071998c6$var$getResponsesFromStorage = ()=>JSON.parse(localStorage.getItem($ca89da83071998c6$var$localStorageResponseKey) || "[]");
const $ca89da83071998c6$var$saveResponsesToStorage = (responses)=>localStorage.setItem($ca89da83071998c6$var$localStorageResponseKey, JSON.stringify(responses));
// Generate unique IDs
const $ca89da83071998c6$var$generateId = ()=>"_" + Math.random().toString(36).substr(2, 9);
// Current form data
let $ca89da83071998c6$var$currentFields = [];
let $ca89da83071998c6$var$editingFormId = null; // Track the form being edited
// Add a new field
const $ca89da83071998c6$var$addField = ()=>{
    const fieldId = $ca89da83071998c6$var$generateId();
    const field = {
        id: fieldId,
        type: "text",
        label: ""
    };
    $ca89da83071998c6$var$currentFields.push(field);
    $ca89da83071998c6$var$renderFields();
};
// Render fields in the builder
const $ca89da83071998c6$var$renderFields = ()=>{
    $ca89da83071998c6$var$fieldsContainer.innerHTML = "";
    $ca89da83071998c6$var$currentFields.forEach((field)=>{
        const fieldElement = document.createElement("div");
        fieldElement.className = "field";
        fieldElement.innerHTML = `
        <input type="text" placeholder="Label" value="${field.label}" data-id="${field.id}" class="field-label">
        <select data-id="${field.id}" class="field-type">
          <option value="text" ${field.type === "text" ? "selected" : ""}>Text</option>
          <option value="checkbox" ${field.type === "checkbox" ? "selected" : ""}>Multiple Choice</option>
          <option value="checkbox" ${field.type === "checkbox" ? "selected" : ""}>Checkbox</option>
          <option value="dropdown" ${field.type === "dropdown" ? "selected" : ""}>Dropdown</option>
          <option value="radio" ${field.type === "radio" ? "selected" : ""}>Single Selection</option>
          <option value="date" ${field.type === "date" ? "selected" : ""}>Date</option>
        </select>
        <button data-id="${field.id}" class="delete-field">Delete</button>
        <div class="field-options" data-id="${field.id}" style="display: none;">
          <input type="text" placeholder="Add option" class="add-option" data-id="${field.id}" />
          <button class="add-option-btn" data-id="${field.id}">Add Option</button>
          <ul class="options-list" data-id="${field.id}"></ul>
        </div>
        <div class="field-validation">
          <label>Required:</label>
          <input type="checkbox" ${field.required ? "checked" : ""} data-id="${field.id}" class="required-check" />
        </div>
        <div class="options-container" data-id="${field.id}"></div>`;
        $ca89da83071998c6$var$fieldsContainer.appendChild(fieldElement);
        // Render options for radio/checkbox fields
        $ca89da83071998c6$var$renderOptions(field);
        // Attach event listeners for label, type, and delete actions
        const labelInputs = document.querySelectorAll(".field-label");
        labelInputs.forEach((input)=>input.addEventListener("input", (e)=>$ca89da83071998c6$var$updateFieldLabel(e.target.dataset.id, e.target.value)));
        const typeSelects = document.querySelectorAll(".field-type");
        typeSelects.forEach((select)=>select.addEventListener("change", (e)=>$ca89da83071998c6$var$updateFieldType(e.target.dataset.id, e.target.value)));
        const deleteButtons = document.querySelectorAll(".delete-field");
        deleteButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$deleteField(e.target.dataset.id)));
        const requiredCheck = document.querySelectorAll(".required-check");
        requiredCheck.forEach((checkbox)=>checkbox.addEventListener("change", (e)=>$ca89da83071998c6$var$toggleFieldRequired(e.target.dataset.id, e.target.checked)));
        const optionInputs = document.querySelectorAll(".add-option");
        optionInputs.forEach((input)=>input.addEventListener("input", (e)=>$ca89da83071998c6$var$updateFieldOptions(e.target.dataset.id, e.target.value)));
        const addOptionBtns = document.querySelectorAll(".add-option-btn");
        addOptionBtns.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$addOptionToField(e.target.dataset.id)));
    });
};
// Render options for radio and checkbox fields
const $ca89da83071998c6$var$renderOptions = (field)=>{
    const optionsContainer = document.querySelector(`.options-container[data-id="${field.id}"]`);
    if (field.type === "radio" || field.type === "checkbox" || field.type === "dropdown") {
        optionsContainer.innerHTML = ""; // Clear previous options
        if (field.options) field.options.forEach((option, index)=>{
            const optionElement = document.createElement("div");
            optionElement.className = "option";
            optionElement.innerHTML = `
            <input type="text" value="${option}" data-id="${field.id}" data-index="${index}" class="option-input">
            <button data-id="${field.id}" data-index="${index}" class="delete-option">Delete</button>
          `;
            optionsContainer.appendChild(optionElement);
        });
        // Add "Add Option" button
        const addOptionButton = document.createElement("button");
        addOptionButton.textContent = "Add Option";
        addOptionButton.addEventListener("click", ()=>$ca89da83071998c6$var$addOption(field.id));
        optionsContainer.appendChild(addOptionButton);
        // Attach event listeners for option inputs and delete buttons
        const optionInputs = document.querySelectorAll(`.option-input[data-id="${field.id}"]`);
        optionInputs.forEach((input)=>input.addEventListener("input", (e)=>$ca89da83071998c6$var$updateOptionLabel(field.id, e.target.dataset.index, e.target.value)));
        const deleteOptionButtons = document.querySelectorAll(`.delete-option[data-id="${field.id}"]`);
        deleteOptionButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$deleteOption(field.id, e.target.dataset.index)));
    }
};
// Delete an option
const $ca89da83071998c6$var$deleteOption = (fieldId, index)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === fieldId);
    if (field && (field.type === "radio" || field.type === "checkbox")) {
        const optionIndex = parseInt(index, 10);
        if (field.options && field.options[optionIndex] !== undefined) {
            field.options.splice(optionIndex, 1); // Remove the option
            $ca89da83071998c6$var$renderFields();
        }
    }
};
// Add option for radio/checkbox fields
const $ca89da83071998c6$var$addOption = (fieldId)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === fieldId);
    if (field && (field.type === "radio" || field.type === "checkbox" || field.type === "dropdown")) {
        field.options = field.options || [];
        field.options.push(""); // Add an empty option
        $ca89da83071998c6$var$renderFields();
    }
};
// Update option label
const $ca89da83071998c6$var$updateOptionLabel = (fieldId, index, label)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === fieldId);
    if (field && (field.type === "radio" || field.type === "checkbox" || field.type === "dropdown")) {
        const optionIndex = parseInt(index, 10);
        if (field.options && field.options[optionIndex] !== undefined) field.options[optionIndex] = label;
    }
};
// Update field label
const $ca89da83071998c6$var$updateFieldLabel = (id, label)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === id);
    if (field) field.label = label;
};
// Update field type
const $ca89da83071998c6$var$updateFieldType = (id, type)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === id);
    if (field) {
        field.type = type;
        $ca89da83071998c6$var$renderFields(); // Re-render fields to show options only for applicable types
    }
};
// Toggle field required state
const $ca89da83071998c6$var$toggleFieldRequired = (id, required)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === id);
    if (field) field.required = required;
};
// Update field options (for dropdown, radio, checkbox, radio)
const $ca89da83071998c6$var$updateFieldOptions = (id, value)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === id);
    if (field) {
        if (!field.options) field.options = [];
        field.options[0] = value; // Update the first option temporarily for now
    }
};
// Add option to field (for radio, checkbox, dropdown, and radio)
const $ca89da83071998c6$var$addOptionToField = (id)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === id);
    const optionInput = document.querySelector(`.add-option[data-id="${id}"]`);
    const optionValue = optionInput.value.trim();
    if (field && optionValue) {
        if (!field.options) field.options = [];
        field.options.push(optionValue);
        optionInput.value = ""; // Clear input
        $ca89da83071998c6$var$renderFields(); // Re-render to update options
    }
};
// Delete a field
const $ca89da83071998c6$var$deleteField = (id)=>{
    $ca89da83071998c6$var$currentFields = $ca89da83071998c6$var$currentFields.filter((field)=>field.id !== id);
    $ca89da83071998c6$var$renderFields();
};
// Save form
const $ca89da83071998c6$var$saveForm = ()=>{
    if ($ca89da83071998c6$var$editingFormId) {
        const forms = $ca89da83071998c6$var$getFormsFromStorage();
        const formIndex = forms.findIndex((form)=>form.id === $ca89da83071998c6$var$editingFormId);
        if (formIndex !== -1) {
            forms[formIndex].fields = $ca89da83071998c6$var$currentFields; // Update the fields of the form
            $ca89da83071998c6$var$saveFormsToStorage(forms);
            alert("Form updated!");
        }
    } else {
        const formName = prompt("Enter a name for this form:");
        if (!formName) return;
        const newForm = {
            id: $ca89da83071998c6$var$generateId(),
            name: formName,
            fields: $ca89da83071998c6$var$currentFields
        };
        const forms = $ca89da83071998c6$var$getFormsFromStorage();
        forms.push(newForm);
        $ca89da83071998c6$var$saveFormsToStorage(forms);
        alert("Form saved!");
    }
    $ca89da83071998c6$var$renderSavedForms();
    $ca89da83071998c6$var$currentFields = [];
    $ca89da83071998c6$var$editingFormId = null; // Reset editing form
    $ca89da83071998c6$var$renderFields();
};
// Render saved forms
const $ca89da83071998c6$var$renderSavedForms = ()=>{
    $ca89da83071998c6$var$savedFormsList.innerHTML = "";
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    forms.forEach((form)=>{
        const formElement = document.createElement("li");
        formElement.innerHTML = `
        <span>${form.name}</span>
        <div>
          <button data-id="${form.id}" class="preview-form">Preview</button>
          <button data-id="${form.id}" class="edit-form">Edit</button>
          <button data-id="${form.id}" class="delete-form">Delete</button>
          <button data-id="${form.id}" class="submit-form-response">Submit Response</button>
          <button data-id="${form.id}" class="view-response">View Response</button>
        </div>
      `;
        $ca89da83071998c6$var$savedFormsList.appendChild(formElement);
    });
    // Attach event listeners for preview and delete actions
    const previewButtons = document.querySelectorAll(".preview-form");
    previewButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$previewForm(e.target.dataset.id)));
    const deleteButtons = document.querySelectorAll(".delete-form");
    deleteButtons.forEach((button)=>{
        button.addEventListener("click", (e)=>$ca89da83071998c6$var$deleteForm(e.target.dataset.id));
    });
    const editButtons = document.querySelectorAll(".edit-form");
    editButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$editForm(e.target.dataset.id)));
    const submitResponseButtons = document.querySelectorAll(".submit-form-response");
    submitResponseButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$renderFormForSubmission(e.target.dataset.id)));
    // Attach event listeners
    const viewButtons = document.querySelectorAll(".view-response");
    viewButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$viewResponses(e.target.dataset.id)));
};
// Preview a form
const $ca89da83071998c6$var$previewForm = (id)=>{
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    const form = forms.find((form)=>form.id === id);
    if (!form) return;
    $ca89da83071998c6$var$previewContainer.innerHTML = "";
    form.fields.forEach((field)=>{
        var _a, _b, _c;
        const fieldElement = document.createElement("div");
        fieldElement.className = "field-preview";
        fieldElement.innerHTML = `<label>${field.label} ${field.required ? '<span style="color: red;">*</span>' : ""} : </label>`;
        if (field.type === "text") fieldElement.innerHTML += `<input type="text" disabled>`;
        else if (field.type === "radio" || field.type === "checkbox") (_a = field.options) === null || _a === void 0 || _a.forEach((option)=>{
            fieldElement.innerHTML += `<input type="${field.type}" disabled> ${option}`;
        });
        else if (field.type === "dropdown") {
            fieldElement.innerHTML += `<select disabled>`;
            (_b = field.options) === null || _b === void 0 || _b.forEach((option)=>{
                fieldElement.innerHTML += `<option>${option}</option>`;
            });
            fieldElement.innerHTML += `</select>`;
        } else if (field.type === "radio") (_c = field.options) === null || _c === void 0 || _c.forEach((option)=>{
            fieldElement.innerHTML += `<input type="radio" disabled> ${option}`;
        });
        else if (field.type === "date") fieldElement.innerHTML += `<input type="date" disabled>`;
        $ca89da83071998c6$var$previewContainer.appendChild(fieldElement);
    });
    $ca89da83071998c6$var$formPreviewSection.style.display = "block";
};
// Delete a form
const $ca89da83071998c6$var$deleteForm = (id)=>{
    let forms = $ca89da83071998c6$var$getFormsFromStorage();
    forms = forms.filter((form)=>form.id !== id);
    $ca89da83071998c6$var$saveFormsToStorage(forms);
    $ca89da83071998c6$var$renderSavedForms();
};
// Back to form builder
const $ca89da83071998c6$var$backToFormBuilder = ()=>{
    $ca89da83071998c6$var$formPreviewSection.style.display = "none";
};
// Edit form
const $ca89da83071998c6$var$editForm = (id)=>{
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    const form = forms.find((form)=>form.id === id);
    if (form) {
        $ca89da83071998c6$var$editingFormId = id; // Set form as being edited
        $ca89da83071998c6$var$currentFields = [
            ...form.fields
        ]; // Load fields into the builder
        $ca89da83071998c6$var$renderFields();
    }
};
// Event Listeners
$ca89da83071998c6$var$addFieldButton.addEventListener("click", $ca89da83071998c6$var$addField);
$ca89da83071998c6$var$saveFormButton.addEventListener("click", $ca89da83071998c6$var$saveForm);
$ca89da83071998c6$var$backToBuilderButton.addEventListener("click", $ca89da83071998c6$var$backToFormBuilder);
// Initial Render
$ca89da83071998c6$var$renderSavedForms();
// Add change event listener to update responses dynamically
const $ca89da83071998c6$var$handleInputChange = (event)=>{
    const target = event.target;
    if (!target) return;
    if (target.type === "checkbox") {
        const fieldId = target.name; // Group by name for checkboxes
        if (!Array.isArray($ca89da83071998c6$var$currentFormResponse[fieldId])) $ca89da83071998c6$var$currentFormResponse[fieldId] = [];
        const values = $ca89da83071998c6$var$currentFormResponse[fieldId];
        if (target.checked) values.push(target.value);
        else $ca89da83071998c6$var$currentFormResponse[fieldId] = values.filter((v)=>v !== target.value);
    } else if (target.type === "radio") $ca89da83071998c6$var$currentFormResponse[target.name] = target.value; // Use name for radio groups
    else $ca89da83071998c6$var$currentFormResponse[target.id] = target.value; // Use ID for text and dropdown
};
// Render Form for Submission
const $ca89da83071998c6$var$renderFormForSubmission = (id)=>{
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    const form = forms.find((form)=>form.id === id);
    $ca89da83071998c6$var$previewContainer.innerHTML = "";
    const formElement = document.createElement("form");
    formElement.id = "dynamic-form";
    if (form) {
        form.fields.forEach((field)=>{
            var _a, _b, _c;
            const fieldWrapper = document.createElement("div");
            fieldWrapper.className = "field";
            // Create field label
            const label = document.createElement("label");
            label.textContent = field.label;
            fieldWrapper.appendChild(label);
            // Create field based on type
            let inputElement;
            if (field.type === "text") {
                inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.addEventListener("input", $ca89da83071998c6$var$handleInputChange);
            } else if (field.type === "checkbox") {
                inputElement = document.createElement("div");
                (_a = field.options) === null || _a === void 0 || _a.forEach((option)=>{
                    const optionWrapper = document.createElement("div");
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    input.name = field.id; // Group by field ID
                    input.value = option;
                    input.addEventListener("change", $ca89da83071998c6$var$handleInputChange);
                    const optionLabel = document.createElement("label");
                    optionLabel.textContent = option;
                    optionWrapper.appendChild(input);
                    optionWrapper.appendChild(optionLabel);
                    inputElement.appendChild(optionWrapper);
                });
            } else if (field.type === "radio") {
                inputElement = document.createElement("div");
                (_b = field.options) === null || _b === void 0 || _b.forEach((option)=>{
                    const optionWrapper = document.createElement("div");
                    const input = document.createElement("input");
                    input.type = "radio";
                    input.name = field.id; // Group by field ID
                    input.value = option;
                    input.addEventListener("change", $ca89da83071998c6$var$handleInputChange);
                    const optionLabel = document.createElement("label");
                    optionLabel.textContent = option;
                    optionWrapper.appendChild(input);
                    optionWrapper.appendChild(optionLabel);
                    inputElement.appendChild(optionWrapper);
                });
            } else if (field.type === "dropdown") {
                inputElement = document.createElement("select");
                inputElement.id = field.id;
                (_c = field.options) === null || _c === void 0 || _c.forEach((option)=>{
                    const optionElement = document.createElement("option");
                    optionElement.value = option;
                    optionElement.textContent = option;
                    inputElement.appendChild(optionElement);
                });
                inputElement.addEventListener("change", $ca89da83071998c6$var$handleInputChange);
            } else if (field.type === "date") {
                inputElement = document.createElement("input");
                inputElement.type = "date";
                inputElement.addEventListener("input", $ca89da83071998c6$var$handleInputChange);
            } else {
                inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.addEventListener("input", $ca89da83071998c6$var$handleInputChange);
            }
            inputElement.id = field.id;
            inputElement.className = "form-input";
            if (field.type === "checkbox" || field.type === "radio") inputElement.className = "checkbox";
            fieldWrapper.appendChild(inputElement);
            formElement.appendChild(fieldWrapper);
        });
        // Submit Button
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.type = "button";
        submitButton.addEventListener("click", ()=>$ca89da83071998c6$var$submitFormResponse(form.id));
        formElement.appendChild(submitButton);
    }
    $ca89da83071998c6$var$previewContainer.appendChild(formElement);
    $ca89da83071998c6$var$formPreviewSection.style.display = "block";
};
// Submit Form Response
const $ca89da83071998c6$var$submitFormResponse = (formId)=>{
    const responses = $ca89da83071998c6$var$getResponsesFromStorage();
    responses.push({
        formId: formId,
        responses: $ca89da83071998c6$var$currentFormResponse
    });
    $ca89da83071998c6$var$saveResponsesToStorage(responses);
    alert("Form submitted successfully!");
    $ca89da83071998c6$var$backToFormBuilder();
};
// Render Submitted Responses
const $ca89da83071998c6$var$renderResponses = ()=>{
    $ca89da83071998c6$var$responseContainer.innerHTML = "";
    const responses = $ca89da83071998c6$var$getResponsesFromStorage();
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    if (responses.length === 0) {
        alert("No responses found for this form.");
        return;
    }
    $ca89da83071998c6$var$responseContainer.innerHTML = `<h3>Responses</h3>`;
    responses.forEach((response, index)=>{
        const form = forms.find((f)=>f.id === response.formId);
        if (!form) return;
        const responseElement = document.createElement("div");
        responseElement.className = "response";
        const title = document.createElement("h3");
        title.textContent = `Responses for Form: ${form.name}`;
        responseElement.appendChild(title);
        Object.keys(response.responses).forEach((fieldId)=>{
            const value = response.responses[fieldId];
            const field = form.fields.find((f)=>f.id === fieldId);
            if (!field) return;
            const responseRow = document.createElement("div");
            responseRow.className = "response-row";
            responseRow.innerHTML = `<strong>${field.label}:</strong> ${value}`;
            responseElement.appendChild(responseRow);
        });
        $ca89da83071998c6$var$responseContainer.appendChild(responseElement);
    });
};
// View responses for a form
const $ca89da83071998c6$var$viewResponses = (formId)=>{
    const allResponses = $ca89da83071998c6$var$getResponsesFromStorage();
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    const responses = allResponses.filter((response)=>response.formId === formId);
    const form = forms.find((f)=>f.id === formId);
    if (!form) return;
    if (responses.length === 0) {
        alert("No responses found for this form.");
        return;
    }
    $ca89da83071998c6$var$previewContainer.innerHTML = `<h3>Responses</h3>`;
    responses.forEach((response, index)=>{
        const responseDiv = document.createElement("div");
        responseDiv.className = "response";
        const responseHeader = document.createElement("h4");
        responseHeader.textContent = `Response ${index + 1}`;
        responseDiv.appendChild(responseHeader);
        Object.keys(response.responses).forEach((fieldId)=>{
            const fieldDiv = document.createElement("div");
            const answer = response.responses[fieldId];
            const field = form.fields.find((f)=>f.id === fieldId);
            if (!field) return;
            fieldDiv.textContent = `${field.label}: ${Array.isArray(answer) ? answer.join(", ") : answer}`;
            responseDiv.appendChild(fieldDiv);
        });
        $ca89da83071998c6$var$previewContainer.appendChild(responseDiv);
    });
    $ca89da83071998c6$var$formPreviewSection.style.display = "block";
};

},{}]},["eCF1U","igcvL"], "igcvL", "parcelRequire94c2")

//# sourceMappingURL=index.5baa4167.js.map
