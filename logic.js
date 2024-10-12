axios.get("https://tarmeezacademy.com/api/v1/posts").then(function(res){
  let posts = res.data.data;
  console.log(posts)
  for(post of posts){
      let content = `
              <div class="card shadow">
            <div class="card-header d-flex align-items-center">
              <img src= "${post.author.profile_image}" style=" width: 40px; height: 40px; background-size: cover; cursor: pointer;" class="rounded-circle border border-2" alt="">
              <h6 style="margin-left: 3px; margin-top: 8px">@${post.author.username}</h6>
            </div>
            <div class="card-body">
              <img src="${post.image}" style="width: 100%; height:300px;" alt="">
              <h6 style="color: rgba(0, 0, 0, 0.24); font-size: 13px;" class="mt-1">${post.created_at}</h6>
              <h5>${post.id}</h5>
              <p>${post.body}</p>
              <hr>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                </svg>
                <span class="comment">(3) Comments</span>
              </div>
            </div>
          </div>
      `
      document.getElementById("posts").innerHTML += content;
  }
})

function login(){
let userName = document.getElementById('userName').value; 
let password = document.getElementById('password').value; 
let bodyParam = {
  "username" : userName,
  "password" : password
}
axios.post('https://tarmeezacademy.com/api/v1/login',bodyParam).then(function(res){
  console.log(res)
  let user = JSON.stringify(res.data.user)
  let token = res.data.token;
  localStorage.setItem("token",token);
  localStorage.setItem("user",user);
  document.getElementById('login-alert').style.visibility = 'visible';

  setTimeout(()=>{
  document.getElementById('login-alert').style.display = 'none';
  },4000)
  setUpUi()
}).catch((error) => alert(error.response.data.message));

}

function register(){
let name = document.getElementById('register-name-input').value; 
let userName = document.getElementById('register-username-input').value; 
let password = document.getElementById('register-password-input').value; 
let bodyParam = {
  "name": name,
  "username" : userName,
  "password" : password
}
axios.post('https://tarmeezacademy.com/api/v1/register',bodyParam).then(function(res){
  console.log(res)
  let user = JSON.stringify(res.data.user)
  let token = res.data.token;
  localStorage.setItem("token",token);
  localStorage.setItem("user",user);
  document.getElementById('register-alert').style.visibility = 'visible';

  setTimeout(()=>{
  document.getElementById('register-alert').style.display = 'none';
  },4000)
  setUpUi()
}).catch((error) => alert(error.response.data.message));

}

function logout(){
localStorage.removeItem("token");
localStorage.removeItem("user");
setUpUi();
document.getElementById('logout-alert').style.visibility = 'visible';

setTimeout(()=>{
document.getElementById('logout-alert').style.display = 'none';
},4000)
}

function setUpUi(){
let token = localStorage.getItem("token");
let loginBtn =  document.getElementById('login-modal');
let registerBtn =  document.getElementById('register-modal');
let logoutBtn =  document.getElementById('logout-modal');
if(token == null){
  loginBtn.style.display = 'flex';
  registerBtn.style.display = 'flex';
  logoutBtn.style.display = 'none';
  document.getElementById("addBtn").style.display = 'none';
}else{
  loginBtn.style.display = 'none';
  registerBtn.style.display = 'none';
  logoutBtn.style.display = 'flex';
  document.getElementById("addBtn").style.display = 'flex';
}

}

let array3 = [];
if(localStorage.getItem('array')){
array3 = JSON.parse(localStorage.getItem('array'))
}
getDataFromLocalStorage();

function addPost(){
let date = new Date();
let minutes =`${date.getMinutes()} Minutes ago`;
let profile_image = document.getElementById('profile-image').value;
let userName = document.getElementById('new-post-username').value; 
let postImage = document.getElementById('post-image').value; 
let id = document.getElementById('id').value; 
let body = document.getElementById('body').value; 
let content = `
<div class="card shadow">
<div class="card-header d-flex align-items-center">
<img src= "${profile_image}" style=" width: 40px; height: 40px; background-size: cover; cursor: pointer;" class="rounded-circle border border-2" alt="">
<h6 style="margin-left: 3px; margin-top: 8px">@${userName}</h6>
</div>
<div class="card-body">
<img src="${postImage}" style="width: 100%; height:300px;" alt="">
<h6 style="color: rgba(0, 0, 0, 0.24); font-size: 13px;" class="mt-1">${minutes}</h6>
<h5>${id}</h5>
<p>${body}</p>
<hr>
<div>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
  </svg>
  <span class="comment">(3) Comments</span>
</div>
</div>
</div>
`
document.getElementById('posts').innerHTML += content;
if(content != null){
  array3.push(content);
}
addArrayToLocalStorage(array3)
document.getElementById('newPost-alert').style.visibility = 'visible';
setTimeout(()=>{
document.getElementById('newPost-alert').style.display = 'none';
},4000);
}


function addArrayToLocalStorage(array3){
localStorage.setItem('array',JSON.stringify(array3));
}

function getDataFromLocalStorage(){
let result = JSON.parse(localStorage.getItem('array'));
  result.forEach((selfPost) => {
  document.getElementById('posts').innerHTML += selfPost
});
}
setUpUi();


