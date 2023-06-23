import http from "../../shared/services/http-common.js"

export class OfferApiService {
    getAll() {
        return http.get('/offers');
    }

    add(newOffer) {
        return http.post('/offers', newOffer);
    }

    getOfferByUserId(userId){
        return http.get('/offers')
            .then(response => {
                // Filtrar los objetos con offerId === 1
                const filteredOffers = response.data.filter(offer => offer.userId === userId);

                // Obtener el id más alto entre las ofertas filtradas
                const maxId = Math.max(...filteredOffers.map(offer => offer.id));

                // Encontrar la oferta que tiene el id más alto
                const lastOffer = filteredOffers.find(offer => offer.id === maxId);

                return lastOffer;
            });
    }
}