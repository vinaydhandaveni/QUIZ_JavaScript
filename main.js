let correct=0;
let total=5;

let correct_ans=[]

var qz;
async function getapi(url) {

    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    qz=data;
    setter(data);
}
 //console.log(total);
function setter(data){
    for(var i=0;i<total;i++) loader(data,i);
    getCorrectAnswer(data);
}

function loader(question,index){
    document.getElementById("head"+index).innerText=question[index]["question"];
    console.log(question[index]["question"]);
    answers=question[index]["answers"];
    answers=Object.values(answers);
    //console.log(answers);
    var str=``;
    for(var i=0;i<answers.length&&answers[i]!=null;i++){
    var an=answers[i].replace(/ /g,'_');
    console.log(an);
    str+=`<input type="radio" value=${an}>${answers[i]}</input><br>`
    }
    document.getElementById("options"+index).innerHTML=str;
}

function getsols(){
    checked_ans=getAnswer();
    console.log(checked_ans);
    calcscore(correct_ans,checked_ans);
}

const getAnswer = () => {
    let ans=[];
    let allInputs = document.querySelectorAll("input[type='radio']")
    allInputs.forEach(
        (inputEl) => {
            if (inputEl.checked) {
                ans.push(inputEl.value);
            }
        }
    )
    return ans;
}

const getCorrectAnswer=(qz)=>{
    for(var i=0;i<5;i++){
        crect=qz[i]["correct_answer"];
        if(crect!=null){
            an=qz[i]["answers"][crect].replace(/ /g,'_');
        correct_ans.push(an);
        }
        else
            correct_ans.push("null");

    }
    console.log(correct_ans);
}
const calcscore=(correct_ans,ans)=>{
    for(var i=0;i<5;i++){
        if(ans[i]==correct_ans[i])correct++;
    }
    quizEnd();
    }




const quizEnd = () => {
    document.getElementById("qsn").innerHTML = `
        <div class="col">
            <h3> Hii, you've scored ${correct} / ${total} </h3>
        </div>
    `
}

getapi("https://quizapi.io/api/v1/questions?apiKey=2xpJDhMN3oW3ZjdThP27u96SiQRZNbPIcZaxbygK&limit=5");