
var config = {
    cookieSecret: '',
    API_KEY: '',
    dev: {
        database: {
            url: "localhost:27017/",
            dbname: "tjmun_api_test",
            collection: 'collectiontest'
        },
        
        server: {
            port: '3000'
        },
        cookieSecret: 'fsfvisdvgsdvark3efe3',
        API_KEY: 'myapikey',
        adminLevel: 5
    }, 
    prod: {
        database: {
            url: "",
            dbname: ""
        },
        
        server: {
            port: 8080
        }
    }
}

//config.dev.cookieSecret = 'fsfvisdvgsdvark3efe3';
//config.dev.API_KEY      = 'a049ds9af9dsg9sdf0s0';

module.exports = config.dev;