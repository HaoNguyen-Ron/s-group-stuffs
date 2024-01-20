When selecting a framework, we must consider:
    1. reactivity
    2. template
    3. lifecycle hooks

composition api

watchEffect() ~ useEffect() : observer pattern:
    . watchEffect(effect){}  : first argument
        e.g: 
        watchEffect(effect){

        let currentEffect = null
            class YoutubeChannel {
                subscribers
                _value

                constructor (value) {
                    this.subscribers = new Set()
                    this._value  = value
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
                    if(currentEffect){
                        this.subscribers.add(currrentEffect)
                    }
                }

                notify () {
                    this.subscribers.forEach((subscriber) => {
                        
                    })
                }
            }
        } 

