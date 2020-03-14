import { $http } from './main'


function unbound(target, key, descriptor) {
    const original = descriptor.value;
    if (typeof original !== "function") {
        throw "You can only decorate functions";
    }
    descriptor.value = function(...args) {
        if (this.bound) {
            throw `function ${key} can not be used on a bound content.`;
        }
        return original.apply(this, args);
    }
}

function bound(target, key, descriptor) {
    const original = descriptor.value;
    if (typeof original !== 'function') {
        throw "You can only decorate functions";
    }
    descriptor.value = function(...args) {
        if (!this.bound) {
            throw `function ${key} needs a bound content.`;
        }
        return original.apply(this, args);
    }
}


class Content {

    constructor({id, bound=false, folder=null}) {
        this.id = id;
        this.folder = folder;
        this.bound = bound;
        this.url = folder ? `${folder.url}/${id}`: id;
    }

    @bound
    async remove({ sync_folder=false }) {
        let res = await $http.delete(this.url);
        if([200, 202, 204, 205].contains(res.status)) {
            // unbinding
            this.bound = false;
            if (this.folder !== null && sync_folder) {
                if (sync_folder === 'lazy') {
                    let index = this.folder.contents.indexOf(this);
                    this.folder.contents.splice(index, 1);
                } else {
                    this.folder.list();
                }
            }
            return true;
        }
        return false;
    }

    @unbound
    async bind() {
        let res = await $http.get(this.url);
        if(res.status === 200) {
            Object.assign(this, res.data);
            this.bound = true;
            return {
                type: "info",
                message: "object bound !"
            }
        }
        return {
            type: "error",
            message: "Binding failed"
        }
    }

    @unbound
    async create({ sync_folder=false }) {
        let res = await $http.put(
            this.url, this, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if(res.status !== 201) {
            // We explicitly want a 201 CREATED.
            // Anything else won't be considered.
            this.bound = true;
            if (this.folder !== null && sync_folder) {
                if (sync_folder === 'lazy') {
                    this.folder.contents.push(this);
                } else {
                    this.folder.list();
                }
            }
            return true;
        }
        return false;
    }

    @bound
    async update(data) {
        let res = await $http.patch(this.url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if([200, 202, 204, 205].contains(res.status)) {
            return true;
        }
        return false;
    }
}


class Show extends Content {
    // A show

    constructor({
        folder, id='', title='',
        description='', summary='', presentation=''}) {
        super({folder, id})
        this.description = description;
        this.title = title;
        this.summary = summary;
        this.presentation = presentation;
    }
}


class Event extends Content {
    // Event where the date is the id
    // You can only have one event per date.

    constructor(
        {folder, date='',
         place='', hour_from='', hour_to='', about=''}) {
        super({folder, date})
        this.place = place;
        this.hour_from = hour_from;
        this.hour_to = hour_to;
        this.about = about;
    }

    get id() {
        return this.date
    }

    set id(value) {
        this.date = value
    }
}


class File extends Content {
    // File representation

    constructor({folder, id, size}) {
        super({folder: folder, id: id});
        this.size = size
    }

    @bound
    async download() {
        let res = await $http({
            url: this.url,
            method: 'GET',
            responseType: 'blob', // important
        });
        if(res.status == 200) {
            const url = window.URL.createObjectURL(
                new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.id);
            document.body.appendChild(link);
            link.click();
            return true;
        }
        return false;
    }
}


class Folder extends Content {
    // Container of content.
    //

    constructor({content=Content, ...args}) {
        super(args)
        this.content = content
        this.contents = []
    }

    @bound
    async list() {
        let res = await $http.get(this.url);
        if(res.status == 200) {
            this.contents = Array.from(
                res.data, data =>
                    this.spawn({...data, bound: true})
            );
        }
    }

    spawn(data) {
        return new this.content({...data, folder: this})
    }
}

export {Content, File, Folder, Show, Event};
