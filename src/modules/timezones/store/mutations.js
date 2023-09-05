export const setTimezones = (state, data) => {
    state.timezones = data
}

export const setClocks = (state, data) => {
    state.clocks = data
}

export const deleteClock = (state, index) => {
    state.clocks.splice(index, 1)
}

export const setLoading = (state, boolean) => {
    state.loading = boolean
}