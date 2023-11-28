import { useQuery } from '@tanstack/react-query'

const checkAuthStatus = async () => {
  const response = await fetch('http://localhost:3000/user/auth', {
    method: 'GET',
    credentials: 'include'
  })

  return response.json()
}

export const useAuth = () => {
  const { data, status, isLoading, isError } = useQuery({
    queryKey: ['auth-status'],
    queryFn: checkAuthStatus
  })

  const isAuthenticated = status === 'success'

  return {
    isLoading,
    isError,
    authenticated: isAuthenticated,
    user: isAuthenticated ? data : null
  }
}
