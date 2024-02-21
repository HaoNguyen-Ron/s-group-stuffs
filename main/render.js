let activeEffect = null;

class Dependency {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach(effect => effect())
  }
}

function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

let dependenciesMap = new WeakMap();

function getDependency(target, key) {
  let dependenciesForTarget = dependenciesMap.get(target)

  if (!dependenciesForTarget) {
    dependenciesForTarget = new Map()
    dependenciesMap.set(target, dependenciesForTarget)
  }

  let dependency = dependenciesForTarget.get(key)

  if (!dependency) {
    dependency = new Dependency()
    dependenciesForTarget.set(key, dependency)
  }

  return dependency
}


function reactive(raw) {
  return new Proxy(raw, {
    get(target, key, receiver) {
      const dependency = getDependency(target, key)

      dependency.subscribe()

      return Reflect.get(target, key, receiver)
    },

    set(target, key, value, receiver) {
      const dependency = getDependency(target, key)

      const result = Reflect.set(target, key, value, receiver)

      dependency.notify()

      return result
    }
  })
}

function ref(raw) {
  return reactive({ value: raw });
}

class ComputedRef {
  constructor(fn) {
    this._dep = new Dependency();

    this._fn = fn;

    watchEffect(() => {
      this._dep.notify();
    });
  }

  get value() {
    this._dep.subscribe();

    return this._fn();
  }
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

function mount(vnode, parentElement) {
  const tag = vnode.tag;
  const props = vnode.props;
  const children = vnode.children;

  const el = document.createElement(tag);

  vnode.$el = el;
  vnode.$parent = parentElement

  //check props(or attribute (key in general) in Element)
  if (props) {
    Object.keys(props).forEach((key) => {
      const value = props[key];

      // ------ Handle Event (onClick, onMouse)
      if (key.startsWith('on')) {
        const event = key.toLowerCase().replace(/^on/, "")
        el.addEventListener(event, value);
      } else {
        el.setAttribute(key, value);
      }

      // ------ Handle style
      if (key === 'style') {
        if (typeof value === 'object' && value) {
          Object.keys(value).forEach(key => {
            const val = value[key]
            el.style[key] = val
          })
        }
      }

      // ------ Handle class
      if (key === 'class') {
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
  if (typeof children === "string" || typeof children === "number") {
    el.textContent = children;

  } else if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === "string") {
        el.textContent += child;

      } else {
        const childNode = mount(child, el);

        el.appendChild(childNode.$el);
      }
    });
  }

  parentElement.appendChild(el);

  return vnode;
}

/**
 * ---------------------Patch
 */
function patch(oldVDom, newVDom) {
  const el = oldVDom.$el;

  if (oldVDom.tag === newVDom.tag) {
    // props
    const oldProps = oldVDom.props;
    const newProps = newVDom.props;

    newProps &&
      Object.keys(newProps).forEach((key) => {
        const oldValue = oldProps[key];
        const newValue = newProps[key];

        if (oldValue !== newValue) {
          el.setAttribute(key, newValue);
        }
      });

    oldProps &&
      Object.keys(oldProps).forEach((key) => {
        if (!(key in newProps)) {
          oldVDom.removeAttribute(key);
        }
      });

    // chidlren
    const oldChildren = oldVDom.children;
    const newChildren = newVDom.children;

    if (
      typeof newChildren === "string" ||
      typeof newChildren === "number"
    ) {
      oldVDom.$el.textContent = newChildren;
    } else if (Array.isArray(newChildren)) {
      if (Array.isArray(oldChildren)) {
        const commonLength = Math.min(
          oldChildren.length,
          newChildren.length
        );

        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }

        if (newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach((child) => {
            mount(child, el);
            oldVDom.children.push(child);
          });
        } else if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach((child) => {
            el.removeChild(child.$el);
            oldVDom.children.pop();
          });
        }
      }
    }
  } else {
    oldVDom.$parent.removeChild(oldVDom.$el);
    oldVDom.$el = mount(newVDom, oldVDom.$parent).$el;
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
    tag: 'div',
    msg: 'Hello world',
    color: 'red',
    count: 1,
    listHehe: ['Hehe']
  },

  render() {
    return h(
      this.data.tag,
      {
        style: `color: ${this.data.color}`
      },
      [
        h(
          "button",
          {
            onClick: () => {
              this.data.count++;
              this.data.color = "purple";
              this.data.listHehe.push(this.data.count);
            },
          },
          "+"
        ),
        h("div", null, this.data.msg),
        h("div", null, this.data.count),
        ...this.data.listHehe.map((str) => h("div", str)),
      ])

  }
})

function createApp(options) {
  let isMounted = false
  let oldNode = null

  watchEffect(() => {
    if (!isMounted) {
      oldNode = options.component.render();
      mount(oldNode, document.querySelector(options.id));
      isMounted = true;

    } else {
      const newNode = options.component.render();

      patch(oldNode, newNode)
    }
  })

};

createApp({
  id: '#app',
  component: Component
});

/**
 * ...................Usage
 */

setTimeout(() => {
  Component.data.tag = "h1";
  Component.data.color = "green";
  Component.data.listHehe = ["Hoho"];
}, 1000);

