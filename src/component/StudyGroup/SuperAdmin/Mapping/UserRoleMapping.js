
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useEffect } from 'react';
import Select from "react-dropdown-select";
import AdminServices from '../Admin Service/AdminServices';
import Alert from 'react-s-alert';
import Encryption from '../../../Routing/Encryption';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: 'auto',
//   },
//   paper: {
//     width: 200,
//     height: 230,
//     overflow: 'auto',
//   },
//   button: {
//     margin: theme.spacing(0.5, 0),
//   },
// }));



export default function UserRoleMapping() {
  // const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  var [count, setCount] = React.useState(0);
  var [roleId, setRoleId] = React.useState(0);

  const [user, setUser] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const [role, setRole] = React.useState([]);
  const [option, setOption] = React.useState([]);






  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  // fetching all user
  function fetchUser() {

    AdminServices.userdetails()
      .then(response => response.json())
      .then((data) => {

        var result = data.map(function (a) { return a.first_name });
        //  [count, setCount] = React.useState(result);
        setUser(data);

        //  return result;

      });
  }


  function fetchrole() {

    AdminServices.UserRole()
      .then(response => response.json())
      .then((data) => {


        setRole(data);

        for (var i = 0; i < data.length; i++) {
          option.push({ value: data[i].id, label: data[i].role_name });
        }

        setOption(option);

      });
    // mapRole();
  }


  // options for role mapping(Superadmin,admin,user)

  function setValues(e) {
    document.getElementById('object').style.display = 'block'
    document.getElementById('height').style.height = '500px'



    var leftrole = [];
    var rightrole = [];
    var userRole = [];


    setRoleId(e[0].value);

    for (var i = 0; i < role.length; i++) {
      if (role[i].id == e[0].value) {
        userRole = role[i].user_ID;
        break;
      }
    }



    for (var i = 0; i < user.length; i++) {

      if (userRole.indexOf(user[i].id) > -1) {

        leftrole.push(user[i]);
      }
      else {
        rightrole.push(user[i]);
      }

    }


    setLeft(rightrole);
    setRight(leftrole);
  }

  // save the function
  function save() {


    var result = right.map(function (a) { return a.id; });

    AdminServices.UpdateRole(roleId, result)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        Alert.success('Mapped Succesfully', {
          position: 'top-right',
          effect: 'slide',
          beep: true,
          timeout: 700,
          offset: 100
        });


      }

      )
      .catch(error => console.log(error))
    // window.location.reload();

  }


  // reset function
  function reset() {

    document.getElementById('object').style.display = 'none'
    document.getElementById('height').style.height = '200px'



  }

  // exit (redirect you to SuperAdminDashboard)
  function exit() {


    window.location.reload();

  }

  useEffect(() => {
    fetchUser();
    fetchrole();
    // mapRole();
  }, [])

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };
  const customList = (items) => (
    <Paper style={{ height: '150px', width: '140px', marginLeft: '20%' }}>
      <List style={{ overflowY: 'scroll', height: '150px' }} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemText id={labelId} primary={`${value.first_name}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
  const encryptedData = localStorage.getItem("encrypted");

  if (localStorage.getItem("encrypted") !== null && new Encryption().decrypt(encryptedData).default_role === "Admin")

    return (
      <div className="container-fluid" id="container-wrapper">
        <div className="card mx-auto b" style={{ width: '40rem', marginTop: "10%" }} >
          <h5 className="card-header" style={{ textAlign: 'center', height: '50px', marginTop: "0", fontSize: "20px", color: "#6e707e", fontWeight: "bold", backgroundColor: "#eaecf4" }}>User Role Mapping</h5>
          <div className="card-body" id="height" style={{ height: '200px' }}>
            <span style={{ display: 'flex', marginLeft: '17%' }}> <p style={{ marginTop: "3%" }}> Role:</p>
              <Select id="test" options={option} style={{ width: '250px' }} className="ml-3" onChange={(values) => setValues(values)} />
            </span>
            <center style={{ margin: "35px" }}>
              <a href="#" className="btn " onClick={save} style={{ marginRight: '14px', borderRadius: "0px", color: "white", backgroundColor: "#22b1ed", width: "100px", fontSize: "12px" }}>Save</a>
              <a href="#" className="btn " onClick={reset} style={{ marginRight: '18px', borderRadius: "0px", color: "white", backgroundColor: "#22b1ed", width: "100px", fontSize: "12px" }}>Reset</a>
              <a href="#" className="btn " onClick={exit} style={{ marginRight: '14px', borderRadius: "0px", color: "white", backgroundColor: "#22b1ed", width: "100px", fontSize: "12px" }}>Exit</a>
            </center>
            <div id="object" style={{ display: 'none' }}>
              <center><p style={{ fontSize: "20px" }}>Users</p></center>
              <div class="card" style={{ height: '250px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ marginTop: "5%", color: "grey", marginLeft: "13%", fontSize: "18px" }}>
                    Available
                  </div>
                  <div style={{ marginTop: "5%", color: "grey", marginLeft: "30%", fontSize: "18px" }}>
                    Mapped
                  </div>
                </div>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                // className={classes.root}
                >
                  <Grid item>{customList(left)}</Grid>
                  <Grid item>
                    <Grid style={{ marginLeft: '25px' }} container direction="column" alignItems="center">
                      <Button
                        variant="outlined"
                        size="small"
                        // className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                      >
                        ≫
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        // className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                      >
                        &gt;
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        // className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                      >
                        &lt;
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        // className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                      >
                        ≪
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>{customList(right)}</Grid>
                </Grid>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  else {
    window.location.replace("/signIn")
    localStorage.clear();
  }
}