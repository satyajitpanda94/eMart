'use client'

import { Provider } from 'react-redux'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'
import store from '../../store'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
