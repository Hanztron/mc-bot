const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const env = require('dotenv').config({ quiet: true })

const bot = mineflayer.createBot({
  host: env.parsed.HOST,
  port: env.parsed.PORT,
  username: env.parsed.USERNAME,
  version: env.parsed.VERSION
})

bot.loadPlugin(pathfinder) // Load the pathfinder plugin

// When the bot joins the game
bot.on('spawn', () => {
  console.log('Bot spawned')
  bot.chat('Hello, I just joined!')

  const defaultMove = new Movements(bot) // Create default movement settings

  bot.on('chat', (username, message) => {
    if (username === bot.username) return

    if (message === 'follow me') {
      const player = bot.players[username]?.entity
      if (!player) {
        bot.chat("I can't see you!")
        return
      }
      bot.chat("Okay, I'll follow you!")
      bot.pathfinder.setMovements(defaultMove)
      bot.pathfinder.setGoal(new goals.GoalFollow(player, 1), true)
    }

    if (message === 'stop') {
      bot.chat("Okay, I'll stop following.")
      bot.pathfinder.stop()
    }
  })
})

// Handle errors
bot.on('error', (err) => console.log(err))
bot.on('end', () => console.log('Bot disconnected'))
