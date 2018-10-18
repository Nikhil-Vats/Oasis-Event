var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var Result = function Result(props) {
  return (
    React.createElement("div", { id: "result" },
      props.result === 'win' ?
      React.createElement("p", { className: "badge badge-pill badge-success" }, "You Won!") :

      React.createElement("p", { className: "badge badge-pill badge-danger" }, "You Lost!")));



};

var Button = function Button(props) {
  return (
    React.createElement("div", { className: "d-flex justify-content-center" },
      React.createElement("button", { id: "new_game", className: "btn btn-primary btn-sm", onClick: props.click }, "New Game")));


};

var Spaces = function Spaces(props) {
  var status = function status(x) {return props.visible.includes(x) ? 'col-sm-1 char-space' : 'col-sm-1 char-space hide-char';};
  return (
    React.createElement("div", { id: "word-letters", className: "row justify-content-center" },
      props.word === '' ? props.initial : props.word.map(function (el, i) {return (
          /[A-Z]/.test(el) ?
          React.createElement("div", { key: i, className: status(el) }, el) :

          React.createElement("div", { key: i, className: "mx-2" }, el));})));



};

var Category = function Category(props) {
  return (
    React.createElement("div", { id: "category" },
      props.category === '' ?
      React.createElement("p", { id: "cat-lbl", className: "badge badge-pill badge-danger" }, "Click New Game") :

      React.createElement("p", { id: "cat-lbl", className: "badge badge-pill badge-secondary" }, props.category)));



};

var Letters = function Letters(props) {
  var event = props.started ? !props.result.length ? props.guess : false : false;
  return (
    React.createElement("div", { id: "alphabet", onClick: event },
      props.keys && props.keys.map(function (el) {return (
          React.createElement("button", { id: el.id, className: el.class }, el.id));}),

      React.createElement("button", { id: "hint", className: "btn btn-info m-1" }, "?")));


};

var Gallow = function Gallow() {
  return (
    React.createElement("div", { id: "gallow" },
      React.createElement("div", { id: "pole" },
        React.createElement("div", { id: "noose" }),
        React.createElement("div", { id: "diagonal" }),
        React.createElement("div", { id: "base" }))));



};

var Stickman = function Stickman(props) {
  var status = function status(x) {return props.started ? props.parts.includes(x) ? 'showing' : 'hidden' : 'showing';};
  return (
    React.createElement("div", { id: "stick-figure" },
      React.createElement("svg", { height: "150", width: "150" },
        React.createElement("circle", { id: "head", className: status('head'), cx: "25", cy: "25", r: "10" }),
        React.createElement("line", { id: "torso", className: status('torso'), x1: "25", y1: "34", x2: "25", y2: "85" }),
        React.createElement("line", { id: "Larm", className: status('Larm'), x1: "0", y1: "70", x2: "25", y2: "40" }),
        React.createElement("line", { id: "Rarm", className: status('Rarm'), x1: "25", y1: "40", x2: "55", y2: "70" }),
        React.createElement("line", { id: "Lleg", className: status('Lleg'), x1: "25", y1: "85", x2: "0", y2: "120" }),
        React.createElement("line", { id: "Rleg", className: status('Rleg'), x1: "25", y1: "85", x2: "55", y2: "120" }))));



};

var Hangman = function Hangman(props) {
  return (
    React.createElement("div", { id: "hangman-figure" },
      React.createElement(Gallow, null),
      React.createElement(Stickman, { started: props.started, parts: props.stickman })));


};

var Hint = function Hint(props) {
  return (
    React.createElement("div", { id: "hint-div" },
      React.createElement("p", { id: "hintText", "class": "badge badge-pill badge-warning" }, props.hint)));


};var

