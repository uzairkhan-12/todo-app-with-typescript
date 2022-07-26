import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

function DeleteModal(prop:any){
    
    const [show,setShow] = useState<boolean>(false)
    const handleShow = () => ()=>setShow(true)
    const handleClose = () => ()=>setShow(false)
    
    const handleClick=()=>{
        setShow(true)
        console.log({prop})
    }
     
    const handleDelete=()=>{
    prop.handleDelete(prop.id);
    handleClose();
    }

    return(
        <>
   <button className='btn btn-primary' style={{float:"right"}} onClick={handleClick}>X</button>
    
   <Modal show={show} onHide={handleClose()}>
          <Modal.Header closeButton>
            
          </Modal.Header>
          <Modal.Body>Recipient: <br />
        {/* {prop.title} */}
          </Modal.Body>
          <Modal.Body>

       
          
        </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose()}>
              Close
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            
          </Modal.Footer>
        </Modal>
        </>
    )
}

 export default DeleteModal