import ServerService from './server-service';

class EntitieService {
    getEntities(userId) {
        return ServerService.post(`${userId}/get`, null);
    }
}

const entitieService = new EntitieService();

export default entitieService;