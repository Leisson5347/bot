const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { donasi } = require('./src/donasi')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const lolis = require('lolis.life')
const loli = new lolis()
const talkedRecently = new Set();
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n'
            + 'FN:Dr.Ls❤\n'
            + 'ORG:Dono do Bot;\n'
            + 'TEL;type=CELL;type=VOICE;waid=5563999518237:+5563999518237\n'
            + 'END:VCARD'
prefix = '#'
blocked = []


//antitrava
function monospace(string) {
return '' + string + ''
}

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Dr.Ls Domina '))
	})

	fs.existsSync('./Ramlan.json') && client.loadAuthInfo('./Ramlan.json')
	client.on('connecting', () => {
		start('2', 'Conectando...')
	})
	client.on('open', () => {
		success('2', 'Conectado')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./Ramlan.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		const mdata = await client.groupMetadata(anu.jid)
		if(antifake.includes(anu.jid)) {
			if (anu.action == 'add'){
				num = anu.participants[0]
				if(!num.split('@')[0].startsWith(55)) {
					client.sendMessage(mdata.id, 'CHEIRINHO DE BAN EM NUMERO FAKE HMMM', MessageType.text)
					setTimeout(async function () {
						client.groupRemove(mdata.id, [num])
						client.blockUser(sender, "add")
					}, 1000)
				}
			}
		}
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Olá @${num.split('@')[0]}\nBem vindo(a) ao grupo *${mdata.subject}*, Leia as regras para não ser banido, use ${prefix}regras para ver`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Tchau... @${num.split('@')[0]}👋* \n_Boa viagem..._`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
                        if (!mek.hasNewMessage) return
                        mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const BarBar = 'BotWeA'
			const insom = from.endsWith('@g.us')
			const nameReq = insom ? mek.participant : mek.key.remoteJid
			pushname2 = client.contacts[nameReq] != undefined ? client.contacts[nameReq].vname || client.contacts[nameReq].notify : undefined
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			about = (await client.getStatus(nameReq)).status
			const time = moment.tz('America/Sao_paulo').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			var Link = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesLink = Link.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: 'Em processo, aguarde 🥱',
				success: 'Pronto 🤗',
				hentai: 'Seu hentai está sendo enviado 😜',
				premiumMember: '💻Este comando esta disponivel apenas para usuarios premium💻',
				error: {
					stick: 'Falha, ocorreu um erro ao converter a imagem em um adesivo 🥺',
					Iv: 'Link inválido 😵',
				},
				only: {
					group: 'Este comando só pode ser usado em grupos! 😒',
					ownerG: 'Este comando só pode ser usado pelo dono do grupo! 😏',
					ownerB: 'Este comando só pode ser usado pelo dono do bot! 😏',
					admin: 'Este comando só pode ser usado por administradores de grupo! 😏',
					Badmin: 'Este comando só pode ser usado quando o bot se torna administrador! 😏'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net"] // replace this with your number
			const premiumMember = ["5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999518237@s.whatsapp.net", "5563999434975@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			const costum = (pesan, tipe, target, target2) => {
			        client.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'de', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'de', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'de', color(sender.split('@')[0]), 'em', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'de', color(sender.split('@')[0]), 'em', color(groupName), 'args :', color(args.length))
			switch(command) {
				case 'help':
				case 'menu':
			wew = fs.readFileSync(`./src/logo2.jpeg`)
			oi = `Ɗ❍Ŋ❍ Ɗ❍ Ɓ❍Ƭ:  💻Dr.Ls 💻\nŊびӍ玄Ɍ❍: https://wa.me/5563999518237\n❍Ɓ令: Não passo github 😐🤙`
			client.sendMessage(from, wew, image, { quoted: mek, caption: oi})
				costum(help(prefix), text, "0@s.whatsapp.net", `  ⫃💻⫄OFICIAL WHATSAPP BOT⫃💻⫄
       ▃▅▆█ 웃 Dr.Ls 웃 █▆▅▃`)
					break

					case 'donasi':
				case 'donate':
					client.sendMessage(from, donasi(prefix), text)
					break

					case 'owner':
                case 'creator':
                  client.sendMessage(from, {displayname: "Dr.Ls", vcard: vcard}, MessageType.contact, { quoted: mek})
               client.sendMessage(from, 'Meu dono é o melhor😍',MessageType.text, { quoted: mek} )
                break
					/*MENU DE CONSULTAS*/
					/*MENU DE CONSULTAS*/
					/*MENU DE CONSULTAS*/
				 case 'gerarcc': 
				   anu = await fetchJson(`https://videfikri.com/api/ccgenerator/`, {method:'get'})
				   teks = `*Gerador De CC by Dr.Ls*\n*💻Numero*: ${anu.result.card.number}\n*💻Tipo*: ${anu.result.card.network}\n*💻CVV*: ${anu.result.card.cvv}\n*💻PIN*: ${anu.result.card.pin}\n*💻Saldo*: ${anu.result.card.balance}\n*💻Validade do mês*: *Qualquer um*\n*💻Validade do ano*: *Qualquer um*\n*💻País*: ${anu.result.customer.country}\n*💻Nome*: ${anu.result.customer.name}\n*💻Endereço*: ${anu.result.customer.address}`
				   client.sendMessage(from, teks, text, {quoted: mek})
				   break

				   case 'gerarcpf': 
				   anu = await fetchJson(`http://geradorapp.com/api/v1/cpf/generate?token=4f8d9149be4858c837b8b38f5c0d194a`, {method:'get'})
				   teks = `💻Gerador de cpf by Dr.Ls💻\n💻Cpf: ${anu.data.number}\n💻Cpf2: ${anu.data.number_formatted}`
				   client.sendMessage(from, teks, text, {quoted: mek})
				   break

				   case 'consultar-cep':
				   case 'c-cep':
                var CEP = body.slice(15)
                anu = await fetchJson(`https://viacep.com.br/ws/${CEP}/json/`)
                var local = `💻Cep: ${anu.cep}\n💻Logradouro: ${anu.logradouro}\n💻Complemento: ${anu.complemento}\n💻Bairro ${anu.bairro}\n💻Localidade: ${anu.localidade}\n💻Uf: ${anu.uf}\n💻Ibge: ${anu.ibge}\n💻Gia: ${anu.gia}\n💻Ddd: ${anu.ddd}\n💻Siafi: ${anu.siafi}`
                console.log(anu)
                reply(`💻Consulta By Dr.Ls💻:\n\n${local}`)
                    break

                    case 'consultar-ip': 
                    case 'c-ip':
                var IP = body.slice(6)
                anu = await fetchJson(`http://ip-api.com/json/${IP}`)
                data = await fetchJson(`https://ipwhois.app/json/${IP}`)
                var busca = `❏ip: ${anu.query}\n❏status: ${anu.status}\n❏Tipo de ip: ${data.type}\n❏Continente: ${data.continent}\n❏Codigo continental: ${data.continent_code}\n❏Pais: ${anu.country}\n❏Codigo do pais: ${anu.countryCode}\n❏Países vizinhos: ${data.country_neighbours}\n❏Capital do pais: ${data.country_capital}\n❏Sigla da região: ${anu.region}\n❏Nome da região: ${anu.regionName}\n❏cidade: ${anu.city}\n❏DDI do pais: ${data.country_phone}\n❏zip: ${anu.zip}\n❏Moeda do país: ${data.currency}\n❏Codigo da moeda: ${data.currency_code}\n❏Simbolo da moeda: ${data.currency_symbol}\n❏latitude: ${anu.lat}\n❏longitude: ${anu.lon}\n❏Timezone: ${anu.timezone}\n❏Isp: ${anu.isp}\n❏Org: ${anu.org}\n❏as: ${anu.as}`
                console.log(anu)
                reply(`💻Consulta By Dr.Ls e Icro Dr.Ls💻:\n\n${busca}`)
                    break
                    /*FIM DO MENU DE CONSULTAS*/
					/*FIM DO MENU DE CONSULTAS*/
					/*FIM DO MENU DE CONSULTAS*/








					/*MENU DOS ADM*/
					/*MENU DOS ADM*/
					/*MENU DOS ADM*/
					case 'setname':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admins)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateSubject(from, `${body.slice(9)}`)
                client.sendMessage(from, 'O nome do grupo foi modificado com sucesso o(>ω<)o!', text, {quoted: mek})
					break
					case 'setdesc':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admins)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateDescription(from, `${body.slice(9)}`)
                client.sendMessage(from, 'A descrição do grupo foi modificada com sucesso o(>ω<)o!', text, {quoted: mek})
					break
					case 'bot':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Escolha on ou off!')
					if (args[0] === 'off') {
						if (isPublic) return reply('Bot ja esta desativado')
						publik.push(from)
						fs.writeFileSync('./database/json/public.json', JSON.stringify(publik))
						reply(`Bot Off-line para este grupo, para ativar use ${prefix}bot on`)
					} else if (args[0] === 'on') {
						publik.splice(from, 1)
						fs.writeFileSync('./database/json/public.json', JSON.stringify(publik))
						reply(`Bot Online para este grupo, para desativar use ${prefix}bot off`)
					} else {
						reply('Selecione on / off')
					}
					break
					case 'fechargrupo':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var nomor = mek.participant
					const close = {
					text: `Grupo fechado pelo administrador @${nomor.split("@s.whatsapp.net")[0]}\nagora *apenas administradores* podem enviar mensagens`,
					contextInfo: { mentionedJid: [nomor] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, true);
					reply(close)
					break
					case 'abrirgrupo':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					open = {
					text: `Grupo aberto pelo administrador @${sender.split("@")[0]}\nagora *todos os participantes* podem enviar mensagens`,
					contextInfo: { mentionedJid: [sender] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, false)
					client.sendMessage(from, open, text, {quoted: mek})
					break
					case 'hidetag':
					if (!isGroup) return reply(mess.only.group)
						if (!isGroupAdmins) return reply(mess.only.admin)
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					break
					case 'tagall':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admins)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*#* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
                                case 'tagall2':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admins)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➢ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					reply(teks)
					break
					/*case 'promote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Promovido para administrador com sucesso\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
					} else {
						mentions(`@${mentioned[0].split('@')[0]} É agora um administrador do grupo!`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'demote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Rebaixado para membro comum com sucesso\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
					} else {
						mentions(` @${mentioned[0].split('@')[0]} É agora um membro comum!`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break*/
					case 'welcome':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admins)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('...')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Já ativo...')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Ativou com sucesso o recurso de boas-vindas neste grupo ✔️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Desativando com sucesso o recurso de boas-vindas neste grupo ✔️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
                                      break
					/*FIM DO MENU DOS ADM*/
					/*FIM DO MENU DOS ADM*/
					/*FIM DO MENU DOS ADM*/









					/*MENU DE IMAGENS*/
					/*MENU DE IMAGENS*/
					/*MENU DE IMAGENS*/
                case 'candlemug':
                case 'lovemsg':
                case 'mugflower':
                case 'narutobanner':
                case 'paperonglass':
                case 'romancetext':
                case 'shadowtext':
                case 'coffeecup':
                case 'coffeecup2':
                case 'underwater':
                case 'hpotter':
                case 'woodblock':
                    if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} yogi`)
                    txt = args.join(" ")
                    reply('[❕] Loading')
                    buffer = await getBuffer(`https://videfikri.com/api/textmaker/${command}/?text=${txt}`)
                    client.sendMessage(from, buffer, image, {caption: 'kAtCHAUUUUUUUUUUUUUUU', quoted: mek})
         break
         case 'qrencode':
                case 'barcode':
                    if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} yogi`)
                    txt = args.join(" ")
                    reply('[â•] Loading')
                    buffer = await getBuffer(`https://api.zeks.xyz/api/${command}?apikey=apivinz&text=${txt}`)
                    client.sendMessage(from, buffer, image, {caption: 'AAAAAAAAA', quoted: mek})
         break
          case 'loli':
                                        gatauda = body.slice(6)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek})
                                        break
                             case 'neko':
				gatauda = body.slice(4)
				reply(mess.wait)
				anu = await fetchJson(`https://alfians-api.herokuapp.com/api/nekonime`, {method: 'get'})
				buffer = await getBuffer(anu.result)
				client.sendMessage(from, buffer, image, {quoted: mek})
				break
									case 'pokemon':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
					case 'waifu':
					anu = await fetchJson(`https://api.shizukaa.xyz/api/waifu?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek }) 
					break
           case 'randombts':
					anu = await fetchJson(`https://api.shizukaa.xyz/api/randombts?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek }) 
					break
           case 'randomexo':
					anu = await fetchJson(`https://api.shizukaa.xyz/api/randomexo?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek }) 
					break
           case 'blackpink':
					anu = await fetchJson(`https://api.shizukaa.xyz/api/blackpink?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek }) 
					break
					case 'gato':
					memein = await kagApi.memeindo()
					reply(mess.wait)
					buffer = await getBuffer(`https://cataas.com/cat`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'gatinho'})
					break
					case 'bomdia':
					reply(mess.wait)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://cataas.com/cat/says/Bom%20Dia`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Bom dia grupo'})
					break
					case 'boatarde':
					reply(mess.wait)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://cataas.com/cat/says/Boa%20Tarde`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Boa tarde grupo'})
					break
					case 'boanoite':
					reply(mess.wait)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://cataas.com/cat/sleep/says/Boa%20Noite`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Boa noite grupo'})
					break
					case 'shota':
				    try{
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/randomshota?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nich'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'cachorro':
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: 'cachorrinhu' })
					break
				/*FIM DO MENU DE IMAGENS*/
				/*FIM DO MENU DE IMAGENS*/
				/*FIM DO MENU DE IMAGENS*/








				/*MENU DE DIVERSÃO*/
				/*MENU DE DIVERSÃO*/
				/*MENU DE DIVERSÃO*/
				case 'sticker':
				if (talkedRecently.has(sender) && !isOwner) return reply('Espere 6 segundos antes de fazer outra fig')
                talkedRecently.add(sender);
                setTimeout(() => {
                talkedRecently.delete(sender);
                }, 6000);
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								buff = fs.readFileSync(ranw)
								client.sendMessage(from, buff, sticker, {quoted: mek})
							})
						})
					} else {
						reply(`Utilize ${prefix}sticker com alguma foto/video/gif e certifique-se q o video tenha 10 segundos ou menos de duração`)
					}
					break 
				case 'play':
				reply(mess.wait)
				play = body.slice(5)
				anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
				if (anu.error) return reply(anu.error)
				infomp3 = `*Musica encontrada*\n ${anu.result.title}

0:58 ━━━━●─────────  3:29

⇆       ◁ㅤㅤ❚❚ㅤㅤ▷       ↻\n\nLink: ${anu.result.source}\nTamanho: ${anu.result.size}\nLink pra download: ${anu.result.url_audio}\nDuração: ${anu.result.duration}\n*Se fazer spam o bot vai bugar, aguarde o bot enviar a Musica*`
				buffer = await getBuffer(anu.result.thumbnail)
				client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
				lagu = await getBuffer(anu.result.url_audio)
				client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: mek})
				break
				case 'tts': 
					if (args.length < 1) return client.sendMessage(from, `Qual Codigo De Idioma, Mano?\n Se Voce Nao Sabe Codigo Do Idioma, Basta Digitar *${prefix}bahasa*`, text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Cadê o texto, mano?', text, {quoted: mek})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 900
					? reply('O texto é demais mano')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Falhou jovem:(')
							reply(mess.wait)
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break 
					case 'reportbug':
				case 'reportarbug':
				case 'bug':
                     const pesan = body.slice(6)
                      if (pesan.length > 5000) return client.sendMessage(from, 'O texto é muito longo o máximo é 5000 letras', msgType.text, {quoted: mek})
                        var nomor = mek.participant
                       const teks1 = `[BUG REPORTADO]\nNumero : @${sender.split("@s.whatsapp.net")[0]}\nMOTIVO : ${pesan}`
                      var options = {
                         text: teks1,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    client.sendMessage('5563999518237@s.whatsapp.net', options, text, {quoted: mek})
                    reply('O bug foi reportado!')
                    break
                    case 'ideia':
                     const pika = body.slice(6)
                      if (pika.length > 5000) return client.sendMessage(from, 'O texto é muito longo o máximo é 5000 letras', msgType.text, {quoted: mek})
                        var nomor = mek.participant
                       const teks2 = `[Ideia Recebida]\nNumero : @${sender.split("@s.whatsapp.net")[0]}\nIdeia : ${pika}`
                      var options = {
                         text: teks2,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    client.sendMessage('5563999518237@s.whatsapp.net', options, text, {quoted: mek})
                    reply('Sua ideia foi enviada!')
                    break
                    case 'wa.me':
				  case 'wame':
  client.updatePresence(from, Presence.composing) 
      options = {
          text: `「 *Seu WaMe link* 」\n\n_Solicitado por_ : *@${sender.split("@s.whatsapp.net")[0]}\n\nSeu link Whatsapp : *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*Ou ( / )*\n*https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
          contextInfo: { mentionedJid: [sender] }
    }
    client.sendMessage(from, options, text, { quoted: mek } )
				break
				if (data.error) return reply(data.error)
				reply(data.result)
				break
				case 'tagme':
							if (isGrupo) return reply('dono deixou esse grp banidokkkkk')
					var no = mek.participant
					const tag = {
					text: `@${no.split("@s.whatsapp.net")[0]} tag!`,
					contextInfo: { mentionedJid: [no] }
					}
					client.sendMessage(from, tag, text, {quoted: mek})
					break
					case 'linkgc':
				    if (!isGroup) return reply(mess.only.group)
				    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				    linkgc = await client.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				    client.sendMessage(from, yeh, text, {quoted: mek})
			        await (sender)
					break
					case 'tagall3':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➢ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, teks, text, {detectLinks: false, quoted: mek})
					break
					case 'admin':
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista de admins do grup *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
					case 'toimg':
					if (!isQuotedSticker) return reply('❌ responder sticker hum ❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Falha ao converter adesivos em imagens ❌')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>//<'})
						fs.unlinkSync(ran)
					})
					break
					case 'blocklist':
					teks = 'Lista de contatos bloqueados :\n'
					for (let block of blocked) {
						teks += `➢ @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
					case 'leave-transmission':
					case 'ftm':
                if (!isGroup) {
                client.deleteChat(from, from)
                } else {
                reply('Funciona apenas no pv!')
                }
                    break
                    case 'profile':
    				client.updatePresence(from, Presence.composing)
    				try {
					profil = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
					} catch {
					profil = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
					 profile = `╭─「 *_ᴘᴇʀғɪʟ_* 」\n│• *Nome:* ${pushname2}\n│• *Wame:* wa.me/${sender.split("@")[0]}\n│•*Recado:* ${about}\n│•*Horario:* ${time}\n╰────────────────`
					buff = await getBuffer(profil)
					client.sendMessage(from, buff, image, {quoted: mek, caption: profile})
					break
					case 'infogc':
				case 'groupinfo':
				case 'infogrup':
				case 'grupinfo':
                client.updatePresence(from, Presence.composing)
                try {
					ppUrl = await client.getProfilePicture(from)
					} catch {
					ppUrl = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
                reply(mess.wait) // leave empty to get your own
			    buffer = await getBuffer(ppUrl)
		        client.sendMessage(from, buffer, image, {quoted: mek, caption: `*Nome do Grupo* : ${groupName}\n*Numero Total de Membros* : ${groupMembers.length}\n*Numero Total de Admins* : ${groupAdmins.length}\n*Descrição* : ${groupDesc}`})
                break
                case 'regras':
                reply(`${groupDesc}`)
                break
                case 'botgroup':
                case 'botgrupo':
                case 'groupbot':
                case 'grupobot':
                        var nomor = mek.participant
                       const teks9 = `https://chat.whatsapp.com/EZVLH91UadDF5MQsubyhDb`
                      var options = {
                         text: teks9,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    client.sendMessage(`${sender.split("@")[0]}@s.whatsapp.net`, options, text, {quoted: mek})
                    reply('Link enviado!')
                    break
				/*FIM DO MENU DE DIVERSÃO*/
				/*FIM DO MENU DE DIVERSÃO*/
				/*FIM DO MENU DE DIVERSÃO*/








				/*MENU DO DONO*/
				/*MENU DO DONO*/
				/*MENU DO DONO*/
					case 'bot0':
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('Escolha on ou off!')
					if (args[0] === 'off') {
						if (isPublic) return reply('Bot ja esta desativado')
						publik.push(from)
						fs.writeFileSync('./database/json/public.json', JSON.stringify(publik))
						reply(`Bot Off-line para este grupo, para ativar use ${prefix}bot on`)
					} else if (args[0] === 'on') {
						publik.splice(from, 1)
						fs.writeFileSync('./database/json/public.json', JSON.stringify(publik))
						reply(`Bot Online para este grupo, para desativar use ${prefix}bot off`)
					} else {
						reply('Selecione on / off')
					}
					break
					case 'hidetag20':
					if (!isOwner) return reply(mess.only.ownerB)
					if (!isGroup) return reply(mess.only.group)
					var value = body.slice(11)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
					break
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`Prefix atualizado para : ${prefix}`)
					break
                case 'hidetag0':
					if (!isGroup) return reply(mess.only.group)
						if (!isOwner) return reply(mess.only.ownerB)
					var value = body.slice(10)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					break
					case 'tag0':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*#* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
				case 'clearall':
					if (!isOwner) return reply('Você não é meu dono')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('Todas as mensagens foram deletadas:)')
					break
				case 'bc':
					if (!isOwner) return reply('Você não é meu dono!')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ _Ɓ❍亇  Dr.Ls_, Transmissão... ]\nPara sair da Transmissão use ${prefix}ftm (Apenas no privado!)\n\n${body.slice(4)}`})
						}
						reply('Transmissão foi um sucesso!')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ _Ɓ❍亇Dr.Ls_, Transmissão... ]\nPara sair da Transmissão use ${prefix}ftm (Apenas no privado!)\n\n${body.slice(4)}`)
						}
						reply('Transmissão foi um sucesso!')
					}
					break
                                case 'leave':
                                        if (!isGroup) return reply(mess.only.group)
                                        if (!isOwner) return reply(mess.only.ownerB)
                                            client.groupLeave(from)
                                        break
				case 'clone':
				if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('Tag target yang ingin di clone')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('Gagal om')
					}
					break
					/*FIM DO MENU DO DONO*/
					/*FIM DO MENU DO DONO*/
					/*FIM DO MENU DO DONO*/
				default:
                  if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[Error]','red'), 'Comando não registrado', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'white'))
		}
	})
}
starts()
