#!/usr/bin/env node
'use strict';

var assert = require('assert');

module.exports = (function(){
	function handles(type) {
		switch(type) {
			case 'NaN': {
				return (function(n) {
					return isNaN(n);
				});
				break;
			};
			case 'null': {
				return (function(n) {
					return n === null;
				});
				break;
			};
			case 'array': {
				return (function(n) {
					return Array.isArray(n);
				});
				break;
			};
			default: {
				return (function(n) {
					return (typeof n) === type;
				});
			}
		};
	}

	function iter(tar, src) {	    
	    if (typeof src == 'string') {
	    	var check = handles(src);
	    	assert(check(tar), 'type not match, expected [' + src + '], but get ['+ typeof tar + ']');
	    	return;
	    }
	    var keys = Object.keys(tar);
	    assert(keys && keys.length > 0, 'object is empty');
	    assert(src, 'description is empty');

	    for (var key in tar) {
	    	var srcKey, tarKey;
	    	srcKey = tarKey = key;

	    	if (src[key] === void 0) {
	    		srcKey = srcKey + '?';
			}
			if (!src[srcKey]) { assert(false, key + 'not described.');}

	        if (typeof src[srcKey] === 'object' && typeof tar[tarKey] === 'object') {
                iter(tar[tarKey], src[srcKey]);
	        } else {
				var variants = [src[srcKey]];
	    		if (src[srcKey].indexOf('|') !== -1) {
					variants = src[srcKey].split('|');
	    		}

	    		var matched = false;
	    		for (var v = 0; v < variants.length; v++) {
	        		var check = handles(variants[v]);
	        		if (check(tar[tarKey])) {
	        			matched = true;
	        			break;
	        		}
	    		}
	    		if (!matched) {
	    			assert(false , key + ' do not match any given description.');
	    		}
	        }
	    }   
	}

	return (function(obj, desc) {
	    iter(obj, desc);
	});
})()