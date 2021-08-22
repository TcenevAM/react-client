import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import c from "./Content.module.css";

const CustomTableCell = ({ row, name, onChange, align, isFirstTableRow }) => {
  const classes = useStyles();
  let Input = () => <input type="text" name={name} className={c.input} value={row[name]} onChange={e => onChange(e, row)} />
  if (isFirstTableRow){
    Input = () => <input type="text" name={name} className={c.firstInput} value={row[name]} onChange={e => onChange(e, row)} />
  }
  return (
    <TableCell align={align} className={classes.tableCell, c.td} >
      <Input/>
    </TableCell>
  );
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    opacity: 0.4,
    color: "#3C5AA8",
    border: 0
  },
  body: {
    fontSize: 14,
    color: "#5D6D97",
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontWeight: 400,
    border: 0
  },
}))(TableCell);

const StyledTableRow = withStyles(() => { })(TableRow);

function createData(userId, registrationDate, lastActivityDate) {
  return { id: userId, userId, registrationDate, lastActivityDate };
}

const useStyles = makeStyles({
  table: {
    minWidth: 1300
  },
  button: {
    color: "#5D6E97",
    fontSize: 16,
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    marginTop: 25,
    fontWeight: 400,
    border: 0,
    textTransform: 'none'
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [rows, setRows] = React.useState([
    createData(1, 159, 6.0),
    createData(2, 237, 9.0),
    createData(3, 262, 16.0)
  ]);

  const [previous, setPrevious] = React.useState({});
  const onChange = (e, row) =>
  {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const userId = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [userId]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  return (
    <div className={c.wrapper}>
      <TableContainer border={0}>
        <Table className={classes.table}>
          <TableHead>
              <StyledTableCell align="left">UserID</StyledTableCell>
              <StyledTableCell align="center">Registration Date</StyledTableCell>
              <StyledTableCell align="center">Date Last Activity</StyledTableCell>
          </TableHead>
          <TableBody border={0}>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <CustomTableCell {...{ row, name: "userId", onChange, align: "left", isFirstTableRow: true }} />
                <CustomTableCell {...{ row, name: "registrationDate", onChange, align: "center" }} />
                <CustomTableCell {...{ row, name: "lastActivityDate", onChange, align: "center" }} />
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button
          className={classes.button}
          startIcon={<AddIcon />}
          size="small"
          onClick={ () =>{
            rows.push(createData(0, 0, 0))
          } }
          disableRipple
        >
        Add one more
        </Button>
      </div>
    </div>
  );
}
