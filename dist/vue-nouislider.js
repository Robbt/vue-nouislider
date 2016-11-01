'use strict';

/**
 * Vue.js component for http://refreshless.com/nouislider/
 * Created by codeninja
 * Improved by antongorodezkiy
 */

var noUiSlider = require('nouislider');

Vue.component('nouislider', {
  props: ['sliderStartValue', 'sliderEndValue', 'sliderRangeTooltip', 'sliderSingleTooltip', 'sliderMin', 'sliderAvg', 'sliderMax', 'sliderStep', 'sliderLowLimit', 'sliderHighLimit', 'showTooltips', 'sliderDirection'],

  template: '<div :id="sliderId"></div>',

  data: function data() {
    return {
      sliderId: this.uuid4(),
      slider: null,
      settings: {},
      isInnerChange: false
    };
  },


  watch: {
    sliderLowLimit: function sliderLowLimit(val, oldVal) {
      var _this = this;

      Vue.nextTick(function () {
        _this.updateSlider();
      });
    },
    sliderHighLimit: function sliderHighLimit(val, oldVal) {
      var _this2 = this;

      Vue.nextTick(function () {
        _this2.updateSlider();
      });
    },
    sliderStartValue: function sliderStartValue(val, oldVal) {
      var _this3 = this;

      Vue.nextTick(function () {
        _this3.updateSlider();
      });
    },
    sliderEndValue: function sliderEndValue(val, oldVal) {
      var _this4 = this;

      Vue.nextTick(function () {
        _this4.updateSlider();
      });
    }
  },

  ready: function ready() {
    this.slider = document.getElementById(this.sliderId);

    var range = {};

    if (typeof this.sliderMin != 'undefined' && this.sliderMin !== '' && this.sliderMin !== null) {
      range = {
        'min': this.sliderLowLimit,
        '15%': this.sliderMin,
        '50%': this.sliderAvg,
        '90%': this.sliderMax,
        'max': this.sliderHighLimit
      };
    } else {
      range = {
        'min': this.sliderLowLimit,
        'max': this.sliderHighLimit
      };
    }

    this.settings = {
      start: typeof this.sliderStartValue != 'undefined' && this.sliderStartValue !== null && this.sliderStartValue !== '' ? [this.sliderStartValue, this.sliderEndValue] : [this.sliderEndValue],
      step: this.sliderStep,
      behaviour: 'snap',
      animate: false,
      direction: typeof this.sliderDirection != 'undefined' && this.sliderDirection ? this.sliderDirection : 'ltr',
      range: range
    };

    this.updateSlider();
  },

  methods: {
    updateSlider: function updateSlider() {
      var _this5 = this;

      if (!this.isInnerChange) {
        this.isInnerChange = true;

        if (typeof this.sliderStartValue != 'undefined' && this.sliderStartValue !== null && this.sliderStartValue !== '') {
          this.settings.connect = true;
          this.settings.start = [this.sliderStartValue, this.sliderEndValue];
        } else {
          this.settings.connect = false;
          this.settings.start = [this.sliderEndValue];
        }

        if (typeof this.sliderMin != 'undefined' && this.sliderMin !== '' && this.sliderMin !== null) {
          this.settings.range = {
            'min': this.sliderLowLimit,
            '15%': this.sliderMin,
            '50%': this.sliderAvg,
            '90%': this.sliderMax,
            'max': this.sliderHighLimit
          };
        } else {
          this.settings.range = {
            'min': this.sliderLowLimit,
            'max': this.sliderHighLimit
          };
        }

        if (this.slider.noUiSlider) {
          this.slider.noUiSlider.destroy();
        }

        noUiSlider.create(this.slider, this.settings);
        this.slider.noUiSlider.on('update', this.onSliderUpdate);

        // tooltips
        var tipHandles = $('.noUi-handle:last', this.$el);

        if (tipHandles.size()) {
          tipHandles.append('<div id="js-price-slider-tooltip" class="tooltip"></div>');
        }

        // hide for empty field
        if (!this.sliderEndValue) {
          $('.noUi-handle', this.$el).hide();
        }

        Vue.nextTick(function () {
          _this5.isInnerChange = false;
        });
      }

      if (typeof this.showTooltips != 'undefined' && this.showTooltips) {
        // range
        if (this.sliderStartValue) {
          $(this.$el).parent().addClass('priceRange');

          if (typeof this.sliderRangeTooltip != 'undefined' && this.sliderRangeTooltip) {
            $("#js-price-slider-tooltip", this.$el).html(this.sliderRangeTooltip);
          }
        }

        // single
        else {
            $(this.$el).parent().removeClass('priceRange');

            if (typeof this.sliderSingleTooltip != 'undefined' && this.sliderSingleTooltip) {
              $("#js-price-slider-tooltip", this.$el).html(this.sliderSingleTooltip);
            }
          }
      }
    },
    onSliderUpdate: function onSliderUpdate(values, handle) {
      var _this6 = this;

      if (!this.isInnerChange) {
        this.isInnerChange = true;

        if (this.sliderStartValue) {
          if (handle == 0) {
            this.sliderStartValue = values[handle];
          } else {
            this.sliderEndValue = values[handle];
          }
        } else {
          this.sliderEndValue = values[handle];
        }
      }

      Vue.nextTick(function () {
        _this6.isInnerChange = false;
      });
    },
    uuid4: function uuid4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    }
  }
});