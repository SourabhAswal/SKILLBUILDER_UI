
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';

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

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function Test(props) {
//  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

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

  const[rolejson,setRolejson]=useState([])

  useEffect(() => {


        },[]);
    
    
  
  


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
    <div>
       {/* <input type="text" style={{width:"20px",marginBottom:"10px"}} placeholder="Search.."/> */}
    <Paper 
    // className={classes.paper}
    >
        {/* <input type="text" style={{width:"20px"}} placeholder="Search.."/> */}
      <List dense component="div" role="list" style={{overflowY:'scroll',width:"120px", height:'150px'}}>
        
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
          
            <ListItem style={{height:"30px"}} key={value} role="listitem" button onClick={handleToggle(value)}>
              {/* <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon> */}
              <ListItemText id={labelId} primary={`List item ${value + 2}`} />
            </ListItem>
          
          );
        })}
        <ListItem />
      </List>
      
    </Paper>
    </div>
  );

  return (
    <Grid
    
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
    //   className={classes.root}
    >
      
      <Grid item style={{marginLeft:"45px",fontSize:"2px",padding:"10px"}}> <p style={{float:"top",marginBottom:"10px",paddingBottom:"20px"}}>Available</p>{customList(left)}</Grid>

      <Grid item style={{marginTop:"50px"}}>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            style={{padding:"2px",marginBottom:"10px"}}
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
            style={{padding:"2px",marginBottom:"10px"}}
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
            style={{padding:"2px",marginBottom:"10px"}}
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
             style={{padding:"2px",marginBottom:"10px",height:"20px",width:"1px"}}
            // className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item ><p style={{paddingBottom:"20px"}}>Mapped</p>{customList(right)}</Grid>
    </Grid>
  );
}