import { createSlice } from '@reduxjs/toolkit';

function createData(userId, registrationDate, lastActivityDate) {
    return { id: userId, userId, registrationDate, lastActivityDate };
}

export const rowSlice = createSlice({
    name: 'rows',
    initialState: {
      rows: [
        createData(1, "2021.01.01", "2021.01.02"),
        createData(2, "2021.01.01", "2021.01.02"),
        createData(3, "2021.01.01", "2021.01.02"),
        createData(4, "2021.01.01", "2021.01.12")
      ],
    },
    reducers: {
        addNewRow: (state) => {
            state.rows.push(createData(state.rows.length + 1, "2021.01.01", "2021.01.02"))
        },
        setRows: (state, action) =>
        {
            let newRow = action.payload.map(row =>{
                if (row !== undefined){
                    return createData(row.userId, row.registrationDate, row.lastActivityDate);
                }
            })
            for (let j = 0; j < action.payload.length; j++)
            {
                if(action.payload[j] !== undefined){
                    state.rows[j] = newRow[j]
                }   
            }
        }
  },
})

export const { addNewRow, setRows } = rowSlice.actions;

export default rowSlice.reducer