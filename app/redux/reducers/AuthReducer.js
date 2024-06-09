const initState = {
    token: '',
    user: []
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
        default:
            return state;
    }
}

export default AuthReducer;