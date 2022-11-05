import React, { Suspense } from 'react'
import { Route, Switch } from 'wouter'
import { AppNavbar } from './containers'
import { UserContextProvider } from './context/UserContext'
import { Admin, Error, Category, Home, Product, Login } from './pages'

import './styles/App.css'

function App() {

   return (
      <UserContextProvider>
         <div className="AppContainer">
            <Suspense fallback={ null }>
               <AppNavbar />
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
