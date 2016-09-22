/**
 * Vue.js component for http://refreshless.com/nouislider/
 * Created by codeninja
 * Improved by antongorodezkiy
 */

(function (Vue) {

const
  noUiSlider = require('nouislider');

Vue.component('nouislider', {
  props: [
    'sliderStartValue',
    'sliderEndValue',
    'sliderMin',
    'sliderAvg',
    'sliderMax',
    'sliderStep',
    'sliderLowLimit',
    'sliderHighLimit',
    'showTooltips'
  ],
  
  template: '<div :id="sliderId"></div>',
  
  data() {
    return {
      sliderId: this.uuid4(),
      slider: null,
      settings: {},
      isInnerChange: false
    }
  },
  
  watch: {
    sliderLowLimit(val, oldVal) {
      Vue.nextTick(() => {
        this.updateSlider();
      });
    },
    
    sliderHighLimit(val, oldVal) {
      Vue.nextTick(() => {
        this.updateSlider();
      });
    },
    
    sliderStartValue(val, oldVal) {
      Vue.nextTick(() => {
        this.updateSlider();
      });
    },
    
    sliderEndValue(val, oldVal) {
      Vue.nextTick(() => {
        this.updateSlider();
      });
    }
  },
  
  ready() {
    this.slider = document.getElementById(this.sliderId);
  
    let range = {};
    
    if (
      typeof this.sliderMin != 'undefined'
      && this.sliderMin !== ''
      && this.sliderMin !== null
    ) {
      range = {
        'min': this.sliderLowLimit,
        '15%': this.sliderMin,
        '50%': this.sliderAvg,
        '90%': this.sliderMax,
        'max': this.sliderHighLimit
      };
    }
    else {
      range = {
        'min': this.sliderLowLimit,
        'max': this.sliderHighLimit
      };
    }
  
    this.settings = {
      start: (this.sliderStartValue !== null && this.sliderStartValue !== '')
        ? [this.sliderStartValue, this.sliderEndValue]
        : [this.sliderEndValue],
      step: this.sliderStep,
      behaviour: 'snap',
      animate: false,
      range
    };
    
    this.updateSlider();
  },
  methods: {
    
    updateSlider() {
      if (!this.isInnerChange) {
        this.isInnerChange = true;
        
        if (this.sliderStartValue !== null && this.sliderStartValue !== '') {
          this.settings.connect = true;
          this.settings.start = [this.sliderStartValue, this.sliderEndValue];
        }
        else {
          this.settings.connect = false;
          this.settings.start = [this.sliderEndValue];
        }
        
        if (
          typeof this.sliderMin != 'undefined'
          && this.sliderMin !== ''
          && this.sliderMin !== null
        ) {
          this.settings.range = {
            'min': this.sliderLowLimit,
            '15%': this.sliderMin,
            '50%': this.sliderAvg,
            '90%': this.sliderMax,
            'max': this.sliderHighLimit
          };
        }
        else {
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
          let tipHandles = $('.noUi-handle:last', this.$el);
            
          if (tipHandles.size()) {
            tipHandles.append('<div id="js-price-slider-tooltip" class="tooltip"></div>');
          }
        
        // hide for empty field
          if (!this.sliderEndValue) {
            $('.noUi-handle', this.$el).hide();
          }
        
        Vue.nextTick(() => {
          this.isInnerChange = false;
        });
      }
      
      if (this.showTooltips) {
        // range
        if (this.sliderStartValue) {
          $(this.$el).parent().addClass('priceRange');
          
          $("#js-price-slider-tooltip", this.$el).html(
            '<div class="sharketPin"></div>' +
            '<strong class="tt-u">' + Sharket.app.t('Your Price Range') + '</strong>' +
            '<span>$' + this.sliderStartValue + ' - $' + this.sliderEndValue + '</span>'
          );
        }
        
        // single
        else {
          $(this.$el).parent().removeClass('priceRange');
          
          $("#js-price-slider-tooltip", this.$el).html(
            '<div class="sharketPin"></div>' +
            '<strong>' + Sharket.app.t('Asking') + '</strong>' +
            '<span>$' + this.sliderEndValue + '</span>'
          );
        }
      }
    },
    
    onSliderUpdate(values, handle) {
      if (!this.isInnerChange) {
        this.isInnerChange = true;
        
        if (this.sliderStartValue) {
          if (handle == 0) {
            this.sliderStartValue = values[handle];
          }
          else {
            this.sliderEndValue = values[handle];
          }
        }
        else {
          this.sliderEndValue = values[handle];
        }
      }
      
      Vue.nextTick(() => {
        this.isInnerChange = false;
      });
    },
    
    uuid4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
  }
});

})(window.Vue);
