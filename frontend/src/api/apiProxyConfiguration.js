/**
 * Get the middleware API proxy configuration
 *
 * @param {string} apiBasePath Base API path we use in App to call an API endpoint (part of the URL that will be removed before calling the API endpoint)
 */
module.exports = function(apiBasePath = null) {
  /**
   *
   * @param {IncomingRequest} req
   */
  function getIPAddress(req) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip;
  }

  const API_KEY = process.env.API_KEY || 'API-3mxgr5$^956rd$*y^$abimni5b8xsxi2m@k9b4vr-TPL';
  const API_BASE_URL = process.env.API_URL || 'http://localhost:8000';

  const applicationApiBasePath = '^' + (apiBasePath ? apiBasePath : '/api');
  const apiPathRewriteConf = {};
  apiPathRewriteConf[applicationApiBasePath] = process.env.API_PREFIX ? '/' + process.env.API_PREFIX : '';
  console.log('---> base API path: ' + applicationApiBasePath);
  console.log('---> base API path rewrite config: ' + JSON.stringify(apiPathRewriteConf, null, 2));

  return {
    target: API_BASE_URL,
    pathRewrite: apiPathRewriteConf,
    changeOrigin: true,

    onProxyReq: (proxyReq, req) => {
      proxyReq.setHeader('api-key', API_KEY);
      console.log('proxy request: ' + req.url);
    },

    onError(err, req, res) {
      const ip = getIPAddress(req);

      res.writeHead(500);

      if (err) {
        if (err.code === 'ENOTFOUND') {
          res.end('API host cannot be found.');
        }

        if (err.code === 'ECONNREFUSED') {
          res.end('API service is probably down.');
        }

        console.error(`${ip} - [${new Date().toISOString()}]  500  ${req.method} ~> ${API_BASE_URL}${req.url} : ${err.message}`);
        return;
      }

      console.error(`${ip} - [${new Date().toISOString()}]  ${ip}  500  ${req.method}  ~> ${API_BASE_URL}${req.url} : Ooops, something went very wrong...`);
      res.end('Ooops, something went very wrong...');
    }
  };
}
