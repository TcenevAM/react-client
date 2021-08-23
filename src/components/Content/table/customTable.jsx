import { addNewRow, setRows } from "../../store/tableReducer"
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import c from "./table.module.css";
import { makeStyles, withStyles } from '@material-ui/core/styles';

const CustomTableCell = ({ row, name, onChange, align, isFirstTableRow }) => {
    const classes = useStyles();
    let Input = () => <input type="text" name={name} className={c.input} value={row[name]} onChange={e => onChange(e, row)} />
    if (isFirstTableRow){
      Input = () => <input type="text" name={name} className={`${c.input} ${c.firstInput}`} value={row[name]} onChange={e => onChange(e, row)} />
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

const CustomTable = (props) =>
{
    const rows = props.rows
    const dispatch = props.dispatch
    const classes = useStyles();

    const onChange = (e, row) => {
        const { value, name } = e.target
        const { id } = row;
        debugger;
        const newRow = rows.map(row =>
        {
            if (row.id === id)
            {
                return { ...row, [name]: value };
            };
        });
        dispatch(setRows(newRow));
    }
    
    return (
        <div>
            <TableContainer border={0}>
                <Table className={classes.table}>
                    <TableHead>
                        <StyledTableCell align="left">UserID</StyledTableCell>
                        <StyledTableCell align="center">Registration Date</StyledTableCell>
                        <StyledTableCell align="center">Date Last Activity</StyledTableCell>
                    </TableHead>
                    <TableBody>
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
                onClick={() => {
                    let q = addNewRow();
                    dispatch(addNewRow())
                } }
                disableRipple>
                    Add one more
                </Button>
            </div>
        </div>
    )
}
export default CustomTable