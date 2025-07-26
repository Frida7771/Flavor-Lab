import { createRoot } from 'react-dom/client'
import App from './App'
import './models/i18n.ts'; // Import the i18n configuration
import { Provider } from 'react-redux';
import { store } from './services/store.ts';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.ts';
import { registerSW } from 'virtual:pwa-register'


const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {}
})

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
)
