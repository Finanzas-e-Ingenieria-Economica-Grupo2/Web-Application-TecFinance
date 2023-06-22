import http from "../../shared/services/http-common.js"

export class PaymentApiService {
    getAll() {
        return http.get('/payments');
    }

    getByOfferId(offerId) {
        return http.get('/payments')
            .then(response => {
                // Filtrar los objetos con offerId === 1
                const filteredPayments = response.data.filter(payment => payment.offerId === offerId);
                return filteredPayments;
            });
    }
}