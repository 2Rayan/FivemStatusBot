//* ███████╗ █████╗ ██╗      ██████╗ ██████╗ ███╗   ██╗    ██████╗ ███████╗██╗   ██╗
//* ██╔════╝██╔══██╗██║     ██╔════╝██╔═══██╗████╗  ██║    ██╔══██╗██╔════╝██║   ██║
//* █████╗  ███████║██║     ██║     ██║   ██║██╔██╗ ██║    ██║  ██║█████╗  ██║   ██║
//* ██╔══╝  ██╔══██║██║     ██║     ██║   ██║██║╚██╗██║    ██║  ██║██╔══╝  ╚██╗ ██╔╝
//* ██║     ██║  ██║███████╗╚██████╗╚██████╔╝██║ ╚████║    ██████╔╝███████╗ ╚████╔╝ 
//* ╚═╝     ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═════╝ ╚══════╝  ╚═══╝  

/**
 * ! ما تفهم في البرمجة لا تعدل
 * ! ما تفهم في البرمجة لا تعدل
 * ! ما تفهم في البرمجة لا تعدل
 * ! ما تفهم في البرمجة لا تعدل
*/


const config = require("./config.js");
const { MessageEmbed, MessageButton, MessageActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } = require('discord.js');
const cfx = require('cfx-api');
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
       Discord.Intents.FLAGS.GUILDS,
       Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
  });

var prefix = config.prefix

let interval;

client.on('ready', () => {
    interval = setInterval(editor, config.interval)
});


client.on("ready", () => {
    console.log(`\x1b[32m
███████╗ █████╗ ██╗      ██████╗ ██████╗ ███╗   ██╗    ██████╗ ███████╗██╗   ██╗
██╔════╝██╔══██╗██║     ██╔════╝██╔═══██╗████╗  ██║    ██╔══██╗██╔════╝██║   ██║
█████╗  ███████║██║     ██║     ██║   ██║██╔██╗ ██║    ██║  ██║█████╗  ██║   ██║
██╔══╝  ██╔══██║██║     ██║     ██║   ██║██║╚██╗██║    ██║  ██║██╔══╝  ╚██╗ ██╔╝
██║     ██║  ██║███████╗╚██████╗╚██████╔╝██║ ╚████║    ██████╔╝███████╗ ╚████╔╝ 
╚═╝     ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═════╝ ╚══════╝  ╚═══╝`)
    console.log(`\x1b[32m [FALCON] Logged in as ${client.user.tag}!\x1b[0m`)
})

let editor = async () => {
    let embed = new MessageEmbed()

try {
    var liveStatus = await cfx.fetchStatus()
   let time =  ''+ new Date().toLocaleString()+'';
embed.setTitle(`حالة الفايف ام `)
embed.setURL(`https://status.cfx.re/`)
embed.setThumbnail(`${config.largelogo}`)
embed.setFooter('Last Refresh In: '+ time);
embed.setColor(`${config.color}`)
  embed.setTimestamp()    
  embed.addFields({ name: '**بوت لمعرفه حالة الفايف ام**', value: liveStatus.everythingOk ? "🟢 All Systems Operational /  جميع الانظمة تعمل 🟢" : "🔴 Partial System Outage /  انقطاع جزئي في النظام 🔴", inline: true })
  client.user.setActivity(`:)`)

} catch(e) {
    embed.setDescription('حدث خطا: Error: ' + e.message)
      client.user.setActivity(`Error :(`)
}

    const channel = client.channels.cache.get(config.channelid);
    const msg = await channel.messages.fetch(config.messageid);
   msg.edit({embeds: [embed]}).catch(error => { console.log('Error you should report to the Falcon team \n This Error: \n '+ error +'') })
}

client.on('messageCreate', async (message) => {

if(message.content === prefix + 'update') {
    message.delete({ timeout: 3000 })
    if(!message.member.roles.cache.has(`${config.adminrole}`)) return message.reply({ content: `هذا الامر مخصص للادارة فقط`});
    editor().catch(error => {
        console.log('cant edit the message ..')
    })
}

if(message.content === prefix + 'send') {
    if(!message.member.roles.cache.has(`${config.adminrole}`)) return message.reply({ content: `هذا الامر مخصص للادارة فقط`});
    const embed = new MessageEmbed()
    .setTitle("Status message")
    message.channel.send({embeds: [embed]})
    }

    if(message.content === prefix + 'help') {
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('🎧 Bot Make With Falcon Dev')
            .setURL(`https://discord.gg/p5V4Ca7V9U`)
            .setStyle('LINK')
        );

    const embed = new MessageEmbed()
        .setTitle("Help Message / رسالة المساعدة")
        .setColor(`#ffffff`)
        .setTimestamp()
        .setThumbnail(`${config.largelogo}`)
        .setDescription(`**${prefix}cfx - حالة فايف ام \n ${prefix}send - ارسال رسالة الحالة (عشان تحط الايدي في الكونفيق) \n ${prefix}update - تحديث**`)
        message.channel.send({embeds: [embed], components: [row]})
        }

    if(message.content === prefix + 'cfx') {
        var liveStatus = await cfx.fetchStatus()
        const embed = new MessageEmbed()
        .setThumbnail(`${config.server.logo}`)
        .addFields(
            { name: '', value: liveStatus.everythingOk ? "🟢 All Systems Operational /  جميع الانظمة تعمل 🟢" : "🔴 Partial System Outage /  انقطاع جزئي في النظام 🔴", inline: true },
        )
        .setTimestamp()
        .setColor('#f3db13')
        .setFooter(`cfx.re stauts`, config.footer.footerlogo);
        message.channel.send({embeds: [embed]})
        }    
});



    process.on('unhandledRejection', error => {
        console.error('Unhandled promise rejection:', error);
    });
    
    process.on('error',(error,shard) => {
        log(`[FALCON]`,error);
      })
    

client.login(config.token); 

if(config.token === null || config.token === "") {
    console.log('[FALCON] Please Enter Your Token'.red.dim)
}

if(config.messageid === null || config.messageid === "") {
    console.log('[FALCON] Please Enter Your messageid'.red.dim)
}
if(config.channelid === null || config.channelid === "") {
    console.log('[FALCON] Please Enter Your channelid'.red.dim)
}
if(config.adminrole === null || config.adminrole === "") {
    console.log('[FALCON] Please Enter Your adminrole'.red.dim)
}
