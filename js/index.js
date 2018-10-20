var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var tools = {
  style: function style(node, obj) {
    for (var property in obj) {
      node.style[property] = obj[property];
    }
  },
  random: function random(min, max, int) {
    var result = min + Math.random() * (max + (int ? 1 : 0) - min);
    return int ? parseInt(result) : result;
  },
  yEasing: function yEasing(t, b, c, d, s) {
    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  xEasing: function xEasing(t, b, c, d, s) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  } };


var config = {
  xVel: 0.05,
  yVel: 0.055,
  score: [200, -100],
  time: 30,
  defaultMode: 'shape',
  bonusRow: 10,
  particles: 20,
  shapeReappearanceChance: 50,
  modeReappearanceChance: 40,
  colorReappearanceChance: 25 };


var icons = [
'star',
'square',
'circle',
'triangle',
'heart'];


var colors = [
{
  name: 'red',
  value: '#eb4c34' },

{
  name: 'purple',
  value: '#d353ff' },

{
  name: 'green',
  value: '#33d767' },

{
  name: 'blue',
  value: '#3ca3e1' },

{
  name: 'yellow',
  value: '#cccd33' }];



var keys = {
  arrowRight: 39,
  arrowLeft: 37 };


var ui = {
  main: 'main',
  separator: '#separator',
  score: '#score',
  gradient: '#gradient',
  fail: '#fail',
  timer: '#timer',
  startButton: '#start-button',
  startTimer: '#start-timer',
  startTimerWrapper: '#start-timer-wrapper',
  menuButton: '#menu-button',
  restartButton: '#restart-button',
  restartButtonInGame: '#restart-button-in-game',
  gameOverScore: '#game-over-score',
  menu: '#menu',
  gameOver: '#game-over',
  slider: '#slider',
  bonus: '#bonus',
  bonusFactor: '#bonus-factor',
  gameScene: '#game-scene',
  correctScale: '#correct-scale',
  correctNumber: '#correct-number',
  incorrectNumber: '#incorrect-number',
  comparingPercent: '#comparing-percent' };


var state = {
  height: 0,
  width: 0,
  mouse: {
    xStart: 0,
    yStart: 0,
    x: 0,
    y: 0 },

  score: 0,
  mouseSwiping: false,
  animating: true,
  closerAnimation: false,
  mode: config.defaultMode,
  time: config.time,
  status: false,
  device: 'pc',
  series: 0,
  bonus: 0,
  started: false,
  correct: 0,
  incorrect: 0 };


var stateCache = _extends({}, state);var

