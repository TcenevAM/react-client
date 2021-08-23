import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import c from "./Content.module.css";
import DonutChart from './charts/donutChart';
import HistogramChart from './charts/histogramChart';
import Table from "./table/customTable"

export default function CustomizedTables(props)
{
  const [shouldShow, setState] = React.useState(false);
  const rows = useSelector(state => state.table.rows);
  const dispatch = useDispatch();

  return (
    <div className={c.wrapper}>
      <Table rows={rows} dispatch={dispatch}/>
      <div className={c.buttonWrapper}>
        <Button variant="contained" disableElevation className={c.button} onClick={() => {
          setState(true)
        }}>
          Calculate
        </Button>
        <Button variant="contained" disableElevation className={c.button}>
          Save
        </Button>
      </div>
      <div className={shouldShow ? c.enableCharts : c.disableCharts}>
        <DonutChart data={rows}/>
        <HistogramChart data={rows}/>
      </div>
    </div>
  );
}
