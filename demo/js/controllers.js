'use strict';

function indexCtrl($scope) {
	$scope.editingField = false;

	$scope.fieldTypes = [
		{
			name: 'Text Input',
			value: 'text'
		},
		{
			name: 'Email Input',
			value: 'email'
		},
		{
			name: 'Password Input',
			value: 'password'
		},
		{
			name: 'Number Input',
			value: 'number'
		},
		{
			name: 'Telephone Input',
			value: 'telephone'
		},
		{
			name: 'Textarea',
			value: 'textarea'
		},
		{
			name: 'Radio',
			value: 'radio'
		},
		{
			name: 'Checkbox',
			value: 'checkbox'
		},
		{
			name: 'Select',
			value: 'select'
		}
	];

	$scope.myForm = {
		fields: [],
		groups: []
	};

	$scope.myFormModel = {};

	$scope.currentField = null;
	$scope.currentType = null;
	$scope.currentModel = null;

	$scope.newField = function() {
		$scope.currentType = $scope.fieldTypes[0];
		$scope.currentModel = null;
		$scope.editingField = true;
		$scope.currentField = {
			label: {
				classes: []
			},
			options: [],
			type: $scope.currentType.value
		};
		$scope.myForm.fields.push($scope.currentField);
	};

	$scope.addType = function() {
		$scope.currentField.type = $scope.currentType.value;
	};

	$scope.addModel = function() {
		var modelStr = 'myFormModel.' + $scope.currentModel;
		$scope.currentField.model = modelStr;
	};

	$scope.editField = function(field) {
		$scope.currentModel = (field.model) ? field.model.split('.')[1] : null;
		$scope.currentField = field;
		$scope.editingField = true;
	};

	$scope.deleteField = function(field) {
		var index = $scope.myForm.fields.indexOf(field);
		if (index != -1) {
			$scope.myForm.fields.splice(index, 1);
			$scope.currentField = null;
			$scope.currentModel = null;
			$scope.editingField = false;
		}
	};







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
			{
				label: {
					name: 'Country',
					classes: [],
					wrapField: true
				},
				type: 'select',
				multiple: false,
				model: 'person.country',
				required: true,
				classes: ['form-control'],
				optionsExpression: 'country.name for country in countries'
			},
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