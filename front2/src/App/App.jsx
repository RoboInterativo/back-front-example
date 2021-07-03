import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { LoginPage } from '@/LoginPage';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
                <div>
                <AppBar position="static">
                <Toolbar>
                    {currentUser && <div>
                        <Button onClick={this.logout}  color="inherit">Logout</Button>
                        <Link to="/"><Button>Home</Button></Link>
                        {isAdmin && <Link to="/admin"><Button color="inherit">Admin</Button></Link>}
                        </div>
                      //  <nav className="navbar navbar-expand navbar-dark bg-dark">
                      //      <div className="navbar-nav">
                      //          <Link to="/" className="nav-item nav-link">Home</Link>
                      //          {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                      //          <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                      //      </div>
                      //  </nav>
                    }
                    </Toolbar>
                    </AppBar >
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App };
