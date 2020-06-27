const dotenv = require('dotenv');

module.exports = {
  port: 8000,
  watch: true,
  nodeResolve: true,
  appIndex: 'demo/index.html',
  plugins: [
    dotenv.config(),
    {
      transform(context) {
        const { env } = process;
        const { API_URL, API_HOST, API_KEY } = env;

        if (context.path === '/') {
          const transformedBody = context.body.replace(
            '</head>',
            `<script>
              window.process = {
                env: {
                  API_URL: "${API_URL}",
                  API_HOST: "${API_HOST}",
                  API_KEY: "${API_KEY}",
                }
              }
            </script></head>`
          );
          return { body: transformedBody };
        }
        return context;
      },
    },
  ],
};
