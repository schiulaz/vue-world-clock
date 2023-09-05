import { createStore } from 'vuex'

import timezones from '../modules/timezones/store/index'


const store = createStore({
    modules: {
        timezones,
        
    }
})




export default store