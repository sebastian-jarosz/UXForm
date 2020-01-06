var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        alert("Twoje zgłoszenie zostało przyjęte. Dziękujemy!")
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true, tabName;
    x = document.getElementsByClassName("tab");
    tabName = x[currentTab].id;

    switch (tabName) {
        case "nameTab":
            validateNameTab(x[currentTab]);
            break;
        case "contactInfoTab":
            validateContactInfoTab(x[currentTab]);
            break;
        case "personalInfoTab":
            validatePersonalInfoTab(x[currentTab]);
            break;
        case "timeTab":
            validateTimeTab(x[currentTab]);
            break;
    }

    y = x[currentTab].getElementsByTagName("input");

    // A loop that checks every input field class in the current tab:
    for (i = 0; i < y.length; i++) {
        if (( ' ' + y[i].className + ' ').indexOf(' ' + "invalid" + ' ') > -1) {
            // and set the current valid status to false:
            valid = false;
        }
    }

    y = x[currentTab].getElementsByTagName("select");
    
    // A loop that checks every input field class in the current tab:
    for (i = 0; i < y.length; i++) {
        if (( ' ' + y[i].className + ' ').indexOf(' ' + "invalid" + ' ') > -1) {
            // and set the current valid status to false:
            valid = false;
        }
    }

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function validateNameTab(tab){
    var inputFields = tab.getElementsByTagName("input");
    var textRegex = /^[a-z][a-z\s]*$/;
    for (i = 0; i < inputFields.length; i++){
        if(!textRegex.test(inputFields[i].value) || inputFields[i].value === ""){
            inputFields[i].className += " invalid";
            $(inputFields[i].nextElementSibling).show();
        } else {
            $(inputFields[i].nextElementSibling).hide();
        }
    }
}

function validateContactInfoTab(tab){
    var inputFields = tab.getElementsByTagName("input");
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneNumberRegex = /^\d{3}-\d{3}-\d{3}$/;
    for (i = 0; i < inputFields.length; i++){
        if(inputFields[i].id === "emailInput"){
            if(!emailRegex.test(inputFields[i].value) || inputFields[i].value === ""){
                inputFields[i].className += " invalid";
                $("#emailInputValidation").show();
            } else {
                $("#emailInputValidation").hide();
            }
        } else if (inputFields[i].id === "phoneInput") {
            if(!phoneNumberRegex.test(inputFields[i].value) || inputFields[i].value === ""){
                inputFields[i].className += " invalid";
                $("#phoneInputValidation").show();
            } else {
                $("#phoneInputValidation").hide();
            }
        }
    }
}

function validatePersonalInfoTab(tab) {
    var dateRegex = /^\d{2}.\d{2}.\d{4}$/;
    if (!dateRegex.test($("#dateOfBirthInput").val()) || $("#dateOfBirthInput").value === "") {
        $("#dateOfBirthInput").addClass("invalid");
        $("#dateOfBirthInputValidation").show();
    } else {
        $("#dateOfBirthInputValidation").hide();
    }

    if ($("#genderInput").val() === null) {
        $("#genderInput").addClass("invalid");
        $("#genderInputValidation").show();
    } else {
        $("#genderInputValidation").hide();
    }
}

function validateTimeTab(tab) {
    var inputFields = tab.getElementsByTagName("input");
    var checked = false;
    for (i = 0; i < inputFields.length; i++){
        if(inputFields[i].checked){
            checked = true;
        }
    }

    if(checked === false){
        $("#timeRadio").addClass("invalid");
        $("#timeValidation").show();
    } else {
        $("#timeRadio").removeClass("invalid");
        $("#timeValidation").hide();
    }
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}