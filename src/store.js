import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const headers = {
    Authorization: process.env.VUE_APP_TOKEN,
    accept: 'application/json'
};
let preloadImg = [];

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        rooms: null,
        room: null,
        reserveDate: [],
        reserveResult: null,
        bookingData: null,
        bookingModal: false,
        bookingLoading: false,
    },
    mutations: {
        setRooms(state, payload) {
            state.rooms = payload;
        },
        setRoom(state, payload) {
            state.room = payload;
        },
        setReserveDate(state, payload) {
            state.reserveDate = payload;
        },
        setReserveResult(state, payload) {
            state.reserveResult = payload;
        },
        setBookingData(state, payload) {
            state.bookingData = payload;
        },
        toggleBookingModal(state, payload) {
            state.bookingModal = payload;
        },
        setBookingLoading(state, payload) {
            state.bookingLoading = payload;
        },
    },
    actions: {
        getRooms({ commit }) {
            axios.get('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', { headers })
                .then(res => {
                    if (res.data.success) {
                        let loadedImgs = 0;
                        let result = res.data.items.reverse();
                        for (let i = 0; i < result.length; i++) {
                            preloadImg[i] = document.createElement('IMG');
                            preloadImg[i].src = result[i].imageUrl;
                            preloadImg[i].onload = () => {
                                loadedImgs++;
                                if (loadedImgs === result.length) {
                                    commit('setRooms', result);
                                }
                            };
                        }
                    }
                })
                .catch(err => console.error(err));
        },
        getRoom({ commit }, id) {
            axios.get(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`, { headers })
                .then(res => {
                    if (res.data.success) {
                        let loadedImgs = 0;
                        let images = res.data.room[0].imageUrl;
                        images.forEach(img => {
                            let preloadImg = new Image();
                            preloadImg.onload = () => {
                                loadedImgs++;
                                if (loadedImgs === images.length) {
                                    commit('setRoom', res.data.room[0]);
                                    commit('setBookingData', res.data.booking);
                                }
                            };
                            preloadImg.src = img;
                        });
                    }
                })
                .catch(err => console.error(err));
        },
        booking({ state, commit, dispatch }, data) {
            commit('setBookingLoading', true);
            axios({
                method: 'POST',
                url: `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${state.route.params.id}`,
                headers,
                data
            })
                .then(res => {
                    if (res.data.success) {
                        commit('setReserveResult', '');
                        commit('setReserveDate', []);
                        dispatch('getRoom', state.route.params.id);
                    }
                })
                .catch(res => {
                    if (res.response) {
                        commit('setReserveResult', res.response.data.message);
                    }
                })
                .finally(() => {
                    commit('setBookingLoading', false);
                    commit('toggleBookingModal', false);
                });
        },
    }
});
