/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = function (_React$Component) {
	    _inherits(Header, _React$Component);

	    function Header() {
	        _classCallCheck(this, Header);

	        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	    }

	    _createClass(Header, [{
	        key: "render",
	        value: function render() {
	            var _this = this;
	            return React.createElement(
	                "header",
	                null,
	                React.createElement(
	                    "nav",
	                    null,
	                    React.createElement(
	                        "ul",
	                        { className: "nav navbar-top-links" },
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "button",
	                                { type: "button", onClick: this.handleWrite.bind(this), title: "\u5199", className: "btn btn-default" },
	                                React.createElement("span", { className: "glyphicon glyphicon-pencil" })
	                            )
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "button",
	                                { type: "button", onClick: this.handleSync.bind(this), title: "\u540C\u6B65", className: "btn btn-default" },
	                                React.createElement("span", { className: "glyphicon glyphicon-refresh" })
	                            )
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "button",
	                                { type: "button", onClick: this.handleClear.bind(this), title: "\u6E05\u7A7A", className: "btn btn-default" },
	                                React.createElement("span", { className: "glyphicon glyphicon-flash" })
	                            )
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "button",
	                                { type: "button", onClick: this.handleClear.bind(this), title: "\u5220\u9664", className: "btn btn-default" },
	                                React.createElement("span", { className: "glyphicon glyphicon-trash" })
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: "handleClear",
	        value: function handleClear(event) {
	            //暂使用比较low的方式
	            $('#markdown').val('');
	            $('#htmlArea div').empty();
	        }
	    }, {
	        key: "handleWrite",
	        value: function handleWrite(event) {
	            $('.sideinfo ul li').removeClass('active');
	            pubsub.publish('newarticle', true);
	            this.handleClear(event);
	        }
	    }, {
	        key: "handleSync",
	        value: function handleSync(event) {
	            var title = $('#htmlArea').find('h1').eq(0).text(),
	                _this = this,
	                category = '',
	                articleKey = '',
	                data;
	            if (title != '') {
	                category = $('.sidenav .active').text();
	                if (category == 0) {
	                    alert('必须选中分类');
	                    return false;
	                }
	                articleKey = $('.sideinfo .active').attr('data-key');
	                data = {
	                    title: title,
	                    time: articleKey,
	                    category: category,
	                    content: $('#markdown').val()
	                };
	                if (this.state && this.state.time) {
	                    data.time = this.state.time;
	                }
	                $.post('/api.php?action=sync', data, function (data) {
	                    _this.setState({ key: data });
	                    pubsub.publish('listchange', true);
	                });
	            } else {
	                alert('请输入正确格式的文档');
	            }
	        }
	    }]);

	    return Header;
	}(React.Component);

	var Category = function (_React$Component2) {
	    _inherits(Category, _React$Component2);

	    function Category() {
	        _classCallCheck(this, Category);

	        var _this3 = _possibleConstructorReturn(this, (Category.__proto__ || Object.getPrototypeOf(Category)).call(this));

	        _this3.state = {
	            category_id: '0',
	            article: []
	        };
	        return _this3;
	    }

	    _createClass(Category, [{
	        key: "componentWillMount",
	        value: function componentWillMount() {
	            var _this = this;
	            $.ajax({
	                url: '/categorys',
	                datatype: "json",
	                async: false,
	                type: 'get',
	                success: function success(data) {
	                    _this.setState({ value: data });
	                }
	            });

	            this.fetchArticle(this.state.category_id);
	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var _this = this;
	            pubsub.subscribe('listchange', function (topics, key) {
	                _this.fetchArticle(_this.state.category_id);
	            });

	            pubsub.subscribe('newarticle', function (topics, key) {
	                _this.state.article.unshift(React.createElement(
	                    "li",
	                    { "data-key": "", onClick: _this.articleChange.bind(_this) },
	                    " ss"
	                ));
	                _this.setState({
	                    article: _this.state.article
	                });
	            });
	        }
	    }, {
	        key: "handleChange",
	        value: function handleChange(event) {
	            $(event.target).addClass('active').siblings('li').removeClass('active');
	            this.fetchArticle(event.target.getAttribute('data-id'));
	        }
	    }, {
	        key: "articleChange",
	        value: function articleChange(event) {
	            var value = event.target.getAttribute('data-key'),
	                _this = this;
	            $(event.target).addClass('active').siblings('li').removeClass('active');
	            if (value != 0) {
	                $.get('/api.php?action=markdown&key=' + value, function (data) {
	                    $('#markdown').val(data.content);
	                    localStorage.articlekey = value;
	                    pubsub.publish('articlechange', data.content);
	                });
	            } else {
	                $('#markdown').val("#Hello");
	                pubsub.publish('articlechange', "#Hello");
	            }
	        }
	    }, {
	        key: "fetchArticle",
	        value: function fetchArticle(category_id) {
	            var _this = this;
	            $.ajax({
	                url: '/categorys/' + category_id + '/articles',
	                datatype: "json",
	                async: false,
	                type: 'get',
	                success: function success(data) {
	                    var items = [];
	                    console.log(typeof data === "undefined" ? "undefined" : _typeof(data));
	                    data.forEach(function (value) {
	                        items.push(React.createElement(
	                            "li",
	                            { "data-key": value['key'], onClick: _this.articleChange.bind(_this) },
	                            value['title']
	                        ));
	                    });
	                    _this.setState({ article: items.sort(function (a, b) {
	                            return b - a;
	                        }) });
	                }
	            });
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate() {
	            $('.sideinfo li:first').addClass('active');
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this = this;
	            return React.createElement(
	                "aside",
	                null,
	                React.createElement(
	                    "nav",
	                    { className: "sidenav" },
	                    React.createElement(
	                        "ul",
	                        null,
	                        React.createElement(
	                            "li",
	                            { className: "title" },
	                            "\u5206\u7C7B"
	                        ),
	                        React.createElement(
	                            "li",
	                            { className: "active", onClick: _this.handleChange.bind(_this), "data-id": "0" },
	                            "\u6240\u6709"
	                        ),
	                        _this.state.value.map(function (option, i) {
	                            return React.createElement(
	                                "li",
	                                { onClick: _this.handleChange.bind(_this), "data-id": option },
	                                option
	                            );
	                        })
	                    )
	                ),
	                React.createElement(
	                    "nav",
	                    { className: "sideinfo" },
	                    React.createElement(
	                        "ul",
	                        null,
	                        _this.state.article
	                    )
	                )
	            );
	        }
	    }]);

	    return Category;
	}(React.Component);

	var Markdown = function (_React$Component3) {
	    _inherits(Markdown, _React$Component3);

	    function Markdown() {
	        _classCallCheck(this, Markdown);

	        var _this4 = _possibleConstructorReturn(this, (Markdown.__proto__ || Object.getPrototypeOf(Markdown)).call(this));

	        _this4.state = {
	            converter: new showdown.Converter(),
	            value: "Hello, World!\n===\n---\n# Write "
	        };
	        return _this4;
	    }

	    _createClass(Markdown, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var _this = this;
	            // 订阅ScoreItem的删除事件
	            pubsub.subscribe('articlechange', function (topics, content) {
	                _this.setState({ value: content });
	            });
	        }
	    }, {
	        key: "change",
	        value: function change(topics, content) {
	            this.setState({ value: content });
	        }
	    }, {
	        key: "createMarkup",
	        value: function createMarkup() {
	            return {
	                __html: this.state.converter.makeHtml(this.state.value)
	            };
	        }
	    }, {
	        key: "handleChange",
	        value: function handleChange(event) {
	            localStorage.articlecontent = event.target.value;
	            this.setState({ value: event.target.value });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { className: "markdown-container" },
	                React.createElement("textarea", { type: "text", className: "markdown-write", defaultValue: this.state.value, onChange: this.handleChange.bind(this), id: "markdown" }),
	                React.createElement(
	                    "div",
	                    { id: "htmlArea", className: "markdown-previewer" },
	                    React.createElement("div", { dangerouslySetInnerHTML: this.createMarkup() })
	                )
	            );
	        }
	    }]);

	    return Markdown;
	}(React.Component);

	var App = function (_React$Component4) {
	    _inherits(App, _React$Component4);

	    function App() {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	    }

	    _createClass(App, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { className: "container-fluid" },
	                React.createElement(Header, { time: "2016" }),
	                React.createElement(Category, null),
	                React.createElement(Markdown, null)
	            );
	        }
	    }]);

	    return App;
	}(React.Component);

	var div = document.createElement('div');
	div.id = 'app';
	document.body.appendChild(div);
	ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

/***/ }
/******/ ]);