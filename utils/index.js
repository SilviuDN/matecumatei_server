const mongoose = require('mongoose')

module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    
    isValidIdFormat: id => mongoose.Types.ObjectId.isValid(id),
    handleMongoooseError: err => {
        const errors = []

        if (err instanceof mongoose.Error.ValidationError) {
            Object.values(err.errors).map(elm => errors.push(elm.message))
        } else if (err.code === 11000) {
            errors.push('Un utilizator este deja înregistrat cu acest email sau cu un pseudonim identic.')
            // errors.push('A user is already registered with this email address or with this pseudonim.')
        }

        return errors
    },

    randomToken(length) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    },

	dateFormat: (dateUnix) => {
		const date = dateUnix.toISOString().split('T')[0];
		const time = dateUnix.toISOString().split('T')[1].split(':').splice(0, 2).join(':');
		return { date, time };
	},

	dateReverseFormat: (date, time) => {
		return new Date(date + 'T' + time + ':00.000Z');
	},
}