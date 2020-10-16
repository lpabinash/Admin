import React from 'react';
import logo from './logo.svg';
import './App.css';
import Loginpage from './Loginpage'
import Dashboard from './Dashboard';
import Product from './Product';
import Topbar from './Topbar';
import Accounts from './Accounts'
import Axios from 'axios'
import AddProduct from './Addproduct'
import {BrowserRouter,Route, Switch, Redirect} from 'react-router-dom';
import EditItem from './EditItem'

class App extends React.Component {
  state={
    isAdminLoggedIn: JSON.parse(localStorage.getItem("isAdminLoggedIn")),
  }

  onLoggedOutClick = () => {
    this.setState({isAdminLoggedIn:false});
    localStorage.setItem("isAdminLoggedIn",false);
  }
  onLoggedInClick = () => {
    this.setState({isAdminLoggedIn:true});
    localStorage.setItem("isAdminLoggedIn",true);
  }
  componentDidMount(){
    Axios.get('https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json')
        .then(resp=>{
          console.log("Function called");
            localStorage.setItem("LocalData",JSON.stringify(resp.data));
        })
  }
  render(){
  return (
    // <BrowserRouter>
    // <div className="App">
    //   <Topbar/>
    //   <Loginpage/>
    //   {/* <Dashboard/> */}
    //   {/* <Product/> */}
    // </div>
    // </BrowserRouter>
     <BrowserRouter>
     <div>
       <Topbar loggedInStatus={this.state.isAdminLoggedIn} onLoggedOutClick={this.onLoggedOutClick} />
         <Switch>
             <Route path={"/Dashboard"} render={() => this.state.isAdminLoggedIn ? <Dashboard/> : <Redirect to="/Login" />} />
             <Route path={"/Product"} render={() => this.state.isAdminLoggedIn ? <Product/> : <Redirect to="/Login" />} />
             <Route path={"/Accounts"} render={() => this.state.isAdminLoggedIn ? <Accounts/> : <Redirect to="/Login" />} />
             <Route path="/EditItem" component={EditItem} />
             <Route path="/AddProduct" component={AddProduct} />
             <Route path="/Loginpage" render={() => this.state.isAdminLoggedIn ? <Redirect to="/Dashboard" /> : <Loginpage loggedInStatus={this.state.isAdminLoggedIn} onLoggedInClick={this.onLoggedInClick} />} />
             {
               this.state.isAdminLoggedIn ? <Route exact path="/" component={Dashboard}  /> : <Loginpage loggedInStatus={this.state.isAdminLoggedIn} onLoggedInClick={this.onLoggedInClick} />
             }
         </Switch>
       {/* <Footer/> */}
     </div>
   </BrowserRouter>
  );
}
}

export default App;
