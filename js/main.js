const e_word = document.querySelector(".e_word")
const a_word = document.querySelector(".a_word")
const start = document.getElementById("start")
let score = document.querySelector(".score span");

let data_animals = [];
let random_num = [];
let len;
let word = "";
let mean = "";
let Alldata;
let next = 0;
start.addEventListener("click",() =>{
    start.remove();
    GetData();
})

async function GetData () {
    const response = await fetch("./animal.json")
    const ob = await response.json();
    len = await ob.data.length;
    Alldata = await ob.data;
    return Basic()
}
function Basic(){
    randomNum();
    CreatWord(Alldata,random_num);
    CreatePage(data_animals)
}
function randomNum(){
    if(random_num.length < 5){
        let num  = Math.floor(Math.random() * len) + 1;
        if(!random_num.includes(num)){
            random_num.push(num);
            randomNum();
        } else {
            randomNum();
        }
    }
}
function CreatWord(arrayWord,arrayNum) {
    arrayNum.forEach(ele => {
        let word = arrayWord[ele];
        data_animals.push(word)
    });
}
function CreatePage(array){
    let arraynum1 = [];
    let arraynum2 = [];
    while(arraynum1.length < 5 || arraynum2.length < 5){
            let num1 = Math.floor(Math.random() * 5);
            let num2 = Math.floor(Math.random() * 5);
            if(!arraynum1.includes(num1)){
                arraynum1.push(num1);
                let div1 = document.createElement("button");
                div1.className = "avli";
                div1.id = array[num1].E_Name;
                div1.appendChild(document.createTextNode(array[num1].E_Name));
                e_word.appendChild(div1);
            } 
            if(!arraynum2.includes(num2)){
                arraynum2.push(num2);
                let div2 = document.createElement("button");
                div2.className = "avli";
                div2.id = array[num2].E_Name;
                div2.appendChild(document.createTextNode(array[num2].A_Name));
                a_word.appendChild(div2);
            } 
    }
    document.querySelectorAll(".boxs .e_word .avli").forEach(ele => {
        ele.addEventListener("click",() =>{
            // let sound = new Audio(`./sound/${ele.id}.mp3`);
            // if(sound){
            //     sound.play()
            // }
            document.querySelectorAll(".boxs .e_word .avli").forEach(e =>{
                e.classList.remove("active")
            })
            if(ele.classList.contains("avli")){
                ele.classList.toggle("active");
            }
            word = ele.id
            ChickWord();
            Wrong();
        })
    })
    document.querySelectorAll(".boxs .a_word .avli").forEach(ele => {
        ele.addEventListener("click",() =>{
            document.querySelectorAll(".boxs .a_word .avli").forEach(e =>{
                e.classList.remove("active")
            })
            if(ele.classList.contains("avli")){
                ele.classList.toggle("active");
            }
            mean = ele.id;
            ChickWord()
            Wrong()
        })
    })
    
}
function ChickWord() {
    if(mean !== "" && mean !== null && word !== "" && word !== null){
        if(mean === word){
            next++;
            score.innerHTML++;
            if(next === 5){
                random_num = [];
                data_animals = [];
                next = 0;
                mean = "";
                word = "";
                e_word.innerHTML = "";
                a_word.innerHTML = "";
                Basic()
            }
            document.querySelectorAll(".boxs .avli").forEach(e => {
                if(e.id === word){
                    e.classList.remove("avli")
                    e.classList.remove("active")
                    e.style.backgroundColor = "#202f36";
                    e.classList.add("right");
                    setTimeout(() => {
                        e.classList.remove("right");
                    },200);
                }
            })
        } 
    }
}
function Wrong(){
    if(mean !== "" && mean !== null && word !== "" && word !== null){
        if (mean !== word) {
            document.querySelectorAll(".boxs .a_word .avli").forEach(e => {
                if(e.id === mean){
                    e.classList.remove("active")
                    e.classList.add("wrong");
                    setTimeout(() => {
                        e.classList.remove("wrong");
                    },200);
                }
            })
            document.querySelectorAll(".boxs .e_word .avli").forEach(e => {
                if(e.id === word){
                    e.classList.remove("active")
                    e.classList.add("wrong");
                    setTimeout(() => {
                        e.classList.remove("wrong");
                    },200);
                }
            })
        }
        word = '';
        mean = '';
    }
}