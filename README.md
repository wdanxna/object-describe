##object-describe

A lightweight recursive object scheme validator.

For some reason, we just want to know if an object looks like what we want it to be.

## Install
```
npm install object-describe
```
##Usage
```javascript
var describe = require('object-describe');

var object = {
    hello: 'world'
};

say(object);

function say(param) {
    describe(param, {
        hello: 'string'
    });
    
    console.log(param.hello); //worry free
}

```
###Single Object
Check a single object type.
```javascript
describe(1, 'number');
describe('hello', 'string');

```

###Primitive Support
All primitive type is well supported:

`string, number, boolean, array, object, function, null, NaN, undefined` 

```javascript
var target = {
	number: 0,
	string: "this is string",
	boolean: true,
	undefinedable: undefined,
	nullable: null,
	isnan: 0/0,
	object: {},
	array: [1,2,3],
	function: (function(){})
};

describe(target, {
	number: 'number',
	string: 'string',
	boolean: 'boolean',
	undefinedable: 'undefined',
	nullable: 'null',
	isnan: 'NaN',
	array: 'array',
	object: 'object',
	function: 'function'
});
```

###Nested Description
You can define a nested description for deeper check.
```javascript
var target = {
    level1: {
		level2: {
			level3: {}
		}
	}	
};

describe(target, {
    level1: {
		level2: {
			level3: 'object'
		}
	}
});
```

###Optional Field
To be or not to be, its not a problem.

add a question mark behind a filed make it an optional.
```javascript
var target = {
    tobe: 'exist',
    mybe: 'exist',
  //maynotbe: 'not exist'
};

describe(target, {
    tobe: 'string',
    'maybe?': 'string',
    'maynotbe?': 'string'
});
```

###Type Variation
You can describe multiple type choices for a field.

Simply seperate each variation with vertical bar(`|`)
```javascript
var target0 = {
    field: 1
};

var target1 = {
    field: 'hello'
};

describe(target0/*target1*/, {
    field: 'number|string'
});
```