var train =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AblyTrainArrivalsClient.js":
/*!****************************************!*\
  !*** ./src/AblyTrainArrivalsClient.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Identifier 'trainIdleTimeCap' has already been declared (5:6)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| \\n| const trainIdleTimeCap = 12000;\\n> const trainIdleTimeCap = 12000;\\n| \\n| class AblyTrainArrivalsClient {\");\n\n//# sourceURL=webpack://train/./src/AblyTrainArrivalsClient.js?");

/***/ }),

/***/ "./src/Config.js":
/*!***********************!*\
  !*** ./src/Config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  game: {\n    ticksPerSecond: 1,\n    fps: 30,\n    actionQueueCap: 3,\n    failureConditions: {\n      tooHot: 60,\n      tooCold: -20,\n      tooDirty: 0,\n    }\n  },\n  \n  \n  buffs: {\n    \n    clean: {\n      buffLengthInTicks: 5,\n      hygieneChangePerTick: 2.5,\n    },\n    \n    music: {\n      buffLengthInTicks: 4\n    },\n    \n    vent: {    \n      buffLengthInTicks: 5,\n      temperatureChangePerTick: -1,\n      hygieneChangePerTick: 0.2\n    }\n  },\n  \n  \n  entities: {\n    \n    platform: {\n      startValues: {\n        capacity: 60,\n        temperature: 15,\n        hygiene: 100\n      },\n      hygieneCap: 100,\n      hygieneFloor: 0\n    },\n    \n    train: {\n      temperatureChangePerTick: 0.25,\n      doorsCloseAtTick: 10,\n      spawnPassengersFromTick: 2,\n      spawnPassengersPerTick: 1\n    },\n    \n    traveller: {\n      startValues: {\n        ticksFromExit: 14\n      },\n      temperatureChangePerTick: 0.1,\n      temperatureChangeOnCompletion: -1,\n      stepSize: 15,\n      dropTrashPercentageChance: 5,\n      chanceOfPassingOutWhenHygieneLessThan: 30,\n      passOutPercentageChance: 10\n    }\n    \n  },\n  \n  \n  problems: {\n    \n    mouse: {\n      stepSize: 10,\n      leavesWhenHygieneIsAbove: 80,\n      leavesWhenTemperatureIsBelow: 0,\n      hygieneChangeWhenMouseLeaves: 5\n    },\n        \n    trash: {\n      hygieneChangePerTick: -0.25,\n      chanceOfMouseWhenLessThanHygiene: 80,\n      chanceOfMousePercent: 10\n    },\n        \n    heat: {\n      heatOverlayDisplaysAt: 35\n    }\n    \n  }\n};\n\n//# sourceURL=webpack://train/./src/Config.js?");

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const config = __webpack_require__(/*! ./Config */ \"./src/Config.js\");\nconst cfg = config.game;\nconst Platform = __webpack_require__(/*! ./entities/Platform */ \"./src/entities/Platform.js\");\n\nconst CleanBuff = __webpack_require__(/*! ./buffs/CleanBuff */ \"./src/buffs/CleanBuff.js\");\nconst MusicBuff = __webpack_require__(/*! ./buffs/MusicBuff */ \"./src/buffs/MusicBuff.js\");\nconst VentBuff = __webpack_require__(/*! ./buffs/VentBuff */ \"./src/buffs/VentBuff.js\");\n\nconst nothing = () => { };\nconst asyncNothing = async () => { };\n\nconst buffs = { \n  CleanBuff,\n  MusicBuff,\n  VentBuff\n};\n\nclass Game {\n  constructor(platformIds) {\n    this.platformIds = platformIds || [ \"platformId1\" ];\n    this.init(platformIds);\n  }\n  \n  init(platformIds) {\n    this.ticks = 0;\n    this.status = \"inactive\";\n    this.platforms = [];    \n    this.queuedActions = [];\n    this.onGameEnd = nothing;    \n        \n    for (let id of this.platformIds) {\n      this.platforms.push(new Platform(id));\n    }\n  }\n  \n  async start(options) {\n    this.init();\n    \n    const onStart = options.onGameStart || asyncNothing;\n    this.onGameEnd = options.onGameEnd || nothing;\n    this.status = \"active\";\n\n    await onStart();\n\n    this.tickInterval = setInterval(() => {\n      this.tick();\n    }, 1000 / cfg.ticksPerSecond);\n  }\n\n  stop(showGameOver = true) {    \n    clearInterval(this.tickInterval);      \n    this.status = showGameOver ? \"ended\" : \"inactive\";\n    this.onGameEnd(this);\n  }\n  \n  tick() {\n    this.ticks++;\n    \n    console.log(\"🕹 Game tick\", this.ticks, this.status, this.queuedActions.length);\n         \n    const gameOverCheck = this.isGameOver(this);    \n    if (gameOverCheck.gameover) {      \n      this.gameover = gameOverCheck;\n      this.gameovermsg = gameOverCheck.message;\n      console.log(\"☠ Game ended\");\n      this.stop();\n      return;\n    }   \n    \n    // handle user input actions    \n    while (this.queuedActions.length > 0) {\n      const action = this.queuedActions.shift();\n      const handlerName = action.key.charAt(0).toUpperCase() + action.key.slice(1) + \"Buff\";\n      const target = this.platforms.filter(p => p.id == action.target)[0];      \n      const handler = this.createBuff(handlerName);\n      target.buffs.push(handler);\n    }    \n     \n    for (let platform of this.platforms) {\n      platform.tick();\n    }\n  }\n\n  createBuff(name) {   \n    try {\n      return new buffs[name]();      \n    } catch (ex) {\n      throw \"Could not find handler called \" + name;\n    }\n  }\n  \n  isGameOver() {    \n    const failureConditions = [\n      { condition: (g) => (g.platforms.filter(p => p.temperature >= cfg.failureConditions.tooHot).length > 0), message: \"It's too hot!<br>Score: \" +  this.ticks },\n      { condition: (g) => (g.platforms.filter(p => p.temperature <= cfg.failureConditions.tooCold).length > 0), message: \"It's too cold!<br>Score: \" +  this.ticks },\n      { condition: (g) => (g.platforms.filter(p => p.hygiene <= cfg.failureConditions.tooDirty).length > 0), message: \"It's too disgusting!<br>Score: \" +  this.ticks},\n      { condition: (g) => (g.platforms.filter(p => p.contents.length >= p.capacity).length > 0), message: \"Your platforms are too full!<br>Score: \" +  this.ticks}\n    ];\n    \n    for (let index in failureConditions) {\n      const c = failureConditions[index];\n      if (c.condition(this)) {\n        return { gameover: true, message: c.message, conditionId: index };\n      }\n    }\n    \n    return { gameover: false };\n  }\n  \n  queueAction(key, target) {\n    if (this.queuedActions.length >= cfg.actionQueueCap) return;\n    this.queuedActions.push({ key: key, target: target })\n  }\n  \n  registerEvent(current, ablyMessage) {\n    const matchingPlatform = current.platforms.filter(p => p.id === ablyMessage.line)[0];\n    matchingPlatform.unprocessedMessages.push(ablyMessage);\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://train/./src/Game.js?");

