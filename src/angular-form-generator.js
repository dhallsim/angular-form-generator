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

var FormFactory = function() {
	var groupMap = {};

	function isInputType(type) {
		return (type === 'text' || type === 'email' || type === 'number' || type === 'telephone' || type === 'url' || type === 'password');
	}

	function getInputHtml(obj) {
		if (!obj || !angular.isObject(obj)) return '';

		var inputHtml = '';
		inputHtml += '<input '; 
		inputHtml += getAttributeStr('type', obj.type);
		inputHtml += getAttributeStr('placeholder', obj.placeholder);
		inputHtml += getAttributeStr('ng-required', obj.required);
		inputHtml += getAttributeStr('ng-model', obj.model);
		inputHtml += getClassesStr(obj.classes);
		inputHtml += getAttributesStr(obj.attributes);
		inputHtml += '/>';

		return decorateWithLabel(obj.label, inputHtml);
	}

	function getTextareaHtml(obj) {
		if (!obj || !angular.isObject(obj)) return '';

		var textareaHtml = '';
		textareaHtml += '<textarea ';
		textareaHtml += getAttributeStr('placeholder', obj.placeholder);
		textareaHtml += getAttributeStr('ng-required', obj.required);
		textareaHtml += getAttributeStr('ng-model', obj.model);		
    	textareaHtml += getClassesStr(obj.classes);
    	textareaHtml += getAttributesStr(obj.attributes);
		textareaHtml += '></textarea>';

		return decorateWithLabel(obj.label, textareaHtml);
	}

	function getRadioHtml(obj) {
		if (!obj || !angular.isObject(obj)) return '';

		var radiosHtml = '';
		for (var i = 0; i < obj.options.length; i++) {
			var radioHtml = '';
			radioHtml += '<input ';
			radioHtml += getAttributeStr('type', 'radio');
			radioHtml += getAttributeStr('value', obj.options[i].value);
			radioHtml += getAttributeStr('ng-model', obj.model);
			radioHtml += '/>';
			radioHtml = decorateWithLabel(obj.options[i].label, radioHtml);

			var radioGroup = groupMap[obj.options[i].group];
			if (radioGroup) {
				var groupHtml = '';
				groupHtml += '<div ';
				groupHtml += getClassesStr(radioGroup.classes);
				groupHtml += getAttributeStr(radioGroup.attributes);
				groupHtml += '>';

				radioHtml = (groupHtml + radioHtml);
				radioHtml += '</div>';
			}

			radiosHtml += radioHtml;
		}

		return decorateWithLabel(obj.label, radiosHtml);
	}

	function getSingleCheckboxHtml(obj) {
		if (!obj || !angular.isObject(obj)) return '';

		var checkboxHtml = '';
		checkboxHtml += '<input ';
		checkboxHtml += getAttributeStr('type', 'checkbox');
		checkboxHtml += getAttributeStr('ng-model', obj.model);
		checkboxHtml += '/>';

		return decorateWithLabel(obj.label, checkboxHtml);
	}

	function getArrayCheckboxHtml(obj) {
		if (!obj || !angular.isObject(obj)) return '';

		var checkboxesHtml = '';
		for (var i = 0; i < obj.options.length; i++) {
			var checkboxHtml = '';
			checkboxHtml += '<input ';
			checkboxHtml += getAttributeStr('type', 'checkbox');
			checkboxHtml += getAttributeStr('ng-click', 'addToCheckboxArray(\'' + obj.options[i].value + '\', \'' + obj.model + '\')');
			checkboxHtml += '/>';
			checkboxHtml = decorateWithLabel(obj.options[i].label, checkboxHtml);

			var checkboxGroup = groupMap[obj.options[i].group];
			if (checkboxGroup) {
				var groupHtml = '';
				groupHtml += '<div ';
				groupHtml += getClassesStr(checkboxGroup.classes);
				groupHtml += getAttributeStr(checkboxGroup.attributes);
				groupHtml += '>';	

				checkboxHtml = (groupHtml + checkboxHtml);
				checkboxHtml += '</div>';
			}

			checkboxesHtml += checkboxHtml;
		}

		return decorateWithLabel(obj.label, checkboxesHtml);
	}

	function getSelectHtml(obj) {
		if (!obj || !angular.isObject(obj)) return '';

		var selectHtml = '';
		selectHtml += '<select ';
		selectHtml += getClassesStr(obj.classes);
		selectHtml += getAttributeStr('ng-model', obj.model);
		selectHtml += getAttributeStr('ng-required', obj.required);
		selectHtml += getAttributeStr('ng-options', obj.optionsExpression);
		selectHtml += (obj.multiple) ? 'multiple' : '';
		selectHtml += '></select>';

		return decorateWithLabel(obj.label, selectHtml);
	}

	function decorateWithLabel(labelObj, html) {
		if (!labelObj || !angular.isObject(labelObj)) {
			return html;
		}

		return (labelObj.wrapField) ? (wrapWithLabel(labelObj, html)) : (getLabelHtml(labelObj) + html);
	}

	function getLabelHtml(obj) {
		if (!obj || !angular.isObject(obj) || !obj.name) return '';

		var labelHtml = '<label ';
		labelHtml += getClassesStr(obj.classes);
		labelHtml += getAttributesStr(obj.attributes);
		labelHtml += '>' + obj.name + '</label>';

		return labelHtml;
	}

	function wrapWithLabel(labelObj, fieldHtml) {
		if (!labelObj || !angular.isObject(labelObj) || !labelObj.name) return '';

		var html = '<label ';
		html += getClassesStr(labelObj.classes);
		html += getAttributesStr(labelObj.attributes);
		html += '>' + labelObj.name + ' ';
		html += fieldHtml;
		html += '</label>';

		return html;	
	}

	function getClassesStr(classArr) {
		classArr = classArr || [];

		var str = 'class="';
		for (var i = 0; i < classArr.length; i++) {
			if (i != 0) {
				str += ' '; 
			}
			str += classArr[i];
		}
		str += '" ';

		return str;	
	}

	function getAttributesStr(attrsObj) {
		attrsObj = attrsObj || {};

		var str = '';
		for (var key in attrsObj) {
			str += getAttributeStr(key, attrsObj[key]) + ' ';
		}

		return str;
	}

	function getAttributeStr(key, value) {
		if (!key || !value) return '';
		return key + '="' + value + '"';
	}

	this.getForm = function(form) {
		if (!form) {
			return '';
		}

		var fields = form.fields || [];
		var groups = form.groups || [];

		// Builing map for easy retrieval
		groupMap = {};
		for (var g = 0; g < groups.length; g++) {
			groupMap[groups[g].id] = groups[g];
		}

		// Build form
		var html = '<form ';
		html += getClassesStr(form.classes);
		html += getAttributesStr(form.attributes);
		html += '>';

		if (!fields || !fields.length) {
			return '';
		}

		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			field.classes = field.classes || [];

			// Get group for field (if applicable)
			var fieldGroup = groupMap[field.group];

			// Build out group
			if (fieldGroup) {
				html += '<div ';
				html += getClassesStr(fieldGroup.classes);
				html += getAttributesStr(fieldGroup.attributes);
				html += '>';
			}

			if (isInputType(field.type)) {
				html += getInputHtml(field);
			} else if (field.type === 'textarea') {
				html += getTextareaHtml(field);
			} else if (field.type === 'radio') {
				html += getRadioHtml(field);
			} else if (field.type === 'checkbox') {
				html += (angular.isDefined(field.options) && (field.options instanceof Array)) ? getArrayCheckboxHtml(field) : getSingleCheckboxHtml(field);
			} else if (field.type === 'select') {
				html += getSelectHtml(field);
			} else {
				console.warn('Type of ' + field.type + ' not supported.');
			}

			if (fieldGroup) {
				html += '</div>';
			}
		}

		html += '</form>';

		return html;
	};
};

