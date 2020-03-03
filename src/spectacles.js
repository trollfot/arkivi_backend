import axios from 'axios'


class Service {

    constructor(api_url='', static_url='', web_url='') {
        this.api_url = api_url;
        this.static_url = static_url;
        this.web_url = web_url;
    }

    get url () {
        return `${this.api_url}/spectacles`;
    }

    list() {
        return axios.get(this.url);
    }

    create_spectacle(spectacle) {
        return axios.post(this.url, spectacle, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    delete_spectacle(id) {
        return axios.delete(`${this.url}/${id}`);
    }

    update_spectacle(id, spectacle) {
        return axios.patch(`${this.url}/${id}`, spectacle, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    get_spectacle(id) {
        return axios.get(`${this.url}/${id}`);
    }

    list_events(id) {
        return axios.get(`${this.url}/${id}/agenda`);
    }

    list_folder(id, folder) {
        return axios.get(`${this.url}/${id}/${folder}`);
    }

    add_event(id, event) {
        return axios.post(`${this.url}/${id}/agenda`, event, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    delete_event(id, date) {
        return axios.delete(`${this.url}/${id}/agenda/${date}`);
    }

    delete_file(id, folder, filename) {
        return axios.delete(`${this.url}/${id}/${folder}/${filename}`);
    }

    download(id, folder, filename) {
        axios({
            url: `${this.url}/${id}/${folder}/${filename}`,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(
                new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        });
    }
}

export default new Service()
