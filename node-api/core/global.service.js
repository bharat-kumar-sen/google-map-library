/**
 * Name: Global.services.
 * @description : Here is define some common and global function.
 */

const async = require('async');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

/**
 * Name : prepareEmailData(): 
 * Description : This method will prepare data for email.
 * @param {*} EmailConfig is mail info.
 */
exports.prepareEmailData = (EmailConfig, callBack) => {
	async.waterfall([
		(cb) => {
			/** Get email messages template by template path*/
			exports.getEmailMessages(EmailConfig.templatePath, (err, html) => {
				if (err) {
					cb(true, null);
				} else {
					cb(null, html);
				}
			})
		},
		(messages, cb) => {
			if (messages) {
				/**this function call for replace marker under email messages*/
				exports.replaceMarker(EmailConfig.markerData, messages, (err, html) => {
					if (err) {
						cb(true, null);
					} else {
						EmailConfig.html = html;
						cb(null, html);
					}
				})
			} else {
				cb(null, true);
			}
		},
		(messages, cb) => {
			if (messages) {
				/** finally call send email service for send email */
				exports.emailSend(EmailConfig, function () {
					cb(null, true)
				})
			} else {
				cb(null, true)
			}
		}
	], (error, finalResp) => {
		callBack();
	})
}

/**
 * Name : replaceMarker(): 
 * Description : This method will replace marker in email messages template.
 * @param {*} markerData is no of marker To be replicated.
 * @param {*} messages is mail message Where to replace marker.
 * @return it will return complete messages for email 
 */
exports.replaceMarker = (markerData, messages, callBack) => {
	var keys = Object.keys(markerData);
	async.forEach(keys, (key, cb) => {
		var marker = '##' + key.toUpperCase() + '##';
		messages = messages.replace(new RegExp(marker, 'g'), markerData[key]);
		cb();
	}, () => {
		callBack(null, messages);
	})
}

/**
 * Name : getEmailMessages(): 
 * Description : This method will get email message content behalf template path.
 * @param {*} templatePath is email messages content path.
 * @return it will return email messages content
 */
exports.getEmailMessages = (templatePath, callback) => {
	fs.readFile(templatePath, {
		encoding: 'utf-8'
	}, function (err, html) {
		if (err) {
			console.log('get email messages error', err);
			callback(err, null);
		} else {
			callback(null, html);
		}
	});
}

/**
 * Name : emailSend(): 
 * Description : This method will send email.
 * @param {*} emailData is email config and user info who to send.
 * @return it will return nothing 
 */
exports.emailSend = async (emailData, mainCb) => {
	sgMail.setApiKey(process.env.SEND_GRID_API);
	const msg = {
		from: process.env.SEND_GRID_FROM_EMAIL,
		to: emailData.email,
		subject: emailData.subject,
		html: emailData.html
	};
	var sendEamilResponse = await sgMail.send(msg);
	console.log("Message sent: %s", JSON.stringify(sendEamilResponse));
	mainCb();
}

/**
 * Name : capitalize(): 
 * Description : This method will capitalize of first word.
 * @param {*} s is Word info.
 * @return it will return word with capitalize 
 */
exports.capitalize = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}



exports.changeStringTotime = (string) => {
	const time = string.split('');
	return time[0] + '' + time[1] + ':' + time[2] + '' + time[3];
}