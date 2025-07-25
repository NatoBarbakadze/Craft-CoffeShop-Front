import { BrowserRouter, Router } from 'react-router-dom'
import './App.css'
import AppRouter from './routes/routes'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import CurrencyContextProvider from './contexts/CurrencyContext'


function App() {
  return (
    <>
      {
        <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
          <CurrencyContextProvider>
            <BrowserRouter>
              <AppRouter/>
            </BrowserRouter>
          </CurrencyContextProvider>
        </StyleSheetManager>     
      }
    </>
  )
}
export default App
