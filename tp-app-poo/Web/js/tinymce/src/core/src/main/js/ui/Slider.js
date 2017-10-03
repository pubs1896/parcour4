/**
 * Slider.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Slider control.
 *
 * @-x-less Slider.less
 * @class tinymce.ui.Slider
 * @extends tinymce.ui.Widget
 */
define(
    'tinymce.core.ui.Slider',
    [
        "tinymce.core.ui.Widget",
        "tinymce.core.ui.DragHelper",
        "tinymce.core.ui.DomUtils"
    ],
    function (Widget, DragHelper, DomUtils) {
        "use strict";

        function constrain(value, minVal, maxVal) {
            if (value < minVal) {
                value = minVal;
            }

            if (value > maxVal) {
                value = maxVal;
            }

            return value;
        }

        function setAriaProp(el, name, value) {
            el.setAttribute('aria-' + name, value);
        }

        function updateSliderHandle(ctrl, value) {
            var maxHandlePos, shortSizeName, sizeName, stylePosName, styleValue, handleEl;

            if (ctrl.settings.orientation == "v") {
                stylePosName = "top";
                sizeName = "height";
                shortSizeName = "h";
            } else {
                stylePosName = "left";
                sizeName = "width";
                shortSizeName = "w";
            }

            handleEl = ctrl.getEl('handle');
            maxHandlePos = (ctrl.layoutRect()[shortSizeName] || 100) - DomUtils.getSize(handleEl)[sizeName];

            styleValue = (maxHandlePos * ((value - ctrl._minValue) / (ctrl._maxValue - ctrl._minValue))) + 'px';
            handleEl.style[stylePosName] = styleValue;
            handleEl.style.height = ctrl.layoutRect().h + 'px';

            setAriaProp(handleEl, 'valuenow', value);
            setAriaProp(handleEl, 'valuetext', '' + ctrl.settings.previewFilter(value));
            setAriaProp(handleEl, 'valuemin', ctrl._minValue);
            setAriaProp(handleEl, 'valuemax', ctrl._maxValue);
        }

        return Widget.extend({
            init: function (settings) {
                var self = this;

                if (!settings.previewFilter) {
                    settings.previewFilter = function (value) {
                        return Math.round(value * 100) / 100.0;
                    };
                }

                self._super(settings);
                self.classes.add('slider');

                if (settings.orientation == "v") {
                    self.classes.add('vertical');
                }

                self._minValue = settings.minValue || 0;
                self._maxValue = settings.maxValue || 100;
                self._initValue = self.state.get('value');
            },

            renderHtml: function () {
                var self = this, id = self._id, prefix = self.classPrefix;

                return (
                    '<div id="' + id + '" class="' + self.classes + '">' +
                    '<div id="' + id + '-handle" class="' + prefix + 'slider-handle" role="slider" tabindex="-1"></div>' +
                    '</div>'
                );
            },

            reset: function () {
                this.value(this._initValue).repaint();
            },

            postRender: function () {
                var self = this, minValue, maxValue, screenCordName,
                    stylePosName, sizeName, shortSizeName;

                function toFraction(min, max, val) {
                    return (val + min) / (max - min);
                }

                function fromFraction(min, max, val) {
                    return (val * (max - min)) - min;
                }

                function handleKeyboard(minValue, maxValue) {
                    function alter(delta) {
                        var value;

                        value = self.value();
                        value = fromFraction(minValue, maxValue, toFraction(minValue, maxValue, value) + (delta * 0.05));
                        value = constrain(value, minValue, maxValue);

                        self.value(value);

                        self.fire('dragstart', {value: value});
                        self.fire('drag', {value: value});
                        self.fire('dragend', {value: value});
                    }

                    self.on('keydown', function (e) {
                        switch (e.keyCode) {
                            case 37:
                            case 38:
                                alter(-1);
                                break;

                            case 39:
                            case 40:
                                alter(1);
                                break;
                        }
                    });
                }

                function handleDrag(minValue, maxValue, handleEl) {
                    var startPos, startHandlePos, maxHandlePos, handlePos, value;

                    self._dragHelper = new DragHelper(self._id, {
                        handle: self._id + "-handle",

                        start: function (e) {
                            startPos = e[screenCordName];
                            startHandlePos = parseInt(self.getEl('handle').style[stylePosName], 10);
                            maxHandlePos = (self.layoutRect()[shortSizeName] || 100) - DomUtils.getSize(handleEl)[sizeName];
                            self.fire('dragstart', {value: value});
                        },

                        drag: function (e) {
                            var delta = e[screenCordName] - startPos;

                            handlePos = constrain(startHandlePos + delta, 0, maxHandlePos);
                            handleEl.style[stylePosName] = handlePos + 'px';

                            value = minValue + (handlePos / maxHandlePos) * (maxValue - minValue);
                            self.value(value);

                            self.tooltip().text('' + self.settings.previewFilter(value)).show().moveRel(handleEl, 'bc tc');

                            self.fire('drag', {value: value});
                        },

                        stop: function () {
                            self.tooltip().hide();
                            self.fire('dragend', {value: value});
                        }
                    });
                }

                minValue = self._minValue;
                maxValue = self._maxValue;

                if (self.settings.orientation == "v") {
                    screenCordName = "screenY";
                    stylePosName = "top";
                    sizeName = "height";
                    shortSizeName = "h";
                } else {
                    screenCordName = "screenX";
                    stylePosName = "left";
                    sizeName = "width";
                    shortSizeName = "w";
                }

                self._super();

                handleKeyboard(minValue, maxValue, self.getEl('handle'));
                handleDrag(minValue, maxValue, self.getEl('handle'));
            },

            repaint: function () {
                this._super();
                updateSliderHandle(this, this.value());
            },

            bindStates: function () {
                var self = this;

                self.state.on('change:value', function (e) {
                    updateSliderHandle(self, e.value);
                });

                return self._super();
            }
        });
    }
);