// =========================
//          PUERTO
// =========================


process.env.PORT = process.env.PORT || 3000;

// =========================
//         ENTORNO
// =========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================

//  VENCIMIENTO DEL TOKEN
// =========================

process.env.CADUCIDAD_TOKEN = '48hs';


// =========================
//  SEED de AUTENTICACION
// =========================

process.env.SEED = process.env.SEED || 'puerta-azul';

// =========================
//    BASE DE DATOS
// =========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// =========================
//    GOOGLE CLIENT ID
// =========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '876586852723-p49ohidcufv30ubkgb58anohggidc9fh.apps.googleusercontent.com';