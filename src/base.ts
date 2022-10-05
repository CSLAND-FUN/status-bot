import { QueryOptions } from "gamedig";

export const base_message = [
  "— Статус серверов —",
  "",
  "› CSLAND | Public:",
  "» Статус:",
  "» Карта:",
  "» Кол-во игроков:",
  "",
  "› CSLAND | Mirage:",
  "» Статус:",
  "» Карта:",
  "» Кол-во игроков:",
  "",
  "› CSLAND | AWP:",
  "» Статус:",
  "» Карта:",
  "» Кол-во игроков:",
  "",
  "—————————————————————",
  "Общий онлайн на серверах:",
  "—————————————————————",
  "",
  "› Сайт проекта: https://csland.fun/",
  "› Discord Сервер: https://discord.gg/5yAEZmPRJJ",
  "› Telegram Канал: https://t.me/csland_project",
];

export const statuses = ["⚫️ Неизвестно", "🟢 Онлайн", "🔴 Не работает"];

export const servers: QueryOptions[] = [
  {
    type: "csgo",
    host: "62.122.213.51",
    port: 27015,
  },
  {
    type: "csgo",
    host: "46.174.52.85",
    port: 27015,
  },
  {
    type: "csgo",
    host: "45.136.204.24",
    port: 27077,
  },
];

export const serverNames = {
  "62.122.213.51": "CSLAND | Public",
  "46.174.52.85": "CSLAND | Mirage",
  "45.136.204.24": "CSLAND | AWP",
};