angular.module('formGenerator', []).
directive('formGenerator', function($compile) {
	var linker = function(scope, elm, attrs) {
		scope.form = scope.$eval(attrs.form);
		var formFactory = new FormFactory();

		scope.addToCheckboxArray = function(value, model) {	
			var list = scope.$eval(model);

			if (!(list instanceof Array)) {
				var props = model.split('.');
				var currentObj = scope[props[0]];
				var finalProp = props[props.length -1];

				for (var i = 1; i < props.length - 1; i++) { 
					var objLoop = currentObj[props[i]];
					
					if (objLoop === undefined) {
						var propName = props[i];
						currentObj[propName] = {};
						objLoop = currentObj[propName];
					}
					
					currentObj = objLoop;
				}

				list = [];
				currentObj[finalProp] = list;
			}

			if (contains(list, value)) {
				var index = list.indexOf(value);
				if (index !== -1) {
					list.splice(index, 1);
				}
			} else {
				list.push(value);
			}
		};

		scope.compileForm = function() {
			var formHtml = formFactory.getForm(scope.form);
			elm.html(formHtml);
			$compile(elm.contents())(scope); 
		};
		scope.compileForm();


		scope.$watch('form', function(newValue, oldValue) {
			if (newValue) {
				scope.compileForm();
			}
		}, true);

		function contains(a, obj) {
			var i = a.length;

			while (i--) {
				if (a[i] === obj) {
					return true;
				}
			}
			
			return false;
		}
	};

	return {
		restrict: 'EA',
		replace: true,
		scope: true,
		link: linker
	}
});