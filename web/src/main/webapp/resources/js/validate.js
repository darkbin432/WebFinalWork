/**
 * 	Overall version 1.6
 * 	This version 1.6
 */

function isRealName(value) {
	var name = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/;
	return value.length > 1 && value,length < 7 && name.test(value);
}

function isFax(value) {
	var fax = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
	return value.length === 12 && fax.test(value);
}

function isPostalcode(value) {
	var postalcode = /^(31[0-9]{4})$/;
	return value.length === 6 && postalcode.test(value);
}

function isPhone(value) {
	var phone = /^\d{8}$/;
	return value.length === 8 && phone.test(value);
}

function isMobile(value) {
	var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})|(19[0-9]{9})$/;
	return value.length === 11 && mobile.test(value)
}

function isUsername(value) {
	var name = /^[a-zA-Z0-9_]{5,16}$/;
	return name.test(value);
}

function isPassword(value) {
	var password = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{8,16}$/;
	return password.test(value);

}

function isCardNo(value) {
	var cardNo = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	return cardNo.test(value);
}

function isDigital(value) {
	var digital = /^[0-9]*$/;
	return digital.test(value);
}