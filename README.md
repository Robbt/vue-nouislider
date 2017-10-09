vue2-nouislider
==============

Simple Vue.js component for [nouislider](http://refreshless.com/nouislider/) plugin.

Forked from https://github.com/poteralski/vue-nouislider
And then Forked from https://github.com/antongorodezkiy/vue-nouislider
and Updated to work with Vue 2.0 as .vue file vs. js include

### Usage:

```javascript
const
  nouisliderComponent = require('vue-nouislider-component');

Vue.component('acme-component', {
  components: {
    nouisliderComponent
  }
});



```
or with Webpack in your main.js file
```javascript
import nouislider from './components/NouiSlider'

Vue.component('nouislider', nouislider)



```


*Range slider*

```html
<nouislider
	:show-tooltips="false"
	:slider-low-limit="0"
	:slider-start-value.sync="startValue"
	:slider-end-value.sync="endValue"
	:slider-high-limit="10"
	:slider-step="1"></nouislider>
```

*Single slider*

```html
<nouislider
	:show-tooltips="false"
	:slider-low-limit="0"
	:slider-end-value.sync="endValue"
	:slider-high-limit="10"
	:slider-step="1"></nouislider>
```

*Single slider with tooltip*

```html
<nouislider
	:show-tooltips="false"
	:slider-low-limit="0"
	:slider-end-value.sync="endValue"
	:slider-high-limit="10"
	:slider-step="1"
	:slider-single-tooltip="singleSliderTooltip"></nouislider>
```

*Single slider reversed direction*

```html
<nouislider
	:show-tooltips="false"
	:slider-low-limit="0"
	:slider-end-value.sync="endValue"
	:slider-high-limit="10"
	:slider-step="1"
	slider-direction="rtl"></nouislider>
```
