import axios from 'axios';

/**
 * Store Management Pattern
 */
export const Store = {

    data: {
        drawer: false,
        search: 'Angular',
        videos: []
    },

    load() {
        axios.get('http://localhost:3000/').then((res) => {
            this.data.videos = res.data.items
        })
    },

    one(id) {
        return axios.get(`http://localhost:3000/detail/${id}`);
    },

    more() {
        return axios.get(`http://localhost:3000/more`);
    },

    loadTweets() {
        return axios.get(`http://localhost:3000/tweets`);
    },

    search() {
        return axios.get(`http://localhost:3000/search/${this.data.search}`).then((res) => {
            console.log(res.data.items)
            this.data.videos = res.data.items
        })
    },

    related(id) {
        return axios.get(`http://localhost:3000/related/${id}`);
    },

    getComments(id) {
        return axios.get(`http://localhost:3000/comments/${id}`);
    },

    addComment(id, content) {
        return axios.post('http://localhost:3000/addcomments/', { vid: id, content: content, created: new Date() });
    },

    removeComment(id, content) {
        return axios.post('http://localhost:3000/removecomments/', { id: id });
    },

    like(id, title) {
        return axios.post(`http://localhost:3000/like`, { id: id, title: title, created: new Date() });
    },

    dislike(id) {
        return axios.post(`http://localhost:3000/dislike`, { id: id });
    },

    already(id) {
        return axios.get(`http://localhost:3000/already/${id}`);
    }


}