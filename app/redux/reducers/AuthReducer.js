const initState = {
    token: '',
}

const AuthReducer = (state = initState, payload) => {
    switch (payload.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: payload.token,
            }
        // case 'RIGHT_ANSWER':
        //     return {
        //         ...state,
        //         rightAnswers: payload.rightAnswers,
        //     }
        default:
            return state;
    }
}

export default AuthReducer;