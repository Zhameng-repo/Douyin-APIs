class DouyinError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.name = 'DouyinError';
        this.status = status;
    }
}

module.exports = { DouyinError };
