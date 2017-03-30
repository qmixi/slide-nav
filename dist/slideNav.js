/*
 * slide-nav 1.0.1
 * ES6 Vanilla.js navigation plugin to simple use on one-page websites.
 * https://github.com/qmixi/slide-nav
 *
 * Copyright (C) 2017 - A project by Piotr Kumorek
 * Released under the MIT license.
*/

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SlideNav = function () {
	function SlideNav(options) {
		_classCallCheck(this, SlideNav);

		//default values
		if (!options) var options = {};
		this.activeClass = options.activeClass || 'active';
		this.toggleButtonSelector = options.toggleButtonSelector || false;
		this.toggleBoxSelector = options.toggleBoxSelector || false;
		this.speed = options.speed > 0 ? options.speed : 70;
		this.hideAfterSelect = options.hideBoxAfterSelect || true;
		this.changeHash = options.changeHash || false;
		this.navBoxToggleClass = options.navBoxToggleClass || false;

		//initialize
		this.init();
	}

	_createClass(SlideNav, [{
		key: 'init',
		value: function init() {
			//scrollDoc
			this.scrollDoc = document.scrollingElement || document.documentElement;

			this.getElements();
			this.observe();
			this.setActiveAnchor();
		}
	}, {
		key: 'getElements',
		value: function getElements() {
			this.toggleButton = document.querySelector(this.toggleButtonSelector);
			if (this.toggleButton) {
				this.opened = false;
			}
			this.toggleBoxes = document.querySelectorAll(this.toggleBoxSelector);
			this.navAnchors = document.querySelectorAll('a:not([target="_blank"])');
		}
	}, {
		key: 'observe',
		value: function observe() {
			var _this = this;

			//blur navBox
			window.addEventListener("click", function (e) {
				if (_this.opened && !_this.isClosestElement(e.target, _this.toggleButton) && !_this.isBoxNavTarget(e.target)) {
					_this.hideNavBox();
				}
			});
			// toggle button
			if (this.toggleButton) {
				this.toggleButton.addEventListener("click", function (e) {
					setTimeout(function () {
						_this.opened ? _this.hideNavBox() : _this.showNavBox();
					});
				});
			};

			// anchors
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.navAnchors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var anchor = _step.value;

					anchor.addEventListener("click", function (e) {
						e.preventDefault();
						var linkHash = _this.getHash(e.currentTarget.href);
						if (!_this.goToSection(linkHash) && e.currentTarget.href) _this.goToUrl(e.currentTarget.href);
					});
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			;
			// scroll
			window.addEventListener("scroll", function () {
				_this.setActiveAnchor();
			});
		}
	}, {
		key: 'setActiveAnchor',
		value: function setActiveAnchor() {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.navAnchors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var anchor = _step2.value;

					var linkHash = this.getHash(anchor.href),
					    section = this.getSection(linkHash),
					    offset = this.scrollDoc.scrollTop,
					    scrollHeight = this.scrollDoc.scrollHeight;

					if (section && (section.offsetTop <= offset && section.offsetTop + section.offsetHeight > offset || offset + window.innerHeight == scrollHeight)) {
						var _iteratorNormalCompletion3 = true;
						var _didIteratorError3 = false;
						var _iteratorError3 = undefined;

						try {
							for (var _iterator3 = this.navAnchors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
								var link = _step3.value;

								if (link.href != anchor.href) link.classList.remove('active');
							}
						} catch (err) {
							_didIteratorError3 = true;
							_iteratorError3 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion3 && _iterator3.return) {
									_iterator3.return();
								}
							} finally {
								if (_didIteratorError3) {
									throw _iteratorError3;
								}
							}
						}

						anchor.classList.add('active');
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: 'goToSection',
		value: function goToSection(linkHash) {
			var section = this.getSection(linkHash);
			if (section) {
				var offsetTop = section.offsetTop;
				this.scrollTo(offsetTop, this.speed);
				if (this.hideAfterSelect) this.hideNavBox();
				if (this.changeHash) {
					history.pushState({}, null, "#" + linkHash);
				}
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: 'scrollTo',
		value: function scrollTo(destOffset, duration) {
			var _this2 = this;

			var diffOffset = destOffset - this.scrollDoc.scrollTop,
			    partDist = diffOffset / duration * 1;

			if (duration <= 0) return;
			setTimeout(function () {
				_this2.scrollDoc.scrollTop = _this2.scrollDoc.scrollTop + partDist;
				if (_this2.scrollDoc.scrollTop == destOffset) return;
				_this2.scrollTo(destOffset, duration - 1);
			}, 1);
		}
	}, {
		key: 'goToUrl',
		value: function goToUrl(url) {
			return window.location = url;
		}
	}, {
		key: 'getSection',
		value: function getSection(linkHash) {
			if (linkHash) {
				var id = "#" + linkHash;
				return document.querySelector(id);
			}
			return false;
		}
	}, {
		key: 'getHash',
		value: function getHash(href) {
			return href.split('#')[1];
		}
	}, {
		key: 'isBoxNavTarget',
		value: function isBoxNavTarget(target) {
			var isTarget = false;
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = this.toggleBoxes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var box = _step4.value;

					if (this.isClosestElement(target, box)) isTarget = true;
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			return isTarget;
		}
	}, {
		key: 'isClosestElement',
		value: function isClosestElement(target, element) {
			while (element != target) {
				target = target.parentNode;
				if (!target) return false;
			}
			return true;
		}
	}, {
		key: 'hideNavBox',
		value: function hideNavBox() {
			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = this.toggleBoxes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var box = _step5.value;

					if (this.navBoxToggleClass) {
						box.classList.remove(this.navBoxToggleClass);
					} else {
						box.style.display = 'none';
					}
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}

			this.opened = false;
		}
	}, {
		key: 'showNavBox',
		value: function showNavBox() {
			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;

			try {
				for (var _iterator6 = this.toggleBoxes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
					var box = _step6.value;

					if (this.navBoxToggleClass) {
						box.classList.add(this.navBoxToggleClass);
					} else {
						box.style.display = 'block';
					}
				}
			} catch (err) {
				_didIteratorError6 = true;
				_iteratorError6 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion6 && _iterator6.return) {
						_iterator6.return();
					}
				} finally {
					if (_didIteratorError6) {
						throw _iteratorError6;
					}
				}
			}

			this.opened = true;
		}
	}]);

	return SlideNav;
}();