/***/ }),

/***/ "./src/GameUi.js":
/*!***********************!*\
  !*** ./src/GameUi.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const config = __webpack_require__(/*! ./Config */ \"./src/Config.js\");\nconst fps = config.game.fps;\nconst hot = config.problems.heat.heatOverlayDisplaysAt;\nconst rand = __webpack_require__(/*! ./utils */ \"./src/utils.js\").rand;\n\nclass GameUi {\n  \n  constructor(initialState) {\n    this.playfield = document.getElementById(\"playfield\");\n    this.track = document.getElementById(\"track\");\n    this.platform = document.getElementById(\"platform\");\n    \n    this._lastState = JSON.stringify(initialState);    \n    this._renderingFunctions = [\n      renderLabels,\n      renderGameStatus,\n      renderTemperature,\n      renderPlatform,\n      renderContents,\n      renderBuffs\n    ];\n  }\n\n  startRendering(game, dataSource) {\n    setInterval(() => this.draw(game, dataSource), 1000 / fps);\n  }\n  \n  draw(g, dataSource) {\n    if (JSON.stringify(g) === this._lastState) {\n      return; // No state has changed, do we need to re-render?\n    }\n    \n    if (g.ticks === 0 && this.platform) {\n      this.resetUi();\n    }\n    \n    const lastStateSnapshot = JSON.parse(this._lastState);\n    for (let renderer of this._renderingFunctions) {\n      const ret = renderer(g, lastStateSnapshot, dataSource)\n      if (ret === -1) { // Renderer caused an early exit\n        break;\n      }\n    }\n    \n    this._lastState = JSON.stringify(g);\n  }\n  \n  resetUi() {\n    this.platform.innerHTML = \"\";\n  }\n}\n\n\nfunction renderLabels(currentGameState, previousGameState) {\n  \n  const viewModel = {\n    \"game\": currentGameState,\n    \"ticks\": currentGameState.ticks,\n    \"total-platforms\": currentGameState.platforms.length,\n    \"platforms\": currentGameState.platforms,\n    \"gameovermsg\": currentGameState.gameovermsg\n  };\n\n  let props = Object.getOwnPropertyNames(viewModel);\n  for (let prop of props) {\n    const selector = \"[data-bind-\" + prop + \"]\";\n    const elements = [...document.querySelectorAll(selector)];\n    for(let ele of elements) {\n      ele.innerHTML = viewModel[prop];\n    }\n  }\n    \n  for (let index in currentGameState.platforms) {\n    const platform = currentGameState.platforms[index];\n    \n    props = Object.getOwnPropertyNames(platform);\n    for (let prop of props) {\n      const selector = \"[data-bind-platform-\" + index + \"-\" + prop + \"]\";\n      const elements = [...document.querySelectorAll(selector)];\n      for(let ele of elements) {\n        ele.innerHTML = platform[prop];\n      }\n    }\n  }\n}\n\nfunction renderBuffs(currentGameState, previousGameState) {\n  const buffTing = document.getElementById(\"buffs\");\n  buffTing.innerHTML = \"\";\n  \n  for (let platform of currentGameState.platforms) {\n    for (let buff of platform.buffs) {\n      const ele = document.createElement(\"div\");\n      ele.setAttribute(\"data-ticks\", buff.ticks); \n      ele.classList.add(\"buff\");      \n      ele.classList.add(buff.constructor.name);\n      buffTing.appendChild(ele);\n      \n    }\n  }  \n}\n\nfunction renderGameStatus(currentGameState, previousGameState) {\n  const gameOverScreen = document.getElementById(\"game-over-message\");\n  \n  if (currentGameState.status !== \"ended\") {   \n    gameOverScreen.classList.add(\"hide\");  \n    return; \n  }\n  \n  gameOverScreen.classList.remove(\"hide\");  \n  gameOverScreen.classList.add(currentGameState.status);  \n  gameOverScreen.classList.add(\"game-over-failure-\" + currentGameState.gameover.conditionId);  \n  return -1;\n}\n\nfunction renderTemperature(currentGameState, previousGameState) {\n  \n  const anyPlatformTooHot = currentGameState.platforms.filter(p => p.temperature > hot).length > 0;\n  const overlay = document.getElementById(\"temperatureOverlay\");\n  if (anyPlatformTooHot) {\n    overlay.classList.remove(\"hide\");\n    overlay.style.opacity = currentGameState.platforms[0].temperature - 10;\n  } else {    \n    overlay.classList.add(\"hide\");\n  }  \n}\n\n\nfunction renderPlatform(currentGameState, previousGameState) {\n  \n  for (let platform of currentGameState.platforms) {        \n    const platformAsOfLastTick = previousGameState.platforms.filter(p => p.id == platform.id)[0];\n    const trainImage = document.getElementById(\"trainSVG\");\n\n    if (!platformAsOfLastTick.hasTrain && platform.hasTrain) {      \n      trainImage.classList.remove(\"train\");\n      trainImage.classList.remove(\"arrival\");\n      trainImage.classList.remove(\"slideOut\");       \n      trainImage.classList.add(\"train\");\n      trainImage.classList.add(\"arrival\");\n      this.track.appendChild(trainImage);\n    } \n\n    if (platformAsOfLastTick.hasTrain && !platform.hasTrain ) {\n      trainImage.classList.add(\"slideOut\");\n    }\n  }    \n}\n\nfunction renderContents(currentGameState, previousGameState) {\n\n  for (let platform of currentGameState.platforms) {\n    \n    const previousPlatform = previousGameState.platforms.filter(p => p.id == platform.id)[0];\n    const previousContentIds = previousPlatform.contents.map(state => state.id);\n    const currentContentIds = platform.contents.map(state => state.id);\n    const removedItems = previousContentIds.filter(cid => currentContentIds.indexOf(cid) == -1);\n\n    for (const removedEntityId of removedItems) {    \n      document.getElementById(removedEntityId).remove();\n    }\n\n    for (let [index, entity] of platform.contents.entries()) {\n     \n      let gfxTarget = document.getElementById(entity.id);\n      \n      if (!gfxTarget) {        \n        gfxTarget = document.createElement(\"div\");\n        \n        gfxTarget.setAttribute('id', entity.id);\n        gfxTarget.classList.add(\"entity\");\n        gfxTarget.classList.add(entity.constructor.name.toLowerCase());\n        gfxTarget.classList.add(entity.constructor.name.toLowerCase() + Math.floor(Math.random() * 4));\n        gfxTarget.setAttribute(`data-${entity.constructor.name.toLowerCase()}-id`, entity.id);\n        \n        const spawnPoint = rand(0, platform.spawnPoints.length);\n        const spawnPointLocation = platform.spawnPoints[spawnPoint];\n        const spawnX = spawnPointLocation.x;\n\n        gfxTarget.style.position = \"absolute\";\n        \n        if (!entity.x) {\n          entity.x = spawnX;\n        }\n\n        if (!entity.y) {\n          entity.y = spawnPointLocation.y;\n        }\n\n        entity.isDisplayed = true;\n        \n        this.platform.appendChild(gfxTarget);\n      }    \n\n      const props = Object.getOwnPropertyNames(entity);\n      for (let prop of props) {        \n        gfxTarget.setAttribute(\"data-\" + prop.toLowerCase(), entity[prop]); \n      }\n      \n      gfxTarget.setAttribute(\"data-x\", entity.x);          \n      gfxTarget.setAttribute(\"data-y\", entity.y);\n\n      gfxTarget.style.left = entity.x + \"px\";\n      gfxTarget.style.top = entity.y + \"px\";\n      gfxTarget.style.zIndex = 1000 + entity.y;\n      gfxTarget.style.position = \"absolute\";\n\n      if (entity.constructor.name == \"Trash\") {        \n        gfxTarget.style.zIndex = 20;\n      }      \n    }\n  }    \n}\n\nmodule.exports = GameUi;\n\n//# sourceURL=webpack://train/./src/GameUi.js?");

