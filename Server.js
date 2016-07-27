/**
 * Server
 *
 * @type {Object}
 * @author Heavybeard
 * @version 1.0.0
 */
var Server = function () {};

/** @type {Object} Prototype constructor */
Server.prototype.constructor = Server;

/**
 * The requests on server
 *
 * @private
 * @type {Object}
 */
Server.__requests = {
    /** @type {Object} The request now on progress in server */
    onProgress: {},
    /** @type {Array} The requests processed and completed */
    completed: [],
};

/**
 * Get or set the request on progress
 *
 * @public
 * @param {Object|Boolean} request The request to add on progress
 * @return {Object}
 */
Server.prototype.requestOnProgress = function (request) {
    if (typeof request === 'undefined') {
        return this.__requests.onProgress;
    }

    this.__requests.onProgress = request;

    return this.__requests.onProgress;
};

/**
 * Get or set the request on completed
 *
 * @public
 * @param {Object|Boolean} request The request to add on progress
 * @return {Object}
 */
Server.prototype.requestsCompleted = function (request) {
    if (typeof request === 'undefined') {
        return this.__requests.completed;
    }

    this.__requests.completed.push(request);

    return this.__requests.completed;
};
