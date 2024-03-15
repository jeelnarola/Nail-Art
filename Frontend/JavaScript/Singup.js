document.getElementById("SignupFrom").addEventListener("submit",(e)=>{
    e.preventDefault()
    let Data={
        username:document.querySelector("#username").value,
        email:document.querySelector("#email").value,
        password:document.querySelector("#password").value
    }
    let nameregex= /^[A-Za-z. ]{3,30}$/;
    let emailregerx=/(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/;
    let passregex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if(!(nameregex.test(Data.username))|| Data.username=="")
    {
        document.querySelector(".p-username").style.display="block"
    }
    else{
        document.querySelector(".p-username").style.display="none"
    }
    if(!(emailregerx.test(Data.email)) || Data.email=="")
    {
        document.querySelector(".p-email").style.display="block"
    }
    else{
        document.querySelector(".p-email").style.display="none"
    }
    if(!(passregex.test(Data.password))||Data.password==""){
        document.querySelector(".p-password").style.display="block"
    }
    else{
        document.querySelector(".p-password").style.display="none"
    }
    fetch(`http://localhost:8090/SignupCheak?email=${Data.email}`)
    .then((res)=>{return res.json()})
    .then((data)=>{
        if(data.msg){
            if((nameregex.test(Data.username))&&(emailregerx.test(Data.email))&&(passregex.test(Data.password))){
                console.log(Data);
                fetch("http://localhost:8090/signup",{
                    method:"POST",
                    headers:{"content-type":"application/json"},
                    body:JSON.stringify(Data)
                })
                .then((res)=>res.json())
                .then((data)=>{
                    let emailSet=document.cookie=`User=${data.data.email};path=/`
                })
                // location.reload();
            }
        }
        else{
            document.querySelector(".Login").style.display="block"
            document.querySelector(".Signup").style.display="none"
        }
    })
})

document.getElementById("username").addEventListener("keypress",()=>{
    let username=document.getElementById("username").value
    let nameregex= /^[A-Za-z. ]{3,30}$/;
    if(!(nameregex.test(username))){
        document.getElementById("username").style.border="1px solid red"
        document.querySelector(".p-username").style.display="block"
    }else{
        document.getElementById("username").style.border="1px solid black"
        document.querySelector(".p-username").style.display="none"
    }
})

document.getElementById("email").addEventListener("keypress",()=>{
    let username=document.getElementById("email").value
    let emailregerx=/(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/;
    if(!(emailregerx.test(username))){
        document.getElementById("email").style.border="1px solid red"
        document.querySelector(".p-email").style.display="block"
    }else{
        document.getElementById("email").style.border="1px solid black"
        document.querySelector(".p-email").style.display="none"
    }
})
document.getElementById("password").addEventListener("keypress",()=>{
    let username=document.getElementById("password").value
    let passregex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if(!(passregex.test(username))){
        document.getElementById("password").style.border="1px solid red"
        document.querySelector(".p-password").style.display="block"
    }else{
        document.getElementById("password").style.border="1px solid black"
        document.querySelector(".p-password").style.display="none"
    }
})

document.getElementById("checkbox").addEventListener("click",(e)=>{
    // e.preventDefault()
    let password=document.getElementById("password")
    if(password.type==="password")
    {
        password.type="text"
    }
    else{
        password.type="password"
    }
})
// const scriptURL = 'https://script.google.com/macros/s/AKfycbxeciHNs-QsbfB8rkolxv3UI1ppupIiVE2MZUqWeNxVu5Dwk1Wr7iiovngm5MkEj7Ad/exec'
// const form = document.forms['contact-form']

// form.addEventListener('submit', e => {
//  e.preventDefault()
//  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//  .then(response => alert("Thank you! your form is submitted successfully." ))
//  .then(() => { window.location.reload(); })
//  .catch(error => console.error('Error!', error.message))
// })