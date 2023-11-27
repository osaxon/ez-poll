export const getServerSession = async () => {
  const response = await fetch('http://localhost:3000/user/auth', {
    method: 'GET',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('User not authenticated')
  }

  return response.json()
}
