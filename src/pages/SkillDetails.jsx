import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
const currentDate = new Date()

export default function SkillDetails() {
  const { skillid } = useParams();
  const { currentUser } = useContext(SessionContext);
  /* console.log(currentUser) */
  const [skill, setSkill] = useState();
  const navigate = useNavigate()
  const [upcomingEvents, setUpcomingEvents] = useState()
  const [pastEvents, setPastEvents] = useState([]);
  /* const [subsEvents, setSubsEvents] = useState([]) */

  const fetchSkill = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`);
      if (response.status === 200) {
        const parsed = await response.json();
        setSkill(parsed);

        if (parsed.events && parsed.events.length > 0) {
          const filteredEvents = parsed.events.filter((event) => {
          const eventDate = new Date(event.date) 
          return eventDate > currentDate
        });
          setUpcomingEvents(filteredEvents);    
          
          const filteredPastEvents = parsed.events.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate < currentDate;
          });
          setPastEvents(filteredPastEvents);
      }
    }
    } catch (error) {
      console.log(error);
    }
  };
    
    useEffect(()=>{
      fetchSkill()
    },[])
  

  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        navigate("/allSkills");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    {skill ? (
      <>
      <div className="skill-dets">
        <div className="fullWidthImg">
          {skill.imageUrl &&
            <img src={skill.imageUrl} alt={skill.title}/>}
        </div>

        <div className="skill-dets">
          <h3>Details of {skill.title}</h3>
          <p>{skill.details}</p>
          <br/>
          <Link to={`/updateskill/${skillid}`}> Update skill</Link>
          <button type="button" onClick={handleDelete}>Delete skill</button>
          <Link to={`/addevent/${skillid}`}>Add event to skill</Link>
        </div>
      </div>



      <div className="noMargin">
        <h3>Upcoming Events:</h3>
        <div className="grid">
        {upcomingEvents ? (
          upcomingEvents.map((eachEvent) => (
            <div key={eachEvent._id} className="container">
              
              <Link to={`/eventdets/${eachEvent._id}`}>
              <h2>{eachEvent.title}</h2>
              </Link>
              {eachEvent.imageUrl && (
                        <img src={eachEvent.imageUrl} alt={eachEvent.title} />
                    )}
            </div>
          ))
        ) : (
          <p>No upcoming events found</p>
        )}
        </div>

        <h3>Past Events:</h3>
        <div className="grid">
        {pastEvents.length > 0 ? (
          pastEvents.map((eachEvent) => (
            <div key={eachEvent._id} className="container">
            <Link to={`/eventdets/${eachEvent._id}`}>
              <h2>{eachEvent.title}</h2>
              </Link>
              {eachEvent.imageUrl && (
                        <img src={eachEvent.imageUrl} alt={eachEvent.title} />
                    )}
            </div>
        
          ))
        ) : (
          <p>No past events found</p>
        )}
        </div>
      </div>

    </>
    
    ) : (<p>Loading</p>)}

    </div>
);
}
