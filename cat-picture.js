const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const API_KEY = process.env['API_KEY']

async function execute() {
	try {
		const response = await axios.get('https://api.thecatapi.com/v1/images/search?mime_types=gif', {
			headers: {
				'x-api-key': API_KEY
			}
		});
		return response.data[0].url;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to get cat image :(');
	}
}

module.exports = { execute };

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat-gif')
		.setDescription('Let me show you a random cat GIF!'),
	async execute(interaction) {
		try {
			const imageUrl = await execute();
			const catPicture = new EmbedBuilder()
				.setTitle('Meow!')
				.setColor('#0d5c56')
				.setImage(imageUrl);
			await interaction.reply({ embeds: [catPicture] });
		} catch (error) {
			console.error(error);
			await interaction.reply('Failed to get cat image :(');
		}
	},
};