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
		model: 'ng-model to bind to'
		placeholder: 'placeholder text (reserved for inputs/textareas)',
		required: 'true/false',
		order: 'order in which to display to field with respect to the other fields'
	}
*/


function indexCtrl($scope) {
	$scope.person = {};

	$scope.fields = [
		{
			label: 'Name',
			type: 'text',
			model: 'person.name',
			placeholder: 'Enter text here',
			required: false,
			order: 0
		},
		{
			label: 'Email',
			type: 'email',
			model: 'person.email',
			placeholder: 'Enter email here',
			required: true,
			order: 1
		},
		{
			label: 'Website',
			type: 'url',
			placeholder: 'Enter url here',
			model: 'person.website',
			required: true,
			order: 2
		},
		{
			label: 'About Me',
			type: 'textarea',
			model: 'person.description',
			placeholder: 'Enter text here',
			required: true,
			order: 3
		},
	];
}