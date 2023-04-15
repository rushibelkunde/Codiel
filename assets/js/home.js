

console.log("connected")


document.addEventListener("click",(e)=>{
    if(e.target.id=="dropdown"){
        console.log(e.target.nextElementSibling)
        if(e.target.nextElementSibling.className=="hidden"){
            e.target.nextElementSibling.className = "show"
        }
        else if(e.target.nextElementSibling.className=="show"){
            e.target.nextElementSibling.className = "hidden"
        } 
    }
    
})


    


