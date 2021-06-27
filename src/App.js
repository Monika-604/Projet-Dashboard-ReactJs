import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import {
  Header,
  Footer
} from './components/'
import './App.css';
import {
  Home,
  Login,
  Register,
  Exchange,
  Weather,
  Dashboard,
  Widgets
} from './screens';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import axios from 'axios'
import { HOST } from './services/config'
import { useDispatch } from "react-redux";
import { setUser, setServices } from './Redux/Actions'
import Sidebar from "react-sidebar";

const customHistory = createBrowserHistory();

function App(props) {
  const { isLoging, services } = props;
  const dispatch = useDispatch();
  const styles = {
    sidebar: {
      ////////
      background: "#69c29e",
      width: 256,
      height: "100%"
    },
    sidebarLink: {
      display: "block",
      padding: "16px 0px",
      color: "#757575",
      textDecoration: "none"
    },
    divider: {
      margin: "8px 0",
      height: 1,
      backgroundColor: "#757575"
    },
    content: {
      height: "100%",
      backgroundColor: "#BEECDA"
    }
  };
  /////////
  // const navbarStyle = {
  //   navbar:{
  //     background: "#69c29e",
  //   }
  // }

  useEffect(() => {
    if (isLoging) {
      try {
        const instance = axios.create({
          baseURL: `${HOST}auth/profile`,
          timeout: 2000,
          headers: { 'Authorization': `Bearer ${localStorage.getItem("jwt")}` }
        })
        instance.get(`${HOST}auth/profile`).then((response) => {
          if (response) {
            dispatch(setUser(response.data))
          }
          return response
        }).catch((error) => {

        });
        instance.get(`${HOST}services`).then((response) => {
          if (response) {
            dispatch(setServices(response.data))
          }
          return response
        }).catch((error) => {

        });
      } catch (error) {
        return error
      }


    }


  }, [isLoging])


  return (
    <BrowserRouter customHistory={customHistory}>
      <div className="App" >
        <ToastContainer />
        {
          isLoging ? (
            <>
              <Sidebar
                styles={styles}
                sidebar={
                  <div>
                    <h2 className="pt-3" >Dashboard</h2>
                    <div className="sidebar-list pt-5">
                      <div className="pb-4 nav-link" >
                        <Link to={`/dashboard`} >
                          dashboard
                        </Link>

                      </div>
                      {
                        services.map((item, index) => {
                          return <div key={index} className="pb-4 nav-link">
                            <Link to={{ pathname: `/${item.name}`, state: item.widgets }} >
                              {item.name}
                            </Link>

                          </div>
                        })
                      }
                      <div className="pb-4 nav-link">
                        <Link to={`/my-widgets`}>
                          My widgets
                        </Link>
                      </div>
                    </div>
                  </div>}
                docked={true}
              >
                <Header />
                <Switch>
                  <Route component={Exchange} path={'/exchange'} exact />
                  <Route component={Weather} path={'/weather'} exact />
                  <Route component={Dashboard} path={'/dashboard'} exact />
                  <Route component={Widgets} path={'/my-widgets'} exact />

                </Switch>
              </Sidebar>
            </>
          ) :
            <Switch >
              <Route component={Login} path={'/'} exact />
              <Route component={Login} path={'/login'} exact />
              <Route component={Home} path={'/home'} exact />
              <Route component={Register} path={'/register'} exact />
            </Switch>
        }



      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  const { isLoging, services } = state.userDetail;

  return {
    isLoging,
    services
  };
};

export default connect(mapStateToProps)((App));
