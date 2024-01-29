let currentEffect = null;

class YoutubeChannel {
  subscribers;

  constructor(value) {
    this.subscribers = new Set();
  }

  subscribe() {
    if (currentEffect) {
      this.subscribers.add(currentEffect);
    }
  }

  notify() {
    this.subscribers.forEach((subscribe) => {
      subscribe();
    });
  }
}

function ref(newSubscription) {
  return new YoutubeChannel(newSubscription);
}

function watchEffect(callback) {
  currentEffect = callback;
  callback();
  currentEffect = null;
}

class ComputedRef {
  constructor(fn) {
    this._value = new YoutubeChannel()
    this._fn = fn

    watchEffect(() => {
      this._value.notify()
    })
  }

  get value() {
    this._value.subscribe()
    return this._fn()
  }
}

let youtubeMap = new WeakMap();

function getYoutubeChannel(target, key) {
  let youtubeForTarget = youtubeMap.get(target)

  if (!youtubeForTarget) {
    youtubeForTarget = new Map()
    youtubeForTarget.set(target, youtubeForTarget)
  }

  let dependency = youtubeForTarget.get(key)

  if (!dependency) {
    dependency = new YoutubeChannel()
    youtubeForTarget.set(key, dependency)
  }

  return dependency
}

function reactive(raw) {
  return new Proxy(raw, {
    get(target, key, receiver) {
      const youtubeChannel = getYoutubeChannel(target, key)

      youtubeChannel.subscribe()

      return Reflect.get(target, key, receiver)
    },

    set(target, key, value, receiver) {
      const youtubeChannel = getYoutubeChannel(target, key)

      const result = Reflect.set(target, key, value, receiver)

      youtubeChannel.notify()

      return result
    }
  })
}

function computed(fn) {
  return new ComputedRef(fn)
}

/**
 * ...................Usage
 */

const price = ref(2)

const priceFormatted = computed(() => price.value + '$')

watchEffect(() => {
  console.log(priceFormatted.value);
})

price.value++

function h(tag, props, children) {
  const el = document.createElement(tag);

  if (props) {
    Object.keys(props).forEach((key) => {
      const value = props[key]

      el.setAtttribute(key, value)
    })
  }

  if (typeof children === "string") { 
    el.textContent = children
  } else if (Array.isArray(children)) {
    children.forEach(child => {
      if (typeof child === "string") {
        el.textContent += child
      } else {
        const childEL = el()

        el.appendChild(childEL)
      }
    })
  }

  return el
}

const VNode = () => h('div', null, "Hello")
