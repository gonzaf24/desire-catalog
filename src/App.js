import React, { useState, Suspense } from 'react'
import './styles/App.css'
import { Route, Switch } from 'wouter'
import { Menu, Navbar } from './components'
import { UserContextProvider } from './context/UserContext'
import { Admin, Error, Category, Home, Product, Login } from './pages'

function App() {
   const [showMenu, setShowMenu] = useState(false)

   const onShowMenu = () => {
      setShowMenu(!showMenu)
   }

   return (
      <UserContextProvider>
         <div className="app-container" id="app-container">
            <Suspense fallback={ null }>
               <Navbar showMenu={ showMenu } onShowMenu={ onShowMenu } />
               <Menu showMenu={ showMenu } onShowMenu={ onShowMenu } />
               <Switch>
                  <Route component={ Home } path={ '/' } />
                  <Route component={ Category } path={ '/category/:category' } />
                  <Route component={ Product } path={ '/product/:id' } />
                  <Route component={ Login } path="/login" />
                  <Route component={ Admin } path="/admin" />
                  <Route component={ Error } path="/:rest*" />
               </Switch>
            </Suspense>
         </div>
      </UserContextProvider>
   )
}

export default App
