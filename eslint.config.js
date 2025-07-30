import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import prettier from 'eslint-plugin-prettier';
import { globalIgnores } from 'eslint/config';

export default [
	js.configs.recommended,
	globalIgnores([
		'node_modules/**',
		'dist/**',
		'build/**',
		'.angular/**',
		'coverage/**',
		'*.d.ts',
		'**/*.spec.ts',
		'.env*',
		'package-lock.json',
		'yarn.lock',
		'.vscode/**',
		'.idea/**',
		'.DS_Store',
		'Thumbs.db',
		'*.log',
		'*.tmp',
		'*.temp',
	]),
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
				project: './tsconfig.json',
			},
			globals: {
				console: 'readonly',
				window: 'readonly',
				document: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
			'@angular-eslint': angular,
			prettier,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'prefer-const': 'error',
			'no-var': 'error',
			'object-shorthand': 'error',
			'prefer-template': 'error',
			'prettier/prettier': 'off',
		},
	},
	{
		files: ['**/*.html'],
		ignores: ['node_modules/**', 'dist/**', 'build/**', '.angular/**', 'coverage/**'],
		languageOptions: {
			parser: angularTemplateParser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
			},
		},
		plugins: {
			'@angular-eslint/template': angularTemplate,
			prettier,
		},
		rules: {
			'prettier/prettier': 'off',
		},
	},
];
