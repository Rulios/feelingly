import $ from "jquery";
import bootstrap from "bootstrap";

/**
 * This line performs a bug fixer. I don't know why, but it seems
 * the need to call once bootstrap to be working on the page. 
 * It's isn't enough by importing it.
 * 
 */
 console.log(bootstrap);

/*
     Profile image upload interactions
*/

 let profileImageUploadForm:any = document.getElementById("profile_image_form");
 let profileImageSelector:any = document.getElementById("profile_image_selector");

 profileImageSelector.onchange = function():void{
      profileImageUploadForm.submit();
 };

 /**
  * Self password on form interaction
  */



 


