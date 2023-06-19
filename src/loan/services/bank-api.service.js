import http from "../../shared/services/http-common.js"

export class BankApiService {
    getAll() {
        return http.get('/banks');
    }

    getByName(name) {
        return http.get(`/banks?name=${name}`)
            .then(response => {
                const banks = response.data; // get an array
                const bank = banks.find(b => b.name === name); // get an object
                return bank;
            });
    }
}