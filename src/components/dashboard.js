import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = (props) => {
    const deleteItem = props.deleteItem
    const navigate = useNavigate()

    let topics = props.topics

    function handleNavigation(id) {
        navigate(`/showData/${id}`)
    }
    console.log(topics)
    const isLoggedIn = props.isLoggedIn
    return (
        <div className='outerDiv'>
            <div className='innerDiv'>
                {(!isLoggedIn) ? <h1>Please Login and try again</h1> : (
                    <div>
                        <h1 >Welcome Anon@123</h1>

                        <h2>TOPIC LIST</h2>
                        <div className='topicList'>
                            {topics.map((item) => {
                                return (
                                    <>
                                        <h3 key={item.id} className='topicItem'>
                                            <span onClick={() => handleNavigation(item.id)}>{item.name} : {item.completed} % &nbsp;</span>
                                            <span onClick={() => deleteItem(item.id)} id='closeSpan'>X</span>
                                        </h3>

                                    </>
                                )
                            })}
                            <button onClick={() => navigate("/addTopic")}>ADD TOPIC</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
