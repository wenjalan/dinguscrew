import { CommandInteraction, GuildMember, InteractionResponse, PermissionsBitField, SlashCommandBuilder, SlashCommandUserOption, TextBasedChannel, TextChannel, User } from "discord.js";

const json = new SlashCommandBuilder()
  .setName('jared')
  .setDescription('Kicks and reinvites a member')
  .addUserOption(o => o
    .setName("member")
    .setDescription("The member to kick")
    .setRequired(true)
  )
  .toJSON()

const execute = async (interaction: CommandInteraction) => {
  const instigator = interaction.member as GuildMember
  const victim = interaction.options.getUser('member') as User
  const channel = await interaction.channel?.fetch() as TextChannel
  const invite = await channel.createInvite({ maxUses: 1 })

  if (!instigator.permissions.has(PermissionsBitField.Flags.KickMembers)) {
    await interaction.reply('You aren\'t authorized.')
    return
  }

  await victim.send(invite.toString())

  try {
    await interaction.guild?.members.kick(victim, `Kicked by ${interaction.user.username}`)
    await interaction.reply(`Kicked ${victim}`)
  } catch (err) {
    await interaction.reply(`Error kicking ${victim}: ${err}`)
  }
}

const jared = {
  json: json,
  execute: execute
}

export default jared