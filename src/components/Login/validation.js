export const validation = (key, value, formValues) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  
    
    let isValid = false;
  
    if (key === 'email') {
      isValid = emailRegex.test(value);
      
    } else if (key === 'password') {
      isValid = passwordRegex.test(value);
    } else if (key === 'confirmPassword') {
      isValid = value === formValues['password'];
    }else if(key === 'file'||key==='image'){
      // if(value===''|| value.name.match(/\.(jpg|jpeg|png|gif)$/)){
      //   isValid =true ;
      // }
      isValid=true;
      
    }else if(key==='userId'){
      isValid=true;
    }else if(key=== 'Address'){
        isValid = value.trim() !== '';
    }
      else {
      isValid = value.trim() !== '';
    }
    return {
        [key]: isValid
      };
}