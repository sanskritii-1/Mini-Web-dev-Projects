let sequence = []
let score = 1
let num_clicks = 0;


let arr = document.querySelectorAll(".btn");

// before game starts, disable the clicking of buttons
// arr.forEach(element=>{
//     // element.disabled = true;
//     element.removeEventListener("click", handle_click)
// })

function handle_click(){
    console.log("clicked ----------------")
    let color = this.id;
    change_colour(color);
    if(color !== sequence[num_clicks]){
        console.log(color, sequence[num_clicks], sequence, num_clicks)
        console.log("defeat")
        new Audio("sounds/wrong.mp3").play()
        document.querySelector("h1").innerHTML = "Defeat"
        score = -1;
        console.log("score: ", score)
        arr.forEach(element=>{
            element.removeEventListener("click", handle_click)
        })
    }

    num_clicks++;

    if(num_clicks===score){
        score++
        setTimeout(() => {
            main()
        }, 1000);
    }    
}


let class_to_add = {
    "green": "green-blink",
    "red": "red-blink",
    "blue": "blue-blink",
    "yellow": "yellow-blink",
}



function change_colour(color){
    let cls = class_to_add[color];
    document.querySelector("#"+color).classList.add(cls)
    new Audio(`sounds/${color}.mp3`).play()
    setTimeout(function(){
        document.querySelector("#"+color).classList.remove(cls)
    },150)
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generate_sequence(){
    arr.forEach(element=>{
        element.removeEventListener("click", handle_click)
    })

    let colours = ["green", "blue", "yellow", "red"]
    let index = Math.floor(Math.random()*4)
    sequence.push(colours[index])
    for(let i=0;i<score;i++){
        await delay(600)
        console.log("sequence in for: ", sequence, "i: ", i, "s[i]: ", sequence[i])
        change_colour(sequence[i])
        // console.log("in here waiting for change color")
    }
    console.log(sequence)

    arr.forEach(element=>{
        // element.disabled = false;
        element.addEventListener("click", handle_click)
    })
}

function main(){
    num_clicks=0;
    document.querySelector("h1").innerHTML = "Score: "+score
    generate_sequence();
}

document.addEventListener("keydown", function(){
    main()
})
