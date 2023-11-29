import axios from 'axios'

export async function fetchPulse(getAccessTokenFn) {
  try {
    const token = await getAccessTokenFn()
    const data = await axios.get('http://localhost:3000/pulse', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getToken() {
  try {
    const data = await axios.get('http://localhost:3000/token')
    if (!data) throw new Error('something went wrong')
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
