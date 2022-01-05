import { createProxyMiddleware } from 'http-proxy-middleware';
import apiProxyConfiguration from '../../src/api/apiProxyConf';


export const config = {
  api: {
    bodyParser: false,
  },
};

const proxyConf:Object = apiProxyConfiguration();
const apiProxy = createProxyMiddleware(proxyConf);
export default apiProxy;
