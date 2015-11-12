/**
 * ContactController
 *
 * @description :: Server-side logic for managing Contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	send: function(req, res) {
	    console.log(req.param('contactForm').name);
	    res.ok();
	}
};

