"use strict";
let util = require('util');
/**
 * @since 0.1.0
 * @author Igor Ivanovic
 * @name Type
 *
 * @description
 * Type library
 */
class Type {

    constructor(config) {
        this.__dynamic__ = {};
        Object.keys(config).forEach(key => {
            Type.defineProperty(this, config[key], key);
        });
        Object.preventExtensions(this);
    }
    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @name Type#toString
     *
     * @description
     * Stringify
     */
    toString() {
        if (Type.isObject(this.__dynamic__)) {
            return util.inspect(this.__dynamic__, {colors: false, depth: 5})
        }
        return '{}';
    }
    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @name Type#destroy
     *
     * @description
     * Destroy class
     */
    destroy() {
        this.__dynamic__ = null;
    }
    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @name Type#defineProperty
     *
     * @description
     * Define property
     */
    static defineProperty(obj, type, key) {
        if (!Type.isValidType(type)) {
            throw new Error("Type must be valid type, provided is: " + type);
        }
        Object.defineProperty(obj, key, {
            set: function TypeSet(nVal) {
                var message = `key: ${key}, value: ${Type.getType(nVal)} (${nVal}), is exprected to be: ${type} type.`;
                if (Type.isInitialized(nVal) && !Type.assert(type, nVal)) {
                    throw new TypeError(message);
                }
                if (Type.isUndefined(this.__dynamic__)) {
                    this.__dynamic__ = {};
                }
                this.__dynamic__[key] = nVal;
            },
            get: function TypeGet() {
                return this.__dynamic__[key];
            }
        });
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @name Type#isValidType
     * @param {Object} type
     *
     * @description
     * Check if is valid type
     */
    static isValidType(type) {
        switch (type) {
            case Type.OBJECT:
            case Type.STRING:
            case Type.ARRAY:
            case Type.REGEX:
            case Type.NUMBER:
            case Type.BOOLEAN:
            case Type.FUNCTION:
            case Type.DATE:
                return true;
                break;
            case Type.UNDEFINED:
            case Type.NULL:
                throw new Error("type cannot be:" + type);
                break;

        }
        return false;
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type#assert
     * @param {String} type
     * @param {Object} value
     *
     * @description
     * Assert type
     */
    static assert(type, value) {
        return type === Type.getType(value);
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.isInitialized
     * @param {Object} value
     *
     * @description
     * Check if vaule is initial
     */
    static isInitialized(value) {
        return !Type.isUndefined(value) && !Type.isNull(value);
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.getType
     *
     * @description
     * Get correct type of value
     */
    static getType(value) {
        if (Type.isBoolean(value)) {
            return Type.BOOLEAN;
        } else if (Type.isUndefined(value)) {
            return Type.UNDEFINED;
        } else if (Type.isString(value)) {
            return Type.STRING;
        } else if (Type.isNumber(value)) {
            return Type.NUMBER;
        } else if (Type.isArray(value)) {
            return Type.ARRAY;
        } else if (Type.isNull(value)) {
            return Type.NULL;
        } else if (Type.isFunction(value)) {
            return Type.FUNCTION;
        } else if (Type.isDate(value)) {
            return Type.DATE;
        } else if (Type.isRegExp(value)) {
            return Type.REGEX;
        } else if (Type.isObject(value)) {
            return Type.OBJECT;
        }
        throw new TypeError(value);
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.isBoolean
     *
     * @description
     * Check if value is boolean
     */
    static isBoolean(value) {
        return typeof value === "boolean";
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.isUndefined
     *
     * @description
     * Check if value is un-defined
     */
    static isUndefined(value) {
        return typeof value === "undefined";
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.isString
     *
     * @description
     * Check if value is string
     */
    static isString(value) {
        return typeof value === "string";
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.isNumber
     *
     * @description
     * Check if value is isNumber
     */
    static isNumber(value) {
        return typeof value === "number";
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.isArray
     *
     * @description
     * Check if value is array
     */
    static isArray(value) {
        return Array.isArray(value);
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.isNull
     *
     * @description
     * Check if value is funciton
     */
    static isNull(value) {
        return value === null;
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.isFunction
     *
     * @description
     * Check if value is funciton
     */
    static isFunction(value) {
        return typeof value === "function";
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.isArray
     *
     * @description
     * Check if value is array
     */
    static isDate(value) {
        return Object.prototype.toString.call(value) === "[object Date]";
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.isRegExp
     *
     * @description
     * Check if object is an regular expression
     */
    static isRegExp(value) {
        return Object.prototype.toString.call(value) === "[object RegExp]";
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name Type.isObject
     *
     * @description
     * Check if value is object
     */
    static isObject(value) {
        return !Type.isNull(value) && typeof value === "object";
    }
}
// constant
Type.OBJECT = "object";
Type.STRING = "string";
Type.ARRAY = "array";
Type.REGEX = "regexp";
Type.NUMBER = "number";
Type.BOOLEAN = "boolean";
Type.FUNCTION = "function";
Type.DATE = "date";
Type.UNDEFINED = "undefined";
Type.NULL = "null";
// freeze object
Object.freeze(Type);
// export it
module.exports = Type;