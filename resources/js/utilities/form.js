import Error from "./error";

export default class Form {

    constructor(data) {
        this.originalData = data

        for (let field in data) {
            this[field] = data[field]
        }

        this.errors = new Error()
    }

    objectToFormData() {
        let formData = new FormData()

        function appendFormData(data, field) {
            if (data instanceof File) {
                formData.append(field, data)
            } else if (Array.isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    appendFormData(data[i], field + '[' + i + ']')
                }
            } else if (typeof data === 'object' && data) {
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (field === '') {
                            appendFormData(data[key], key)
                        } else {
                            appendFormData(data[key], field + '.' + key)
                        }
                    }
                }
            } else {
                if (data !== null && typeof data !== 'undefined') {
                    formData.append(field, data)
                }
            }
        }

        for (let property in this.originalData) {
            appendFormData(this[property], property)
        }

        return formData

    }

    reset() {
        for (let field in this.originalData) {
            if (Array.isArray(this[field])) {
                this[field] = []
            } else {
                this[field] = null
            }
        }
        this.errors.clear()
    }

    onSuccess() {
        this.reset()
    }

    onFail(errors) {
        this.errors.record(errors)
    }
}
