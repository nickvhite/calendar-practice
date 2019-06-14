import ServerService from './server-service';

class EntitieService {
    getEntities(userId) {
        return ServerService.post(`${userId}/get`, null);
    }

    async create(userId, data) {
        data = await JSON.stringify(data);
        return ServerService.post(`${userId}/create`, data);
    }
}

const entitieService = new EntitieService();

export default entitieService;