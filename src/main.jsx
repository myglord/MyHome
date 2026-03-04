import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import MobileMenuProvider from './contextApi/MobileMenuContext.jsx'
import OffCanvasProvider from './contextApi/OffCanvasContext.jsx'
import ScrollHideProvider from './contextApi/ScrollHideContext.jsx'
import PropertyFilterProvider from './contextApi/PropertyFilterContext.jsx'
import { PropertiesDataProvider } from './contextApi/PropertiesDataContext.jsx'
import { AuthProvider } from './contextApi/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <PropertiesDataProvider>
  <PropertyFilterProvider>
        <ScrollHideProvider>
          <OffCanvasProvider>
            <MobileMenuProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </MobileMenuProvider>
          </OffCanvasProvider>
        </ScrollHideProvider>
  </PropertyFilterProvider>
  </PropertiesDataProvider>
  </AuthProvider>
)
