const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");

const total = document.getElementById("total");
const avg = document.getElementById("avg");

let students = [];

function getRank(score){
    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";
}

function renderTable(){

    tableBody.innerHTML = "";

    students.forEach((sv,index)=>{

        let rank = getRank(sv.score);

        let tr = document.createElement("tr");

        if(sv.score < 5){
            tr.classList.add("weak");
        }

        tr.innerHTML = `
            <td>${index+1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${rank}</td>
            <td>
                <button data-index="${index}" class="deleteBtn">Xóa</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });

    updateStats();
}

function updateStats(){

    let count = students.length;

    let sum = students.reduce((a,b)=> a + b.score ,0);

    let average = count ? (sum / count).toFixed(2) : 0;

    total.textContent = "Tổng SV: " + count;
    avg.textContent = "Điểm TB: " + average;
}

function addStudent(){

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if(name === ""){
        alert("Họ tên không được để trống");
        return;
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    students.push({
        name:name,
        score:score
    });

    renderTable();

    nameInput.value = "";
    scoreInput.value = "";

    nameInput.focus();
}

addBtn.addEventListener("click",addStudent);

scoreInput.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        addStudent();
    }
});

tableBody.addEventListener("click",function(e){

    if(e.target.classList.contains("deleteBtn")){

        let index = e.target.dataset.index;

        students.splice(index,1);

        renderTable();
    }
});