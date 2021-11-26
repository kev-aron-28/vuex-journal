import journalApi from "../../../../api/journalApi"

const loadEntries = async ({ commit }) => {
  commit('setLoading', true)
  try{
   const { data } = await journalApi.get('/entries.json')
   const entries = []
   if(!data) {
     commit('setEntries', [])
     return
   }
   for(let id of Object.keys(data)){
    entries.push({
     id,
     ...data[id]
    })
   } 
   commit('setEntries', entries)
  } catch(e) {
    console.log(e)
  } finally {
   commit('setLoading', false)
  }
 

}

const updateEntry = async ({ commit }, entry) => {
  const { date, text, picture } = entry
  const dataToSave = { date, text, picture }
  const updatedEntry = await journalApi.put(`/entries/${entry.id}.json`, dataToSave) 
  console.log(updatedEntry)
  commit('updateEntry', { ...entry })
}

const createEntry = async ({commit}, entry) => {
  const { date, text, picture } = entry
  const dataToSave = { date, text, picture }
  const { data } = await journalApi.post('/entries.json', dataToSave)
  entry.id = data.name
  commit('addEntry', { ...entry })
  return data.name
}

const deleteEntry = async ({commit}, id) =>{
  console.log(id)
  await journalApi.delete(`/entries/${id}.json`)
  commit('deleteEntry', id)
}

export {
    loadEntries,
    updateEntry,
    createEntry,
    deleteEntry
}
