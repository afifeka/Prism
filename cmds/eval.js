const Discord = require ("discord.js");
const hastebin = require('hastebin-gen');
exports.run = (bot, message) => {
    
    var embed = new Discord.RichEmbed()
  .setTitle("Restricted")
    .setColor("#f45f42")
  .addField("You are restricted from this command", "Its for the bot owners only!")
		
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  const args = message.content.split(" ").slice(1);
  const args2 = message.content.split(' ').slice(1).join(' ');
  
    try {
         var authors = ["265279363199533068", "262410813254402048"];
    if(!authors.includes(message.author.id)) {
    message.channel.send({embed: embed});
    return;
    }
    
    if (!args2) {
      message.channel.send("What do you want me to evaluate?");
      return;
  }
    
        const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")	
        evaled = require("util").inspect(evaled);
        if (clean(evaled).length > 1024 || code.length > 1024) {
        hastebin(`Evaled: ${code}\n\nOutput: \n\n${clean(evaled)}`, "js").then(r => {
          var embed3 = new Discord.RichEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("RANDOM")
          .addField(":warning: I guess the eval was too much! :warning: \nI generated a hastebin link instead! Here you go!", r, true)
          message.channel.send({ embed: embed3 })
})} else {
        var embed2 = new Discord.RichEmbed()
        .setTitle("Evaled:")
        .setColor(randomColor)
        .addField("Evaled: :inbox_tray:",  `\`\`\`js\n${code}\n\`\`\``)
        .addField("Output: :outbox_tray:", `\`\`\`js\n${clean(evaled)}\n\`\`\``)
        message.channel.send({embed : embed2 });
} 
    } catch (err) {
        const code = args.join(" ");
                if (clean(err).length > 1024 || code.length > 1024) {
        hastebin(`Evaled: ${code}\n\nError: \n\n${clean(err)}`, "js").then(r => {
          var embed3 = new Discord.RichEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("RANDOM")
          .addField(":warning: I guess the eval was too much! It also errored! :warning: \nI generated a hastebin link instead! Here you go!", r, true)
          message.channel.send({ embed: embed3 })
})}
      var embed3 = new Discord.RichEmbed()
      .setTitle("ERROR:")
      .setColor("#f44242")
      .addField("Evaled: :inbox_tray:", `\`\`\`js\n${code}\n\`\`\``)
      .addField("Output: :outbox_tray:", `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
      message.channel.send({embed: embed3 });
    }
}

exports.help = {
    name: "eval",
    description: "Evaluates certain JS code",
    usage: "pr!eval <Text-To-Evaluate>",
    note: "Only my developers can use this"
}