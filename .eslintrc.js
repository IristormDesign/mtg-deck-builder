module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'@vue/standard'
	],
	parserOptions: {
		parser: '@babel/eslint-parser'
	},
	rules: {
		'no-console': 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		indent: [
			'warn',
			'tab',
			{ SwitchCase: 1 }
		],
		'no-tabs': 'off'
	}
}
