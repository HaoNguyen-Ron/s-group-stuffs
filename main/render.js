// let currentEffect = null;

// class YoutubeChannel {
//   subscribers;

//   constructor(value) {
//     this.subscribers = new Set();
//   }

//   subscribe() {
//     if (currentEffect) {
//       this.subscribers.add(currentEffect);
//     }
//   }

//   notify() {
//     this.subscribers.forEach((subscribe) => {
//       subscribe();
//     });
//   }
// }

// function ref(value) {
//   const channel = new YoutubeChannel();
//   const reactiveValue = reactive({ value });

//   Object.defineProperty(reactiveValue, 'subscribe', {
//     value: () => channel.subscribe(),
//   });

//   return reactiveValue;
// }

// function watchEffect(callback) {
//   currentEffect = callback;
//   callback();
//   currentEffect = null;
// }

// class ComputedRef {
//   constructor(fn) {
//     this._value = new YoutubeChannel()
//     this._fn = fn

//     watchEffect(() => {
//       this._value.notify()
//     })
//   }

//   get value() {
//     this._value.subscribe()
//     return this._fn()
//   }
// }

// let youtubeMap = new WeakMap();

// function getYoutubeChannel(target, key) {
//   let youtubeForTarget = youtubeMap.get(target)

//   if (!youtubeForTarget) {
//     youtubeForTarget = new Map()
//     youtubeForTarget.set(target, youtubeForTarget)
//   }

//   let dependency = youtubeForTarget.get(key)

//   if (!dependency) {
//     dependency = new YoutubeChannel()
//     youtubeForTarget.set(key, dependency)
//   }

//   return dependency
// }

// function reactive(raw) {
//   return new Proxy(raw, {
//     get(target, key, receiver) {
//       const youtubeChannel = getYoutubeChannel(target, key)

//       youtubeChannel.subscribe()

//       return Reflect.get(target, key, receiver)
//     },

//     set(target, key, value, receiver) {
//       const youtubeChannel = getYoutubeChannel(target, key)

//       const result = Reflect.set(target, key, value, receiver)

//       youtubeChannel.notify()

//       return result
//     }
//   })
// }

// function computed(fn) {
//   return new ComputedRef(fn)
// }

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
  => we can access style by: document.querySelector('div').class

B) children ? <div>abc</div> (abc is the children of 'div', which can includes many orther tab like p, div, section, ...)
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


function mount(vnode) {
  const el = document.createElement(vnode.tag);

  if (vnode.props) {
    Object.keys(vnode.props).forEach((attribute) => {
      const value = vnode.props[attribute];

      if (typeof value === 'string') {
        el.setAttribute(attribute, value);
      }

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
    })};

  if (vnode.children && vnode.children.length > 0) {
    if (Array.isArray(vnode.children)) {
      vnode.children.forEach((child) => {
        if (typeof child === "string") {
          el.textContent += child;

        } else {
          const childEL = mount(child);

          el.appendChild(childEL);
        }
      });
    } else {
      el.textContent = vnode.children;
    }
  }

  return el;
}

function createApp(options) {
  const el = mount(options.component)
  document.querySelector(options.id).appendChild(el);
}

const VNode = h('div', null, [
  h(
    'div',
    {
      style: 'color:red'
    },
    'Hello World'
  ),

  p(
    'p',
    {
      style: {
        'border': '1px solid red',
        'font-weight': 'bold'
      }
    },
    'nothing here'
  )
])

createApp({
  id: '#app',
  component: VNode
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

