import { BrowserRouter } from "react-router-dom"
import Router from "./routes/Router"
import Layout from "./layout/Layout"
import UserProvider from "./users/providers/userProvider"
import ThemeProvider from "./providers/ThemeProvider"
import NotificationProvider from "./providers/NotificationProvider"
import { App as AntApp } from 'antd'
import AuthProvider from "./providers/AuthProvider"
import RefProvider from "./providers/RefProvider"

function App() {

  return (
    <BrowserRouter>
      <AntApp>
        <ThemeProvider>
          <NotificationProvider>
            <UserProvider>
              <AuthProvider>
                <RefProvider>
                  <Layout>
                    <Router />
                  </Layout>
                </RefProvider>
              </AuthProvider>
            </UserProvider>
          </NotificationProvider>
        </ThemeProvider>
      </AntApp>
    </BrowserRouter >
  )
}

export default App