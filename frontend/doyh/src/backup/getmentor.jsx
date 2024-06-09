import React, {useState, useEffect} from 'react'

const getmentor = () => {
    const [mentorData, setMentorData] = useState([])

    useEffect(() => {
        const fetchMentorData = async () => {
            const response = await fetch('http://localhost:8000/mentor-data')
            const data = await response.json()
            setMentorData(data)
        }

        fetchMentorData()
    }, [])
  return (
    <div>
      <h1>Get Mentor</h1>
      <ul>
        {mentorData.map((mentor, index) => {
          return <li key={index}>{mentor.description}</li>
        })}
      </ul>
    </div>

)
}

export default getmentor