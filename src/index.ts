import "dotenv/config";

import { query, QueryResult } from "gamedig";
import { request } from "undici";
import { base_message, serverNames, servers, statuses } from "./base";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const MESSAGE_ID = process.env.MESSAGE_ID;

const url = (method: string) =>
  `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;

(async () => {
  console.log(`[${new Date().toLocaleString()}] Updating Status...`);
  await update();
})();

setInterval(async () => {
  console.log(`[${new Date().toLocaleString()}] Updating Status...`);
  await update();
}, 300000);

var tries = 0;
async function update() {
  const text = base_message;
  const _data = await getServersData();
  text[0] = `— Статус серверов —`;

  var public_online = 0;
  var mirage_online = 0;
  var awp_online = 0;

  for (const data of _data) {
    switch (data.server) {
      case "CSLAND | Public": {
        text[2] = `› CSLAND | Public:`;
        text[3] = `» Статус: ${data.status}`;
        text[4] = `» Карта: ${data.map}`;
        text[5] = `» Кол-во игроков: ${data.players}`;

        public_online = data.players;

        break;
      }

      case "CSLAND | Mirage": {
        text[7] = `› CSLAND | Mirage:`;
        text[8] = `» Статус: ${data.status}`;
        text[9] = `» Карта: ${data.map}`;
        text[10] = `» Кол-во игроков: ${data.players}`;

        mirage_online = data.players;
      }

      case "CSLAND | AWP": {
        text[12] = `› CSLAND | AWP:`;
        text[13] = `» Статус: ${data.status}`;
        text[14] = `» Карта: ${data.map}`;
        text[15] = `» Кол-во игроков: ${data.players}`;

        awp_online = data.players;
      }
    }

    if (data.status === statuses[2]) {
      if (tries === 3) {
        const _text = [`› Сервер: ${data.server}`, `› Статус: ${data.status}`];
        await request(
          url(
            `sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(
              _text.join("\n")
            )}`
          )
        );
      } else {
        tries++;
        await update();
      }
    }
  }

  const online = public_online + mirage_online + awp_online;
  const max_players = 90;
  const percent = Math.floor((100 * online) / max_players);

  text[18] = `Общий онлайн на серверах: ${online.toLocaleString()} (${percent}% из 100%)`;

  await request(
    url(
      `editMessageText?chat_id=${CHAT_ID}&message_id=${MESSAGE_ID}&text=${encodeURIComponent(
        text.join("\n")
      )}`
    )
  );
}

async function getServersData() {
  const data: ServerData[] = [];

  for (const server of servers) {
    var _data: QueryResult;

    try {
      _data = await query(server);
    } catch (error) {
      data.push({
        server: serverNames[server.host],
        map: null,
        players: null,
        status: statuses[2],
      });

      continue;
    }

    data.push({
      server: serverNames[server.host],
      map: _data.map,
      players: _data.players.length,
      status: statuses[1],
    });
  }

  return data;
}

interface ServerData {
  server: string;

  map: string;
  status: string;
  players: number;
}
