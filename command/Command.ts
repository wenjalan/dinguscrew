import { CommandInteraction, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

export default interface Command {
  json: RESTPostAPIApplicationCommandsJSONBody,
  execute: (interaction: CommandInteraction) => Promise<void>
}