import { fetch } from '../middleware/fetch-middleware'

const AUTH = 'user/AUTH'
const AUTH_SUCCESS = 'user/AUTH_SUCCESS'
const AUTH_FAILURE = 'user/AUTH_FAILURE'

//const baseUrl = 'http://10.1.3.101:8080'

const baseUrl = 'http://172.17.0.1:8080'

const signIn = ({ username, password }) => {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password }),
        types: [
            AUTH,
            AUTH_SUCCESS,
            AUTH_FAILURE
        ]
    })
}

export const actions = {
    signIn
}


const defaultState = {
    authenticated: false
}

const user = (state = defaultState, action) => {

    switch(action.type) {
        case AUTH_SUCCESS:
            return {
                authenticated: true,
            }

        case AUTH: 
        case AUTH_FAILURE:
        default:
            return state
    }
}

export default user