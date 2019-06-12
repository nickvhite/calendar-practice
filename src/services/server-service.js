const serverPort = 8008;
const {protocol, hostname} = window.location;
const serverName = `${protocol}//${hostname}:${serverPort}/api/`;

export default class ServerService {
    static post(route, data) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        };
        return new Promise((resolve, reject) => {
            fetch(`${serverName}${route}`, options)
                .then(async response => {
                    const resp = await response.json();
                    resp.success ? resolve(resp.data) : reject(resp.data);
                })
        })
    }

    static get(route, data) {
        const options = {
            method: 'GET',
            body: data
        };
        return fetch(`${serverName}${route}`, options);
    }
}