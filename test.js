var assert = require('assert');

var desc = require('./describe.js');

describe('describe', function(){

	it('primitive type', function(){
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

		desc(target, {
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
	});

	it('simple object', function(){
		desc(1, 'number');
		desc('hello', 'string');
		desc({}, 'object');
		desc(0/0, 'NaN');
		desc([], 'array');
		desc(void 0, 'undefined');
		desc(null, 'null');
		desc(true, 'boolean');
		desc(function(){}, 'function');
	})

	it('nesting object', function() {
		var target = {
			level1: {
				level2: {
					level3: {}
				}
			}	
		};

		desc(target, {
			level1: {
				level2: {
					level3: 'object'
				}
			}
		});
	});

	describe('#optional value', function(){
		it('exists', function(){
			var target = {
				positive: 1,
				optional: 2
			};

			desc(target, {
				positive: 'number',
				'optional?': 'number'
			});

		});

		it('not exists', function() {
			var target = {
				positive: 1
			};

			desc(target, {
				positive: 'number',
				'optional?': 'number'
			});
		});

		it('nested', function(){
			var target = {
				positive: 1,
				optional: {
					say: 'yes'
				}
			};

			desc(target, {
				positive: 'number',
				'optional?': {
					say: 'string'
				}
			});
		});

		it('nested2', function(){
			var target = {
				positive: 1,
			};

			desc(target, {
				positive: 'number',
				'optional?': {
					say: 'string'
				}
			});
		});
	});

	describe('#variant', function(){
		it('one choice', function(){
			var target = {
				maybe: {
					say: 'yes'
				}
			};

			desc(target, {
				maybe: 'object|undefined'
			});
		});

		it('another choice', function(){
			var target = {
				maybe: void 0
			};

			desc(target, {
				maybe: 'object|undefined'
			});
		});

		describe('##multiple choice', function() {
			var descriptor = {
				'solid?': 'number|string',
				maybe: 'undefined|number|object|string'
			};

			it('1', function(){
				desc({
					solid: 1,
					maybe: void 0
				},descriptor);
			});

			it('2', function(){
				desc({
					solid: 'hey',
					maybe: 1
				}, descriptor);
			});

			it('3', function(){
				desc({
					maybe: {}
				}, descriptor);
			});

			it('4', function(){
				desc({
					maybe: 'hey'
				}, descriptor);
			});
		});

		describe('#wtf', function(){
			var target = {
				secretTaskId: '56cae28c5de12aff74065ebf',
				taskDescId: '559e65b3040a5ee37e4505b3',
				startLabel: 0,
				endLabel: 6,
				cSuffix: '',
				haha:'',
				destDir: 1
			};

			it('1', function(){
				desc(target, {
					secretTaskId: 'string',
					taskDescId: 'string',
					cSuffix: 'string',
					'startTime?': 'object',
					'endTime?': 'object',
					'startLabel?': 'number',
					'endLabel?': 'number',
					destDir: 'string',
				});
			});
		});
	});
});