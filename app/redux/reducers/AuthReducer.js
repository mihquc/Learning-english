const initState = {
    token: '',
    user: [],
    account: [],
    image: '',
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
        case 'SET_IMAGE':
            return {
                ...state,
                image: payload.image,
            }
        default:
            return state;
    }
}

export default AuthReducer;