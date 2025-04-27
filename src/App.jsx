import Header from './views/components/Header'
import AppRoutes from './routes'

export default function App() {
  return (
    <>
      <Header />
      <main style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%'}}>
          <AppRoutes />
        </div>
      </main>
    </>
  )
}
