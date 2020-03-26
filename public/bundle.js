/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public-src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public-src/script.js":
/*!******************************!*\
  !*** ./public-src/script.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// game-_utils.js\n\nfunction uuidv4() {\n  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {\n    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);\n    return v.toString(16);\n  });\n}\n\nfunction rand(start, end) {\n  const result = Math.floor(Math.random() * end) + start;\n  // console.log(`rand(${start},${end}) = ${result}`);\n  return result;\n}\n\nfunction inTargetZone(location, target, tolerance) {\n  tolerance = tolerance || 0;  \n  if (location.x < target.x - tolerance) return false;\n  if (location.x > target.x + tolerance) return false;\n  if (location.y < target.y - tolerance) return false;\n  if (location.y > target.y + tolerance) return false;    \n  return true;\n}\n\nfunction walkNaturally(walker, target, unitSize) {\n  const manhattenDistance = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);\n\n  if (walker.isDisplayed) { // Has been rendered\n\n    const stepSize = 1 * unitSize;\n\n    const possibleSteps = [\n      { x: walker.x - stepSize, y: walker.y - stepSize },\n      { x: walker.x - stepSize, y: walker.y },\n      { x: walker.x - stepSize, y: walker.y + stepSize },\n      { x: walker.x, y: walker.y - stepSize },\n      { x: walker.x, y: walker.y + stepSize },            \n      { x: walker.x + stepSize, y: walker.y - stepSize },\n      { x: walker.x + stepSize, y: walker.y },\n      { x: walker.x + stepSize, y: walker.y + stepSize },\n    ];\n\n    const currentManhattenDistance = manhattenDistance({x: walker.x, y: walker.y}, target);\n    const closerSteps = possibleSteps.filter(s => manhattenDistance(s, target) < currentManhattenDistance);\n    \n    if (closerSteps.length > 0) {\n      const stepChoice = rand(0, closerSteps.length);          \n      const selectedStep = closerSteps[stepChoice];\n      walker.x = selectedStep.x;\n      walker.y = selectedStep.y;\n    }\n  }\n}\n\n// consts\n\nconst hot = 35;\nconst fps = 30;\nconst ticksPerSecond = 1;\n\n// ably-connector.js\n\nclass StubAblyConnector {\n  constructor() {\n    this.callbacks = {};\n  }\n  \n  hasCallbacksFor(stationName) {\n    const stationCallbacks = Object.getOwnPropertyNames(this.callbacks);    \n    if (stationCallbacks.indexOf(stationName) == -1) {\n      return false;\n    }\n    return true;\n  }\n  \n  onArrivalTo(stationName, callback) {    \n    if(!this.hasCallbacksFor(stationName)) {\n      this.callbacks[stationName] = [];\n    }\n    \n    this.callbacks[stationName].push(callback);\n  }\n  \n  fakeTrainArrival(stationName) {\n    if (this.callbacks[stationName])\n    \n    for (let cb of this.callbacks[stationName]) {\n      cb({ station: stationName, line: \"platformId1\", arrived: true });\n    }\n  }  \n  \n  fakeTrainDeparture(stationName) {\n    if (this.callbacks[stationName])\n    \n    for (let cb of this.callbacks[stationName]) {\n      cb({ station: stationName, line: \"platformId1\", departed: true });\n    }\n  }\n  \n  \n  fakeIncomingData(stationName) {\n    // Train arrives and departs every 2 seconds.\n    const interval = 1000 * 12;    \n    \n    for (let cb of this.callbacks[stationName]) {\n      \n      cb({ station: stationName, line: \"platformId1\", arrived: true });\n      setTimeout(() => {\n        cb({ station: stationName, line: \"platformId1\", departed: true });\n        setTimeout(() => this.fakeIncomingData(stationName), interval);\n      }, interval);\n      \n    }    \n  }\n  \n}\n\n// game-buffs.js\n\nclass CleanBuff {\n  constructor() {\n    this.ticks = 5;\n    this.completed = false;\n    this.hasTicked = false;\n  }\n  \n  tick(platform) {\n    this.ticks--;    \n    platform.hygiene += 2.5;\n    \n    this.removeOneTrash(platform);\n    \n    if (this.ticks == 0) {\n      this.completed = true;\n    }\n    \n    this.hasTicked = true;\n  }\n  \n  removeOneTrash(platform) {\n    for (let index in platform.contents) {\n      const entity = platform.contents[index];\n      if (entity.constructor.name === \"Trash\") {\n        platform.contents = platform.contents.filter(item => item !== entity);\n        return;\n      }\n    }    \n  }\n}\n\nclass VentBuff {\n  constructor() {\n    this.ticks = 5;\n    this.completed = false;\n  }\n  \n  tick(platform) {\n    this.ticks--;\n    platform.temperature--;\n    platform.hygiene += 0.2;\n    if (this.ticks == 0) {         \n      this.completed = true;\n    }\n  }\n}\n\nclass MusicBuff {\n  constructor() {\n    this.ticks = 4;\n    this.completed = false;\n  }\n  \n  tick(platform) {\n    this.ticks--;\n    if (this.ticks == 0) {\n      this.completed = true;\n    }\n  }  \n   \n  onCompletion(platform) {\n    this.charmMice(platform);\n    for (const traveller of platform.contents.filter(c => c.constructor.name == \"Traveller\")) {\n      traveller.isPassedOut = false;\n    }\n  }\n  \n  charmMice(platform) {\n    const mice = platform.contents.filter(e => e.constructor.name === \"Mouse\");\n    for (const mouse of mice) {\n      mouse.leave(platform, 15);\n    }    \n  }\n  \n}\n\n// game.js\n\n\nclass Game {\n  constructor(stationName, platformIds) {\n    this.ticks = 0;\n    this.status = \"inactive\";\n    this.platforms = [];    \n    this.queuedActions = [];\n        \n    for (let id of platformIds) {\n      this.platforms.push(new Platform(id));\n    }\n  }\n  \n  start() {\n    this.tickInterval = setInterval(() => {\n      this.tick();\n    }, 1000 / ticksPerSecond);\n    this.status = \"active\";\n  }\n  \n  tick() {\n    this.ticks++;\n         \n    const gameOverCheck = this.isGameOver(this);\n    if (gameOverCheck.gameover) {\n      this.endGame(gameOverCheck.message);\n      return;\n    }   \n    \n    // handle user input actions    \n    while (this.queuedActions.length > 0) {\n      const action = this.queuedActions.shift();\n      const handlerName = action.key.charAt(0).toUpperCase() + action.key.slice(1) + \"Buff\";\n      const target = this.platforms.filter(p => p.id == action.target)[0];      \n      const handler = this.createBuff(handlerName);\n      target.buffs.push(handler);\n    }    \n     \n    for (let platform of this.platforms) {\n      platform.tick();\n    }\n  }\n\n  createBuff(name) {   \n    try { \n      if (typeof(Buffs) !== \"undefined\") {\n        return new Buffs[name]();\n      } else {\n        return (Function('return new ' + name))();\n      }\n    } catch (ex) {\n      throw \"Could not find handler called \" + name;\n    }\n  }\n  \n  isGameOver() {    \n    const failureConditions = [\n      { condition: (g) => (g.platforms.filter(p => p.temperature >= 60).length > 0), message: \"It's too hot!\" },\n      { condition: (g) => (g.platforms.filter(p => p.temperature <= -20).length > 0), message: \"It's too cold!\" },\n      { condition: (g) => (g.platforms.filter(p => p.hygiene <= 0).length > 0), message: \"It's too disgusting!\" },\n      { condition: (g) => (g.platforms.filter(p => p.contents.length >= p.capacity).length > 0), message: \"Your platforms are too full!\" }\n    ];\n    \n    for (let c of failureConditions) {\n      if (c.condition(this)) {\n        return { gameover: true, message: c.message };\n      }\n    }\n    \n    return { gameover: false };\n  }\n  \n  endGame(message) {\n    this.status = \"ended\";\n    this.gameovermsg = message;\n    clearInterval(this.tickInterval);    \n  }\n  \n  queueAction(key, target) {\n    if (this.queuedActions.length >= 3) return; // Rate limit actions to 3 per tick.  \n    this.queuedActions.push({ key: key, target: target })\n  }\n  \n  registerEvent(current, ablyMessage) {\n    const matchingPlatform = current.platforms.filter(p => p.id === ablyMessage.line)[0];\n    matchingPlatform.unprocessedMessages.push(ablyMessage);\n  }\n}\n\n// platform.js\n\nclass Platform {\n  constructor(id) {\n    this.id = id;\n    this.ticks = 0;\n    this.width = 500;\n    this.height = 200;\n    \n    this.capacity = 60;\n    this.temperature = 15;\n    this.hygiene = 100;\n    \n    this.train = null;\n    this.hasTrain = false;\n    this.contents = [];\n    this.buffs = [];\n        \n    this.unprocessedMessages = [];  \n    this.spawnPoints = [\n      { x: 120, y: -25, give: 5 },\n      { x: 350, y: -25, give: 5 }  \n    ];\n    \n    this.exits = [\n      { x: 0,  y: 180 },\n      // { x: 500,  y: 200 }\n    ];    \n  }\n  \n  tick() {\n    this.ticks++;\n    \n    while (this.unprocessedMessages.length > 0) {\n      const msg = this.unprocessedMessages.shift(); // FIFO\n      \n      if (msg.arrived) {\n        this.hasTrain = true;\n        this.train = new Train();\n      }\n            \n      if (msg.departed) {\n        this.train.onCompletion();\n        this.hasTrain = false;\n        this.train = null;\n      }      \n    }\n    \n    let tickables = [ this.train, ...this.contents, ...this.buffs ];\n\n    for (let item of tickables) {\n      if (!item) continue;      \n      if (item[\"tick\"]) {\n        item.tick(this);\n      }\n            \n      if (item.completed && item[\"onCompletion\"]) {\n        item.onCompletion(this);\n      }\n    }\n        \n    this.buffs = this.buffs.filter(b => !b.completed);\n    this.contents = this.contents.filter(b => !b.completed);\n    this.capacity = this.capacity <= 0 ? 0 : this.capacity;\n    this.hygiene = this.hygiene <= 0 ? 0 : this.hygiene;\n    this.hygiene = this.hygiene > 100 ? 100 : this.hygiene;\n  }\n}\n\n\n// problems.js\n\n\nclass Problem {\n  constructor(x, y) {\n    this.id = uuidv4();\n    this.ticks = 0;\n    this.x = x;\n    this.y = y;    \n  }\n}\n\nclass Mouse extends Problem {\n  constructor(x, y) {\n    super(x, y);\n    this.stepSize = 10;\n    this.offscreen = { x: 600, y: 300 };\n  }\n    \n  tick(platform) {\n    \n    if (!this.destination) {\n      this.destination = { x: rand(0, platform.width), y: rand(0, platform.height) }; \n      // Go somewhere random\n    } \n    \n    if (platform.hygiene >= 80 || platform.temperature <= 0) {\n      this.leave(platform); // Too clean or too cold! going away.\n    }\n    \n    walkNaturally(this, this.destination, this.stepSize);    \n\n    if (inTargetZone(this, this.offscreen, this.stepSize)) {\n      this.completed = true; // They left!\n    } else if (inTargetZone(this, this.destination, this.stepSize)) {\n      this.destination = null;\n    }\n      \n    \n    this.ticks++;\n  }\n  \n  leave(platform, speed) {\n    this.stepSize = speed || this.stepSize;\n    this.destination = this.offscreen;\n  }\n\n  onCompletion(platform) {\n    platform.hygiene += 5;\n  }\n}\n\nclass Trash extends Problem {\n  constructor(x, y) {\n    super(x, y);\n    this.spawnedMouse = false;\n  }\n  \n  tick(platform) {   \n    \n    platform.hygiene -= 0.25;    \n    \n    // Spawn mouse if too trashy\n    const random = rand(0, 10);\n    if (!this.spawnedMouse && platform.hygiene <= 80 && random >= 9) {\n      platform.contents.push(new Mouse(this.x, this.y));\n      this.spawnedMouse = true;\n    }\n    \n    this.ticks++;\n  }  \n\n  onCompletion(platform) {\n  }\n}\n\n// train.js\n\nclass Train {\n  constructor() {\n    this.id = uuidv4();\n    this.ticks = 0;\n    this.hasTicked = false;\n    this.doorState = \"closed\";\n  }\n  \n  tick(platform) {\n    \n    platform.temperature += 0.25;\n\n    if (this.ticks ==  0) {\n      this.doorState = \"opening\";\n    }\n    if (this.ticks >  10) {\n      this.doorState = \"closing\";\n    }\n\n    if (this.ticks > 1 && this.ticks <= 10) {\n      platform.contents.push(new Traveller());\n    }\n\n    this.ticks++;\n    this.hasTicked = true;    \n  }\n\n  onCompletion(platform) {\n  }\n}\n\n// traveller.js\n\nclass Traveller {\n   constructor() {\n    this.id = uuidv4();\n    this.ticks = 0;\n    this.ticksFromExit = 14;\n\n    this.completed = false;\n    this.droppedTrash = false;\n    this.isPassedOut = false;\n    this.isDisplayed = false;\n    this.dancing = false;\n  }\n  \n  tick(platform) {\n    this.ticks++;    \n\n    if (!this.selectedExit) {\n      const exitIndex = rand(0, platform.exits.length);\n      this.selectedExit = platform.exits[exitIndex];\n    }\n\n    if (this.ticksFromExit == 0) {\n      platform.temperature -= 1;\n      this.completed = true;\n      return;\n    }\n    \n    this.dancing = platform.buffs.filter(x => x.constructor.name == \"MusicBuff\").length > 0;\n    platform.temperature += 0.1;\n\n    if (this.dancing || this.isPassedOut) {\n      return;\n    }\n    \n    walkNaturally(this, this.selectedExit, 15);\n    this.ticksFromExit--;\n\n    const random = this.random();    \n    \n    // Am I gonna drop trash? 10% chance when too hot\n    if (!this.droppedTrash && random >= 0.95) { \n      platform.contents.push(new Trash(this.x, this.y));\n      this.droppedTrash = true;\n      return;\n    }\n    \n    // Maybe I'm going to pass out? 10% chance if the platform is rancid.\n    if (!this.isPassedOut && platform.hygiene <= 30 && random >= 0.9) {      \n      this.isPassedOut = true;\n      return;\n    }\n  }\n\n  random() { return Math.random(); }\n}\n\n// ui.js\n\nclass GameUi {\n  \n  constructor(initialState) {\n    this.playfield = document.getElementById(\"playfield\");\n    this.track = document.getElementById(\"track\");\n    this.platform = document.getElementById(\"platform\");\n    \n    this._lastState = JSON.stringify(initialState);    \n    this._renderingFunctions = [\n      renderLabels,\n      renderGameStatus,\n      renderTemperature,\n      renderPlatform,\n      renderContents,\n      renderBuffs\n    ];\n  }\n  \n  draw(g) {\n    if (JSON.stringify(g) === this._lastState) {\n      return; // No state has changed, do we need to re-render?\n    }\n    \n    const lastStateSnapshot = JSON.parse(this._lastState);\n    for (let renderer of this._renderingFunctions) {\n      const ret = renderer(g, lastStateSnapshot)\n      if (ret === -1) { // Renderer caused an early exit\n        break;\n      }\n    }\n    \n    this._lastState = JSON.stringify(g);\n  }\n}\n\nfunction renderLabels(currentGameState, previousGameState) {\n  \n  const viewModel = {\n    \"game\": currentGameState,\n    \"ticks\": currentGameState.ticks,\n    \"total-platforms\": currentGameState.platforms.length,\n    \"platforms\": currentGameState.platforms,\n    \"gameovermsg\": currentGameState.gameovermsg\n  };\n\n  let props = Object.getOwnPropertyNames(viewModel);\n  for (let prop of props) {\n    const selector = \"[data-bind-\" + prop + \"]\";\n    const elements = [...document.querySelectorAll(selector)];\n    for(let ele of elements) {\n      ele.innerHTML = viewModel[prop];\n    }\n  }\n    \n  for (let index in currentGameState.platforms) {\n    const platform = currentGameState.platforms[index];\n    \n    props = Object.getOwnPropertyNames(platform);\n    for (let prop of props) {\n      const selector = \"[data-bind-platform-\" + index + \"-\" + prop + \"]\";\n      const elements = [...document.querySelectorAll(selector)];\n      for(let ele of elements) {\n        ele.innerHTML = platform[prop];\n      }\n    }\n  }\n}\n\nfunction renderBuffs(currentGameState, previousGameState) {\n  const buffTing = document.getElementById(\"buffs\");\n  buffTing.innerHTML = \"\";\n  \n  for (let platform of currentGameState.platforms) {\n    for (let buff of platform.buffs) {\n      const ele = document.createElement(\"div\");\n      ele.setAttribute(\"data-ticks\", buff.ticks); \n      ele.classList.add(\"buff\");      \n      ele.classList.add(buff.constructor.name);\n      buffTing.appendChild(ele);\n      \n    }\n  }  \n}\n\nfunction renderGameStatus(currentGameState, previousGameState) {\n  if (currentGameState.status !== \"ended\") return;  \n  document.getElementById(\"game-over-message\").classList.remove(\"hide\");\n  \n  return -1;\n}\n\nfunction renderTemperature(currentGameState, previousGameState) {\n  \n  const anyPlatformTooHot = currentGameState.platforms.filter(p => p.temperature > hot).length > 0;\n  const overlay = document.getElementById(\"temperatureOverlay\");\n  if (anyPlatformTooHot) {\n    overlay.classList.remove(\"hide\");\n    overlay.style.opacity = currentGameState.platforms[0].temperature - 10;\n  } else {    \n    overlay.classList.add(\"hide\");\n  }  \n}\n\n\nfunction renderPlatform(currentGameState, previousGameState) {\n  \n  for (let platform of currentGameState.platforms) {        \n    const platformAsOfLastTick = previousGameState.platforms.filter(p => p.id == platform.id)[0];\n    const trainImage = document.getElementById(\"trainSVG\");\n\n    if (!platformAsOfLastTick.hasTrain && platform.hasTrain) {      \n      trainImage.classList.remove(\"train\");\n      trainImage.classList.remove(\"arrival\");\n      trainImage.classList.remove(\"slideOut\");       \n      trainImage.classList.add(\"train\");\n      trainImage.classList.add(\"arrival\");\n      this.track.appendChild(trainImage);\n    } \n\n    if (platformAsOfLastTick.hasTrain && !platform.hasTrain ) {\n      trainImage.classList.add(\"slideOut\");\n    }\n  }    \n}\n\nfunction renderContents(currentGameState, previousGameState) {\n\n  for (let platform of currentGameState.platforms) {\n    \n    const previousPlatform = previousGameState.platforms.filter(p => p.id == platform.id)[0];\n    const previousContentIds = previousPlatform.contents.map(state => state.id);\n    const currentContentIds = platform.contents.map(state => state.id);\n    const removedItems = previousContentIds.filter(cid => currentContentIds.indexOf(cid) == -1);\n\n    for (const removedEntityId of removedItems) {    \n      document.getElementById(removedEntityId).remove();\n    }\n\n    for (let [index, entity] of platform.contents.entries()) {\n     \n      let gfxTarget = document.getElementById(entity.id);\n      \n      if (!gfxTarget) {        \n        gfxTarget = document.createElement(\"div\");\n        \n        gfxTarget.setAttribute('id', entity.id);\n        gfxTarget.classList.add(\"entity\");\n        gfxTarget.classList.add(entity.constructor.name.toLowerCase());\n        gfxTarget.classList.add(entity.constructor.name.toLowerCase() + Math.floor(Math.random() * 4));\n        gfxTarget.setAttribute(`data-${entity.constructor.name.toLowerCase()}-id`, entity.id);\n        \n        const spawnPoint = rand(0, platform.spawnPoints.length);\n        const spawnPointLocation = platform.spawnPoints[spawnPoint];\n        const spawnX = spawnPointLocation.x;\n\n        gfxTarget.style.position = \"absolute\";\n        \n        if (!entity.x) {\n          entity.x = spawnX;\n        }\n\n        if (!entity.y) {\n          entity.y = spawnPointLocation.y;\n        }\n\n        entity.isDisplayed = true;\n        \n        this.platform.appendChild(gfxTarget);\n      }    \n\n      const props = Object.getOwnPropertyNames(entity);\n      for (let prop of props) {        \n        gfxTarget.setAttribute(\"data-\" + prop.toLowerCase(), entity[prop]); \n      }\n      \n      gfxTarget.setAttribute(\"data-x\", entity.x);          \n      gfxTarget.setAttribute(\"data-y\", entity.y);\n\n      gfxTarget.style.left = entity.x + \"px\";\n      gfxTarget.style.top = entity.y + \"px\";\n      gfxTarget.style.zIndex = 1000 + entity.y;\n      gfxTarget.style.position = \"absolute\";\n\n      if (entity.constructor.name == \"Trash\") {        \n        gfxTarget.style.zIndex = 20;\n      }      \n    }\n  }    \n}\n\n/* globals GameUi, Game, StubAblyConnector */\n\nlet game, ui;\nlet ably = new StubAblyConnector();\n\nfunction startGame() {\n  game = new Game(\"KINGS CROSS\", [ \"platformId1\" ]);\n  ui = new GameUi(game);  \n  \n  ably.onArrivalTo(\"KINGS CROSS\", msg => game.registerEvent(game, msg));  \n  game.start();  \n  \n  ably.fakeIncomingData('KINGS CROSS');\n  \n  setInterval(() => ui.draw(game), 1000 / fps);\n}\n\n// Jest\nif (true) {\n  module.exports = {\n    CleanBuff,\n    VentBuff,\n    MusicBuff,\n    Game,\n    GameUI,\n    Traveller,\n    Platform,\n    Train\n  };\n} else {}\n\n//# sourceURL=webpack:///./public-src/script.js?");

/***/ })

/******/ });