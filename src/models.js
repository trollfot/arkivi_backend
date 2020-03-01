class Show {
    constructor(id, title, summary='', presentation='') {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.presentation = presentation;
    }
}

class Event {
    constructor(date=null, place='', hour_from='', hour_to='', about='') {
        if (date === null) {
            let date = new Date();
            this.date = date.getTime();
        }
        this.place = place;
        this.hour_from = hour_from;
        this.hour_to = hour_to;
        this.about = about;
    }

    get picked_date() {
        return new Date(this.date);
    }

    set picked_date(value){
        this.date = value.getTime();
    }

}

export {Show, Event};
