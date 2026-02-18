const addBtn = document.getElementById("addField");
const fieldsList = document.getElementById("fieldsList");
const previewForm = document.getElementById("previewForm");

let formFields = [];

addBtn.onclick = () => {

let type = document.getElementById("fieldType").value;
let label = document.getElementById("labelInput").value;

if(label.trim()===""){
alert("Enter label");
return;
}

formFields.push({
type,
label
});

render();
};

function render(){

fieldsList.innerHTML="";
previewForm.innerHTML="";

formFields.forEach((field,index)=>{

/* LEFT STRUCTURE LIST */

let div = document.createElement("div");
div.className="field-card";

div.innerHTML = `
<b>${field.label}</b> (${field.type})

<div class="field-actions">
<button onclick="moveUp(${index})">↑</button>
<button onclick="moveDown(${index})">↓</button>
<button onclick="removeField(${index})">Delete</button>
</div>
`;

fieldsList.appendChild(div);

/* RIGHT LIVE PREVIEW */

let label = document.createElement("label");
label.innerText = field.label;

previewForm.appendChild(label);

if(field.type==="textarea"){
let input = document.createElement("textarea");
previewForm.appendChild(input);
}else{
let input = document.createElement("input");
input.type = field.type;
previewForm.appendChild(input);
}

});
}

/* REMOVE FIELD */

function removeField(i){
formFields.splice(i,1);
render();
}

/* MOVE UP */

function moveUp(i){
if(i===0) return;
[formFields[i],formFields[i-1]] =
[formFields[i-1],formFields[i]];
render();
}

/* MOVE DOWN */

function moveDown(i){
if(i===formFields.length-1) return;
[formFields[i],formFields[i+1]] =
[formFields[i+1],formFields[i]];
render();
}

/* EXPORT JSON */

document.getElementById("exportBtn").onclick = () => {

let data = JSON.stringify(formFields,null,2);

let blob = new Blob([data],{type:"application/json"});
let url = URL.createObjectURL(blob);

let a = document.createElement("a");
a.href=url;
a.download="form.json";
a.click();

};
