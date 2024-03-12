document.getElementById("SignupFrom").addEventListener("submit",(e)=>{
    // e.preventDefault()
    let Data={
        UserName:document.querySelector("#username").value,
        Email:document.querySelector("#email").value,
        Password:document.querySelector("#password").value
    }
    fetch(`http://localhost:8090/SignupCheak?email=${Data.Email}`)
    .then((res)=>{return res.json()})
    .then((data)=>{
        if(data.msg){
            console.log("Post");
        }
        else{
            document.querySelector(".Login").style.display="block"
            document.querySelector(".Signup").style.display="none"
        }
    })
})
const scriptURL = 'https://script.google.com/macros/s/AKfycbxeciHNs-QsbfB8rkolxv3UI1ppupIiVE2MZUqWeNxVu5Dwk1Wr7iiovngm5MkEj7Ad/exec'
const form = document.forms['contact-form']

form.addEventListener('submit', e => {
 e.preventDefault()
 fetch(scriptURL, { method: 'POST', body: new FormData(form)})
 .then(response => alert("Thank you! your form is submitted successfully." ))
 .then(() => { window.location.reload(); })
 .catch(error => console.error('Error!', error.message))
})