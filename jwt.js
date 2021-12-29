const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

var i 	= 'PeterTest';    	// Issuer (Software organization who issues the token)
var s 	= 'dudas.peter.ovb@gmail.com';	// Subject (intended user of the token)
var a 	= 'https://ipfamily.hu';	// Audience (Domain within which this token will live and function)
