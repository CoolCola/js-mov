var extend = (function(){
	var hasOwn = Object.hasOwnProperty;
	var isObjFunc = function(name) {
		var toString = Object.prototype.toString;
		return function(){
			return toString.call(arguments[0]).toLowerCase() === '[object ' + name + ']';
		};
	};
	var isObject = isObjFunc('object'),
		isArray = isObjFunc('array'),
		isBoolean = isObjFunc('boolean');
	var isWindow = function (obj) {
		return !obj && (obj == obj.window);
	};
	var isPlainObject = function (obj) {
		//DOM nodes and window objects don't pass
		if (!obj || !isObject(obj) || !obj.nodeType || isWindow(obj)) {
			return false;
		}
		try {
			if (obj.constructor && 
				!hasOwn(obj,'constructor') &&
				!hasOwn(obj.constructor.prototype,'isPrototypeOf')) {
				return false;
			}
		} catch(e) {
			return false;
		}

	};
	return function(){
		var index = 0,isDeep = false,obj,copy,target,source,i;
		var length = arguments.length;
		if (isBoolean(arguments[0])) {
			isDeep = arguments[0];
			index++;
		}
		target = arguments[index] || {}; 
		if (!isObject(target)) {
			target = {}; 
		}
		for (i = index;i < length;i++) {
			source = arguments[i];
			for (var property in source) {
				obj = source[property];				
				// Prevent never-ending loop
				if ( target === obj ) {
					continue;
				}
				if (isDeep && target[property] && (isPlainObject(obj) || isArray(obj))) {
					if (isObject(obj)) {
						copy = obj || {};
					} else {
						copy = obj || [];
					}
					target[property] = extend(isDeep,target[property],copy);
				} else if(obj !== 'undefined'){
					target[property] = obj;
				}
				
			}
		}
		return target;
	};
})();