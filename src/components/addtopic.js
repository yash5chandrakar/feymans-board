import React, { useState } from 'react'

const Addtopic = (props) => {
    const setTopics = props.setTopics
    const isLoggedIn = props.isLoggedIn

    const [topicName, setTopicName] = useState("")
    const [topicData, setTopicData] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        // console.log(topicData)
        let index = 0;
        let myData = []
        const regex = [',', '-', '{', '}', '[', ']', '(', ')', '/', '|']
        let newID = new Date().getTime()
        for (let i = 0; i < topicData.length; i++) {
            // eslint-disable-next-line no-loop-func
            regex.forEach((item) => {
                if (topicData[i] === item) {
                    const eachItem = {
                        id: newID++,
                        text: topicData.substring(index, i),
                        status: "red"
                    }
                    myData.push(eachItem)
                    index = i + 1;
                }
            })
            if (i === topicData.length - 1) {
                const eachItem = {
                    id: newID++,
                    text: topicData.substring(index, i),
                    status: "red"
                }
                myData.push(eachItem)
            }
        }

        let item = {
            id: new Date().getTime(),
            name: topicName,
            data: myData,
            completed: 0
        }
        setTopics(oldState => [...oldState, item])
        alert("Item Added Succesfully !")
        setTopicData("")
        setTopicName("")
    }

    return (
        <div className='outerDiv'>
            <div className='innerDiv'>
                {isLoggedIn ? <>
                    <h1>Add Topics</h1>
                    <form className='addTopicsForm' onSubmit={(e) => handleSubmit(e)}>
                        <h2>Topic Name : </h2>
                        <input value={topicName} onChange={(e) => setTopicName(e.target.value)} type={'text'} required></input>
                        <br />
                        <h2>Text Area :</h2>
                        <textarea value={topicData} onChange={(e) => setTopicData(e.target.value)} rows={6} cols={80} required ></textarea>
                        <h1> <button>Submit</button></h1>
                    </form>
                </> : <h1>You need to Login</h1>}

            </div>
        </div>
    )
}

export default Addtopic
