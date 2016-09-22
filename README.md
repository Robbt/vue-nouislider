vue-nouislider
==============

Simple Vue.js component for [nouislider](http://refreshless.com/nouislider/) plugin.

Forked from https://github.com/poteralski/vue-nouislider

### Usage:

```javascript
const
  nouisliderComponent = require('vue-nouislider');

Vue.component('acme-component', {
  components: {
    nouisliderComponent
  }
});
```

```html
<nouislider
	:show-tooltips="false"
	:slider-low-limit="minPrice"
	:slider-start-value.sync="fromPrice"
	:slider-end-value.sync="toPrice"
	:slider-high-limit="maxPrice"
	:slider-step="1"></nouislider>
```

