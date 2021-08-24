import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './tableReducer'
import thunkMiddleware from 'redux-thunk'

export default configureStore({
  reducer: {
    table: tableReducer
  },
  middleware: [thunkMiddleware],
})