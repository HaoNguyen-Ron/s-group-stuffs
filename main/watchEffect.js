let currentEffect = null;

class youtubeChannel {
  subscribers;
  _value;

  constructor(value) {
    this.subscribers = new Set();
    this._value = value;
  }

  get value() {
    this.subscribe();
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.notify();
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
  return new youtubeChannel(newSubscription);
}

function watchEffect(callback) {
  currentEffect = callback;
  callback();
  currentEffect = null;
}

class ComputedRef   {
    constructor(fn){
        this._ref = ref()
        watchEffect(() => {
            this._ref.value = fn()
        })
    }
    get value(){
        return this._ref.value
    }
}

function computed (fn){
    return new ComputedRef(fn)
}

const price = ref(1)

const priceFormatted = computed(() => price.value + '$')

watchEffect(() => {
    console.log(priceFormatted.value);
})

price.value++