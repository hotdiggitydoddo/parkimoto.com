/**
 * ContactController
 *
 * @description :: Server-side logic for managing Contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');

module.exports = {
	send: function(req, res) {

		request({
			uri: "https://www.google.com/recaptcha/api/siteverify",
			method: "POST",
			form: {
				secret: "6Ld_8xATAAAAAOgBucGdRnttu4OKtUNeOirMh9VB",
				response: req.param('captcha')
			}
		}, function(error, response, body) {
			console.log(body);
			var result = JSON.parse(body)
			console.log(result.success);
			if (!result || !result.success)
				return res.badRequest();

			sails.hooks.email.send(
				"testEmail", {
					recipientName: "Lisa",
					senderName: req.param('contactForm').name,
					senderEmail: req.param('contactForm').email,
					body: req.param('contactForm').body
				}, {
					to: "parkimotoevents@gmail.com",
					subject: "New message from parkimoto.com"
				},
				function(err) {
					console.log(err || "It worked!");
				}
			)
			res.ok();
		});
	}
};
