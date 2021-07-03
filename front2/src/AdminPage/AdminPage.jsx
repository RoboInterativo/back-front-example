import React from 'react';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { userService } from '@/_services';
import Box from '@material-ui/core/Box'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';


class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { users } = this.state;
        const classes = makeStyles((theme) => ({
        container: {
          display: "flex"
        },
        f24: {
          fontSize: 24
        },
        f36: {

          fontSize: 36
        },
        item: {
          border: "1px solid blue"
        },
        itemFlexStart: {
          display: "flex",
          justifyContent: "flex-start"
        },
        itemFlexEnd: {
          display: "flex",
          justifyContent: "flex-end"
        },
        root: {
          flexGrow: 1,
        },
        h1:{
          flexGrow: 1,
        },

        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      }));
        return (
            <div>
                <h1>Admin</h1>
                <p>This page can only be accessed by administrators.</p>
                <div>
                    All users from secure (admin only) api end point:
                  <div  className={classes.root}>
                  <Grid container spacing={3}>
                  <Grid item xs={12}>


                      <Box display="flex"  m={1} p={1} bgcolor="background.paper">
                      <Box fontWeight="fontWeightLight" fontSize={36} flexGrow= {1} p={1} >
                        Dashboard
                      </Box>



                    <Box fontWeight="fontWeightLight" fontSize={24}  p={1} >
                    Welcome, alexpricker
                    </Box>

                      </Box>


                      </Grid>
                     <Grid item xs={6}>
                       <Paper className={classes.paper}>

                       </Paper>
                     </Grid>
                     <Grid item xs={6}>
                       <Paper className={classes.paper}>xs=12</Paper>
                     </Grid>
                  </Grid>


                 </div>
                    {users &&
                        <ul>
                            {users.map(user =>
                                <li key={user.id}>{user.firstName} {user.lastName}</li>
                            )}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

export { AdminPage };
