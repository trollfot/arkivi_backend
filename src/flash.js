const messaging = {
    namespaced: true,
    state: {
        messages: {}
    },
    mutations: {
        setMessage(state, message, type) {
            state.messages[type] = [message];
        },
        appendMessage(state, msg, type) {
            if (!Object.prototype.hasOwnProperty.call(state.messages, type)) {
                state.messages[type] = [];
            }
            state.messages[type].push(msg);
        },
    },
    actions: {
    },
    getters: {
    }
}


class Flasher {

    #store;
    #namespace;
    types = ['info', 'error', 'alert'];

    constructor(namespace, store, types=null) {
        store.registerModule(namespace, messaging);
        this.#store = store
        this.#namespace = namespace
        if (types !== null) this.types = types
    }

    add({ message, type='info', replace=true }) {
        if (!this.types.includes(type)) {
            throw `Unknown message type: ${type}`
        }
        const commiter = replace ?
              `${this.#namespace}/setMessage`:
              `${this.#namespace}/appendMessage`;
        this.#store.commit(commiter, message, type);
    }
}

export default {
    install (Vue, options) {
        const { store } = options
        Vue.prototype.$flash = new Flasher('messages', store);
    }
}
