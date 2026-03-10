export default () => ({
    phobosAuthUrl: process.env.PHOBOS_AUTH_URL ? process.env.PHOBOS_AUTH_URL : 'http://phobos-auth-service',
    QLCPLUS_WS_URL: process.env.QLCPLUS_WS_URL ? process.env.QLCPLUS_WS_URL : 'ws://localhost:9999/qlcplusWS'
});