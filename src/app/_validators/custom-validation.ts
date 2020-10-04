import { FormControl, ValidatorFn } from '@angular/forms';
import { errorMessages } from './errorMessages';

export class CustomValidation {
	static validateEmail(c: FormControl) {
		let EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (c.value) {
			return EMAIL_REGEXP.test(c.value) ? null : {
				pattern: {
					valid: false
				}
			};
		} else {
			return null;
		}
	}

	static validatePassword(control: FormControl) {
		let matchedPattern = 0;
		if (control) {
			if (control.value) {
				if (control.value !== '' && control.value.length >= 8 && control.value.length <= 32) {
					const upperRgx = /[A-Z]+/;
					if (upperRgx.test(control.value)) {
						matchedPattern++;
					}
					const lowerRgx = /[a-z]+/;
					if (lowerRgx.test(control.value)) {
						matchedPattern++;
					}
					const rgx = /[!@#$%^&*(),.?":{}|<>]/;
					if (rgx.test(control.value)) {
						matchedPattern++;
					}
					const numRgx = /[0-9]/;
					if (numRgx.test(control.value)) {
						matchedPattern++;
					}
					if (matchedPattern < 4) {
						return {
							invalidPassword: 'Invalid password'
						};
					}
				}
			}
		}
		return null;
	}

	static validateWhiteSpace(control: FormControl) {
		if (control) {
			if (control.value) {
				if (control.value.toString().trim() === '') {
					return {
						required: 'field is required'
					};
				}
			}
		}
		return null;
	}

	static validatePhoneNumber(c: FormControl) {
		let PHONE_REGEXP = /^[0-9]*$/;
		if (c.value) {
			return PHONE_REGEXP.test(c.value) ? null : {
				pattern: {
					valid: false
				}
			};
		} else {
			return null;
		}
	}

	static validateZipCode(c: FormControl) {
		let PHONE_REGEXP = /^[a-zA-Z0-9]+$/;
		if (c.value) {
			return PHONE_REGEXP.test(c.value) ? null : {
				invalidZip: {
					valid: false
				}
			};
		} else {
			return null;
		}
	}

	static validateNumber(c: FormControl) {
		let NUMBER_REGEXP = /^[0-9]*$/;
		if (c.value) {
			return NUMBER_REGEXP.test(c.value) ? null : {
				invalidNumber: 'invalidNumber'
			};
		}
		return null;
	}

	static validateWebsiteUrl(control: any) {
		const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9A-Z]+([\-\.]{1}[a-z0-9A-Z]+)*\.[a-zA-Z]{2,10}(:[0-9]{1,10})?(\/.*)?$/;
		if (control) {
			if (control.value) {
				if (control.value !== '') {
					if (!control.value.match(pattern)) {
						return {
							invalidUrl: 'Website Url invalid'
						};
					}
				}
			}
		}
		return null;
	}

	static hasError(formObj: any, field: string) {
		var error = null;
		//if(formObj.get(field).touched && formObj.get(field).status ==  'INVALID' ){
		if (formObj.get(field).status == 'INVALID') {
			var control = formObj.get(field);
			if (control) {
				if (control.errors) {
					for (var x in control.errors) {
						if (control.errors[x]) {
							error = errorMessages[field][x];
						}
					}
				}
			}
		}
		return error;
	}

	static validateNumberRequired(c: FormControl) {
		if (c.value) {
			if (c.value < 1) {
				return {
					requiredNumber: 'value should not be zero.'
				};
			}
		}
		return null;
	}
	static validateNumberIntegerRequired(c: FormControl) {

		let NUMBER_REGEXP = /^-?[0-9][^\.]*$/;
		if (c.value) {
			return NUMBER_REGEXP.test(c.value) ? null : {
				numberIntegerRequired: 'invalidNumber'
			};
		}
		return null;
	}

	static validateASIN(control: FormControl) {
		let matchedPattern = 0;
		if (control) {
			if (control.value) {
				if (control.value !== '') {
					const upperRgx = /[A-Z|a-z]+/;
					if (upperRgx.test(control.value)) {
						matchedPattern++;
					}
					const numRgx = /[0-9]/;
					if (numRgx.test(control.value)) {
						matchedPattern++;
					}
					if (control.value && control.value[0] && control.value[0].toLocaleLowerCase() === 'b') {
						matchedPattern++;
					}
					if (control.value.length === 10) {
						matchedPattern++;
					}
					if (matchedPattern < 4) {
						return {
							invalidASIN: 'Invalid ASIN'
						};
					}
				}
			}
		}
		return null;
	}
	static max(max: number): ValidatorFn {
		return (control: FormControl): { [key: string]: boolean } | null => {
			let val: number = control.value;
			if (control.pristine || control.pristine) {
				return null;
			}
			if (val <= max) {
				return null;
			}
			return { 'max': true };
		}
	}
	static min(min: number): ValidatorFn {
		return (control: FormControl): { [key: string]: boolean } | null => {
			let val: number = control.value;
			if (control.pristine || control.pristine) {
				return null;
			}
			if (val >= min) {
				return null;
			}
			return { 'min': true };
		}
	}
}
