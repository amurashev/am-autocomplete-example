require("babel-core");
require("babel-polyfill");

const fs = require('fs');
const path = require('path');

const firstNameMale = require("../fixtures/firstName/male");
const firstNameFemale = require("../fixtures/firstName/female");
const lastNameMale = require("../fixtures/lastName/male");
const lastNameFemale = require("../fixtures/lastName/female");
const middleNameMale = require("../fixtures/middleName/male");
const middleNameFemale = require("../fixtures/middleName/female");

const MALE = 'male';
const FEMALE = 'female';
const FIRST_NAME = 'firstName';
const LAST_NAME = 'lastName';
const MIDDLE_NAME = 'middleName';

const OUTPUT_DIR = path.resolve('output');


const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomId = () => {
	return parseInt(new Date().getUTCMilliseconds() * Math.random() * 1000);
};

const getRandomData = () => {
	const beginUnix = 1439629372;
	const endUnix   = 1488186172;
	return getRandomNumber(beginUnix, endUnix);
};

const getRandomCardNumber = () => {
	const begin = 10000000;
	const end   = 99999999;
	return getRandomNumber(begin, end);
};


const getRandomName = (type, gender) => {
	const data = {
		[FIRST_NAME]: {
			male: firstNameMale,
			female: firstNameFemale
		},
		[LAST_NAME]: {
			male: lastNameMale,
			female: lastNameFemale
		},
		[MIDDLE_NAME]: {
			male: middleNameMale,
			female: middleNameFemale
		}
	};
	
	if(data[type] && data[type] && data[type][gender]) {
		const len = data[type][gender].length;
		const num = getRandomNumber(0, len - 1);			
		return data[type][gender][num];
	} else {
		throw new Error('Incorrect input value');
	}
};

const getRandomGender = () => {
	return Math.random() > 0.5 ? MALE : FEMALE;
};

const getRandomPurchase = ({ cardNumber }) => {

	const sum = getRandomNumber(200, 50000);
	const discount = (sum * getRandomNumber(0.05, 0.75)).toFixed(2);

	return {
		id: getRandomId(),     //идентификатор(уникальный)
		cardNumber,            //номер примененной карты
		date: getRandomData(), //дата покупки со временем
		sum,                   //сумма покупки в рублях
		discount               //сумма скидки в рублях(не может быть больше или равно сумме покупки)
	}
};


const getRandomUser = () => {

	const gender = getRandomGender();

	return {
		id: getRandomId(),                               //идентификатор(уникальный)
		firstName: getRandomName(FIRST_NAME, gender),    //имя
		lastName: getRandomName(LAST_NAME, gender),      //фамилия
		middleName: getRandomName(MIDDLE_NAME, gender),  //отчество
		cardNumber: getRandomCardNumber()                //номер карты(уникальный, например последовательность из 8 цифр)
	}
};

const writeJSONData = (name, data) => {
	fs.writeFile(path.join(OUTPUT_DIR, name + '.json'), JSON.stringify(data), (writeErr) => {
		if(writeErr) {
			throw writeErr;
		} 		
	});
};

const dataGenerator = () => {

	const USERS_COUNT = 100;
	var users = [];
	var purchases = [];

	for(var i = 0; i <= USERS_COUNT; i++) {
		
		var user = getRandomUser();
		users.push(user);
		
		let purchaseCount = getRandomNumber(1, 10);

		for(var purchase = 0; purchase <= purchaseCount; purchase++) {
			purchases.push(getRandomPurchase({ cardNumber: user.cardNumber }))
		}
	}
	
	fs.access(OUTPUT_DIR, (err) => {
		if(err) {
			throw err;
		} else {
			writeJSONData('users', users);
			writeJSONData('purchases', purchases);
		}		
	});	
	
};

dataGenerator();
