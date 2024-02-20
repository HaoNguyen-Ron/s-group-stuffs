let currentEffect = null;

class YoutubeChannel {
  subscribers;

  constructor() {
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

function ref(value) {
  const channel = new YoutubeChannel();
  const reactiveValue = reactive({ value });

  Object.defineProperty(reactiveValue, 'subscribe', {
    value: () => channel.subscribe(),
  });

  return reactiveValue;
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

function h(tag, props, children) {
  if (typeof props === "string") {
    children = props
    props = null
  }
  return {
    tag,
    props,
    children
  }
}

/* 
A) props ? <Component props={props} /> 
  => <div class='abc' style='color:red ; font-size:14px' /> (class and style are div 's props)
  => we can access style by: document.querySelector('div').class or .style

B) children ? <div>abc</div> (abc is the children of 'div', which can includes many orther tab like p, div, section, ...)
  e.g: <div>
        the child
        <p>also the second child</p>
      </div>
*/

/**
 * Usage func to create a tab of component
 */
function p(tag, props, children) {
  if (typeof props === "string") {
    children = props
    props = null
  }
  return {
    tag,
    props,
    children
  }
}

const defineComponent = (options) => {
  if (!(options.render)) {
    throw new Error('It just WRONG !!!!')
  }

  return {
    data: reactive(options.data),
    render: options.render
  }
}

const Component = defineComponent({
  data: {
    msg: 'Hello world',
    color: 'red',
    listHehe: ['Hehe']
  },

  render() {
    return h('div',
      {
        style: 'color:red'
      },
      [
        h(
          'div',
          null,
          'Hello World'
        ),

        p(
          'p',
          {
            style: `color: ${this.data.color}`
          },
          'nothing here'
        )
      ])

  }
})

function mount(vnode, parentElement) {
  const el = document.createElement(vnode.tag);

  vnode.$el = el;

  //check props(or attribute (key in general) in Element)
  if (vnode.props) {
    Object.keys(vnode.props).forEach((attribute) => {
      const value = vnode.props[attribute];

      if (attribute.startsWith('on')) {
        el.addEventListener(attribute.toLowerCase().replace(/^on/, ''), value);

      } else {
        el.setAttribute(attribute, value);
      }
      // if (typeof value === 'string') {
      //   el.setAttribute(attribute, value);
      // }

      if (attribute === 'style') {
        if (typeof value === 'object' && value) {
          Object.keys(value).forEach(key => {
            const val = value[key]
            el.style[key] = val
          })
        }
      }

      if (attribute === 'class') {
        if (typeof value === 'string') {
          el.setAttribute(key, value)
        }
        else if (Array.isArray(value)) {
          value.forEach(item => {
            if (typeof item === 'string') {
              el.classList.add(item)
            } else if (typeof item === 'object' && item) {
              Object.keys(item).forEach(k => {
                if (item[k]) {
                  el.classList.add(k)
                }
              })
            }
          })
        }
        else if (typeof value === 'object' && value) {
          Object.keys(value).forEach(k => {
            if (value[k]) {
              el.classList.add(k)
            }
          })
        }
      }
    })
  };

  //check children
  if (vnode.children && vnode.children.length > 0) {
    if (Array.isArray(vnode.children)) {
      vnode.children.forEach((child) => {
        if (typeof child === "string" || typeof child === 'number') {
          el.textContent += child;

        } else {
          const childEL = mount(child, el);

          el.appendChild(childEL);
        }
      });
    } else if (typeof vnode.children === 'object' && !Array.isArray(vnode.children) && vnode.children !== null) {
      Object.keys(vnode.children).forEach(k => {
        if (vnode.children[k]) {
          el.classList.add(k);
        }
      });
    } else {
      el.textContent = vnode.children;
    }
  }
  parentElement.appendChild(el)
  return el;
}

function createApp(options) {
  let isMounted = false
  let oldNode = null

  watchEffect(() => {
    if (!isMounted) {
      oldNode = options.component.render()
      mount(oldNode, document.querySelector(options.id))
      isMounted = true
    } else {
      const newNode = options.component.render()
      patch(oldNode, newNode)

    }
  })

};

/**
 * ---------------------Patch
 */
function patch(oldDom, newDom) {
  const el = oldDom.$el
  if (oldDom.tag === newDom.tag) {
    // check props
    const oldProps = oldDom.props
    const newProps = newDom.props

    newProps && Object.keys(newProps).forEach(key => {
      const oldVal = oldProps[key]
      const newVal = newProps[key]

      if (oldVal !== newVal) {
        el.setAttribute(key, newVal)
      }
    })

    oldProps && Object.keys(oldProps).forEach(key => {
      if (!(key in newProps)) {
        oldDom.removeAttribute(key)
      }
    })

    // check children
    const oldChildren = oldDom.children
    const newChildren = newDom.children

    if (typeof newChildren === 'string' || typeof newChildren === 'number') {
      el.textContent = newChildren

    } else if (Array.isArray(newChildren)) {
      newChildren.forEach(child => {
        if (typeof child === "string") {

          if (Array.isArray(oldChildren)) {
            const commonLenght = Math.min(oldChildren.length, newChildren.length)

            for (let i = 0; i < commonLenght; i++) {
              patch(oldChildren[i], newChildren[i])
            }

            if (newChildren.length > oldChildren.length) {
              newChildren.slice(oldChildren.length).forEach(child => mount(child, el))
              oldDom.children.push(child)

            } else if (newChildren.length < oldChildren.length) {
              oldChildren.slice(newChildren.length).forEach(child => el.removeChild(child.$el))
              oldDom.children.pop()
            }
          }
        }
      })
    }
  } else {
    // replace completely
  }
};

createApp({
  id: '#app',
  component: Component
});

/**
 * ...................Usage
 */

// const price = ref(2)

// const priceFormatted = computed(() => price.value + '$')

// watchEffect(() => {
//   console.log(priceFormatted.value);
// })

// price.value++

