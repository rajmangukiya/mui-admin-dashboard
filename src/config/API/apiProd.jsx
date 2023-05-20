const protocol = 'http';
const host = '192.168.1.35';
const port = '5000';
const trailUrl = 'api/v1';

const hostUrl = `${protocol}://${host}${port ? ':' + port : ''}/`;
const endpoint = `${protocol}://${host}${(port ? ':' + port : '')}/${trailUrl}`;

export default {
    protocol: protocol,
    host: host,
    port: port,
    apiUrl: trailUrl,
    endpoint: endpoint,
    hostUrl: hostUrl
};
