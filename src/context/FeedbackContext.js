import { createContext, useEffect, useState } from 'react';
//import { feedbackData } from '../data/feedbackData';
import { v4 as uuidv4 } from 'uuid';

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {

   const [isLoading, setIsLoading] = useState(true);
   const [feedback, setFeedback] = useState([]);
   const [editedFeedback, setEditedFeedback] = useState({
      item: {},
      edit: false
   });

   useEffect(() => {
      fetchFeedback()
   }, [])

   //Fetch feedback
   const fetchFeedback = async () => {
      const response = await fetch(`/feedback`);

      const data = await response.json();

      setFeedback(data);
      setIsLoading(false);
   }

   const removeFeedback = async (id) => {
      if (window.confirm(`Delete item ${id}?`)) {
         await fetch(`feedback/${id}`, {method: 'DELETE'})
         setFeedback(feedback.filter((item => item.id !== id)));
      }
   }

   const createFeedback = async (newFeedback) => {

      const response = await fetch('/feedback', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(newFeedback)
      })

      const data = await response.json();

      newFeedback.id = uuidv4();
      setFeedback([...feedback, data]);
   }

   const updateFeedback = async (id, updItem) => {

      const response = await fetch(`/feedback/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(updItem)
      })

      const data = response.json();

      setFeedback(feedback.map(item =>
         item.id === id
            ? { ...item, ...data }
            : item
      ));
   }

   const editFeedback = (newItem) => {

      setEditedFeedback({
         newItem,
         edit: true
      })
   }

   return <FeedbackContext.Provider value={{
      feedback,
      editedFeedback,
      isLoading,
      removeFeedback,
      createFeedback,
      editFeedback,
      updateFeedback,
   }}
   >
      {children}
   </FeedbackContext.Provider>
}

