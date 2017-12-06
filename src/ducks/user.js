import { fetch } from '../middleware/fetch-middleware'
import default from '../components/FilteredProductList/Filter';

const AUTH = 'user/AUTH'
const AUTH_SUCCESS = 'user/AUTH_SUCCESS'
const AUTH_FAILURE = 'user/AUTH_FAILURE'

const baseUrl = 'http://192.168.0.104:8080'

const signIn = ({ username, password }) => {
    return fetch(`${baseUrl}/login`, {
        headers: {
        'Content-type': 'application/json'
        },
        credentials: 'include',
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
    authenticated: false,
    token: ''
}

const user = (state = defaultState, action) => {
    switch(state) {
        case AUTH_SUCCESS:

        case AUTH: 
        case AUTH_FAILURE:
    }
}

export default user