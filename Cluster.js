/**
 * Cluster
 *
 * @type {Object}
 * @author Heavybeard
 * @version 1.0.0
 *
 * @param {Array} servers Array of Server to add on cluster
 * @param {Queue} queue   The queue to manage
 */
var Cluster = function (servers, queue) {
    this.__servers = servers;
    this.__queue = queue;

    this.__switchRequest();
};

/** @type {Object} Prototype constructor */
Cluster.prototype.constructor = Cluster;

/**
 * The servers on cluster
 *
 * @private
 * @type {Array}
 */
Cluster.__servers = [];

/**
 * The queue to manage
 *
 * @private
 * @type {Array}
 */
Cluster.__queue = [];

/**
 * Switch requests on queue in different server
 *
 * @private
 * @return {void}
 */
Cluster.prototype.__switchRequest = function () {
    var responded = 0,
        inProgress = 0,
        step = 0,
        i = 0,
        rqInProgress = false,
        rqInStep = false,
        currentServer = {};

    while (this.__thereRequestToManage(responded)) {
        for (i = 0; i < this.__servers.length; i++) {
            rqInProgress = this.__thereRequestToManage(inProgress);
            rqInStep = this.__thereRequestToProcessInStep(inProgress, step);
            currentServer = this.__servers[i];

            if (rqInProgress) {
                if (this.__isEmptyServer(currentServer) && rqInStep) {
                    currentServer.requestOnProgress(this.__queue[inProgress]);
                    currentServer.reduceDuration();
                    inProgress++;
                }
                else if (!this.__isEmptyServer(currentServer)) {
                    currentServer.reduceDuration();
                }
            }
        }
        step++;
    }
};

/**
 * Get true if there's request to manage in queue
 *
 * @private
 * @param  {Number} requestInStatus The number of requests in the defined status
 * @return {Boolean}
 */
Cluster.prototype.__thereRequestToManage = function (requestInStatus) {
    return requestInStatus <= this.__queue.length - 1;
};

/**
 * Get true if selected server is empty
 *
 * @private
 * @param  {Server}  server The server to check
 * @return {Boolean}
 */
Cluster.prototype.__isEmptyServer = function (server) {
    return !Object.keys(server.requestOnProgress()).length;
};

/**
 * Get true if there's requesto to process in the current step
 *
 * @private
 * @param  {Number}  index The request to try to process
 * @param  {Number}  step  The current step to check
 * @return {Boolean}
 */
Cluster.prototype.__thereRequestToProcessInStep = function (index, step) {
    return this.__queue[index].time <= step;
};