App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this.state = {
      started: false,
      category: '',
      word: '',
      pool: '',
      guessRight: [],
      defSpaces: [],
      guessWrong: -1,
      stickman: [],
      result: '',
      hintsUsed: -1,
      hint: '' };

    _this.handleReset = _this.handleReset.bind(_this);
    _this.handleFetchWord = _this.handleFetchWord.bind(_this);
    _this.handleFetchHint = _this.handleFetchHint.bind(_this);
    _this.handleGuessRight = _this.handleGuessRight.bind(_this);
    _this.handleGuessWrong = _this.handleGuessWrong.bind(_this);
    _this.handleSpaces = _this.handleSpaces.bind(_this);
    _this.handleGuess = _this.handleGuess.bind(_this);
    _this.handleKeyPool = _this.handleKeyPool.bind(_this);
    _this.handleGameOver = _this.handleGameOver.bind(_this);
    _this.handleHint = _this.handleHint.bind(_this);return _this;
  }_createClass(App, [{ key: "componentDidMount", value: function componentDidMount()

    {
      var defSpaces = ['H', 'A', 'N', 'G', 'M', 'A', 'N'].map(function (el, i) {
        return React.createElement("div", { key: el + i, className: "col-sm-1 char-space" }, el);
      });

      var pool = this.handleKeyPool();

      this.setState({ defSpaces: defSpaces, pool: pool });
    } }, { key: "handleKeyPool", value: function handleKeyPool()

    {
      var pool = [];
      var val = 65;

      for (var i = 0; i < 26; i++) {
        pool.push({
          id: String.fromCharCode(val),
          class: 'btn btn-primary letter m-1 ' });

        val++;
      }

      return pool;
    } }, { key: "handleFetchWord", value: function handleFetchWord()

    {var _this2 = this;
      fetch("https://spotless-fridge.glitch.me/word").
      then(function (res) {return res.json();}).
      then(function (data) {return _this2.handleSpaces(data);});
    } }, { key: "handleSpaces", value: function handleSpaces(

    obj) {
      this.setState({
        word: obj.word.toUpperCase().split(''),
        category: obj.category });

    } }, { key: "handleFetchHint", value: function handleFetchHint()

    {var _this3 = this;
      var word = this.state.word.join('');
      var num = this.state.hintsUsed + 1;
      if (num > 2) {
        this.handleHint('All hints used...');
      } else {
        fetch("https://spotless-fridge.glitch.me/hint/" + word + "/" + num).
        then(function (res) {return res.json();}).
        then(function (data) {return _this3.handleHint(data, num);});
      }
    } }, { key: "handleHint", value: function handleHint(

    hint, num) {
      if (num === undefined) {
        this.setState({ hint: hint });
      } else {
        this.setState({
          hint: num + 1 + "/3 Hint: " + hint,
          hintsUsed: num });

      }
    } }, { key: "handleGuess", value: function handleGuess(

    e) {var _state =
      this.state,pool = _state.pool,word = _state.word;
      var guess = e.target.id;
      var index = guess.charCodeAt() - 65;

      if (guess.length === 1) {
        pool[index].class = "btn btn-primary letter m-1 no-click disabled";
        word.includes(guess) ? this.handleGuessRight(guess) : this.handleGuessWrong();
        this.setState({ pool: pool });
      } else if (e.target.id === 'hint') {
        this.handleFetchHint();
      }
    } }, { key: "handleGuessRight", value: function handleGuessRight(

    char) {var
      word = this.state.word;

      var guessRight = [].concat(_toConsumableArray(this.state.guessRight), [char]);
      var finished = function finished() {
        var lettersOnly = word.filter(function (char) {return (/[A-Z]/.test(char));});
        return lettersOnly.map(function (el) {return guessRight.includes(el);}).every(function (x) {return x === true;});
      };

      if (finished()) {
        this.handleGameOver(true);
      }

      this.setState({ guessRight: guessRight });
    } }, { key: "handleGuessWrong", value: function handleGuessWrong()

    {
      var index = this.state.guessWrong + 1;
      var parts = ['head', 'torso', 'Larm', 'Rarm', 'Lleg', 'Rleg'];
      var stickman = [].concat(_toConsumableArray(this.state.stickman), [parts[index]]);

      this.setState({
        guessWrong: index,
        stickman: stickman });


      if (index === parts.length) {
        this.handleGameOver(false);
      }
    } }, { key: "handleGameOver", value: function handleGameOver(

    win) {
      if (win) {
        this.setState({ result: 'win' });
      } else {
        this.setState({ result: 'lose' });
      }
    } }, { key: "handleReset", value: function handleReset()

    {
      this.setState({
        started: true,
        pool: this.handleKeyPool(),
        guessRight: [],
        guessWrong: -1,
        stickman: [],
        result: '',
        hintsUsed: -1,
        hint: '' });


      this.handleFetchWord();
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement("main", { className: "container-fluid small-wrap" },
          React.createElement(Button, { click: this.handleReset }),
          React.createElement(Hangman, { started: this.state.started, stickman: this.state.stickman }),
          this.state.result.length < 1 ?
          React.createElement(Category, { category: this.state.category }) :

          React.createElement(Result, { result: this.state.result }),

          React.createElement(Spaces, {
            initial: this.state.defSpaces,
            word: this.state.word,
            visible: this.state.guessRight }),

          React.createElement(Letters, {
            result: this.state.result,
            keys: this.state.pool,
            guess: this.handleGuess,
            started: this.state.started }),

          React.createElement(Hint, { hint: this.state.hint })));


    } }]);return App;}(React.Component);
;

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));