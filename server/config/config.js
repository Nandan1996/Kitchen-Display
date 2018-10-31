const env = process.env.NODE_ENV || 'development';

// based on environment it looks in config.json and add all key value pair to process.env
// make sure config.json file has this structure
// 3000 is default port used if not provided.
// make sure to have same port in /proxy.conf.json to avoid cors issue while using webpack dev server to host angular bundles
/*
{
    "development": {
        "MONGODB_URI": ...,
        "PORT":3000
    }
}
*/
if( env === 'development' ) {
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach(key => {
        process.env[key] = envConfig[key];
    });
    process.env[env] = true;
};