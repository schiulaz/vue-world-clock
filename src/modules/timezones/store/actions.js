import countriesApi from '@/api/countriesApi'

export const loadTimezones = async ({ commit }) => {
    commit('setLoading', true)
    const { data } = await countriesApi.get('/timezones')
    commit('setTimezones', data)
    commit('setLoading', false)
}

export const getLocalTime = async ({ commit }, timezones) => {
    let result = []
    commit('setLoading', true)
    for (const timezone of timezones) {
        const { data } = await countriesApi.get(`/timezone/${timezone}`)
        result.push({ datetime: data.datetime, timezone: data.timezone })

    }
   
    commit('setClocks', result)
    commit('setLoading', false)
}