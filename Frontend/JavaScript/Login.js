const show=()=>{
    let Login=document.querySelector("#Login-Password")
    if(Login.type==="password"){
        Login.type="text"
    }else{
        Login.type="password"
    }
}
document.querySelector(".Login-checkbox").addEventListener("click",()=>show())
document.getElementById("Form").addEventListener("submit",(e)=>{
    e.preventDefault()
    // alert("yes")
    let obj={
    email:document.getElementById("Login-Email").value,
    password:document.getElementById("Login-Password").value
    }
   

    fetch(`http://localhost:8090/login?email=${obj.email}`)
    .then((res)=>{return res.json()})
    .then((data)=>{
        if(data.msg){
            console.log("User not found");
        }
        else{
            fetch("http://localhost:8090/Logincheak",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(obj)
       })
       .then((res)=>{return res.json()})
       .then((data)=>{
           console.log("done");
       })
        }
    })
})