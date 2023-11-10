import React from 'react'
import './style.css'
import pngim from '../assests/image-2.png'
import imgee from '../assests/images-3.jpg'
import { CDBModalFooter ,CDBBtn, CDBIcon, CDBBox  } from 'cdbreact';
import { useNavigate  } from 'react-router-dom';

const LandingPage = () => {
 const navigate = useNavigate()
  
  return (
    <>
    <div className='Main-Contianer'>
    
    <div className='middle'>
      <div className='btn-login'>
   <div>
      <h1 style={{ color: '#ceb04f', fontSize:"6rem",margin:'0px',padding:'0px'}}>Secret Zone</h1>
        <p style={{margin:'0px',padding:'0px' , fontSize:'1em' }}>Zone To Track Your Productivity</p>
        </div>
          </div>
          <img src={pngim} alt='pngmain'/>
          </div>
   
<div className="container">
  <div className="row">
   
      <h1 style={{ color: '#ceb04f'}}>Your Task, <span> Your Secret,</span> Your Zone</h1>
   
 
      <p>"To-do lists are the key to staying organized and productive."<br/>
   " A to-do list is the best way to keep track of your tasks and deadlines."<br/>
" To-do lists can help you reduce stress and anxiety by helping you to stay focused and motivated."<br/>
"To-do lists are essential for anyone who wants to achieve their goals."<br/>
"With a to-do list, you can be confident that you won't forget any important tasks."</p>
        
    
      </div>
    {/* <div className="image-contaneier"> */}
     <img className='img2' style={{width:'200px'}} src={imgee} alt='demo'/>
{/* </div> */}
 
</div>
<div className='button1'>    
<div className='forbtn'>   
 
 <button className='button2' onClick={()=>{navigate('/login')}} >Let's Make A List</button>
 </div> 
<div className='forshape'>
   <p style={{ color: '#ceb04f'}} >Explore the Secret Zone and discover its secrets <br/> <span>✏️</span></p>
 </div> 
 </div>




    <CDBModalFooter>
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className=" py-2  flex-wrap"
        style={{ width: '100vw',  backgroundColor:'rgba(206, 176, 79, 0.8)' , }}
      >
        <CDBBox display="flex" alignItems="center">
          <a href="/" className="d-flex align-items-center p-0 ">
           
            <span className="ms-5 h5 mb-0 font-weight-bold" style={{ color: 'Black'}}>Secret Zone</span>
          </a>
          <small className="" style={{ color: '#EAEAEA'}}>&copy; Secret Zone, 2023. All rights reserved.</small>
        </CDBBox>
        <CDBBox display="flex" mx={1}>
          <CDBBtn flat color="dark"  className="p-2" >
            <CDBIcon fab icon="facebook-f" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </CDBBox>
      </CDBBox>
   
</CDBModalFooter>
 
</div>
      </>
  )
}

export default LandingPage
