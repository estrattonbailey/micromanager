# micromanager 
Route-managed client-side binding controller in ES6. **1.1kb gzipped.**

## Install 
```javascript
npm i micromanager --save
```

## Usage
```javascript
import router from 'some-router'
import micromanager from 'micromanager'

micromanager.on('click', '.js-selector', e => {
  // do stuff
})

events.add(instanceOfLibrary)

router.on('newRoute', route => {
  micromanager.drop(route)
})
```

Usage of `.on()` or `.add()` also returns the individual instance that was added to the micromanager cache.
```javascript
import flickity from 'flickity'

const slider = new flickity('#slider')

const sliderInstance = micromanager.add(slider)

console.log(sliderInstance) // entire flickity object

// Something happens

sliderInstance.destroy()
```

## API

### .on(event, selector, callback)
Add an event listener using event delegation via [delegate](https://github.com/zenorocha/delegate). See that documentation for more information.
```javascript
micromanager.on('click', '#selector', e => {
  console.log(e.target) // vanilla
  console.log(e.delegateTarget) // #selector clicked on
})
```

### .add(instance)
Add an instance of an object to micromanager at the current route. Useful for libraries that manage their own event bidnings. This object should have a `destroy` method that removes it's listeners and clears the instance.
```javascript
import flickity from 'flickity'

const slider = new flickity('#slider')

micromanager.add(slider)
```

### .getCache()
Returns an object containing nested route objects, each with an array of bindings managed by micromanager.
```javascript
console.log(micromanager.getCache())

/*
{
  '/': [
    boundObj,
    boundObj,
    boundObj
  ],
  '/products': [
    boundObj,
    boundObj
  ]
}
*/
```

## Dependencies
- [delegate:](https://github.com/zenorocha/delegate) Lightweight event delegation. by [@zenorocha](https://github.com/zenorocha)

## Related Projects 
- [operator.js](https://github.com/estrattonbailey/operator.js) An AJAX + routing library that transforms a normal site into a Single Page Application (SPA). by [@estrattonbailey](https://github.com/estrattonbailey)

MIT License - Would love to hear your thoughts! :)
