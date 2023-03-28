import { FeedbackForm } from "./components/FeedbackForm"
import { FeedbackList } from "./components/FeedbackList"
import { FeedbackStats } from "./components/FeedbackStats"
import { Header } from "./components/Header"
import { AboutPage } from "./pages/AboutPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AboutIconLink } from "./components/AboutIconLink"
import { FeedbackProvider } from "./context/FeedbackContext"

export const   App = () => {


   return (
      <FeedbackProvider>
      <BrowserRouter>
         <div className="container">
            <Header />
            <Routes>
               <Route exact path="/" element={
                  <>
                     <FeedbackForm/>
                     <FeedbackStats/>
                     <FeedbackList/>
                     <AboutIconLink/>
                  </>
               } />
               <Route
                  path='/about'
                  element={<AboutPage />}
               />
            </Routes>
         </div >
      </BrowserRouter>
      </FeedbackProvider>
   )
}

