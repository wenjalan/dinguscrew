import Command from './Command'
import { REST, Routes } from 'discord.js'

async function registerGuildCommands(token: string, clientId: string, guildId: string, commands: Command[]) {
  const restClient = new REST({ version: '10' }).setToken(token)
  await restClient.put(
    Routes.applicationGuildCommands(clientId, guildId),
    {
      body: commands.map(c => c.json)
    }
  )
}

export default { registerGuildCommands }