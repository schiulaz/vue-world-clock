import axios from 'axios'


const authApi = axios.create({
    // baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    baseURL: 'https://worldtimeapi.org/api/',
    
})

// console.log( process.env.NODE_ENV ) // TEST durante testing, 

export default authApi