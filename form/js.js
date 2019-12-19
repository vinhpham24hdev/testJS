// input skill and teacher

const arSkills = ["HTML", "CSS", "PHP", "JAVA", "JavaScript", "NodeJS"];
const arTeachers = ["LVNT", "LVH", "NKA", "NLV"];
const itemE = `
    <div class="option-group">
    <select class="info" id="skill" name = "skill">
    <option class="skill" valure="Chose skill">Chose skill</option>
    ${arSkills.map(_item => `<option value="${_item}">${_item}</option>`)}
     </select>
    <select class="info" id="teacher" name = "teacher">
    <option class="skill" value= "Chose teacher">Chose teacher</option>
    ${arTeachers.map(_item => `<option value="${_item}">${_item}</option>`)}
     </select>
    <input type="button" value="x" id="deleteID" onclick = "del(this)">
    <textarea></textarea>
</div>`;

document.getElementById("list").insertAdjacentHTML("beforeend", itemE);

let arForm = document.getElementsByClassName("form-sign");
let arInput = arForm[0].getElementsByClassName("info");
let arClear = arForm[0].getElementsByClassName("clear");
//note
let noteName = document.getElementById("note-name");
let notePass = document.getElementById("note-password");
let noteConfEmp = document.getElementById("note-confirm-empty");
let noteConfInco = document.getElementById("note-confirm-incorrect");
let noteSkill = document.getElementById("note-skill");
//
let arList = document.querySelector("#list");
let delId = document.getElementById("deleteID");
let counter = 1;

//validate
function testForm() {
  for (let index = 0; index < arInput.length; index++) {
    const element = arInput[index];
    switch (element.name) {
      case "email":
        if (element.value === "") {
          noteName.style.display = "block";
          notePass.style.display = "none";
          noteConfEmp.style.display = "none";
          noteConfInco.style.display = "none";
          noteSkill.style.display = "none";
          return false;
        } else {
          noteName.style.display = "none";
        }
        break;

      case "password":
        if (element.value === "") {
          notePass.style.display = "block";
          noteConfEmp.style.display = "none";
          noteConfInco.style.display = "none";
          noteSkill.style.display = "none";
          return false;
        } else {
          notePass.style.display = "none";
        }
        break;

      case "confirmpassword":
        let x = document.getElementById("password").value;
        if (element.value === "") {
          noteConfEmp.style.display = "block";
          noteConfInco.style.display = "none";
          noteSkill.style.display = "none";
          return false;
        } else if (element.value !== x) {
          noteConfEmp.style.display = "none";
          noteConfInco.style.display = "block";
          noteSkill.style.display = "none";
          return false;
        } else {
          noteConfEmp.style.display = "none";
          noteConfInco.style.display = "none";
        }
        break;
      case "skill":
        if (element.value === "Chose skill") {
          noteSkill.style.display = "block";
          return false;
        } else {
          noteSkill.style.display = "none";
        }
        break;
      case "teacher":
        if (element.value === "Chose teacher") {
          noteSkill.style.display = "block";
          return false;
        } else {
          noteSkill.style.display = "none";
        }
        break;
      default:
        break;
    }
  }
  for (let index = 0; index < arInput.length; index++) {
    const element = arInput[index];
    console.table(element.name, ":", element.value);
  }
  for (let index = 0; index < arClear.length; index++) {
    const element = arClear[index];
    element.value = "";
  }
  return false;
}

//check number of option-group for delete x;
const checkCounter = () => {
  if (counter > 1) {
    delId.style.display = "block";
  } else {
    delId.style.display = "none";
  }
};
checkCounter();

//add
const addNew = () => {
  document.getElementById("list").insertAdjacentHTML("beforeend", itemE);
  counter++;
  checkCounter();
};

// delete
const del = current => {
  let parent = current.parentElement;
  parent.remove();
  counter--;
  checkCounter();
};