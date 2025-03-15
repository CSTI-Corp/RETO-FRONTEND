import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes/AppRoutes';
import './index.css';
import { StyledEngineProvider } from '@mui/material';

function App() {
  return (
      <>
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <AppRoutes />
            </StyledEngineProvider>
        </BrowserRouter>
      </>
  )
}

export default App
