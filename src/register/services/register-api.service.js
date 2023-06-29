import http from "../../shared/services/http-common.js"

export class RegisterApiService {

    getByEmail(email){
        return http.get(`/users?email=${email}`)
            .then(response => {
                const userArray = response.data; // get an array
                const user = userArray.find(b => b.email === email); // get an object
                return user;
            });
    }
    add(newUser) {
        return http.post('/users', newUser);
    }

}