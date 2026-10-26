
export class ApiClient {
    constructor(request, baseURL) {
        this.request = request;
        this.baseURL = baseURL.replace(/\/$/, '');
    }

    buildUrl(path) {
        return `${this.baseURL}/${path.replace(/^\//, '')}`;
    }

    async get(path, options = {}) {
        return this.request.get(this.buildUrl(path), options);
    }

    async post(path, options = {}) {
        return this.request.post(this.buildUrl(path), options);
    }

    async put(path, options = {}) {
        return this.request.put(this.buildUrl(path), options);
    }

    async patch(path, options = {}) {
        return this.request.patch(this.buildUrl(path), options);
    }

    async delete(path, options = {}) {
        return this.request.delete(this.buildUrl(path), options);
    }
}
