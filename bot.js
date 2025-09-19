const mineflayer = require('mineflayer')
const env = require('dotenv').config()

const bot = mineflayer.createBot({
  host: env.parsed.HOST,
  port: env.parsed.PORT,
  username: env.parsed.USERNAME,
  version: env.parsed.VERSION
})

// When the bot joins the game
bot.on('spawn', () => {
  bot.chat('Hello, I just joined!')
})

// Handle errors
bot.on('error', (err) => console.log(err))
bot.on('end', () => console.log('Bot disconnected'))