/***/ }),

/***/ "./src/SimulatedTrainArrivalsClient.js":
/*!*********************************************!*\
  !*** ./src/SimulatedTrainArrivalsClient.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const twelveSeconds = 1000 * 12;\n\nclass SimulatedTrainArrivalsClient {\n  constructor(interval) {\n    this.interval = interval || twelveSeconds;\n    this.stopped = false;\n    console.log(\"SimulatedTrainArrivalsClient created.\");\n  }\n\n  async listenForEvents(id, callback) {\n    console.log(\"Faking train arrivals for\", id);\n    \n    this._callback = callback;\n    this.simulateSingleTrain();\n  }\n  \n  stopListening() {\n    console.log(\"Stopping SimulatedTrainArrivalsClient.\");\n    \n    if (this._timeout) {\n      clearTimeout(this._timeout);\n    }\n    \n    this.stopped = true;\n  }\n  \n  async simulateSingleTrain() {    \n    this.fakeArrival();\n    await sleep(this.interval); \n    \n    if (!this.stopped) {\n      this.fakeDeparture();    \n      this._timeout = setTimeout(async () => await this.simulateSingleTrain(), this.interval);\n    }\n  }\n  \n  fakeArrival() {        \n    console.log(\"Faking train arrival.\");\n    this._callback({ line: \"platformId1\", arrived: true, source: this.constructor.name });\n  }\n    \n  fakeDeparture() {        \n    console.log(\"Faking train departure.\");\n    this._callback({ line: \"platformId1\", departed: true, source: this.constructor.name });    \n  }\n  \n}\n\nconst sleep = (timeout) => new Promise(r => setTimeout(r, timeout));\n\nmodule.exports = SimulatedTrainArrivalsClient;\n\n//# sourceURL=webpack://train/./src/SimulatedTrainArrivalsClient.js?");

/***/ }),

