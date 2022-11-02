import { Client, GuildMember } from 'discord.js'

const users: Record<string, string[]> = {}

function onGuildMemberLeave(member: GuildMember) {
  const roleIds: string[] = []
  member.roles.cache.forEach(role => roleIds.push(role.id))
  users[member.id] = roleIds
}

function onGuildMemberJoin(member: GuildMember) {
  if (!users[member.id]) {
    return
  }
  try {
    users[member.id].forEach(async role => {
      // workaround to not add default role
      if (role !== '175372417194000384') {
        await member.roles.add(role)
      }
    })
  } catch (err) {
    console.error(`Error giving ${member} roles: ${err}`);
  }
}

function attach(client: Client, guildId: string) {
  client.on('guildMemberRemove', (member) => {
    if (member.guild.id !== guildId) return
    onGuildMemberLeave(member as GuildMember)
  })
  client.on('guildMemberAdd', (member) => {
    if (member.guild.id !== guildId) return
    onGuildMemberJoin(member as GuildMember)
  })
}

export default {
  attach
}