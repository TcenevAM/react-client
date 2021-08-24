import React from 'react';
import { Pie, PieChart, Tooltip } from 'recharts';
import { useUsersInfo } from '../../../store/tableReducer';

let data = [
    { name: "Retention", value: 0 },
    { name: "New users", value: 0}
]

const calculate = (usersInfo) => {
    let returnedUsersCounter = 0;
    usersInfo.map(user => {
        if(isUserActive(user)){
            data[0].value += 1
            returnedUsersCounter += 1
        }
    })
    data[1].value = usersInfo.length - returnedUsersCounter;
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

const DonutChart = () =>
{
    clearData()
    const usersInfo = useUsersInfo();
    calculate(usersInfo)
    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label isAnimationActive="true" />
                <Tooltip/>
            </PieChart>
        </div>
    )
}
 
export default DonutChart