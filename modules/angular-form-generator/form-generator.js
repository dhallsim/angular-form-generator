'use strict';

var formGenerator = angular.module('formGeneratorModule', []);

formGenerator.factory('FormFactory', function() {
  var formFactory = {};

	formFactory.getForm = function(fields) {
		var html = '';

		if (!fields || !fields.length) {
			return '';
		}

		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];

			if (field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'telephone' || field.type === 'url' || field.type === 'password') {
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
		}

		return html;
	};

	function getInputHtml(obj) {
		if (!obj) return '';
		var inputHtml = '';
		inputHtml += getLabelHtml(obj.label);
		inputHtml += '<input type="' + obj.type + '" ' +
					        'placeholder="' + obj.placeholder + '" ' +
					        'ng-required="' + obj.required + '" ' +
					        'ng-model="' + obj.model + '" ' +
					  '/>';
		return inputHtml;
	}

	function getTextareaHtml(obj) {
		if (!obj) return '';
		var textareaHtml = '';
		textareaHtml += getLabelHtml(obj.label);
		textareaHtml += '<textarea placeholder="' + obj.placeholder + '" ' +
							      'ng-required="' + obj.required + '" ' +
							      'ng-model="' + obj.model + '" ' +
						'></textarea>';
		return textareaHtml;
	}

	function getRadioHtml(obj) {
		if (!obj) return '';
		var radioHtml = '';
		radioHtml += getLabelHtml(obj.label);
		for (var i = 0; i < obj.options.length; i++) {
			radioHtml += '<input type="radio" ' +
								'value="' + obj.options[i].value + '" ' +
								'ng-model="' + obj.model + '"' +
						 '/>' + obj.options[i].label;
		}	
		return radioHtml;
	}

	function getSingleCheckboxHtml(obj) {
		if (!obj) return '';
		var checkboxHtml = '';
		checkboxHtml += '<input type="checkbox" ' +
							   'ng-model="' + obj.model + '"' +
						'/>' + obj.label;
		return checkboxHtml;
	}

	function getArrayCheckboxHtml(obj) {
		if (!obj) return '';
		var checkboxHtml = '';
		checkboxHtml += getLabelHtml(obj.label);
		for (var i = 0; i < obj.options.length; i++) {
			checkboxHtml += '<input type="checkbox" ' +
						           'ng-click="addToCheckboxArray(\'' + obj.options[i].value + '\', \'' + obj.model + '\')"' + 
							'/>' + obj.options[i].label;
		}
		return checkboxHtml;
	}

	function getSelectHtml(obj) {
		if (!obj) return '';
		var selectHtml = '';
		selectHtml += getLabelHtml(obj.label);
		selectHtml += '<select ng-model="' + obj.model + '" ' +
							  'ng-required="' + obj.required + '" ' +
							  'ng-options="' + obj.optionsExpression + '" ';
		selectHtml += (obj.multiple) ? 'multiple' : '';
		selectHtml += '></select>';
		return selectHtml;
	}

	function getLabelHtml(labelText) {
		if (!labelText) return '';
		var labelHtml = '<label>' + labelText + '</label>';
		return labelHtml;
	}

	return formFactory;
});

formGenerator.directive('formGenerator', function($compile, FormFactory) {
	var linker = function(scope, elm, attrs) {
		var fields = scope.$eval(attrs.formFields);
		var formHtml = FormFactory.getForm(fields);
		elm.html(formHtml);
		$compile(elm.contents())(scope);


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

			if (list.contains(value)) {
				list.remove(value);
			} else {
				list.push(value);
			}
		};

	};

	return {
		restrict: 'E',
		replace: true,
		scope: true,
		link: linker
	}
});

// Remove these and implement differently. Prototypes on native objects are terrible.
Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] == obj) return true;
	}
	return false;
};

Array.prototype.remove = function() {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};