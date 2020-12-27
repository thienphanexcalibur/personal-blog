// require inspect to serialize the stdou to JSON format
// Normal stdout will be serialized in webpack process.env
const {inspect} = require('util');
(async function stdou {
	try {
		// Do some async here
		const stdou = await your_actions();

		// jsonify the output first, use inspect to keep JSON format
		// then console.log as node process stdou
		console.log(inspect(JSON.stringify(stdou)));
	} catch(err) {
		// Dont forget to catch errors! ;)
		console.log(err);
	}
})();