/***/ "./src/buffs/CleanBuff.js":
/*!********************************!*\
  !*** ./src/buffs/CleanBuff.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const config = __webpack_require__(/*! ../Config */ \"./src/Config.js\");\nconst cfg = config.buffs.clean;\n\nclass CleanBuff {\n  constructor() {\n    console.log(\"🧼 CleanBuff()\");\n    this.ticks = cfg.buffLengthInTicks;\n    this.completed = false;\n    this.hasTicked = false;\n  }\n  \n  tick(platform) {\n    this.ticks--;    \n    platform.hygiene += cfg.hygieneChangePerTick;\n    \n    this.removeOneTrash(platform);\n    \n    if (this.ticks == 0) {\n      this.completed = true;\n    }\n    \n    this.hasTicked = true;\n  }\n  \n  removeOneTrash(platform) {\n    for (let index in platform.contents) {\n      const entity = platform.contents[index];\n      if (entity.constructor.name === \"Trash\") {\n        platform.contents = platform.contents.filter(item => item !== entity);\n        \n        console.log(\"Removed an item of trash 🚮\");\n        return;\n      }\n    }    \n  }\n}\n\nmodule.exports = CleanBuff;\n\n//# sourceURL=webpack://train/./src/buffs/CleanBuff.js?");

/***/ }),

