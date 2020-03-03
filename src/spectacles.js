import axios from 'axios'


const API_URL = 'http://kraft.novareto.de:9999/'
const SPECTACLES_URL = API_URL + 'admin/spectacles'


export default {
    url_root: SPECTACLES_URL,

    list() {
        return axios.get(SPECTACLES_URL);
    },

    create_spectacle(spectacle) {
        return axios.post(SPECTACLES_URL, spectacle, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    delete_spectacle(id) {
        return axios.delete(`${SPECTACLES_URL}/${id}`);
    },

    update_spectacle(id, spectacle) {
        return axios.patch(`${SPECTACLES_URL}/${id}`, spectacle, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    get_spectacle(id) {
        return axios.get(`${SPECTACLES_URL}/${id}`);
    },

    list_events(id) {
        return axios.get(`${SPECTACLES_URL}/${id}/agenda`);
    },

    list_folder(id, folder) {
        return axios.get(`${SPECTACLES_URL}/${id}/${folder}`);
    },

    add_event(id, event) {
        return axios.post(`${SPECTACLES_URL}/${id}/agenda`, event, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    delete_event(id, date) {
        return axios.delete(`${SPECTACLES_URL}/${id}/agenda/${date}`);
    }
}
