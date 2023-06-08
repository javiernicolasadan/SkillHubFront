import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import { Link } from "react-router-dom";
const currentDate = new Date()


export default function Profile() {

  const { logout, currentUser } = useContext(SessionContext)
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  /* console.log(currentUser) */
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/event`)
      const data = response.data
      
      const filteredPastEvents = data.events.filter(
        (event) => new Date(event.date) < currentDate
      )
      const filteredUpcomingEvents = data.events.filter(
        (event) => new Date(event.date) >= currentDate
      )
      setPastEvents(filteredPastEvents);
      setUpcomingEvents(filteredUpcomingEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents()
  }, [])


  return (
    <>
      <div>Profile</div>
      <button type='button' onClick={logout}>Log Out</button>
      <Link to="/addskill">Add skill</Link>
      <Link to="/addevent">Add Event</Link>
      <div className="container">
  {currentUser ? (
    <>
      <h3>My Skills:</h3>
      {currentUser.skills.length > 0 ? (
        currentUser.skills.map((skill) => (
          <div key={skill._id}>
            <h4>{skill.title}</h4>
          </div>
        ))
      ) : (
        <p>No skills to show</p>
      )}
    </>
  ) : (
    <p>Loading...</p>
  )}
</div>



      <div className="container">
        <h3>Upcoming Events:</h3>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <div key={event._id}>
              <h4>{event.title}</h4>
            </div>
          ))
        ) : (
          <p>No upcoming events found</p>
        )}
      </div>

      <div className="container">
        <h3>Past Events:</h3>
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => (
            <div key={event._id}>
              <h4>{event.title}</h4>
            </div>
          ))
        ) : (
          <p>No past events found</p>
        )}
      </div>




    </>
  );
}