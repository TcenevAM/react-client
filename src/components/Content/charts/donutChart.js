import React from 'react';
import { Pie, PieChart, Tooltip } from 'recharts';

let data = [
    { name: "Retention", value: 0 },
    { name: "New users", value: 0}
]

const calculate = (props) => {
    let returnedUsersCounter = 0;
    props.map(user => {
        if(isUserActive(user)){
            data[0].value += 1
            returnedUsersCounter += 1
        }
    })
    data[1].value = props.length - returnedUsersCounter;
}

const clearData = () =>{
    data = [
        { name: "Retention", value: 0 },
        { name: "New users", value: 0}
    ]
}

export const toDays = (ms) => {
    let seconds = ms / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    return days
}

const isUserActive = (user) => {
    let returnDate = new Date(new Date(user.lastActivityDate) - new Date(user.registrationDate))
    returnDate = toDays(returnDate)
    if (returnDate > 7)
        return true
    else
        return false
}

const donutChart = (props) =>
{
    clearData()
    calculate(props.data)
    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label isAnimationActive="true" />
                <Tooltip/>
            </PieChart>
        </div>
    )
}
 
export default donutChart