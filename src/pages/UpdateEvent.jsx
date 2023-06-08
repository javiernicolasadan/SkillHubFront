import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateEvent() {
  const { eventId } = useParams()
  const navigate = useNavigate()

  const [updatedTitle, setUpdatedTitle] = useState("")
  const [updatedDate, setUpdatedDate] = useState("")
  const [updatedLocationType, setUpdatedLocationType] = useState("")
  const [updatedDescription, setUpdatedDescription] = useState("")
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState("");

  
  const getEventDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/event/eventdets/${eventId}`
        );
        const event = response.data
        setUpdatedTitle(event.title)
        setUpdatedDate(event.date)
        setUpdatedLocationType(event.locationType)
        setUpdatedDescription(event.description)
        setPreviewImageUrl(event.imageUrl);
        setOriginalImageUrl(event.imageUrl);
      } catch (error) {
        console.log(error);
      }
  };
    
  useEffect(() => {
    getEventDetails()
  }, [eventId]);

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    const fData = new FormData() 
        const imageUrl = e.target.imageUrl.files[0]
        fData.append("title", updatedTitle )
        fData.append("date", updatedDate)
        fData.append("locationType", updatedLocationType)
        fData.append("description", updatedDescription)
        /* fData.append("skillTitle", selectedSkill.title ) */
        fData.append("eventId", eventId )
        if (imageUrl) {
          fData.append("imageUrl", imageUrl);
          setPreviewImageUrl(URL.createObjectURL(imageUrl));
        } else {
          if (!imageUrl && originalImageUrl) {
            fData.append("originalImageUrl", originalImageUrl);
          }
        }
        
        console.log(imageUrl)

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_API_URL}/event/updateevent/${eventId}`,
        fData
      );
      console.log(response)
      if (response.status === 200) {
        navigate(`/eventdets/${eventId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addSkillDiv">
    <h2>Update event</h2>
    <form className="pageForms" onSubmit={handleUpdate}>
      <div className="addField">
        <label>Event Title:</label>
        <input
          type="text"
          name="title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          required
        />
      </div>

      <div className="addField">
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="addField">
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={updatedDate}
          onChange={(e) => setUpdatedDate(e.target.value)}
          required
        />
      </div>

      <div className="addField">
        <label>Online/In-person:</label>
        <select
          type="text"
          name="locationType"
          value={updatedLocationType}
          onChange={(e) => setUpdatedLocationType(e.target.value)}
          required
        >
          <option value="online">Online</option>
          <option value="in-person">In-Person</option>
        </select>
      </div>

      <div className="addField">
      <label>
        <input type="file" accept="image/jpg,image/png" name="imageUrl" />
      </label>
      {previewImageUrl && <img src={previewImageUrl} alt="Preview" />}
    </div>

      <div>
        <button type="submit" className="genButton">Update Event</button>
      </div>
    </form>
    </div>
  );
}

