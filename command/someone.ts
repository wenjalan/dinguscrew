import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "./Command";

const json = new SlashCommandBuilder()
  .setName('someone')
  .setDescription('Chooses a random member in this text channel')
  .toJSON()

const execute = async (interaction: CommandInteraction) => {
  const members = await interaction.guild?.members.fetch()
  const humans = members?.filter(m => !m.user.bot)
  const victim = humans?.random()
  await interaction.reply(`${victim?.user}`)
}

const someone: Command = {
  json: json,
  execute: execute
}

export default someone