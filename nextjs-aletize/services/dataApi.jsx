import axios from 'axios'

// Initiliaze axios with base url
var USER_BASE_REST_API_URL;

// Check if window is defined, if not, we are on the server side
if (typeof window !== "undefined") {
    USER_BASE_REST_API_URL = window.location.protocol + "//" + window.location.hostname + ":8000/api/";
}

// Set the default headers for all requests format json  
axios.defaults.headers.get['Accept'] = 'application/json';

class dataApi {
    // Get for Test
    student() {
        return axios.get(USER_BASE_REST_API_URL + 'student');
    }
}

export default new dataApi();
