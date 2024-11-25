import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'


async function startApp() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Initializing MSW...')
    try {
      const { worker } = await import('./mocks/browser')
      await worker.start({
        onUnhandledRequest: 'bypass',
      })
      console.log('MSW initialized successfully')
    } catch (error) {
      console.error('Failed to initialize MSW:', error)
    }
  }

  const queryClient = new QueryClient();
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </StrictMode>,
  )
}

startApp()