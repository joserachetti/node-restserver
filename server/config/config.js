// =========================
//          PUERTO
// =========================


process.env.PORT = process.env.PORT || 3000;

// =========================
//         ENTORNO
// =========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================
//         ENTORNO
// =========================

let urlDB;

// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/cafe';
// } else {
urlDB = 'mongodb+srv://matrix:bobv0v1IoHsTPUbd@cluster0-dlhgs.mongodb.net/cafe?retryWrites=true&w=majority';
// }

process.env.URLDB = urlDB;