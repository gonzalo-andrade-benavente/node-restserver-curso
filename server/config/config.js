

// Puerto

process.env.PORT = process.env.PORT || 3000;


// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// DB

const userDB = 'root';
const passDB = 'gonzalito4464';
const hostDB = 'cluster0.skhs1.mongodb.net';

let urlDB;
//urlDB = 'mongodb+srv://root:gonzalito4464@cluster0.skhs1.mongodb.net/cafe?retryWrites=true&w=majority';

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = `mongodb+srv://${ userDB }:${ passDB }@${ hostDB }/cafe?retryWrites=true&w=majority`;
} else {
    urlDB = `mongodb+srv://${ userDB }:${ passDB }@${ hostDB }/cafe_prod?retryWrites=true&w=majority`;
}

process.env.URL_DB = urlDB;