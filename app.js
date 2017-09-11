// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame(`on www.acolytesgaming.com`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping") {
     // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
     //The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
     m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
   }

  if(command === "acogames") {
    const embed = new Discord.RichEmbed()
  .setTitle("What Games are Acolytes In?")
  .setAuthor("Acolytes Gaming", "https://i.imgur.com/Sdz6U8i.png")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription("Please visit our Acolyte Games list on our website for the latest information! [Click Here To Go To Our Site](http://www.acolytesgaming.com/index.php?threads/acolyte-game-approach-and-list.722/)")
  .setFooter("© Acolytes Gaming 2017", "https://i.imgur.com/Sdz6U8i.png")


  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("http://www.acolytesgaming.com")
  .addField("Ashes of Creation", "Contacts: Eragus, Kensidian", true)
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField("Black Desert", "Contacts: Shamrod, Xaw", true)
  .addField("Camelot Unchained", "Contacts: Icedern, Valdi", true)
  .addField("Chronicles of Elyria", "Leaderhip Spots Available", true)
  .addField("Crowfall", "Leadership Spot Available", true)
  .addField("Dauntless", "Contact: Cyngus", true)
  .addField("ElderScrolls Online", "Contact: DrChronic", true)
  .addField("Guild Wars 2", "Server is Gates of Madness", true)
  .addField("Pantheon", "Leadership Spot Available", true)
  .addField("Star Citizen", "Contact: Wraithen", true);

  message.channel.send({embed});
  };
});



  // Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  console.log(`New User ${member.user.tag} aka ${member.user.username} has joined`);
    const channel = member.guild.channels.find('name', 'z_log_memberjoins');

    // Send the message, mentioning the member
    channel.send(`${member.user.tag} aka ${member.user.username} joined on ${new Date()}`);
 });

  // Create an event listener for guild members leaving
client.on('guildMemberRemove', member => {
  console.log(`User ${member.user.tag} aka ${member.user.username} has left`);
    const channel = member.guild.channels.find('name', 'z_log_memberleaves');

    // Send the message to a designated channel on a server:
    channel.send(`${member.user.tag} aka ${member.user.username} left on ${new Date()}`);
  });


 // Tracks when someone adds a Reaction in Discord
 client.on('messageReactionAdd', (messageReaction, user) => {
   console.log(`User ${user.username} added a reaction`);
    const channel = messageReaction.message.guild.channels.find('name', 'z_log_reactions');

    channel.send(`User ${user.username} added ${messageReaction.emoji} in ${messageReaction.message.channel} on ${new Date()}`);
 });







client.login(config.token);
