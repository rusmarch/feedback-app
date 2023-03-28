import { createContext, useState } from 'react';
import { feedbackData } from '../data/feedbackData';
import { v4 as uuidv4 } from 'uuid';

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {

   const [feedback, setFeedback] = useState(feedbackData);
   const [editedFeedback, setEditedFeedback] = useState({
      item: {},
      edit: false
   });

   const removeFeedback = (id) => {
      if (window.confirm(`Delete item ${id}?`)) {
         setFeedback(feedback.filter((item => item.id !== id)));
      }
   }

   const createFeedback = (newFeedback) => {
      newFeedback.id = uuidv4();
      setFeedback([...feedback, newFeedback]);
   }

   const updateFeedback = (id, updItem) => {
      setFeedback(feedback.map(item => 
         item.id === id
         ? {...item, ...updItem}
         : item
         ));
   }

   const editFeedback = (item) => {
      setEditedFeedback({
         item,
         edit: true
      })
   } 

   return <FeedbackContext.Provider value={{
       feedback,
       editedFeedback,
       removeFeedback,
       createFeedback,
       editFeedback,
       updateFeedback,
       }}
       >
      {children}
   </FeedbackContext.Provider>
}

