module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/1.0/:slug*',
          destination: 'http://localhost:8080/api/1.0/:slug*'
        },
      ]
    },
  }