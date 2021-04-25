const help = (prefix) => {
	const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
	return `
╭────────────── • ◈ • ──────────────╮
             Ɓ❍亇Dr.Ls
      ◢◤◢◤◢◤◢◤◢◤◢◤◢◤
  ❏Bot ta bugado, alguns comandos pode ficar bugados
  ❏Bot privado
  ❏Algum bug ou ideia? use ${prefix}reportarbug ou ${prefix}ideia
  ❏Se ficar floodando, vai pra blacklist
  ❏Use ${prefix}botgroup para entrar em nosso grupo
╰────────────── • ◈ • ──────────────╯
${readMore}
╭──────「_ Ɓ❍亇Dr.Ls_」──────╮

◢◤◢◤◢◤◢◤◢◤◢◤◢◤

│ • _Consultas (Apenas para Membros Premium)_ • [Ja está a venda]

◢◤◢◤◢◤◢◤◢◤◢◤◢◤
│❏ ${prefix}gerarcc
│❏ ${prefix}gerarcpf
│❏ ${prefix}consultar-bin (xxxxxx)
│❏ ${prefix}consultar-cep (xxxxxxxxx)
│❏ ${prefix}consultar-ip (xxx.xxx.x.xxx)
│❏ ${prefix}consultar-cnpj (xxxxxxxxxxxxxx)
│❏ ${prefix}consultar-operadora (119xxxxxxxx)
│❏ ${prefix}consultar-cpf (xxx.xxx.xxx-xx)
◢◤◢◤◢◤◢◤◢◤◢◤◢◤

│ • _Menu Dos Adms_ •

◢◤◢◤◢◤◢◤◢◤◢◤◢◤
│❏ ${prefix}antifake (1/0)
│❏ ${prefix}antilink (on/off)
│❏ ${prefix}setname (nome do grupo)
│❏ ${prefix}setdesc (descrição do grupo)
│❏ ${prefix}bot (on/off)
│❏ ${prefix}fechargrupo
│❏ ${prefix}abrirgrupo
│❏ ${prefix}hidetag (mensagem)
│❏ ${prefix}ban (@numero) 
│❏ ${prefix}add (@numero)
│❏ ${prefix}tagall
│❏ ${prefix}tagall2
│❏ ${prefix}promote (@numero) [COMANDO OFF-LINE]
│❏ ${prefix}demote (@numero) [COMANDO OFF-LINE]
│❏ ${prefix}welcome (1/0)
│❏ ${prefix}clearchat
◢◤◢◤◢◤◢◤◢◤◢◤◢◤

│ • _Menu De Imagens_ •

◢◤◢◤◢◤◢◤◢◤◢◤◢◤
│❏ ${prefix}candlemug (mensagem)
│❏ ${prefix}lovemsg (mensagem)
│❏ ${prefix}mugflower (mensagem)
│❏ ${prefix}narutobanner (mensagem)
│❏ ${prefix}paperonglass (mensagem)
│❏ ${prefix}romancetext (mensagem)
│❏ ${prefix}shadowtext (mensagem)
│❏ ${prefix}coffeecup (mensagem)
│❏ ${prefix}coffeecup2 (mensagem)
│❏ ${prefix}underwater (mensagem)
│❏ ${prefix}hpotter (mensagem)
│❏ ${prefix}woodblock (mensagem)
◢◤◢◤◢◤◢◤◢◤◢◤◢◤

│ • _Menu De Diverção_ •

◢◤◢◤◢◤◢◤◢◤◢◤◢◤
│❏ ${prefix}attp (mensagem)
│❏ ${prefix}sticker
│❏ ${prefix}igstalk (ig)
│❏ ${prefix}play (musica)
│❏ ${prefix}tts (mensagem)
│❏ ${prefix}reportarbug (mensagem)
│❏ ${prefix}ideia (mensagem)
│❏ ${prefix}wame
│❏ ${prefix}tagme
│❏ ${prefix}linkgc
│❏ ${prefix}tagall3
│❏ ${prefix}admin
│❏ ${prefix}toimg
│❏ ${prefix}blocklist
│❏ ${prefix}profile
│❏ ${prefix}groupinfo
│❏ ${prefix}botgroup [Grupo do Bot]
◢◤◢◤◢◤◢◤◢◤◢◤◢◤

│ • _Menu Do Dono_ •

◢◤◢◤◢◤◢◤◢◤◢◤◢◤
│❏ ${prefix}blacklist (1/0)
│❏ ${prefix}bot0 (on/off)
│❏ ${prefix}hidetag20 (mensagem)
│❏ ${prefix}setprefix (prefix)
│❏ ${prefix}hidetag0 (mensagem)
│❏ ${prefix}send
│❏ ${prefix}arquivar [COMANDO OFF-LINE]
│❏ ${prefix}tag0
│❏ ${prefix}clearall
│❏ ${prefix}bc (mensagem)
│❏ ${prefix}leave
│❏ ${prefix}clone (@numero)
│❏ ${prefix}getsticker

╰──────「_ Ɓ❍亇Dr.Ls _」──────╯
`
}
exports.help = help
