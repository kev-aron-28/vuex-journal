const getEntriesyByTerm = (state) => ( term = '' ) => {
    if(term.length === 0){
        return state.entries
    } else {
    return state.entries.filter( entry => entry.text.toLowerCase().includes(term.toLocaleLowerCase()) )
    }
}

const getEntryById = (state) => ( id = '1') => {
    const entry = state.entries.find (e => e.id == id)
    if(!entry) return
    return {...entry}
}
export {
    getEntriesyByTerm,
    getEntryById
}