const setEntries = ( state, entries ) => {
    state.entries = [...state.entries, ...entries]
}

const setLoading = ( state, status ) => {
    state.isLoading = status
}
const updateEntry = (state, entry) => {
    const idx = state.entries.map(e => e.id).indexOf(entry.id)
    state.entries[idx] = entry
}

const addEntry = (state, entry) => {
    state.entries = [entry , ...state.entries]
}

const deleteEntry = (state, id) => {
    state.entries = state.entries.filter(e => e.id !== id)
}

export {
    setEntries,
    updateEntry,
    setLoading,
    addEntry,
    deleteEntry
}
