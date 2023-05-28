import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.css';
import './styles/header.css';
import './styles/shopbox.css';
import './styles/bestseller.css';
import './styles/adminpanel.css';
import './styles/itempage.css';
// import "./styles/responsive.css";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import { persistor, store } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ChakraProvider>
  </Provider>
);
