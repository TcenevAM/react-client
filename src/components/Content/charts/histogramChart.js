import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { toDays } from './donutChart';

let userData = [
  {
    userLifespan: 0,
    userCount: 0,
  },
];

const calculate = (props) =>
{
  clearUserData()
  props.map(user => {
    let registrationDate = new Date(user.registrationDate)
    let lastActivityDate = new Date(user.lastActivityDate)
    let userLifespan = toDays(lastActivityDate - registrationDate)
    updateUserData(userLifespan)
  })
}

const clearUserData = () =>{
  userData = [
    {
      userLifespan: 0,
      userCount: 0,
    },
  ];
}

const updateUserData = (userLifespan) =>{
  let isAdded = false
  userData.map(user => {
    if(user.userLifespan === userLifespan){
      user.userCount += 1
      isAdded = true;
    }
  })
  if(!isAdded){
    userData.push({
      userLifespan: userLifespan,
      userCount: 1
    })
  }
}

const histogramChart = (props) => {
  calculate(props.data)

  return (
    <BarChart
      width={500}
      height={300}
      data={userData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="userLifespan" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="userCount" fill="#8884d8" />
    </BarChart>
    );
}

export default histogramChart