/***/ "./src/buffs/MusicBuff.js":
/*!********************************!*\
  !*** ./src/buffs/MusicBuff.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const config = __webpack_require__(/*! ../Config */ \"./src/Config.js\");\nconst cfg = config.buffs.music;\n\nclass MusicBuff {\n  constructor() {\n    console.log(\"🎶 MusicBuff()\");\n    this.ticks = cfg.buffLengthInTicks;\n    this.completed = false;\n  }\n  \n  tick(platform) {\n    this.ticks--;\n    if (this.ticks == 0) {\n      this.completed = true;\n    }\n  }  \n   \n  onCompletion(platform) {\n    this.charmMice(platform);\n    for (const traveller of platform.contents.filter(c => c.constructor.name == \"Traveller\")) {\n      traveller.isPassedOut = false;\n    }\n  }\n  \n  charmMice(platform) {\n    console.log(\"Charming all the mice! 🐭🐭🐁🐁\");    \n    const mice = platform.contents.filter(e => e.constructor.name === \"Mouse\");\n    for (const mouse of mice) {\n      mouse.leave(platform, 15);\n    }    \n  }\n  \n}\n\nmodule.exports = MusicBuff;\n\n//# sourceURL=webpack://train/./src/buffs/MusicBuff.js?");

/***/ }),

/***/ "./src/buffs/VentBuff.js":
/*!*******************************!*\
  !*** ./src/buffs/VentBuff.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const config = __webpack_require__(/*! ../Config */ \"./src/Config.js\");\nconst cfg = config.buffs.vent;\n\nclass VentBuff {\n  constructor() {\n    console.log(\"🌬 VentBuff()\");\n    this.ticks = cfg.buffLengthInTicks;\n    this.completed = false;\n  }\n  \n  tick(platform) {\n    this.ticks--;\n    platform.temperature += cfg.temperatureChangePerTick;\n    platform.hygiene += cfg.hygieneChangePerTick;\n    if (this.ticks == 0) {         \n      this.completed = true;\n    }\n  }\n}\n\nmodule.exports = VentBuff;\n\n//# sourceURL=webpack://train/./src/buffs/VentBuff.js?");

/***/ }),

/***/ "./src/entities/Platform.js":
/*!**********************************!*\
  !*** ./src/entities/Platform.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Train = __webpack_require__(/*! ./Train */ \"./src/entities/Train.js\");\nconst config = __webpack_require__(/*! ../Config */ \"./src/Config.js\");\nconst cfg = config.entities.platform;\n\nclass Platform {\n  constructor(id) {\n    this.id = id;\n    this.ticks = 0;\n    this.width = 500;\n    this.height = 200;\n    \n    this.capacity = cfg.startValues.capacity;\n    this.temperature = cfg.startValues.temperature;\n    this.hygiene = cfg.startValues.hygiene;\n    \n    this.train = null;\n    this.hasTrain = false;\n    this.contents = [];\n    this.buffs = [];\n        \n    this.unprocessedMessages = [];  \n    this.spawnPoints = [\n      { x: 120, y: -25, give: 5 },\n      { x: 350, y: -25, give: 5 }  \n    ];\n    \n    this.exits = [\n      { x: 0,  y: 180 },\n      // { x: 500,  y: 200 }\n    ];    \n  }\n  \n  tick() {\n    this.ticks++;\n\n    while (this.unprocessedMessages.length > 0) {\n      const msg = this.unprocessedMessages.shift(); // FIFO\n      \n      console.log(\"✉ Message:\", msg);\n      \n      if (msg.arrived) {\n        this.hasTrain = true;\n        this.train = new Train();        \n      }\n            \n      if (msg.departed) {\n        if (this.train) { \n          this.train.completed = true;\n          this.complete(this.train);\n        }\n        this.hasTrain = false;\n        this.train = null;        \n        console.log(\"🚆 Removed train.\");\n      }      \n    }\n    \n    let tickables = [ this.train, ...this.contents, ...this.buffs ];\n\n    // console.log(\"Ticking:\", tickables);\n    // console.log(\"Ticking \" + tickables.length + \" items.\");\n    \n    for (let item of tickables) {\n      if (!item) continue;      \n      if (item[\"tick\"]) {\n        item.tick(this);\n      }\n            \n      this.complete(item);\n    }\n    \n    this.buffs = this.buffs.filter(b => !b.completed);\n    this.contents = this.contents.filter(b => !b.completed);\n    this.capacity = this.capacity <= 0 ? 0 : this.capacity;\n    this.hygiene = this.hygiene <= cfg.hygieneFloor ? cfg.hygieneFloor : this.hygiene;\n    this.hygiene = this.hygiene > cfg.hygieneCap ? cfg.hygieneCap : this.hygiene;\n  }\n  \n  complete(i) {\n    if(!i.completed) {\n      return;\n    }\n    \n    console.log(\"✅ Completed\", i);    \n    if (i[\"onCompletion\"]) {       \n      i.onCompletion(this);\n    } \n  }\n}\n\nmodule.exports = Platform;\n\n//# sourceURL=webpack://train/./src/entities/Platform.js?");

