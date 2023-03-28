import { Card } from "./shared/Card";
import { FaEdit, FaTimes } from 'react-icons/fa'
import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

export const FeedbackItem = ({ item }) => {

   const { removeFeedback, editFeedback } = useContext(FeedbackContext);

   return (
      <Card>
         <div className="num-display">{item.rating}</div>
         <button
            className="close"
            onClick={() => removeFeedback(item.id)}
         >
            <FaTimes color="purple" />
         </button>
         <button
            className="edit"
            onClick={() => editFeedback(item)}
         >
            <FaEdit color="purple" />
         </button>
      
         <div className="text-display">{item.text}</div>
      </Card>
   )
}