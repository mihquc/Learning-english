const initState = {
    token: '',
    user: [],
    account: []
}

const AuthReducer = (state = initState, payload) => {
    switch (payload.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: payload.token,
            }
        case 'SET_USER':
            return {
                ...state,
                user: payload.user,
            }
        case 'SET_ACCOUNT':
            return {
                ...state,
                account: payload.account,
            }
        default:
            return state;
    }
}

export default AuthReducer;