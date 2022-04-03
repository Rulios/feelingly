import disableBtnAndLoad from "./utils/disableBtnAndLoad";

window.onload = function () {

    let registerForm = document.getElementById("registerForm");
    registerForm!.onsubmit = function (event) {

        let btn = document.getElementById("registerBtn") as HTMLButtonElement;
        disableBtnAndLoad(btn);
        
    };

};


