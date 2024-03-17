    // Password Show JS Start

const show=()=>{
    let Login=document.querySelector("#Login-Password")
    if(Login.type==="password"){
        Login.type="text"
    }else{
        Login.type="password"
    }
}
document.querySelector(".Login-checkbox").addEventListener("click",()=>show())

    // Password Show JS Close
    // Login Form Submit And Post Data Back-End 


document.getElementById("Form").addEventListener("submit",(e)=>{
    e.preventDefault()
    let obj={
    email:document.getElementById("Login-Email").value,
    password:document.getElementById("Login-Password").value
    }
    // Email Enter A Check Email Extis Or Not Extis API Fetch

    fetch(`http://localhost:8090/login?email=${obj.email}`)
    .then((res)=>{return res.json()})
    .then((data)=>{
        if(data.msg){
            console.log("User not found");
        }
        else{

            // Enter Email Check Not Email Match API Post call And Send Data Back-End

            fetch("http://localhost:8090/Logincheak",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(obj)
       })
       .then((res)=>{return res.json()})
       .then((data)=>{

        // Back-End Send to Fornt Side  Cookie Send Or Set Cookies
        
        let EmailUsr=document.cookie=`User=${data.data.email};path=/`
       })
        }
    })
})