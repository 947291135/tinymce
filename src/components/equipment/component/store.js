// const store = {
//   debug: true,
//   state: {
//     message: 'Hello!'
//   },
//   setMessageAction (newValue) {
//     if (this.debug) console.log('setMessageAction triggered with', newValue)
//     this.state.message = newValue
//   },
//   clearMessageAction () {
//     if (this.debug) console.log('clearMessageAction triggered')
//     this.state.message = ''
//   }
// }

import Vue from 'vue'
const store = new Vue({
  data () {
    return {
      message: 'Hello!'
    }
  }
})

export default store
