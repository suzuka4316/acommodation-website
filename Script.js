/**
 * @file Manages onclick and onsubmit event for Form validation and Slideshows on Sorrento by the Sea website.
 * @author Suzuka Fukami
 */

 /**
  * @function validateNonEmpty
  * Function to check if an element is empty.
  * If empty, a message "Empty input" is shown.
  * @param {element} element 
  * @param {element} errorText 
  */
function validateNonEmpty(element, errorText){
    var value = element.value;

    if(value){
        element.className = "valid";
        errorText.innerHTML = "";
        return true;
    }
    else{
        element.className = "invalid";
        errorText.innerHTML = "Empty input";
        return false;
    }
}

/**
 * @function validateUserName
 * Function to validate username input.
 * Username must contain at least 1 lowercase and 1 uppercase character
 * @param {element} element 
 * @param {element} errorText 
 */
function validateUserName(element, errorText){
    var isNotEmpty = validateNonEmpty(element, errorText);
    if(!isNotEmpty){
        return false;
    }

    var value = element.value;
    var regex = /^(?=.*[a-z])(?=.*[A-Z]).{2,}$/;
    var isValidName = value.match(regex);
    if(isValidName){
        element.className = "valid";
        errorText.innerHTML = "";
        return true;
    }
    else{
        element.className = "invalid";
        errorText.innerHTML = "Username must contain at least 1 lowercase and 1 uppercase character";
        return false;
    }
}


/**
 * @function validateEmailOrPhone
 * Function to validate email or phone number.
 * If input of either one is valid, error message of both fields will disappear.
 * @param {element} element 
 * @param {element} errorText 
 */
function validateEmailOrPhone(element, errorText){
    errorText.innerHTML = "";
    var emailValue = document.getElementById("txtEmail").value;
    var phoneValue = document.getElementById("txtPhoneNumber").value; 
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var phoneRegex = /(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)|(^04\d{2,3}\d{6}$)/;
    var isValidEmail = emailRegex.test(emailValue);
    var isValidPhone = phoneRegex.test(phoneValue);
    if(element == document.getElementById("txtEmail")){
        if(isValidEmail){
            element.className = "valid";
            errorText.innerHTML = "";
            document.getElementById("txtPhone_Error").innerHTML = "";
            return true;
        }
        else{
            if(isValidPhone){
                errorText.innerHTML = "";
            }
            else{
                element.className = "invalid";
                errorText.innerHTML = "Invalid Email address"
                return false;
            }
        }
    }
    else{
        if(isValidPhone){
            element.className = "valid";
            errorText.innerHTML = "";
            document.getElementById("txtEmail_Error").innerHTML = "";
            return true;
        }
        else{
            if(isValidEmail){
                errorText.innerHTML = "";
            }
            else{
                element.className = "valid";
                errorText.innerHTML = "Invalid phone number"
                return false;
            }
        }
    }
}

 /**
  * @function validateAll()
  * Validates a user's input when they click Submit button on Contact.html.
  */
function validateAll(form){
    nameValidate = form.elements[0].onblur();
    emailValidate = form.elements[1].onblur();
    phoneValidate = form.elements[2].onblur();
    messageValidate = form.elements[3].onblur();
    if(nameValidate && (emailValidate || phoneValidate) && messageValidate){
        return true;
    }
    return false;
}


var slideIndex = 1;
showSlides(slideIndex);

/**
 * @function plusSlides()
 * @param {number} n 
 * Next/previous controls
 */
function plusSlides(n) {
    showSlides(slideIndex += n);
}

/**
 * @function currentSlide()
 * @param {number} n 
 * Thumnail image controls
 */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/**
 * @function showSlides()
 * @param {number} n 
 * Shows the image based on Next/Previous button or thumbnail.
 */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}