/***/ }),

/***/ "./src/entities/Train.js":
/*!*******************************!*\
  !*** ./src/entities/Train.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const config = __webpack_require__(/*! ../Config */ \"./src/Config.js\");\nconst cfg = config.entities.train;\nconst uuidv4 = __webpack_require__(/*! ../utils */ \"./src/utils.js\").uuidv4;\nconst Traveller = __webpack_require__(/*! ./Traveller */ \"./src/entities/Traveller.js\");\n\nclass Train {\n  constructor() {\n    this.id = uuidv4();\n    this.ticks = 0;\n    this.hasTicked = false;\n    this.doorState = \"closed\";\n    \n    console.log(\"🚂 Train(id=\" + this.id + \")\");\n }\n  \n  tick(platform) {\n    \n    platform.temperature += cfg.temperatureChangePerTick;\n\n    if (this.ticks == 0) {\n      this.doorState = \"opening\";\n    }\n\n    if (this.ticks > cfg.doorsCloseAtTick) {\n      this.doorState = \"closing\";\n    }\n\n    if (this.ticks >= cfg.spawnPassengersFromTick && this.ticks <= cfg.doorsCloseAtTick) {\n      for (let i = 0; i < cfg.spawnPassengersPerTick; i++) {\n        platform.contents.push(new Traveller());\n      }\n    }\n\n    this.ticks++;\n    this.hasTicked = true;    \n  }\n\n  onCompletion(platform) {\n  }\n}\n\nmodule.exports = Train;\n\n//# sourceURL=webpack://train/./src/entities/Train.js?");

/***/ }),

/***/ "./src/entities/Traveller.js":
/*!***********************************!*\
  !*** ./src/entities/Traveller.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const config = __webpack_require__(/*! ../Config */ \"./src/Config.js\");\nconst cfg = config.entities.traveller;\nconst rand = __webpack_require__(/*! ../utils */ \"./src/utils.js\").rand;\nconst uuidv4 = __webpack_require__(/*! ../utils */ \"./src/utils.js\").uuidv4;\nconst walkNaturally = __webpack_require__(/*! ../traits/Pathfinder */ \"./src/traits/Pathfinder.js\").walkNaturally;\nconst Trash = __webpack_require__(/*! ../problems/Trash */ \"./src/problems/Trash.js\");\n\nclass Traveller {\n   constructor() {\n    this.id = uuidv4();\n    this.ticks = 0;\n    this.ticksFromExit = cfg.startValues.ticksFromExit;\n\n    this.completed = false;\n    this.droppedTrash = false;\n    this.isPassedOut = false;\n    this.isDisplayed = false;\n    this.dancing = false;\n     \n    console.log(\"🕺 Traveller(id=\" + this.id + \")\");\n  }\n  \n  tick(platform) {\n    this.ticks++;    \n\n    if (!this.selectedExit) {\n      const exitIndex = rand(0, platform.exits.length);\n      this.selectedExit = platform.exits[exitIndex];\n    }\n\n    if (this.ticksFromExit == 0) {\n      platform.temperature += cfg.temperatureChangeOnCompletion;\n      this.completed = true;\n      \n      console.log(\"🚪 Traveller(id=\"+ this.id + \") reached exit\");\n      return;\n    }\n    \n    this.dancing = platform.buffs.filter(x => x.constructor.name == \"MusicBuff\").length > 0;\n    platform.temperature += cfg.temperatureChangePerTick;\n    \n    if (this.dancing || this.isPassedOut) {\n      return;\n    }\n    \n    walkNaturally(this, this.selectedExit, cfg.stepSize);\n    this.ticksFromExit--;\n\n    const random = this.random();\n\n    // Am I gonna drop trash? \n    if (!this.droppedTrash && random <= cfg.dropTrashPercentageChance) { \n      platform.contents.push(new Trash(this.x, this.y));\n      this.droppedTrash = true;\n      return;\n    }\n    \n    // Maybe I'm going to pass out?\n    if (!this.isPassedOut && platform.hygiene <= cfg.chanceOfPassingOutWhenHygieneLessThan && random <= cfg.passOutPercentageChance) {      \n      this.isPassedOut = true;\n      console.log(\"🤒 Traveller(id=\"+ this.id + \") passed out.\");\n      return;\n    }\n  }\n\n  random() { return rand(0, 100); }\n}\n\nmodule.exports = Traveller;\n\n//# sourceURL=webpack://train/./src/entities/Traveller.js?");

