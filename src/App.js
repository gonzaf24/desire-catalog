import React, { useState, Suspense } from 'react'
import './styles/App.css'
import { Route, Switch } from 'wouter'
import { UserContextProvider } from './context/UserContext'

import NavBar from './components/navBar.component'
import { Menu } from './components/index'

import Home from './pages/home.page'
import Category from './pages/category.page'
import Item from './pages/item.page'
import Login from './pages/login.page'
import Admin from './pages/admin.page'
import ErrorPage from './pages/error.page'

function App() {
   const [showMenu, setShowMenu] = useState(false)

   const onShowMenu = () => {
      setShowMenu(!showMenu)
   }

   return (
      <UserContextProvider>
         <div className="app-container" id="app-container">
            <Suspense fallback={ null }>
               <NavBar showMenu={ showMenu } onShowMenu={ onShowMenu } />
               <Menu showMenu={ showMenu } onShowMenu={ onShowMenu } />
               <Switch>
                  <Route component={ Home } path={ '/' } />
                  <Route component={ Category } path={ '/category/:category' } />
                  <Route component={ Item } path={ '/item/:id' } />
                  <Route component={ Login } path="/login" />
                  <Route component={ Admin } path="/admin" />
                  <Route component={ ErrorPage } path="/:rest*" />
               </Switch>
            </Suspense>
         </div>
      </UserContextProvider>
   )
}

export default App
