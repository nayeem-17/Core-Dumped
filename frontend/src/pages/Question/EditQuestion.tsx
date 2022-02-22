import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import EditQuestionComponent from '../../components/Question/EditQuestion';

export default function EditQuestion(){
    const {id} = useParams() ;
    const id_int = parseInt(id+'');
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="container-center">
             <EditQuestionComponent id={id_int}/> 
          </div>
        </div>
      </>
    );
}