const initState = {
    selectAnswers: '',
    rightAnswers: '',
}

const gameReducer = (state = initState, payload) => {
    switch (payload.type) {
        case 'SELECT_ANSWER':
            return {
                ...state,
                selectAnswers: payload.selectAnswers,
            }
        case 'RIGHT_ANSWER':
            return {
                ...state,
                rightAnswers: payload.rightAnswers,
            }
        default:
            return state;
    }
}

export default gameReducer;