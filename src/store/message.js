const messaging = {
    namespaced: true,
    state: {
        messages: {
            'info': [],
            'alert': [],
            'error': []
        }
    },
    mutations: {
        setMessage(state, msg, type='info') {
            if (!Object.prototype.hasOwnProperty.call(state.messages, type)) {
                throw `Unknow message type '${type}'`;
            }
            state.messages[type] = [msg]
        },
        setMessages(state, msgs, type='info') {
            state.messages[type] = msgs;
        },
        appendMessage(state, msg, type='info') {
            state.messages[type].push(msg);
        },
        appendMessages(state, msgs, type='info') {
            state.messages[type] = [...state.messages, ...msgs];
        }
    },
    actions: {
    },
    getters: {
    }
}


export { messaging };
