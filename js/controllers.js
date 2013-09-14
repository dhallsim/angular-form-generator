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
		label: 'name of field label',
		type: 'type of field',
		model: 'ng-model to bind to',
		options: 'applies to radios/checkboxes/select'
		placeholder: 'placeholder text (reserved for inputs/textareas)',
		required: 'true/false',
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

	$scope.fields = [
		{
			label: 'Name',
			type: 'text',
			model: 'person.name',
			placeholder: 'Enter name here',
			required: false
		},
		{
			label: 'Age',
			type: 'number',
			model: 'person.age',
			placeholder: 'Enter Age here',
			required: true
		},
		{
			label: 'Password',
			type: 'password',
			model: 'person.password',
			placeholder: 'Enter password here',
			required: true
		},
		{
			label: 'Email',
			type: 'email',
			model: 'person.email',
			placeholder: 'Enter email here',
			required: true
		},
		{
			label: 'Website',
			type: 'url',
			placeholder: 'Enter url here',
			model: 'person.website',
			required: true
		},
		{
			label: 'About Me',
			type: 'textarea',
			model: 'person.description',
			placeholder: 'Enter description here',
			required: true
		},
		{
			label: 'Coding Experience',
			type: 'radio',
			model: 'person.codingExperience',
			options: [
				{
					label: 'Junior',
					value: 'junior'
				},
				{
					label: 'Intermediate',
					value: 'intermediate',
				},
				{
					label: 'Senior',
					value: 'senior'
				},
				{
					label: 'Badass',
					value: 'badass'
				}
			],
			required: true
		},
		{
			label: 'Programming Lanuages',
			type: 'checkbox',
			model: 'person.test.testing.tested.languages',
			options: [
				{
					label: 'Java',
					value: 'Java'
				},
				{
					label: 'JavaScript',
					value: 'JavaScript'
				},
				{
					label: 'C++',
					value: 'C++'
				},
				{
					label: 'Python',
					value: 'Python'
				}
			],
			required: true
		},
		{
			label: 'Country',
			type: 'select',
			multiple: false,
			model: 'person.country',
			required: true,
			optionsExpression: 'country.name for country in countries'
		},
		{
			label: 'Select Cool Bands',
			type: 'select',
			multiple: true,
			model: 'person.favoriteBands',
			required: true,
			optionsExpression: 'band.name for band in bands'
		}
	];

	$scope.addField = function() {
		var field = {
			label: 'Another Input',
			type: 'text',
			model: 'person.ballsack',
			placeholder: 'Enter something',
			required: false
		};

		$scope.fields.push(field);
	};
}