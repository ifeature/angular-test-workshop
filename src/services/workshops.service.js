const WORKSHOPS_ENDPOINT = 'api/workshops';

export default function WorkshopsService($http, $q) {
    return {
        getWorkshops,
        getWorkshopById,
        addWorkshop
    };

    function getWorkshops() {
        return $http.get(WORKSHOPS_ENDPOINT)
            .then(parseData)
            .catch(({errors}) => {
              $q.reject(errors);
            });
    }

    function getWorkshopById(id) {
        return $http.get(`${WORKSHOPS_ENDPOINT}/${id}`)
            .then(parseData);
    }

    function addWorkshop(workshop) {
        return $http.post(WORKSHOPS_ENDPOINT, {workshop})
            .then(parseData);
    }

    function parseData({data}) { // !
        return data;
    }
}
