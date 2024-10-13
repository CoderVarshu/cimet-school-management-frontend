export const base_url = import.meta.env.VITE_BASE_URL


export function validateEmail(email) {
    let error = false;
    let message = "";
  
    // Regular expression to validate email with only `@` and `.`
    const emailRegex = /^[A-Z0-9]+(\.[A-Z0-9]+)*@[A-Z0-9]+(\.[A-Z0-9]+)+$/i;
  
    if (!email) {
      message = "Email address is required";
      error = true;
    } else if (!emailRegex.test(email)) {
      message = "Invalid email address format";
      error = true;
    }
  
    return { error, message };
  }


export function validateUserName(name) {

    let error = false
    let message ;
    if (!name) {
        error = true
        message ="Invalid User name"
    }
    else if (name === 'admin') {
        error = true
        message ="try Again"
    }
    return {error, message}
    // return error

}


export function validatePassword(pass) {
    let error = false;
    let message;
    let regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!pass) {
        message = "Invalid Password"
        error =true
    }
    else if (!regex.test(pass)){
        message = 'Invalid Password try Again!!'
        error = true
    }

    return {message , error}

    // return error
}

export function validateNumber(number) {
    let error = false;
    let message = "";
  
    // Check if the input is empty
    if (!number) {
      message = "Number is required";
      error = true;
    } 
    // Check if the input is a valid number (digits only)
    else if (!/^\d+$/.test(number)) {
      message = "Invalid number format, only digits are allowed";
      error = true;
    }
    else if (number.length !== 10) {
        message = "Number must be exactly 10 digits long";
        error = true;
      }
      
    
    return { error, message };
  }
  