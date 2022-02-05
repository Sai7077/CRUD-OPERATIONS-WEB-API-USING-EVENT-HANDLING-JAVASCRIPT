let cl=console.log;

const createstud=document.getElementById('createstudent');
const firstname=document.getElementById('fname');
const lastname=document.getElementById('lname');
const email=document.getElementById('email');
const contact=document.getElementById('contact');
const studinfo=document.getElementById('studinfo');
const update=document.getElementById('update');
const submit=document.getElementById('submit');

update.style.display="none";


  
let studarr=[];

function handler (eve) {
    // cl("Hello Sai");
    eve.preventDefault();
    let studobj={
        fname:firstname.value,
        lname:lastname.value,
        email:email.value,
        contact:contact.value,
        id:uuid(),
    }
    // cl(studobj);
    studarr.push(studobj);
    cl(studarr);
    localStorage.setItem('set',JSON.stringify(studarr));
    studarr=getdatastud();
    // createstud.reset();
    // eve.target.reset();
    this.reset();
    temp(studarr);
 }


 if(localStorage.getItem('set')){
    studarr=getdatastud();
      temp(studarr);
 }

  function getdatastud(){
    if(localStorage.getItem('set')){
        return JSON.parse(localStorage.getItem('set'));
      }
  }

  function updateStud(){
    let getId=localStorage.getItem('setdata');
    cl(getId);
    let getinfo1=getdatastud();
    getinfo1.forEach(update=> {
        if(update.id===getId){
            update.fname=firstname.value;
            update.lname=lastname.value;
            update.email=email.value;
            update.contact=contact.value;
        }
    })
    cl(getinfo1);
    localStorage.setItem('set',JSON.stringify(getinfo1));
    createstud.reset();
    update.style.display="none";
    submit.style.display="inline-block";
    temp(getinfo1);
  }

  function deleteStuddata(ele){
      cl(ele);
      let getid=ele.dataset.id;
    //   let getid=ele.getAttribute('data-id');
      cl(getid);
      let getdel=getdatastud();
      let getdel1=getdel.filter(test=>{
          return test.id != getid;
      })
      localStorage.setItem('set',JSON.stringify(getdel1));
      temp(getdel1);
  } 

function editStuddata(eve){
    let getid=eve.getAttribute('data-id');
    localStorage.setItem('setdata', getid);
    // cl(getid);
    update.style.display="inline-block";
    submit.style.display="none";

    let getinfo=getdatastud();
    // cl(getinfo);
    let getStuddata=getinfo.filter(get=>{
        return get.id===getid;
    })
    firstname.value=getStuddata[0].fname;
    lastname.value=getStuddata[0].lname;
    email.value=getStuddata[0].email;
    contact.value=getStuddata[0].contact;
}


function uuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}



    // cl(studarr);
    function temp(event1){
        let result='';
        event1.forEach((ui,i)=>{
            result+=`<tr>
                <td>${i+1}</td>
                <td>${ui.fname}</td>
                <td>${ui.lname}</td>
                <td>${ui.email}</td>
                <td>${ui.contact}</td>
                <td><button class="btn btn-primary" data-id="${ui.id}" onclick="editStuddata(this)">Edit</button></td>
                <td><button class="btn btn-danger" data-id="${ui.id}" onclick="deleteStuddata(this)">Delete</button></td>
    
            </tr>`
    })
    studinfo.innerHTML=result;
}



createstud.addEventListener('submit', handler);
update.addEventListener('click', updateStud);