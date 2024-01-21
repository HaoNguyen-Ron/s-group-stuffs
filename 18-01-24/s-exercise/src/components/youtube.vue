<script>
import { watchEffect } from 'vue'

let currentEffect = null
class youtubeChannel {
  subscribers
  _value

  constructor(value) {
    this.subscribers = new Set()
    this._value = value
  }

  get value() {
    this.subscribe()
    return this._value
  }

  set value(val) {
    this._value = val
    this.notify()
  }

  subscribe() {
    if (currentEffect) {
      this.subscribers.add(currentEffect)
    }
  }

  notify() {
    this.subscribers.forEach((subscriber) => {
      subscriber(this._value)
    })
  }
}

const myChannel = new youtubeChannel('Saltymeatball')

myChannel.value = 'Hehe'

watchEffect(() => {
  currentEffect = () => {
    console.log(myChannel)
  }
  return () => {
    currentEffect = null
  }
})

</script>
