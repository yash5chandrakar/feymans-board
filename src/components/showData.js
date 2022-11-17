import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const ShowData = (props) => {
    const setTopics = props.setTopics
    const isLoggedIn = props.isLoggedIn
    let topics = props.topics
    let params = useParams().itemId

    const [myData, setData] = useState("")
    const [myID, setmyID] = useState("")

    useEffect(() => {
        let myItem = []


        topics.map((item) => {
            console.log("itemID", typeof (item.id))
            console.log("params", typeof (params))
            if (item.id == params) {
                myItem.push(item)
            }
            return item
        })
        myItem = myItem[0]
        setData(myItem)
    }, [params, topics])


    function handleMouseOver(id) {
        setmyID(id)
    }

    function handleCall(color) {
        let mydataArray = myData.data
        mydataArray = mydataArray.map((item) => {
            if (item.id === myID) {
                let newItem = {
                    id: item.id,
                    text: item.text,
                    status: color
                }
                return newItem
            }
            else {
                return item
            }
        })
        let newData = { ...myData, data: mydataArray }
        console.log(newData)

        let completionPercent = calulatePercentage(newData)
        console.log(completionPercent)

        newData = { ...newData, completed: completionPercent }

        let newTopics = topics.map((item) => {
            if (item.id == params) {
                return newData
            }
            else {
                return item
            }
        })
        setTopics(newTopics)
    }

    function calulatePercentage(newData) {
        let myArray = newData.data
        let count = 0;
        myArray.forEach(item => {
            if (item.status === "red") {
                count += 1
            }
            else if (item.status === "orange") {
                count += 2
            }
            else if (item.status === "yellow") {
                count += 3
            }
            else {
                count += 4
            }
        });
        let completion = (count / (myArray.length * 4)) * 100
        return completion.toFixed(2)
    }


    let newID = 0

    return (
        <div className='outerDiv'>
            <div className='innerDiv'>
                {isLoggedIn ? <>
                    {(myData) ? (
                        <div className='showData'>
                            <h1>Topic Name : {myData.name} </h1>
                            <div className='innerData'>
                                {myData.data.map((item) => {
                                    return <div key={newID++} className='showSpan'>
                                        <div className='showOptions'>ANY CALL ACTION : <br />
                                            <button onClick={() => handleCall("green")} id='understood'>Understood</button>
                                            <button onClick={() => handleCall("yellow")} id='somewhat'>Somewhat Understood</button> <br />
                                            <button onClick={() => handleCall("orange")} id='notclear'>NOT CLEAR</button>
                                            <button onClick={() => handleCall("red")} id='rubbish'>WHAT RUBBISH</button> <br />
                                        </div>
                                        <span className='mySpan' style={{ color: item.status }} onMouseOver={() => handleMouseOver(item.id)} key={item.id}>♦️ &nbsp; {item.text} &nbsp; &nbsp; ♦️</span> <br /></div>
                                })}
                            </div>
                            <div><h3>Percent Completion :  {myData.completed} %</h3></div>
                        </div>
                    ) : <h1>NO DATA FOUND</h1>}
                </> : <h1>You need to Login First.</h1>}
            </div>
        </div>
    )
}

export default ShowData


    // < div className = 'showOptions' > ANY CALL ACTION: <br />
    //                                     <button>UnderStood</button> <br />
    //                                     <button>Somewhat UnderStood</button> <br />
    //                                     <button>NOT CLEAR</button> <br />
    //                                     <button>WHAT RUBBISH</button> <br />
    //                                 </ >
    //                                 <span className='showSpan' key={id++}>♦️ &nbsp; {item.text} &nbsp; &nbsp; ♦️</span> <br /></>