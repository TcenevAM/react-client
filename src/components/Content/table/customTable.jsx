import { addNewRow, updateRow, useUsersInfo } from "../../../store/tableReducer";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import c from "./table.module.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const CustomTableCell = ({
  userInfo,
  propertyName,
  onChange,
  align,
  type,
  isFirstTableRow,
}) => {
  const classes = useStyles();
  return (
    <TableCell align={align} className={(classes.tableCell, c.td)}>
      {type === "number" && (<input
        type="text"
        autoFocus
        className={`${c.input} ${isFirstTableRow && c.firstInput}`}
        value={userInfo[propertyName]}
        onChange={(e) => onChange(e, userInfo)}
      />)
      }
      {type === "date" && (
        <TextField
          type="date"
          defaultValue={userInfo[propertyName]}
          className={classes.textField}
          onChange={(e) =>
            onChange(e, {
              ...userInfo,
              [propertyName]: e.target.value,
            })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    </TableCell>
  );
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    opacity: 0.4,
    color: "#3C5AA8",
    border: 0,
  },
  body: {
    fontSize: 14,
    color: "#5D6D97",
    fontFamily: "Ubuntu",
    fontStyle: "normal",
    fontWeight: 400,
    border: 0,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => {})(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 1300,
  },
  button: {
    color: "#5D6E97",
    fontSize: 16,
    fontFamily: "Ubuntu",
    fontStyle: "normal",
    marginTop: 25,
    fontWeight: 400,
    border: 0,
    textTransform: "none",
  },
});

const CustomTable = () => {
  const usersInfo = useUsersInfo();
  const dispatch = useDispatch();
  const classes = useStyles();

  const onChange = (e, row) => {
    dispatch(updateRow(row));
  };

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
            {usersInfo.map((userInfo) => (
              <StyledTableRow key={userInfo.id}>
                <CustomTableCell
                  {...{
                    userInfo,
                    type: "number",
                    propertyName: "id",
                    onChange,
                    align: "left",
                    isFirstTableRow: true,
                  }}
                />
                <CustomTableCell
                  {...{
                    userInfo,
                    propertyName: "registrationDate",
                    onChange,
                    type: "date",
                    align: "center",
                  }}
                />
                <CustomTableCell
                  {...{
                    userInfo,
                    propertyName: "lastActivityDate",
                    onChange,
                    type: "date",
                    align: "center",
                  }}
                />
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
            dispatch(addNewRow());
          }}
          disableRipple
        >
          Add one more
        </Button>
      </div>
    </div>
  );
};
export default CustomTable;
