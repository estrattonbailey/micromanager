# micromanager
A simple script initiation pattern for modular websites. **~650bytes gzipped.**

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

<div style='padding:30px'></div>

## Usage
Micromanager provides a simple pattern to execute scripts on specific elements within your markup. It's a simple idea, but allows for easy componentization, re-use, and composition.
```javascript
// app/components/say-hello.js
export default div => {
  console.log(div) // <div id='hello'></div>
}
```
```html
<html>
  <head></head>
  <body>
    <div id='hello' data-component='say-hello'></div>
  </body>
</html>
```
```javascript
// index.js
import * as scripts from 'micromanager'

scripts.init({
  component: '/components'
})

scripts.mount()
```

Micromanager also gives you the ability to access a cache of each active instance in your site.
```javascript
// app/components/slideshow.js
import Flickity from 'flickity'

export default outer => {
  const slideshow = new Flickity(outer)

  return {
    displayName: 'slideshow1',
    unmount () {
      slideshow.destroy()
    },
    next () {
      slideshow.next()
    },
    previous () {
      slideshow.previous()
    }
  }
}
```
```html
<div id='slideshow' data-component='slideshow'>
  <div class='slide'></div>
  <div class='slide'></div>
  <div class='slide'></div>
</div>
```
This allows you to control individual instances using the methods you return.
```javascript
import * as scripts from 'micromanager'

const slideshow1 = scripts.cache.get('slideshow1')

slideshow1.next()
slideshow1.previous()
```
You can also leverage micromanager's API to unmount scripts between routes, if you're using some sort of PJAX library.
```javascript
import router from './router.js'
import * as scripts from 'micromanager'

router.on('newRoute', () => {
  scripts.umount() // unmount existing scripts
  scripts.mount() // mount new scripts on new page
})
```

<div style='padding:30px'></div>

## Install

### Create internal alias
Micromanager uses an internal alias to your scripts directory. You can do this a variety of ways. Below is an example using [`babel-plugin-modules-resolver`](https://github.com/tleunen/babel-plugin-module-resolver) and webpack.
```javascript
// .babelrc
{
  "plugins": [
    ['module-resolver', {
      'root': ['.'],
      'alias': {
        'micromanagerRoot': 'app' // or 'path/to/your/scripts'
      }
    }]
  ]
}
```
```javascript
// webpack.config.js
modules.exports = {
  // ...
  resolve: {
    alias: {
      micromanagerRoot: path.join(__dirname, 'app') // or 'path/to/your/scripts'
    }
  },
  // ...
}
```

### Configure modules
Micromanager needs to know how you structure your project, and also how you would like to call each script within your markup structure.
```javascript
// index.js
import * as scripts from 'micromanager'

scripts.init({
  component: '/components' // with alias, 'app/components'
})
```
Each `key` provided to `init()` becomes the `data-<attribute>` you define in your markup. These keys can be anything you want. Their value simply needs to point to the directory where you keep these specific scripts. This path is then joined to the `micromanager` alias during compilation so that when compiled it becomes `./app/components/*.js`.

### Mount modules
Once configured, create modules scripts according to the configuration you passed to `init()`, define them in your markup using data attributes, and then mount all the scripts on each page load.
```javascript
scripts.init({
  component: '/components',
  util: '/util'
})
```
```javascript
// app/components/slideshow.js
export default outer => {}
```
```javascript
// app/util/modal-trigger.js
export default outer => {}
```
```html
<div data-component='slideshow'>...</div>
<div data-util='modal-trigger'>...</div>
```
```javascript
scripts.mount()
```

<div style='padding:30px'></div>

## API
### `init(types)`
Configures the names and paths of your script types. Accepts a single object where the keys are the types of scripts, and the values are the paths to each script type's directory.
```javascript
import { init } from 'micromanager'

init({
  component: '/components',
  page: '/pages'
})
```

### `mount()`
Scans DOM for defined script types and executes them on the element on which they are defined.
```javascript
// app/components/say-hello.js
export default div => {
  console.log(div) // <div id='hello'></div>
}
```
```html
<div id='hello' data-component='say-hello'></div>
```

### `unmount()`
Iterates over internal cache of all active instances. If an `unmount` method is found on an instance, it will be fired, and the instance will be deleted from the cache. This is usually done between pages when using a PJAX library.
```javascript
import { unmount } from 'micromanager'

unmount()
```

### `cache.get(displayName)`
Returns the instance identified by `displayName`.
```javascript
import { cache } from 'micromanager'

cache.get('slideshow') // { unmount() {}, ... }
```
`displayName` defaults to the name of the script file i.e. `data-component='slideshow'` would default to `slideshow` unless you define a custom `displayName` on the return of the instance.
```javascript
// app/components/slideshow.js
export default outer => {
  return {
    displayName: 'slideshow1',
    unmount () {}
  }
}
```

### `cache.dump()`
Returns the entire instance cache.

<div style='padding:30px'></div>

## Related libraries
- [operator.js](https://github.com/estrattonbailey/operator.js) - A drop-in "PJAX" solution for fluid, smooth transitions between pages. 2.87kb gzipped. Zero stress. by [estrattonbailey](https://github.com/estrattonbailey).

## About this library
I first heard of this pattern from [ScottPolhemus](https://github.com/ScottPolhemus) while working at [Barrel](https://barrelny.com). It was further developed by [begodgrey](https://github.com/begodfrey), myself, and the rest of the team. Thanks y'all!

**MIT License**

