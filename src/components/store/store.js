import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './tableReducer'

export default configureStore({
  reducer: {
    table: tableReducer
  },
})