import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

function createData(id, registrationDate, lastActivityDate) {
  return { id, registrationDate, lastActivityDate };
}

export const rowSlice = createSlice({
  name: "rows",
  initialState: {
    rows: [],
  },
  reducers: {
    addNewRow: (state) => {
      return {
        rows: [
          ...state.rows,
          {
            ...createData(state.rows.length + 1, "2021-01-01", "2021-01-02"),
          },
        ],
      };
    },
    updateRow: (state, action) => {
      const { payload } = action;
      return {
        rows: [
          ...state.rows.filter((userInfo) => userInfo.id !== payload.id),
          {
            ...payload,
          },
        ],
      };
    },
    loadUsersInfo: (state, action) => {
      return {
        rows: action.payload.map((user) => ({
          id: user.id,
          registrationDate: user.registrationDate.substring(0, 10),
          lastActivityDate: user.lastActivityDate.substring(0, 10),
        })),
      };
    },
    sendUsersInfo: (state) => {
      state.rows.forEach(async (user) => {
        await axios
          .post("https://ab-test-task-api.herokuapp.com​/api/Users", user)
          .catch((error) => {
            debugger;
            const myError = error.response.data.errors
            alert(myError[Object.keys(myError)[0]]);
          });
      });
    },
  },
});

export const useUsersInfo = () => {
  const usersInfo = useSelector((state) => state.table.rows);
  return usersInfo.slice().sort((a, b) => a.id - b.id);
};

const { loadUsersInfo, sendUsersInfo } = rowSlice.actions;
export const { addNewRow, setRows, updateRow } = rowSlice.actions;

export async function fetchUsersInfo(dispatch, getState) {
  const response = await axios.get(
    "https://ab-test-task-api.herokuapp.com/api/Users/"
  );
  dispatch(loadUsersInfo(response.data));
}
export function saveUsersInfo(dispatch, getState) {
  dispatch(sendUsersInfo());
}

export default rowSlice.reducer;
