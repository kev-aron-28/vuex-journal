import axios from 'axios'

const uploadImage = async (file) => {
  if(!file) return

  try {

    const formData = new FormData()
    formData.append('upload_preset', 'curso_vue')
    formData.append('file', file)
    
    const url = 'https://api.cloudinary.com/v1_1/kevaron/image/upload'
    const { data } = await axios.post(url, formData)
    console.log(data)
    return data.secure_url

  } catch(e) {
    console.log(e) 
    return null
  }
}

export default uploadImage
