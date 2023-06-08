import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { SessionContext } from "../contexts/SessionContext"
import  axios  from "axios"

export default function AddEvent() {

    const [newTitle, setTitle] = useState("")
    const [newDate, setDate] = useState("")
    const [newLocationType, setLocatioType] = useState("online")
    const [newDescription, setDescription] = useState("")
    const [selectedSkill, setSelectedSkill] = useState()
    const {skillid} = useParams()
    const { currentUser , setNeedRefreshUser} = useContext(SessionContext)
    const navigate= useNavigate()

    const fetchSkillData = async()=>{
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`)
      if(response.status === 200){
        const parsed = await response.json()
        setSelectedSkill(parsed)
      }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const fData = new FormData() 
        const imageUrl = e.target.imageUrl.files[0]
        fData.append("title", newTitle )
        fData.append("date", newDate)
        fData.append("locationType", newLocationType)
        fData.append("description", newDescription)
        fData.append("imageUrl", imageUrl)
        /* fData.append("skillTitle", selectedSkill.title ) */
        fData.append("skillid", skillid )
        
          console.log(fData)
        
       
         try {
         const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/event/create`, fData 
                              
          ) 
          if (response.status === 201) {
            /* const newEvent = await response.json() */
            console.log(response.data)
            const newEvent = response.data
            setNeedRefreshUser(true)
            navigate(`/eventdets/${newEvent._id}`)
            
          }
        } catch (error) {
         console.log(error) 
        } 
      } 

      useEffect(()=>{
        fetchSkillData()
      },[]) 
      

  return (
    <div className="addSkillDiv">
     <h2>Schedule an event</h2>
     {selectedSkill && <h3>{selectedSkill.category} / {selectedSkill.title}</h3>}

    <form className="pageForms" encType="multipart/form-data" onSubmit={handleSubmit}>
       <div className="addField">
         <label>Event Title:</label>
         <input type="text" name="title" value={newTitle} onChange={(e) => setTitle(e.target.value)} required></input>
       </div>

       <div className="addField">
        <label>Date:</label>
        <input type="date" name="date" value={newDate} onChange={(e) => setDate(e.target.value)} required></input>
       </div>

       <div className="addField">
        <label>Online/In-person:</label>
        <select type="text" name="locationType" value={newLocationType} onChange={(e) => setLocatioType(e.target.value)} required>
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
         </select>
       </div>

       <div className="addField">
        <label>Description:</label>
        <textarea type="text" name="description" value={newDescription} onChange={(e) => setDescription(e.target.value)} required></textarea>
       </div>

       <div className="addField">
        <label>
          <input type="file" accept="image/jpg image/png" name="imageUrl" />
        </label>

       </div>

       <div className="addField">
        <button type="submit" className="genButton">Create Event</button>
       </div>

    </form>
    </div>
  )
}
