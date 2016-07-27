/**
 * Queue
 *
 * @type {Object}
 * @author Heavybeard
 * @version 1.0.0
 * 
 * @param {Array} requests  The array of requests to manage
 * @param {Array} orderBy   The array of keys to order the requests
 */
var Queue = function (requests, orderBy) {
    this.__requests = requests;
    this.__orderBy = orderBy;

    this.__createSortingKey();
    this.__order();
    this.__removeSortingKey();

    return this.__requests;
};

/** @type {Object} Prototype constructor */
Queue.prototype.constructor = Queue;

/**
 * The requests
 *
 * @private
 * @type {Array}
 */
Queue.__requests = [];

/**
 * The keys to order
 *
 * @private
 * @type {Array}
 */
Queue.__orderBy = '';

/**
 * Return the ordered requests
 *
 * @private
 * @return {Array}
 */
Queue.prototype.__order = function () {
    return this.__requests.sort(function (itemA, itemB) {
        return itemA.sortingKey - itemB.sortingKey;
    });
};

/**
 * Add sortingKey property on single request
 *
 * @private
 * @return {void}
 */
Queue.prototype.__createSortingKey = function () {
    var self = this;
    this.__requests.forEach(function (request, index) {
        request.sortingKey = self.__createSortingValue(request);
    });
};

/**
 * Remove sortingKey property on single request
 *
 * @private
 * @return {void}
 */
Queue.prototype.__removeSortingKey = function () {
    var self = this;
    this.__requests.forEach(function (request, index) {
        delete request.sortingKey;
    });
};

/**
 * Create and return the sorting value
 *
 * @private
 * @param  {Object} request The request where to put the sorting value
 * @return {String}
 */
Queue.prototype.__createSortingValue = function (request) {
    var sortingValue = '',
        index = 0;

    for (var key in request) {
        if (this.__orderBy.indexOf(key)) {
            sortingValue += request[this.__orderBy[index]];
            index++;
        }
    }   

    return sortingValue;
};
