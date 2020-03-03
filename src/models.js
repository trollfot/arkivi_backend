class Show {
    constructor(id='', title='', description='', summary='', presentation='') {
        this.id = id;
        this.description = description;
        this.title = title;
        this.summary = summary;
        this.presentation = presentation;
    }
}

class Event {
    constructor(date='', place='', hour_from='', hour_to='', about='') {
        this.date = date;
        this.place = place;
        this.hour_from = hour_from;
        this.hour_to = hour_to;
        this.about = about;
    }
}

export {Show, Event};
