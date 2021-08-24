import Button from "@material-ui/core/Button";
import React from "react";
import c from "./Content.module.css";
import DonutChart from "./charts/donutChart";
import HistogramChart from "./charts/histogramChart";
import Table from "./table/customTable";
import { useDispatch } from "react-redux";
import { saveUsersInfo } from "../../store/tableReducer";

export default function CustomizedTables(props) {
  const [shouldShow, setState] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <div className={c.wrapper}>
      <Table />
      <div className={c.buttonWrapper}>
        <Button
          variant="contained"
          disableElevation
          className={c.button}
          onClick={() => {
            setState(true);
          }}
        >
          Calculate
        </Button>
        <Button
          variant="contained"
          disableElevation
          className={c.button}
          onClick={() => { dispatch(saveUsersInfo) }}
        >
          Save
        </Button>
      </div>
      <div className={shouldShow ? c.enableCharts : c.disableCharts}>
        <DonutChart />
        <HistogramChart />
      </div>
    </div>
  );
}
