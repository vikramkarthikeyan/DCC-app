$(window).load(function() {
    $("#intro").show();
    $("#result").hide();
    $("#form").hide();
});

$("#data-intensive-computing-select").click(function(){
    $("#intro").hide();
    $("#form").show();
});

$("#evaluate").click(function(){
    $("#form").hide();
    $("#result").show();
});

$("#evaluate-another").click(function(){
    $("#result").hide();
    $("#form").show();
});

$("#home").click(function(){
    $("#result").hide();
    $("#intro").show();
});

$("#evaluate").click(function(){
    evaluateEligibility();
});

function disableFormFields() {
    $("#contactform :input").prop("disabled", true);
    $("#evaluate").prop("disabled", true);
}

function submitPersonNumber() {
    $("#contactform :input").prop("disabled", false);
    $("#evaluate").prop("disabled", false);
    personNumber = $("#person-number-field").val();
    console.log("SUBMITTED!!!");
    console.log(personNumber);
}

function addCourse() {
    var department = $("#department").val();
    var course = $("#course").val();
    var GPA = $("#grade").val();

    if(department === "Computer Science") {
        addCSCourse(course, GPA*100);
    } else {
        addNonCSCourse(course, GPA*100);
    }
    console.log(department, course, GPA);
}

$(document).ready(function(){
    disableFormFields();
});

// Blockchain connectivity
var personNumber;

function addCSCourse(course, GPA) {
    var entrySuccessCallback = function (data) {
        alert("Added to the blockchain successfully!");
    }

    $.ajax({
        type: "POST",
        url: '/course/cs',
        data: {
            "personNumber": personNumber,
            "courseNumber": course,
            "courseGPA": GPA
        },
        success: entrySuccessCallback
    });
}

function addNonCSCourse(course, GPA) {
    var entrySuccessCallback = function (data) {
        alert("Added to the blockchain successfully!");
    }

    $.ajax({
        type: "POST",
        url: '/course/other',
        data: {
            "personNumber": personNumber,
            "courseNumber": course,
            "courseGPA": GPA
        },
        success: entrySuccessCallback
    });
}

function setLoadingIcons() {
    var node = document.createElement("i");
    node.className = "fa fa-spinner fa-2x circled bg-skin float-left"
    document.getElementById("pre-requisite-icon").appendChild(node); 

    var node = document.createElement("i");
    node.className = "fa fa-spinner fa-2x circled bg-skin float-left"
    document.getElementById("required-courses-icon").appendChild(node);

    var node = document.createElement("i");
    node.className = "fa fa-spinner fa-2x circled bg-skin float-left"
    document.getElementById("gpa-requirement-icon").appendChild(node);  

    var node = document.createElement("i");
    node.className = "fa fa-spinner fa-2x circled bg-skin float-left"
    document.getElementById("project-requirement-icon").appendChild(node);  

    var node = document.createElement("i");
    node.className = "fa fa-spinner fa-2x circled bg-skin float-left"
    document.getElementById("domain-requirement-icon").appendChild(node);  
}

function setFailureIcon(icon_id) {
    var node = document.createElement("i");
    node.className = "fa fa-remove fa-2x circled bg-red float-left"
    document.getElementById(icon_id).innerHTML = '';
    document.getElementById(icon_id).appendChild(node);
}

function setSuccessIcon(icon_id) {
    var node = document.createElement("i");
    node.className = "fa fa-check fa-2x circled bg-skin float-left"
    document.getElementById(icon_id).innerHTML = '';
    document.getElementById(icon_id).appendChild(node);
}

function setResultText(result_id, text) {
    var node = document.createElement("small");
    node.innerHTML = text;
    document.getElementById(result_id).innerHTML = '';
    document.getElementById(result_id).appendChild(node);
}

function setContent(data) {
    switch(data.event) {

        case "preRequisiteNotSatisified":
            setResultText("pre-requisite-result", evaluation_prerequisite_failure);
            setFailureIcon("pre-requisite-icon");
            break;

        case "preRequisiteSatisified":
            setResultText("pre-requisite-result", evaluation_prerequisite_success);
            setSuccessIcon("pre-requisite-icon");
            break;

        case "requiredCoursesNotSatisfied":
            setResultText("required-result", evaluation_requiredcourses_failure);
            setFailureIcon("required-courses-icon");
            break;

        case "requiredCoursesSatisfied":
            setResultText("required-result", evaluation_requiredcourses_success);
            setSuccessIcon("required-courses-icon");
            break;

        case "GPARequirementNotSatisfied":
            setResultText("gpa-result", evaluation_gpa_failure);
            setFailureIcon("gpa-requirement-icon");
            break;
        
        case "GPARequirementSatisfied":
            setResultText("gpa-result", evaluation_gpa_success);
            setSuccessIcon("gpa-requirement-icon");
            break;
        
        case "projectRequirementNotSatisfied":
            setResultText("project-result", evaluation_project_failure);
            setFailureIcon("project-requirement-icon");
            break;
        
        case "projectRequirementSatisfied":
            setResultText("project-result", evaluation_project_success);
            setSuccessIcon("project-requirement-icon");
            break;
        
        case "domainRequirementNotSatisfied":
            setResultText("domain-result", evaluation_domain_failure);
            setFailureIcon("domain-requirement-icon");
            break;
        
        case "domainRequirementSatisfied":
            setResultText("domain-result", evaluation_domain_success);
            setSuccessIcon("domain-requirement-icon");
            break;

        default:
          // code block
      }
}

function evaluateEligibility() {
    var entrySuccessCallback = function (data) {
        console.log("Called evaluate eligiblity!");
    }

    setLoadingIcons();

    $.ajax({
        type: "GET",
        url: '/user/'+ personNumber +'/eligible',
        success: entrySuccessCallback
    });
}

// Establish Socket Connection
var socket = io.connect('http://localhost:80')

socket.on("solidityEvent", function(data){
    console.log("event");
    console.log(data);
    setContent(data);
});