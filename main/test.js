<script setup>
function h(tag, props, child) {
  return {
    tag,
    props,
    child
  }
}

function mount(vnode) {
  const el = document.createElement(vnode.tag)
  if (vnode.props) {
    Object.keys(vnode.props).forEach(key => {
      const value = vnode.props[key]
      el.setAttribute(key, value)
    })
  }
  if (vnode.child && vnode.child.length > 0) {
      console.log(vnode.child)
      if (Array.isArray(vnode.child))
      {
        vnode.child.forEach(c => {
          el.appendChild(mount(c))
        })
      } else el.innerHTML = vnode.child
  } 
  return el
}

const VNode = h('div', null, [
  h('p', {
    style: "color: red"
  }
  , 'helloworld')
])
function createApp(option) {
  const el = mount(option.component)
  console.log(el)
  document.querySelector(option.id).appendChild(el)
}
createApp({
  id: "#app",
  component: VNode
})
</script>