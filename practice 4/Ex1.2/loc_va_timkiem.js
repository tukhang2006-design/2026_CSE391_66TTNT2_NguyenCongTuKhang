var nameInput = document.getElementById("name");
var scoreInput = document.getElementById("score");
var addBtn = document.getElementById("addBtn");

var searchInput = document.getElementById("search");
var filterRank = document.getElementById("filterRank");

var tableBody = document.getElementById("tableBody");
var noResult = document.getElementById("noResult");

var total = document.getElementById("total");
var avg = document.getElementById("avg");

var sortScore = document.getElementById("sortScore");

var students = [];

var sortType = 0; //0 = không sort, 1 = tăng, -1 = giảm



function getRank(score){

if(score >= 8.5) return "Giỏi";
if(score >= 7) return "Khá";
if(score >= 5) return "Trung bình";
return "Yếu";

}



function addStudent(){

var name = nameInput.value.trim();
var score = parseFloat(scoreInput.value);

if(name === ""){
alert("Họ tên không được trống");
return;
}

if(isNaN(score) || score < 0 || score > 10){
alert("Điểm phải từ 0 đến 10");
return;
}

var student = {
name:name,
score:score
};

students.push(student);

nameInput.value="";
scoreInput.value="";

applyFilters();

nameInput.focus();

}



function applyFilters(){

var keyword = searchInput.value.toLowerCase();
var rankFilter = filterRank.value;

var filtered = [];

for(var i=0;i<students.length;i++){

var st = students[i];
var rank = getRank(st.score);

var matchName = st.name.toLowerCase().includes(keyword);

var matchRank = (rankFilter === "all" || rank === rankFilter);

if(matchName && matchRank){
filtered.push(st);
}

}

if(sortType !== 0){

filtered.sort(function(a,b){

if(sortType === 1){
return a.score - b.score;
}else{
return b.score - a.score;
}

});

}

renderTable(filtered);

}



function renderTable(list){

tableBody.innerHTML="";

if(list.length === 0){
noResult.innerText="Không có kết quả";
}else{
noResult.innerText="";
}

for(var i=0;i<list.length;i++){

var st = list[i];

var rank = getRank(st.score);

var tr = document.createElement("tr");

if(st.score < 5){
tr.classList.add("weak");
}

var td1 = document.createElement("td");
td1.textContent = i+1;

var td2 = document.createElement("td");
td2.textContent = st.name;

var td3 = document.createElement("td");
td3.textContent = st.score;

var td4 = document.createElement("td");
td4.textContent = rank;

var td5 = document.createElement("td");

var btn = document.createElement("button");
btn.textContent = "Xóa";
btn.setAttribute("data-name",st.name);

td5.appendChild(btn);

tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);
tr.appendChild(td4);
tr.appendChild(td5);

tableBody.appendChild(tr);

}

updateStats(list);

}



function updateStats(list){

var sum = 0;

for(var i=0;i<list.length;i++){
sum = sum + list[i].score;
}

var avgScore = 0;

if(list.length > 0){
avgScore = (sum / list.length).toFixed(2);
}

total.innerText = "Tổng SV: " + list.length;
avg.innerText = "Điểm TB: " + avgScore;

}



addBtn.onclick = addStudent;



scoreInput.addEventListener("keypress",function(e){

if(e.key === "Enter"){
addStudent();
}

});



searchInput.addEventListener("input",applyFilters);

filterRank.addEventListener("change",applyFilters);



sortScore.addEventListener("click",function(){

if(sortType === 1){
sortType = -1;
sortScore.innerText = "Điểm ▼";
}else{
sortType = 1;
sortScore.innerText = "Điểm ▲";
}

applyFilters();

});



tableBody.addEventListener("click",function(e){

if(e.target.tagName === "BUTTON"){

var name = e.target.getAttribute("data-name");

for(var i=0;i<students.length;i++){

if(students[i].name === name){
students.splice(i,1);
break;
}

}

applyFilters();

}

});