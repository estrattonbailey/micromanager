# WIP Binding Controller 

## Usage
This library caches event bindings by route, allowing you to drop bindings on route change to prevent double-binding. Also supports adding instances via `add()` that control their own bindings and expose a destory method. All events are added and managed using [Delegate](https://github.com/zenorocha/delegate) and are delegated to the body.
```javascript
import events from 'events.js' // no name for this yet

events.on('click', '.js-selector', e => {
  // do stuff
})

events.add(instanceOfLibrary) // should have a destroy method

events.getCache() // Object{} with routes > array of bound instances

events.clear('/') // clears all bindings on the home page
```

* * *
MIT
