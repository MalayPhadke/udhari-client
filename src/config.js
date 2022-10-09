const configs = {
    development: {
      SERVER_URI: 'http://localhost:3001',
    },
    production: {
      SERVER_URI: 'https://udhari.herokuapp.com',
    },
  };
  
console.log(process.env.NODE_ENV);
module.exports.config = configs[process.env.NODE_ENV];