import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorBoundary } from 'react-error-boundary'

interface IError {
  message: string
}

interface IErrorValues {
  error: IError
}

function FullPageErrorFallback({ error }: IErrorValues) {
  return (
    <div
      role="alert"
      style={{
        color: 'red',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
    <App />
  </ErrorBoundary>
);
