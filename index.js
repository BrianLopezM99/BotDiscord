const {Client, MessageEmbed} = require('discord.js');
// const client = new Client();

const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const { loadCommands } = require('./utils/loadCommands');
const DisTube = require('distube')

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))

require('./utils/loadEvents')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

loadCommands(client);


client.on('ready', () => {
    console.log('client ready '+client.user.tag);
    client.user.setPresence( {
        activity: {
            name: `QueTeImportaBoludo | puto puto`,
            type: "PLAYING"
        },
        status: "online"
     });

    console.log(client.user.presence.status);

    // const findChannel = client.channels.find(channel => channel.name === 'lobby');
    // console.log(findChannel);
});

client.on('message', message => {
    //reciviendo el mensaje
    console.log(message.content);
    if (message.content === 'puto'){
        message.reply('puto el que lo lea');
    }
    
    if (message.content === 'hola'){
        message.reply('hola gei <3');
    }

    if(message.content === '¡ping'){
        let ping = Math.floor(message.client.ws.ping);
        
        const embed = new MessageEmbed()
                .setColor(0x66b3ff)
                .setTitle('Pinga')
                .setDescription('El ping es '+ping+' asi que ya deja de joder')

            message.channel.send(embed);
        
    }


    if(message.content === '¡info'){
        var server = message.guild;
        const embed = new MessageEmbed()
            .setThumbnail(server.iconURL())
            .setAuthor(server.name, server.iconURL())
            .addField('ID', server.id, true)
            .addField('Region', server.region, true)
            .addField('Creado el', server.joinedAt.toDateString(), true)
            .addField('Dueño del Servidor', server.owner.user.tag +'('+server.owner.user.id +')', true)
            .addField('Miembros', server.memberCount, true)
            .addField('Roles', server.roles.size, true)
            .setColor(0x66b3ff)
    
        message.channel.send(embed);
    }

    if (message.content === '¡belleza'){
        const embed = new MessageEmbed()
                .setTitle('Titulo')
                .setColor(0xff0000)
                .setImage('https://media1.tenor.com/images/ccc348fa40cb438db9a3d9e6c6a4ec9e/tenor.gif?itemid=18884450')
                .setDescription('Apreciala pvto');

        message.channel.send(embed);
    }

    if(message.content === '¡avatar'){
        const embed = new MessageEmbed()
            .setImage(message.author.displayAvatarURL())
            .setTitle('Este es tu avatar bb')
            .setDescription('Puto el que lo lea')
            .setColor(0x00FF00);

        message.channel.send(embed);
    }

    if (message.content === '¡clearmsg'){
        if(message.member.hasPermission('ADMINISTRATOR')){
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results);
            })
        }
    }
    
    if(message.content === '¡spam'){
        t=1;
        inter = setInterval(function(){
            const embed = new MessageEmbed()
            .setImage('https://nimg.taadd.com/logo/16/Please_Don_t_Bully_Me_Nagatoro_version_Hentai_.jpg')
            .setTitle('SPAM')
            .setDescription('Puto el que lo lea')
            .setColor(0x00FF00);

        message.channel.send(embed);
        }, 1000, "Spam");
    }

});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if(!channel) return;
    channel.send(`Bienvenid@ a este basurero, ${member}`);
})

client.login('ODAxNjUxNDQ0ODIyNDQyMDA0.YAjyFg.Rp6CWSOJxeuVQyE31naPUCFXf6w');
