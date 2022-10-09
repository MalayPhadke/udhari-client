const configs = {
    development: {
      SERVER_URI: 'http://localhost:3001',
    },
    production: {
      SERVER_URI: 'https://udhari.herokuapp.com',
    },
  };
  
module.exports.config = configs[process.env.NODE_ENV];