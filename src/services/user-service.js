import ServerService from './server-service';

const userKey = 'USER_DATA';

class UserService {
    async getUserData() {
        const userJSON = await localStorage.getItem(userKey);
        const userData = await JSON.parse(userJSON);
        return userData;
    }

    async updateUserData(newData) {
        const userData = await this.getUserData();
        const newUserData = await JSON.stringify({
            ...userData,
            ...newData
        });
        await localStorage.setItem(userKey, newUserData);
    }

    async login(login, pass) {
        const data = await JSON.stringify({login, pass});
        return ServerService.post('login', data);
    }

    async register(login, pass, name) {
        const data = await JSON.stringify({login, pass, name});
        return ServerService.post('register', data);
    }

    logout() {
        return this.updateUserData({loggedIn: false});
    }
}

const userService = new UserService();

export default userService;