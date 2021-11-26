import axios from "axios"

const journalApi = axios.create({  
  baseURL: 'https://vue-demo-7e167-default-rtdb.firebaseio.com'
})

export default journalApi
