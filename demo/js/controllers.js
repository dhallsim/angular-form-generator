'use strict';


/*
	Brainstorm: Types of form fields

	1. Input (Text, email, telephone, url,...)
	2. Textarea
	3. Select
	4. Select (Multiple)
	5. Checkboxes
	6. Radio Buttons

	Model:
	{
		// List of classes for the form
		classes: [],

		// Object containing key-pair values to use as attributes on the form
		attributes: {},

		// Form fields
		fields: [
			// Sample input
			{
				label: {
					// Name of label (this is also what is displayed in the HTML)
					name: '',

					// List of classes for the label
					classes: [],

					// Attributes for the label
					attributes: {},

					// Boolean determining whether label will wrap the field or not
					wrapField: false					
				},

				// Type of form field
				// types: [

					// All input types supported
					input: [
						'text',
						'email',
						'password',
						'number',
						'telephone',
						'url'
					],

					'textarea',
					'radio',
					'checkbox',
					'select' (including multiple)
				],

				type: 'text',
				model: 'person.name',
				placeholder: 'Enter name here',
				attributes: {},
				required: false,
				group: 1
			}
		],

		// Groups for fields. These represent a container for a single field or multiple fields.
		// The HTML for a group will be a div wrapping the field(s).
		groups: [
			{
				// id that will be referenced by a field object
				id: '',

				// Name of group
				name: '',

				// List of classes that will be applied to the group
				classes: [],

				// Object containing key-pair values to use as atrributes for group
				attributes: {}
			}
		]
	}
*/


function indexCtrl($scope) {
	$scope.countries = [
		{
			name: 'United States',
			code: 'US'
		},
		{
			name: 'Japan',
			code: 'JP'
		},
		{
			name: 'Mexico',
			code: 'MX'
		},
		{
			name: 'Canada',
			code: 'CA'
		}
	];

	$scope.bands = [
		{
			name: 'August Burns Red',
			genre: 'metalcore'
		},
		{
			name: 'Blink-182',
			genre: 'pop punk'
		},
		{
			name: 'Tool',
			genre: 'progressive metal'
		},
		{
			name: 'Senses Fail',
			genre: 'emo'
		}
	];

	$scope.person = {
		codingExperience: 'junior'
	};

	$scope.form = {
		classes: [],
		attributes: {
			id: 'ballsack'
		},
		fields: [
			{
				label: {
					name: 'Name',
					classes: [],
					wrapField: false
				},
				type: 'text',
				model: 'person.name',
				placeholder: 'Enter name here',
				classes: ['form-control'],
				required: false,
				group: 1
			},
			{
				label: {
					name: 'Age',
					classes: [],
					wrapField: false
				},
				type: 'number',
				model: 'person.age',
				placeholder: 'Enter Age here',
				classes: ['form-control'],
				required: true,
				group: 1,
				attributes: {
					min: 1,
					max: 120
				}
			},
			{
				label: {
					name: 'Password',
					classes: [],
					wrapField: false
				},
				type: 'password',
				model: 'person.password',
				placeholder: 'Enter password here',
				classes: ['form-control'],
				required: true,
				group: 1
			},
			{
				label: {
					name: 'Email',
					classes: [],
					wrapField: false
				},
				type: 'email',
				model: 'person.email',
				placeholder: 'Enter email here',
				classes: ['form-control'],
				required: true,
				group: 1
			},
			{
				label: {
					name: 'Website',
					classes: [],
					wrapField: false
				},
				type: 'url',
				placeholder: 'Enter url here',
				model: 'person.website',
				classes: ['form-control'],				
				required: true,
				group: 1
			},
			{
				label: {
					name: 'About Me',
					classes: [],
					wrapField: false
				},
				type: 'textarea',
				model: 'person.description',
				placeholder: 'Enter description here',
				classes: ['form-control'],
				required: true,
				group: 1
			},
			{
				label: {
					name: 'Coding Experience',
					classes: [],
					wrapField: false
				},
				type: 'radio',
				model: 'person.codingExperience',
				group: 1,
				options: [
				{
					label: {
						name: 'Junior',
						classes: [],
						wrapField: true
					},
					value: 'junior',
					group: 3
				},
				{
					label: {
						name: 'Intermediate',
						classes: [],
						wrapField: true
					},
					value: 'intermediate',
					group: 3
				},
				{
					label: {
						name: 'Senior',
						classes: [],
						wrapField: true
					},
					value: 'senior',
					group: 3
				},
				{
					label: {
						name: 'Badass',
						classes: [],
						wrapField: true
					},
					value: 'badass',
					group: 3
				}
				],
				required: true
			},
			{
				label: {
					name: 'Remember Me',
					classes: [],
					wrapField: true
				},
				type: 'checkbox',
				model: 'person.remember',
				group: 2
			},
			{
				label: {
					name: 'Programming Languages',
					classes: [],
					wrapField: false
				},
				type: 'checkbox',
				model: 'person.test.testing.tested.languages',
				options: [
					{
						label: {
							name: 'Java',
							classes: ['checkbox'],
							wrapField: true
						},
						value: 'Java'
					},
					{
						label: {
							name: 'JavaScript',
							classes: ['checkbox'],
							wrapField: true
						},
						value: 'JavaScript'
					},
					{
						label: {
							name: 'C++',
							classes: ['checkbox'],
							wrapField: true
						},
						value: 'C++'
					},
					{
						label: {
							name: 'Python',
							classes: ['checkbox'],
							wrapField: true
						},
						value: 'Python'
					}
				],
				required: true
			},
			// {
			// 	label: {
			// 		name: 'Country',
			// 		classes: [],
			// 		wrapField: true
			// 	},
			// 	type: 'select',
			// 	multiple: false,
			// 	model: 'person.country',
			// 	required: true,
			// 	classes: ['form-control'],
			// 	optionsExpression: 'country.name for country in countries'
			// },
			{
				label: {
					name: 'Select Cool Bands',
					classes: [],
					wrapField: false
				},
				type: 'select',
				multiple: true,
				model: 'person.favoriteBands',
				required: true,
				classes: ['form-control'],
				optionsExpression: 'band.name for band in bands'
			}
		],
		groups: [
			{
				id: 1,
				name: 'group1',
				classes: ['form-group'],
				attributes: {}
			},
			{
				id: 2,
				name: 'checkboxGroup',
				classes: ['checkbox'],
				attributes: {}
			},
			{
				id: 3,
				name: 'radioGroup',
				classes: ['radio'],
				attributes: {}
			}
		]
	};

	$scope.addField = function() {
		var field = {
			label: {
				name: 'Another Input',
				classes: [],
				wrapField: false,
				attributes: {}
			},
			type: 'text',
			model: 'person.ballsack',
			placeholder: 'Enter something',
			required: false,
			classes: ['form-control'],
			group: 1
		};

		$scope.form.fields.push(field);
	};
}