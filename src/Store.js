import axios from 'axios';

/**
 * Store Management Pattern
 */
export const Store = {

    data: {
        drawer: false,
        search: '',
    },

    load() {
        return axios.get('http://localhost:3000/');
    },

    one(id) {
        return axios.get(`http://localhost:3000/detail/${id}`);
    },

    more() {
        return axios.get(`http://localhost:3000/more`);
    },

    search(word = "Angular") {
        return axios.get(`http://localhost:3000/search/${word}`);
    }
}