/***/ }),

/***/ "./src/problems/Mouse.js":
/*!*******************************!*\
  !*** ./src/problems/Mouse.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const config = __webpack_require__(/*! ../Config */ \"./src/Config.js\");\nconst cfg = config.problems.mouse;\nconst Problem = __webpack_require__(/*! ./Problem */ \"./src/problems/Problem.js\");\nconst inTargetZone = __webpack_require__(/*! ../traits/Pathfinder */ \"./src/traits/Pathfinder.js\").inTargetZone;\nconst walkNaturally = __webpack_require__(/*! ../traits/Pathfinder */ \"./src/traits/Pathfinder.js\").walkNaturally;\n\nclass Mouse extends Problem {\n  constructor(x, y) {\n    super(x, y);\n    this.stepSize = cfg.stepSize;\n    this.offscreen = { x: 600, y: 300 };\n  }\n    \n  tick(platform) {\n    \n    if (!this.destination) {\n      this.destination = { x: this.random(0, platform.width), y: this.random(0, platform.height) }; \n      // Go somewhere random\n    } \n    \n    if (platform.hygiene >= cfg.leavesWhenHygieneIsAbove || platform.temperature <= cfg.leavesWhenTemperatureIsBelow) {\n      this.leave(platform); // Too clean or too cold! going away.\n    }\n    \n    walkNaturally(this, this.destination, this.stepSize);    \n\n    if (inTargetZone(this, this.offscreen, this.stepSize)) {\n      this.completed = true; // They left!\n    } else if (inTargetZone(this, this.destination, this.stepSize)) {\n      this.destination = null;\n    }\n      \n    this.ticks++;\n  }\n  \n  leave(platform, speed) {\nthis.stepSize;\n    this.destination = this.offscreen;\n  }\n\n  onCompletion(platform) {\n    platform.hygiene += cfg.hygieneChangeWhenMouseLeaves;\n  }\n}\n\nmodule.exports = Mouse\n\n//# sourceURL=webpack://train/./src/problems/Mouse.js?");

/***/ }),

/***/ "./src/problems/Problem.js":
/*!*********************************!*\
  !*** ./src/problems/Problem.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const uuidv4 = __webpack_require__(/*! ../utils */ \"./src/utils.js\").uuidv4;\nconst rand = __webpack_require__(/*! ../utils */ \"./src/utils.js\").rand;\n\nclass Problem {\n  constructor(x, y) {\n    this.id = uuidv4();\n    this.ticks = 0;\n    this.x = x;\n    this.y = y;    \n    console.log(\"❗ \" + this.constructor.name + \"(id=\" + this.id + \")\");\n  }\n\n  random(min, max) { \n    min = min || 0;\n    max = max || 100;\n    return rand(min, max); \n  }\n}\n\nmodule.exports = Problem;\n\n//# sourceURL=webpack://train/./src/problems/Problem.js?");

/***/ }),

