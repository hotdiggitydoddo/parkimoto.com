/**
 * ContactController
 *
 * @description :: Server-side logic for managing Contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	send: function(req, res) {
		console.log(req.param('contactForm').name);
		sails.hooks.email.send(
			"testEmail", {
				recipientName: "Lisa",
				senderName: req.param('contactForm').name,
				senderEmail: req.param('contactForm').email,
				body: req.param('contactForm').body
			}, {
				to: "parkimoto@gmail.com",
				subject: "New message from parimoto.com"
			},
			function(err) {
				console.log(err || "It worked!");
			}
		)
		res.ok();
	}
};
