import { Auth0Provider } from '@auth0/auth0-react'
import '@radix-ui/themes/styles.css'
import App from 'components/App'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: 'ez-poll-api',
      scope: `openid profile email`
    }}
  >
    <App />
  </Auth0Provider>
)
