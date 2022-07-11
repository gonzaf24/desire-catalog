import React, { useState, Suspense } from "react";
import "./styles/App.css";
import { Route, Switch } from "wouter";
import { UserContextProvider } from "./context/UserContext";

import NavBar from './components/navBar.component';
import Menu from './components/menu.component';

import Home from './pages/home.page';
import Category from './pages/category.page';
import Item from './pages/item.page';
import Login from './pages/login.page'
import Admin from './pages/admin.page'
import ErrorPage from './pages/error.page';

function App() {

/*   const [isAppLoading, setIsAppLoading] = useState(false);
 */  const [showMenu, setShowMenu] = useState(false);

  const onShowMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <UserContextProvider>
      <div className='app-container' id='app-container'>
        <Suspense fallback={null}>
          <NavBar showMenu={showMenu} onShowMenu={onShowMenu} />
          <Menu showMenu={showMenu} onShowMenu={onShowMenu} />
          <Switch>
            <Route path={'/'} component={Home} />
            <Route path={'/category/:category'} component={Category} />
            <Route path={'/item/:id'} component={Item} />
            <Route path="/login" component={Login} />
            <Route path='/admin' component={Admin} />
            <Route path="/:rest*" component={ErrorPage} />
          </Switch>
        </Suspense>
      </div >
    </UserContextProvider>
  );
}

export default App;