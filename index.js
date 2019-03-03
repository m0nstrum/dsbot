const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const fs = require('fs')
client.login(config.token);
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.commands = new Discord.Collection()
fs.readdir('./commands/', (err, files) => {
    if(err) console.log(err);
    let filess = files.filter(f => f.split('.').pop() === 'js')
if(filess.length <= 0) {
    console.log('Команды не найдены.')
    return
}
    filess.forEach((f, i) => {
        let prop = require(`./commands/${f}`)
        console.log(`${f} загружен!`)
        client.commands.set(prop.help.name, prop)
    })

})
client.on('message', async message => {
 if(message.content.indexOf(config.prefix) !==0) return
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
let commandfilecheck = client.commands.get(command)
    if(commandfilecheck) {
        commandfilecheck.run(client, message, args)
    }
 else {
     message.reply('Команда не найдена!')
    }

});

