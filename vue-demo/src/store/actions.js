export default {
    addFn({ commit }, obj) {
        commit('ADD', obj)
    },
    getData({ commit }, obj) {
        commit('storeData', obj)
    }
}