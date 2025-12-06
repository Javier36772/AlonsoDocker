const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy para redirigir peticiones al backend usando el nombre del servicio
  // En Docker, el backend se llama 'alonso-backend-api' (nombre del servicio)
  // En desarrollo local, usa 'localhost:5000'
  const backendUrl = process.env.REACT_APP_API_URL || 'http://alonso-backend-api:5000';
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
      secure: false,
      logLevel: 'info',
      ws: true // Soporte para WebSocket si es necesario
    })
  );
};

