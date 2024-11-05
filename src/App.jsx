import { BrowserRouter } from "react-router-dom"
import Router from "./routes/Router"
import Layout from "./layout/Layout"
import UserProvider from "./users/providers/userProvider"
import ThemeProvider from "./providers/ThemeProvider"
import NotificationProvider from "./providers/NotificationProvider"
import { App as AntApp } from 'antd'
import AuthProvider from "./providers/AuthProvider"
import ProfilePage from "./pages/ProfilePage"

function App() {

  return (
    <BrowserRouter>
      <AntApp>
        <ThemeProvider>
          <NotificationProvider>
            <UserProvider>
              <AuthProvider>
                <Layout>
                  <Router />
                </Layout>
              </AuthProvider>
            </UserProvider>
          </NotificationProvider>
        </ThemeProvider>
      </AntApp>
    </BrowserRouter>
  )
}

export default App