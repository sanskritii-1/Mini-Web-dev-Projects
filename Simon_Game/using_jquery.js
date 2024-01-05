let score = 1;
let num_clicks =1;
let sequence = [];
let class_to_add = {
    "green": "green-blink",
    "red": "red-blink",
    "blue": "blue-blink",
    "yellow": "yellow-blink",
}

// $(".btn").click(handle_click)


function handle_click(){
    let color = this.id
    change_colour(color);

    if(color !== sequence[num_clicks]){
        console.log(color, sequence[num_clicks], sequence, num_clicks)
        console.log("defeat")
        new Audio("sounds/wrong.mp3").play()
        $("h1").text("Defeat")
        score = -1;
        console.log("score: ", score)
        $(".btn").off("click")
    }

    num_clicks++;

    if(num_clicks===score){
        score++
        setTimeout(() => {
            main()
        }, 1000);
    }
}


function change_colour(color){
    $("#"+color).addClass(class_to_add[color])
    new Audio(`sounds/${color}.mp3`).play()
    setTimeout(() => {
        $("#"+color).removeClass(class_to_add[color])
    }, 150);
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generate_sequence(){
    $(".btn").off("click")
    let colours = ["green", "blue", "yellow", "red"];
    let index = Math.floor(Math.random()*4);
    sequence.push(colours[index]);
    for(let i=0;i<score;i++){
        await delay(600)
        console.log("sequence in for: ", sequence, "i: ", i, "s[i]: ", sequence[i])
        change_colour(sequence[i])
        // console.log("in here waiting for change color")
    }
    console.log(sequence)
    $(".btn").on("click", handle_click)
}


function main(){
    // while(1){
        num_clicks=0;
        $("h1").text("Score: "+score)
        generate_sequence();
        // handle_click()
    // }
}


$(document).keydown(function(){
    main()
})