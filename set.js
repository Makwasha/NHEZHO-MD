const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEQrUjU4VVFHb1E4Y2hoekphMkpOTWFXem9hZUUyWlZhTHJYclFjYndrcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVpjNW5wb0ZTR3o5NWIwT2JOOGJqd1NXT29QclplOHFDQ1VtRTNiSHRFRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQkJvVlB2UktrcE9SN2c0ZDliZ09JRmlsc3lrRkk3YXpqd0ErUTJ6SjB3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaQnBEZG0rckY1YzVnUXBWS0NJMlRweUFwTk51UytOUVhVUkU2VWI1aUdJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1IOHhKVFpEemszZUdVT1haRzNMYmwwRU1zUXdOd0hCT3VYVllYWG9Ua3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVpU3g5NTZMWXZzT1lVWFI1akhJRlR5dXJQcldQK2MxSE90U0U5ZWtYVVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0IyNy9BRkY4ZFRHenkrczhUQWJTdVRoRy9PVm1tbEQ3U3BjbnJQUWpXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXR3YzIxaGN6SDE3TGlUakZsbHNPdk85WmYvYWI5QWlrV003dUtQNGowQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdHTXBLZ1BXL1pIbGphazZYbXBmTmVnU2Eva0J3ekVKcDBGSHdCcTdHZUh0c3hLOTNRTkRVQXJFaEdZN3NEQnZSUXBHbG9TRVpQMHIxeEZmNnFjdGhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDQsImFkdlNlY3JldEtleSI6IkFIN3pBUkxaOVNQeEpROWRBVGt3ZmcwWkh4VWJJeVVJRXJsQmF5WkljMzA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InpkNEFPSVBkUWMtd2dFZUtoS3dUNGciLCJwaG9uZUlkIjoiYjk5Y2VmOWUtZmYwMC00ODZlLWI1YzgtYTAwNTc2MDhkY2FjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhYMUhzUTdEcVNyTkoraVJBUHViYVIvVWd6UT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySGNiYmdUWWsxZ0k0MDR1eEVDZ2VScFVzQkk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiREVHTEI5QUUiLCJtZSI6eyJpZCI6IjI2MzcxOTQ5NTA2Nzo1NUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSXVqbTk0RkVQcXIvcndHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiK21QV1dsN0dKaFBEcEpQR2dDMlMxRXdrR1FIMDNqUzFmYUdycGY1bkMxWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoic2c0TDY2bnAyQ1V2Qi93RnRlMXkzRlJaWTAxakY1NVY2VWxER0QvSGYvWWN4YjNVNlJFNGdmbzlrV29LYk9xeTVOUlFuSE5lK1pZdExxd0wzYTVuQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6IndNNlY3aENnaUx1em5oQTByQ3U5NThua04xM2VmTUtDS1Rtc0xsTEt6UHZMSnUyU1J3Sy9kMk9QTk5VSlovZjNSRURucWFqT1V4Z3lkaXBuTzYvcWhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzE5NDk1MDY3OjU1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZwajFscGV4aVlUdzZTVHhvQXRrdFJNSkJrQjlONDB0WDJocTZYK1p3dFcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzg1MTE4NzgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ1hoIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    CAPTION : process.env.CAPTION || "CASEYRHODES-XMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    URL: process.env.URL || "https://files.catbox.moe/yedfbr.jpg",
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGE : process.env.AUTO_READ || "yes",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TECH : process.env.AUTO_REACT_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
