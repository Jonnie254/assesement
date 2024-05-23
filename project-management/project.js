let projectform = document.querySelector(".project-info");
let projectname = document.querySelector("#project-name");
let projectdescription = document.querySelector("#project-desc");
let projectManager = document.querySelector("#project-manager");
let projectstatus = document.querySelector("#project-status");
let projectstartdate = document.querySelector("#project-start");
let projectenddate = document.querySelector("#project-end");
let createbutton = document.querySelector(".createbutton");
let form = document.querySelector(".project-info");

//add event listener to create button when clicked it will call the form visible function
createbutton.addEventListener("click", () => {
  form.style.visibility = "visible";
});

let project = JSON.parse(localStorage.getItem("projects")) || [];

//add new event listener
function createProject(event) {
  event.preventDefault();

  let project_name = projectname.value.trim();
  let project_description = projectdescription.value.trim();
  let project_manager = projectManager.value.trim();
  let project_status = projectstatus.value.trim();
  let project_startdate = projectstartdate.value;
  let project_enddate = projectenddate.value;

  if (
    project_name !== "" &&
    project_description !== "" &&
    project_manager !== "" &&
    project_status !== "" &&
    project_startdate !== "" &&
    project_enddate !== ""
  ) {
    let newProject = {
      id: Date.now(),
      name: project_name,
      description: project_description,
      manager: project_manager,
      status: project_status,
      startdate: project_startdate,
      enddate: project_enddate,
    };

    project.push(newProject);
    localStorage.setItem("projects", JSON.stringify(project));
    console.log(project);

    projectname.value = "";
    projectdescription.value = "";
    projectManager.value = "";
    projectstatus.value = "";
    projectstartdate.value = "";
    projectenddate.value = "";
  }
}

form.addEventListener("submit", function (event) {
  createProject(event);
  displayProjects();
});

function displayProjects() {
  let projects = JSON.parse(localStorage.getItem("projects"));
  let projectTable = document.querySelector("#displayUserstbl");
  let projectRows = document.querySelectorAll("#displayUserstbl tr");
  projectRows.forEach((row, index) => {
    if (index !== 0) {
      row.remove();
    }
  });
  projects.forEach((project, index) => {
    let projectRow = document.createElement("tr");

    let idData = document.createElement("td");
    idData.textContent = project.id;
    projectRow.appendChild(idData);

    let nameData = document.createElement("td");
    nameData.textContent = project.name;
    projectRow.appendChild(nameData);

    let descriptionData = document.createElement("td");
    descriptionData.textContent = project.description;
    projectRow.appendChild(descriptionData);

    let managerData = document.createElement("td");
    managerData.textContent = project.manager;
    projectRow.appendChild(managerData);

    let statusData = document.createElement("td");
    statusData.textContent = project.status;
    projectRow.appendChild(statusData);

    let startDateData = document.createElement("td");
    startDateData.textContent = project.startdate;
    projectRow.appendChild(startDateData);

    let endDateData = document.createElement("td");
    endDateData.textContent = project.enddate;
    projectRow.appendChild(endDateData);

    let deleteUserbtn = document.createElement("button");
    deleteUserbtn.textContent = "Delete";
    deleteUserbtn.style.backgroundColor = "#f44336";
    deleteUserbtn.style.border = "none";
    deleteUserbtn.style.cursor = "pointer";
    deleteUserbtn.style.padding = "5px 10px";
    deleteUserbtn.style.marginRight = "20px";
    deleteUserbtn.style.borderRadius = "5px";
    deleteUserbtn.style.color = "white";
    deleteUserbtn.addEventListener("click", () => {
      let projectIndex = projects.findIndex(
        (p) =>
          p.name === project.name &&
          p.description === project.description &&
          p.manager === project.manager &&
          p.status === project.status &&
          p.startdate === project.startdate &&
          p.enddate === project.enddate
      );
      if (projectIndex !== -1) {
        projects.splice(projectIndex, 1);
        localStorage.setItem("projects", JSON.stringify(projects));
        displayProjects();
      }
    });
    projectRow.appendChild(deleteUserbtn);
    projectTable.appendChild(projectRow);
  });
  let updateUserbtn = document.createElement("button");
  updateUserbtn.textContent = "Update";
  updateUserbtn.style.marginLeft = "10px";
  // For the update button
  updateUserbtn.style.backgroundColor = "#4CAF50";
  updateUserbtn.style.color = "white";
  updateUserbtn.style.border = "none";
  updateUserbtn.style.cursor = "pointer";
  updateUserbtn.style.padding = "5px 10px";
  updateUserbtn.style.marginRight = "10px";
  updateUserbtn.style.marginTop = "5px";
  updateUserbtn.style.textAlign = "center";
  updateUserbtn.style.fontColor = "white";
  updateUserbtn.style.textDecoration = "none";
  updateUserbtn.style.borderRadius = "5px";
  updateUserbtn.style.marginRight = "10px";
  updateUserbtn.style.color = "white";
  updateUserbtn.addEventListener("click", () => {
    let projectIndex = projects.findIndex(
      (p) =>
        p.name === project.name &&
        p.description === project.description &&
        p.manager === project.manager &&
        p.status === project.status &&
        p.startdate === project.startdate &&
        p.enddate === project.enddate
    );
    if (projectIndex !== -1) {
      projects.splice(projectIndex, 1);
      localStorage.setItem("projects", JSON.stringify(projects));
      displayProjects();
    }
  });
  projectRows.appendChild(updateUserbtn);
  projectTable.appendChild(projectRows);
}
