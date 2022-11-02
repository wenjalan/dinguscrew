import * as dotenv from 'dotenv'
import CommandManager from './command/CommandManager'
import KickWatcher from './KickWatcher'
import someone from './command/someone'
import { Client, CommandInteraction, GatewayIntentBits } from 'discord.js'
import Command from './command/Command'
import jared from './command/jared'
dotenv.config()

const commands: Command[] = [
  someone,
  jared
]

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
  ],
})

CommandManager.registerGuildCommands(
  process.env.TOKEN as string,
  process.env.CLIENT_ID as string,
  process.env.GUILD_ID as string,
  commands
).then(() => {
  console.log(`Refreshed ${commands.length} guild commands`);
}).catch((err) => {
  console.error(`Could not refresh guild commands: ${err}`)
})

KickWatcher.attach(client, process.env.GUILD_ID as string)

client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    try {
      await handleCommand(interaction as CommandInteraction)
    } catch (err) {
      console.error(`Error handling command: ${err}`);
    }
  }
})

async function handleCommand(interaction: CommandInteraction) {
  switch (interaction.commandName) {
    case 'someone':
      await someone.execute(interaction)
      break
    case 'jared':
      await jared.execute(interaction)
      break
    default:
      throw new Error(`Unrecognized command: ${interaction.commandName}`)
  }
}

client.on('ready', () => {
  client.user ? console.log(`Logged in as ${client.user.tag}!`) : console.error('No user found!')
})

client.login(process.env.TOKEN)