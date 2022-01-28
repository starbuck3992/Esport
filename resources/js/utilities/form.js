import Error from './error';

export default class Form {

    constructor(data) {
        this.originalData = data;
        for (let field in data) {
            this[field] = data[field];
        }
        this.errors = new Error();
    }

    data() {
        let data = {};
        for (let property in this.originalData) {
            data[property] = this[property];
        }
        return data;
    }

    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }
        this.errors.clear();
    }

    onSuccess() {
        this.reset();
    }

    onFail(errors) {
        this.errors.record(errors);
    }
}