App = function () {
  function App() {_classCallCheck(this, App);
    this.tickInterval = null;
    this.slides = {
      current: undefined,
      excluded: [],
      prev: undefined };

    this.getDimensions();
    this.bindNodes();
    this.initEvents();
    this.loop();
  }_createClass(App, [{ key: 'gameStart', value: function gameStart()
    {var _this = this;
      if (state.started) return;
      this.gameReset();
      state.started = true;
      this.startTimer(function () {
        _this.generateSlide();
        _this.tick();
        state.status = true;
      });
    } }, { key: 'gameOver', value: function gameOver()
    {
      this.calculateAccuracy();
      this.calculateComparingPercent();
      clearInterval(this.tickInterval);
      state.status = false;
      state.started = false;
      ui.gameScene.classList.remove('active');
      ui.gameOverScore.innerText = state.score;
      ui.gameOver.classList.add('active');
    } }, { key: 'calculateAccuracy', value: function calculateAccuracy()
    {
      var sum = state.correct + state.incorrect;
      var width = sum ? state.correct / sum * 100 : 50;
      tools.style(ui.correctScale, {
        width: width + '%' });
      // document.getElementById('c_score').innerHTML = state.score;
      ui.correctNumber.innerText = state.correct;
      ui.incorrectNumber.innerText = state.incorrect;
    } }, { key: 'calculateComparingPercent', value: function calculateComparingPercent()
    {
      // yes, its fake ;)) By the way pretty realistic calculation)
      var max = 9000;
      var min = -1500;
      var result = (state.score - min) * 100 / (max - min);
      if (result < 0) result = 0;
      if (result > 100) result = 100;
      ui.comparingPercent.innerText = parseInt(result, 10) + '%';
    } }, { key: 'gameReset', value: function gameReset()
    {
      ui.slider.innerHTML = '';
      this.slides = {
        current: undefined,
        excluded: [],
        prev: undefined };

      state = _extends({}, stateCache);
      this.getDimensions();
      this.updateScore(true, 0);
      this.updateTimer(state.time);
      this.changeColorScheme({ name: 'white', value: 'white' });
      this.changeGradient({ name: 'white', value: 'white' });
      ui.separator.classList.remove('to-left', 'to-right');
      ui.menu.classList.add('inactive');
      ui.gameScene.classList.add('active');
      ui.gameOver.classList.remove('active');
    } }, { key: 'startTimer', value: function startTimer(
    fn) {
      var count = 3;
      count++;
      ui.startTimerWrapper.classList.add('active');
      var tick = function tick() {
        count--;
        ui.startTimer.innerText = count;
        if (count === 0) {
          ui.startTimerWrapper.classList.remove('active');
          fn();
          return;
        }
        setTimeout(tick, 1000);
      };
      tick();
    } }, { key: 'generateSlide', value: function generateSlide()
    {var _this2 = this;
      ui.separator.classList.remove('to-left', 'to-right');
      var prevSlide = this.slides.current;
      var modeReappearance = Math.random() * 100 <= config.modeReappearanceChance;
      var shapeReappearance = Math.random() * 100 <= config.shapeReappearanceChance;
      var colorReappearance = Math.random() * 100 <= config.colorReappearanceChance;
      var mode = !modeReappearance && !!prevSlide ? ['shape', 'color'][tools.random(0, 1, true)] : state.mode;
      var shape = shapeReappearance && !!prevSlide ? prevSlide.shape : icons[tools.random(0, icons.length - 1, true)];
      var color = colorReappearance && !!prevSlide ? prevSlide.color : colors[tools.random(0, colors.length - 1, true)];
      var slide = this.renderSlide({
        color: color,
        mode: mode,
        icon: shape });

      state.mode = mode;
      this.changeColorScheme(color);
      this.changeGradient(color);
      ui.slider.insertAdjacentHTML('beforeend', slide);
      setTimeout(function () {
        var slide = ui.slider.querySelector('.slide[data-status=active]');
        _this2.slides.current = new Slide({
          shape: shape,
          color: color,
          dom: slide });

      }, 25);
    } }, { key: 'changeColorScheme', value: function changeColorScheme(
    color) {
      document.body.dataset.theme = color.name;
      document.body.style.setProperty('--theme-color', color.value);
    } }, { key: 'changeGradient', value: function changeGradient(
    color) {
      var oldGrad = ui.gradient.children;
      oldGrad = oldGrad[oldGrad.length - 1];
      oldGrad.classList.remove('active');
      setTimeout(function () {
        ui.gradient.removeChild(oldGrad);
      }, 300);
      var grad = '\n        <div \n          class="gradient__item" \n          style="background: radial-gradient(circle, ' +


      color.value + ', #373737 90%);">\n        </div>\n     ';


      ui.gradient.insertAdjacentHTML('beforeend', grad);
      setTimeout(function () {
        var grads = ui.gradient.children;
        grads[grads.length - 1].classList.add('active');
      }, 25);
    } }, { key: 'bindNodes', value: function bindNodes()
    {
      for (var selector in ui) {
        ui[selector] = document.querySelectorAll(ui[selector]);
        if (ui[selector].length === 1) ui[selector] = ui[selector][0];
      }
    } }, { key: 'initEvents', value: function initEvents()
    {var _this3 = this;
      window.addEventListener('resize', function (e) {
        _this3.getDimensions();
        _this3.resizeHandler(e);
      });
      document.addEventListener('mousemove', function (e) {
        state.mouse.x = e.clientX;
        state.mouse.y = e.clientY;
        _this3.mouseMoveHandler(e);
      });
      document.addEventListener('touchmove', function (e) {
        if (e.touches.length > 1) return;
        var touch = e.touches[0];
        state.mouse.x = touch.clientX;
        state.mouse.y = touch.clientY;
        _this3.touchMoveHandler(e);
      });
      document.addEventListener('mousedown', function (e) {
        state.mouse.xStart = e.clientX;
        state.mouse.yStart = e.clientY;
        _this3.mouseDownHandler(e);
      });
      document.addEventListener('touchstart', function (e) {
        if (e.touches.length > 1) return;
        var touch = e.touches[0];
        state.mouse.xStart = touch.clientX;
        state.mouse.yStart = touch.clientY;
        _this3.touchStartHandler(e);
      });
      document.addEventListener('touchend', function (e) {
        if (e.touches.length > 1) return;
        var touch = e.touches[0];
        _this3.touchEndHandler();
      });
      document.addEventListener('mouseup', function (e) {
        _this3.mouseUpHandler(e);
      });
      window.addEventListener('keyup', function (e) {
        _this3.keyUpHandler(e);
      });
      ui.startButton.onclick = function () {
        _this3.gameStart();
      };
      ui.menuButton.onclick = function () {
        ui.gameOver.classList.remove('active');
        ui.menu.classList.remove('inactive');
      };
      ui.restartButton.onclick = function () {
        ui.gameOver.classList.remove('active');
        _this3.gameStart();
      };
      ui.restartButtonInGame.onclick = function () {
        _this3.gameOver();
        _this3.gameStart();
      };
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      });
    } }, { key: 'mouseDownHandler', value: function mouseDownHandler(
    e) {
      if (!state.status) return;
      switch (e.which) {
        case 1:
          state.mouseSwiping = true;
          break;
        default:break;}

    } }, { key: 'touchStartHandler', value: function touchStartHandler(
    e) {
      if (!state.status) return;
      state.mouseSwiping = true;
    } }, { key: 'touchEndHandler', value: function touchEndHandler(
    e) {
      if (!state.status) return;
      state.mouseSwiping = false;
      this.closerAction();
    } }, { key: 'mouseMoveHandler', value: function mouseMoveHandler(
    e) {
      if (!state.status) return;
      this.mouseSwiper(e);
    } }, { key: 'touchMoveHandler', value: function touchMoveHandler(
    e) {
      if (!state.status) return;
      this.mouseSwiper(e);
    } }, { key: 'resizeHandler', value: function resizeHandler(
    e) {

    } }, { key: 'keyUpHandler', value: function keyUpHandler(
    e) {
      if (!state.status) return;
      var slide = this.slides.current;
      switch (e.keyCode) {
        case keys.arrowLeft:
          if (slide) {
            slide.x = -0.0000001;
            this.closerAction();
          }
          break;
        case keys.arrowRight:
          if (slide) {
            slide.x = 0.0000001;
            this.closerAction();
          }
          break;}

    } }, { key: 'mouseUpHandler', value: function mouseUpHandler(
    e) {
      if (!state.status) return;
      switch (e.which) {
        case 1:
          state.mouseSwiping = false;
          this.closerAction();
          break;
        default:break;}

    } }, { key: 'closerAction', value: function closerAction()
    {
      var slide = this.slides.current;
      if (slide.x !== 0) {
        slide.dom.dataset.status = 'excluded';
        this.slides.excluded.unshift(slide);
        this.scoreRegistry();
        state.closerAnimation = true;
        state.animating = true;
      }
    } }, { key: 'particleAnimation', value: function particleAnimation()
    {
      if (state.device === 'mobile') return;
      var slide = this.slides.current;
      var coords = [state.width / 2, state.height / 2];
      var dir = Math.sign(slide.x);
      var particles = Array(config.particles).fill(0).reduce(function (acc, el) {
        var x = tools.random(coords[0] - 200, coords[0] + 200, true);
        var y = tools.random(coords[1] - 200, coords[1] + 200, true);
        var style = ['opacity: ' +
        tools.random(0.5, 1, true), 'left: ' +
        x + 'px; top: ' + y + 'px', 'transition: all ' +
        tools.random(0.35, 1) + 's ease', 'transform: rotate(0) translate3d(0,0,0) scale(0)'].

        join(';');
        return acc + ('<div style="' + style + '" class="particle"></div>');
      }, '');
      var particleWrapper = '\n      <div class="particles">\n        ' +

      particles + '\n      </div>\n    ';


      ui.main.insertAdjacentHTML('beforeend', particleWrapper);
      setTimeout(function () {
        var wrapper = document.querySelectorAll('.particles');
        wrapper = wrapper[wrapper.length - 1];
        var p = [].concat(_toConsumableArray(wrapper.children));
        p.forEach(function (el) {
          tools.style(el, {
            transform: '\n             rotate(' +
            tools.random(-60, 60, true) + 'deg)\n             translate3d(' +
            tools.random(50, state.width / 2, true) * dir + 'px,0 ,0)\n             scale(' +
            tools.random(1, 3.5) + ')\n          ',

            opacity: 0 });

        });
        setTimeout(function () {
          wrapper.parentNode.removeChild(wrapper);
        }, 1000);
      }, 25);
    } }, { key: 'scoreRegistry', value: function scoreRegistry()
    {
      var slide = this.slides.current;
      var prev = this.slides.prev;
      if (prev) {
        var direction = Math.sign(slide.x) === Math.sign(prev.x);
        var shape = slide.shape === prev.shape;
        var color = slide.color.name === prev.color.name;
        var result = null;
        switch (state.mode) {
          case 'shape':
            result = direction && shape || !direction && !shape;
            break;
          case 'color':
            result = direction && color || !direction && !color;}

        this.updateScore(result);
        this.bonusCalculation(result);
        if (result) {
          state.correct += 1;
          this.particleAnimation();
        } else {
          state.incorrect += 1;
          ui.fail.classList.add('active');
          setTimeout(function () {
            ui.fail.classList.remove('active');
          }, 200);
        }
      }
    } }, { key: 'bonusCalculation', value: function bonusCalculation(
    action) {
      state.series = action ? state.series + 1 : 0;
      if (state.series && state.series % config.bonusRow === 0) {
        state.bonus = state.series / config.bonusRow;
        ui.bonusFactor.innerText = 'x' + (state.bonus + 1);
        ui.bonus.classList.add('active');
        setTimeout(function () {
          ui.bonus.classList.remove('active');
        }, 300);
      }
    } }, { key: 'mouseSwiper', value: function mouseSwiper(
    e) {
      var slide = this.slides.current;
      if (!state.mouseSwiping || state.animating) return;
      slide.x = (state.mouse.x - state.mouse.xStart) / state.width;
      ui.separator.classList[slide.x > 0 ? 'add' : 'remove']('to-right');
      ui.separator.classList[slide.x < 0 ? 'add' : 'remove']('to-left');
    } }, { key: 'getDimensions', value: function getDimensions()

    {
      state.height = document.documentElement.clientHeight;
      state.width = document.documentElement.clientWidth;
      if (state.width <= 450) {
        state.device = 'mobile';
      } else {
        state.device = 'pc';
      }
    } }, { key: 'renderSlide', value: function renderSlide(
    props) {var
      icon = props.icon,color = props.color,mode = props.mode;
      var imageClasses = ['top', 'middle', 'bottom'];
      if (state.device === 'mobile') imageClasses.length = 1;
      var images = imageClasses.reduce(function (acc, cur) {
        return acc + ('\n        <div class="slide__image-wrapper">\n         <div class="slide__image slide__image--' +

        cur + '">\n          <svg fill="' +
        color.value + '" viewBox="0 0 32 32">\n            <use xlink:href="#' +
        icon + '"></use>\n          </svg>\n        </div>\n      </div>\n      ');




      }, '');
      return ('\n        <div class="slide ' + (
      mode === 'color' ? 'color-mode' : '') + '" data-status="active">\n        <div class="slide__plate">\n          <div class="slide__plate-content">\n            ' +


      images + '\n          </div>\n        </div>\n      </div>\n    ').



      trim();
    } }, { key: 'slideMove', value: function slideMove()
    {
      var slide = this.slides.current;
      if (slide) {
        if (slide.y !== 1) slide.y = slide.y > 1 ? 1 : slide.y + config.yVel;
        if (state.animating && !state.closerAnimation) {
          if (slide.y >= 0.3) state.animating = false;
        }
        this.slideAnimation(slide);
      }
      this.excludedSlidesMotion();
    } }, { key: 'slideAnimation', value: function slideAnimation(
    slide) {

      var y = tools.yEasing(slide.y, 0, 1, 1);
      var x = tools.xEasing(Math.abs(slide.x), 0, 1, 1);

      var ry = slide.x > 0 ? 120 * slide.x : -120 * slide.x;
      var plate = slide.dom.children[0];

      var topImage = plate.querySelector('.slide__image--top');
      var middleImage = plate.querySelector('.slide__image--middle');

      tools.style(slide.dom, {
        transform: 'translate3d(' + slide.x * 100 + '%, ' + y * 100 + '%, 0)' });

      if (state.device !== 'mobile') {
        tools.style(plate, {
          transform: '\n        rotate(' +
          25 * slide.x + 'deg)\n        rotateX(' +
          ry + 'deg)\n        rotateY(' +
          25 * slide.x + 'deg)' });

        if (topImage) {
          tools.style(topImage, {
            transform: 'translateZ(' + 200 * Math.abs(x) + 'px)' });

        }
        if (middleImage) {
          tools.style(middleImage, {
            transform: 'translateZ(' + 100 * Math.abs(x) + 'px)' });

        }
      } else {
        tools.style(plate, {
          transform: '\n        rotate(' +
          25 * slide.x + 'deg)\n        ' });


      }
    } }, { key: 'excludedSlidesMotion', value: function excludedSlidesMotion()
    {var _this4 = this;

      var exSlides = this.slides.excluded;
      exSlides.forEach(function (el) {
        el.x += config.xVel * Math.sign(el.x);
        el.y2 += 0.01;
        var y = tools.yEasing(el.y, 0, 1, 1);
        if (!el.excluded && Math.abs(el.x) >= 0.2) {
          el.excluded = true;
          _this4.generateSlide();
          state.closerAnimation = false;
        }
        if (Math.abs(el.x) >= 1) {
          el.desctruct();
          el.dom.style.display = 'none';
          _this4.onSlideRemoval(el);
        }
        tools.style(el.dom, {
          transform: '\n          translate3d(' +
          el.x * 100 + '%, ' + (y * 100 + el.y2 * 100) + '%, 0)\n         ' });


      });
    } }, { key: 'updateScore', value: function updateScore(
    action, value) {
      state.score += action ? config.score[0] + state.bonus * config.score[0] : config.score[1];
      if (typeof value !== 'undefined') state.score = value;
      var oldScore = ui.score.querySelectorAll('.score__item');
      oldScore = oldScore.length ? oldScore[oldScore.length - 1] : undefined;
      var oldDigits = oldScore ? [].concat(_toConsumableArray(oldScore.children)) : 'undefined';

      var stringScore = [].concat(_toConsumableArray('' + state.score));
      var digits = stringScore.reduce(function (acc, value) {
        return acc + ('\n          <div class="score__digit">' +
        value + '</div>\n       ');

      }, '');
      var score = '\n        <div class="score__item">\n           ' +

      digits + '\n        </div>\n     ';


      ui.score.insertAdjacentHTML('beforeend', score);
      var delay = 50;
      setTimeout(function () {
        var items = ui.score.querySelectorAll('.score__item');
        var newDigits = [].concat(_toConsumableArray(items[items.length - 1].children));
        newDigits.reverse().forEach(function (el, i) {
          setTimeout(function () {
            el.classList.add('active');
          }, (i + 1) * delay);
        });
        if (oldDigits) {
          oldDigits.reverse().forEach(function (el, i) {
            setTimeout(function () {
              el.classList.add('inactive');
              if (i === oldDigits.length - 1) ui.score.removeChild(oldScore);
            }, (i + 1) *
            delay);
          });
        }
      }, 5);
    } }, { key: 'onSlideRemoval', value: function onSlideRemoval(
    slide) {
      this.slides.excluded.pop();
      this.slides.prev = slide;
    } }, { key: 'tick', value: function tick()
    {var _this5 = this;
      var tick = function tick() {
        _this5.updateTimer();
      };
      this.tickInterval = setInterval(tick, 1000);
    } }, { key: 'updateTimer', value: function updateTimer(
    value) {
      if (typeof value !== 'undefined') {
        ui.timer.innerText = value;
        return;
      }
      state.time--;
      ui.timer.innerText = state.time;
      if (state.time === 0) this.gameOver();
    } }, { key: 'loop', value: function loop()
    {var _this6 = this;
      var loop = function loop() {
        _this6.slideMove();
        _this6.raf = requestAnimationFrame(loop);
      };
      loop();
    } }]);return App;}();var


Slide = function () {
  function Slide(props) {_classCallCheck(this, Slide);var
    dom = props.dom,shape = props.shape,color = props.color;
    this.x = 0;
    this.y = 0;
    this.y2 = 0;
    this.excluded = false;
    this.dom = dom;
    this.color = color;
    this.shape = shape;
  }_createClass(Slide, [{ key: 'desctruct', value: function desctruct()
    {
      if (this.dom.parentNode) {
        this.dom.parentNode.removeChild(this.dom);
      }
    } }]);return Slide;}();


window.onload = function () {
  window.game = new App();
};