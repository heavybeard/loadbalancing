/**
 * Request
 *
 * @type {Object}
 * @author Heavybeard
 * @version 1.0.0
 * 
 * @param {Array}  options  Structure of the parameters
 * @param {String} splitter The char for splitting the request string
 */
var Request = function (keys, splitterRequest, splitterKey) {
    this.__structure = this.__createStructure(keys);
    this.__splitterRequest = splitterRequest;
    this.__splitterKey = splitterKey;
};

/** @type {Object} Prototype constructor */
Request.prototype.constructor = Request;

/**
 * The structure of request
 *
 * @private
 * @type {Object}
 */
Request.__structure = {};

/**
 * The char for splitting the single requests string in different single request
 *
 * @private
 * @type {String}
 */
Request.__splitterRequest = '';

/**
 * The char for splitting the single request string in different key
 *
 * @private
 * @type {String}
 */
Request.__splitterKey = '';

/**
 * Create the Request object
 *
 * @public
 * @param {Object|Boolean} request The request to add on progress
 * @return {Object}
 */
Request.prototype.create = function (parameterString) {
    var parameters = parameterString.split(this.__splitterKey),
        request = {},
        index = 0;

    for (var key in this.__structure) {
        request[key] = parameters[index];
        index++;
    }

    return request;
};

/**
 * Split the requests string in different request and return them in array
 *
 * @public
 * @param  {String} requestString The string to split
 * @return {Array}
 */
Request.prototype.splitRequest = function (requestString) {
    var requestsSplitted = requestString.split(this.__splitterRequest);

    return this.__removeEmptyRequest(requestsSplitted);
};

/**
 * Create the structure for request
 *
 * @private
 * @param  {Array}  parameters The keys to set on the structure template
 * @return {Object}
 */
Request.prototype.__createStructure = function (parameters) {
    var structure = {};
    parameters.forEach(function (parameter) {
        structure[parameter] = '';
    });

    return structure;
};

/**
 * Return request without empties
 *
 * @private
 * @param  {Array} requests Requests to parse
 * @return {Array}
 */
Request.prototype.__removeEmptyRequest = function (requests) {
    requests.forEach(function (request, index) {
        if (request.length === 0) {
            requests.splice(index, 1);
        }
    });

    return requests; 
};