/***/ "./src/problems/Trash.js":
/*!*******************************!*\
  !*** ./src/problems/Trash.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const config = __webpack_require__(/*! ../Config */ \"./src/Config.js\");\nconst cfg = config.problems.trash;\nconst Problem = __webpack_require__(/*! ./Problem */ \"./src/problems/Problem.js\");\nconst Mouse = __webpack_require__(/*! ./Mouse */ \"./src/problems/Mouse.js\");\nconst rand = __webpack_require__(/*! ../utils */ \"./src/utils.js\").rand;\n\nclass Trash extends Problem {\n  constructor(x, y) {\n    super(x, y);\n    this.spawnedMouse = false;\n  }\n  \n  tick(platform) {   \n    \n    platform.hygiene += cfg.hygieneChangePerTick;    \n    \n    // Spawn mouse if too trashy\n    const random = this.random();\n    \n    if (!this.spawnedMouse && platform.hygiene <= cfg.chanceOfMouseWhenLessThanHygiene && random <= cfg.chanceOfMousePercent) {\n      platform.contents.push(new Mouse(this.x, this.y));\n      this.spawnedMouse = true;\n    }\n    \n    this.ticks++;\n  }  \n\n  onCompletion(platform) {\n  }\n}\n\nmodule.exports = Trash;\n\n//# sourceURL=webpack://train/./src/problems/Trash.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\nconst GameUi = __webpack_require__(/*! ./GameUi */ \"./src/GameUi.js\");\n\nconst AblyTrainArrivalsClient = __webpack_require__(/*! ./AblyTrainArrivalsClient */ \"./src/AblyTrainArrivalsClient.js\");\nconst SimulatedTrainArrivalsClient = __webpack_require__(/*! ./SimulatedTrainArrivalsClient */ \"./src/SimulatedTrainArrivalsClient.js\");\n\nlet game, ui, dataSource;\n\nasync function startGame(useRealData = false) {\n  if (game) {\n    game.stop(false);\n  }  \n  \n  dataSource = useRealData \n                ? new AblyTrainArrivalsClient() \n                : new SimulatedTrainArrivalsClient();\n  \n  game = new Game();\n  ui = new GameUi(game);\n  \n  game.start({\n    onGameStart: async () => await dataSource.listenForEvents(\"940GZZLUKSX\", msg => game.registerEvent(game, msg)),\n    onGameEnd: () => dataSource.stopListening()\n  });\n\n  ui.startRendering(game, dataSource);\n  \n  return game;\n}\n\nmodule.exports = { startGame };\n\n//# sourceURL=webpack://train/./src/script.js?");

/***/ }),

/***/ "./src/traits/Pathfinder.js":
/*!**********************************!*\
  !*** ./src/traits/Pathfinder.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const rand = __webpack_require__(/*! ../utils */ \"./src/utils.js\").rand;\n\nfunction inTargetZone(location, target, tolerance) {\n  tolerance = tolerance || 0;  \n  if (location.x < target.x - tolerance) return false;\n  if (location.x > target.x + tolerance) return false;\n  if (location.y < target.y - tolerance) return false;\n  if (location.y > target.y + tolerance) return false;    \n  return true;\n}\n\nfunction walkNaturally(walker, target, unitSize) {\n  const manhattenDistance = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);\n\n  if (walker.isDisplayed) { // Has been rendered\n\n    const stepSize = 1 * unitSize;\n\n    const possibleSteps = [\n      { x: walker.x - stepSize, y: walker.y - stepSize },\n      { x: walker.x - stepSize, y: walker.y },\n      { x: walker.x - stepSize, y: walker.y + stepSize },\n      { x: walker.x, y: walker.y - stepSize },\n      { x: walker.x, y: walker.y + stepSize },            \n      { x: walker.x + stepSize, y: walker.y - stepSize },\n      { x: walker.x + stepSize, y: walker.y },\n      { x: walker.x + stepSize, y: walker.y + stepSize },\n    ];\n\n    const currentManhattenDistance = manhattenDistance({x: walker.x, y: walker.y}, target);\n    const closerSteps = possibleSteps.filter(s => manhattenDistance(s, target) < currentManhattenDistance);\n    \n    if (closerSteps.length > 0) {\n      const stepChoice = rand(0, closerSteps.length);          \n      const selectedStep = closerSteps[stepChoice];\n      walker.x = selectedStep.x;\n      walker.y = selectedStep.y;\n    }\n  }\n}\n\nmodule.exports = {\n  inTargetZone,\n  walkNaturally\n}\n\n//# sourceURL=webpack://train/./src/traits/Pathfinder.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function uuidv4() {\n  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {\n    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);\n    return v.toString(16);\n  });\n}\n\nfunction rand(start, end) {\n  const result = Math.floor(Math.random() * end) + start;\n  // console.log(`rand(${start},${end}) = ${result}`);\n  return result;\n}\n\nmodule.exports = { uuidv4, rand };\n\n//# sourceURL=webpack://train/./src/utils.js?");

/***/ })

/******/ });