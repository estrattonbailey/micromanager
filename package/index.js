let types = {}

let __cache = {}

function log (level, msg, ...args) {
  console[level]('⚙️ micromanager -', msg, ...args)
}

export function init (t) {
  types = t
}

export function mount () {
  for (let type in types) {
    const attr = 'data-' + type
    const nodes = [].slice.call(document.querySelectorAll(`[${attr}]`))
    const path = types[type].replace(/^\/|\/$/, '')

    for (let i = 0; i < nodes.length; i++) {
      const name = nodes[i].getAttribute(attr)

      try {
        const instance = require(
          'micromanagerRoot' + '/' + path + '/' + name + '.js'
        ).default(nodes[i])

        nodes[i].removeAttribute(attr)

        if (instance) {
          this.cache.set(instance.displayName || name, instance)
        }
      } catch (e) {
        log('error', `${name} threw an error\n\n`, e)
      }
    }
  }
}

export function unmount () {
  for (let key in __cache) {
    const instance = __cache[key]
    if (instance.unmount) {
      instance.unmount()
      delete __cache[key]
    }
  }
}

export const cache = {
  set (id, instance) {
    if (__cache[id]) log('warn', `a duplicate key ${id} was found in the cache. This instance will be overwritten.`)
    __cache[id] = instance
  },
  get (id) {
    try {
      return __cache[id]
    } catch (e) {
      log('warn', `can't find ${id} in the cache`, e)
      return null
    }
  },
  dump () {
    return __cache
  }
}
