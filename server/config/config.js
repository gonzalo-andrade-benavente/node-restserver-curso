

// Puerto

process.env.PORT = process.env.PORT || 3000;


// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// DB

let urlDB;


if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = '';
} else {
    urlDB = process.env.NODE_URI;
}

process.env.URL_DB = urlDB;