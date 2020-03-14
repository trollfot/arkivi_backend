function flash(store) {
    return function(message) {
	console.log(message);
        try {
            store.commit('messages/setMessage', message.message, message.type);
            return message
        }
        catch(err) {
            store.commit('messages/setMessage', err, 'error');
            throw err;
        }
    }
}

export default {
    install (Vue, options) {
        const { store } = options
        Vue.prototype.$flash = flash(store);
    }
}
