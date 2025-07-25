import { BrowserRouter, Router } from 'react-router-dom'
import './App.css'
import AppRouter from './routes/routes'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'


function App() {


  return (
    
    <>
      {
        <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
          <BrowserRouter>
            <AppRouter/>
          </BrowserRouter>
        </StyleSheetManager>     
      }
    </>
  )
}

export default App
