This does only one thing, and one thing only.

It exposes a reactive property `$online` to every component, which you can use like this:

```html
<div v-if="!$online"> 
	Opps! You are offline!
</div>
```

That's all!

How to install
```javascript
import VueOnlineProp from "vue-online-prop"
Vue.use(VueOnlineProp)
```