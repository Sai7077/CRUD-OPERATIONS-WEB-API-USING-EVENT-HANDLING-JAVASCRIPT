let cl=console.log;

const create=document.getElementById("createstudent");
const fname=document.getElementById("fname");
const lname=document.getElementById("lname");
const email=document.getElementById("email");
const contact=document.getElementById("contact");
const add=document.getElementById("add");
const studGetinfo=document.getElementById("studGetinfo");
const submit=document.getElementById("submit");
const update=document.getElementById("update");

update.style.display="none";
let stuarr=[];

function addstudent(eve){
    eve.preventDefault();
    let studobj={
        firstname:fname.value,
        lasttname:lname.value,
        email:email.value,
        contact:contact.value,
        add:add.value,
        id:uuid(),
    }
    cl(studobj);
    // eve.target.reset();
    // create.reset()
    this.reset();
    stuarr.push(studobj);
    cl(stuarr);
    localStorage.setItem('data',JSON.stringify(stuarr));
    stuarr=JSON.parse(localStorage.getItem('data'));

    getdatastudent(stuarr);
}

    if(localStorage.getItem('data')){
    stuarr=JSON.parse(localStorage.getItem('data'));
    getdatastudent(stuarr);
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

    function updatestudent(){
        let getid=localStorage.getItem('setid');
        let info3=JSON.parse(localStorage.getItem('data'));
        info3.forEach(update=>{
            if(update.id===getid){
                update.firstname=fname.value;
                update.lasttname=lname.value;
                update.email=email.value;
                update.contact=contact.value;
                update.add=add.value;
            }
        })
        localStorage.setItem('data',JSON.stringify(info3));
        getdatastudent(info3);
        create.reset();
        update.style.display="none";
        submit.style.display="inline-block";

     
    }


    function editStuddata(eve){
        let getid=eve.getAttribute('data-id');
        localStorage.setItem('setid', getid);
        update.style.display="inline-block";
        submit.style.display="none";
        cl(getid);
        let getstudinfo=JSON.parse(localStorage.getItem('data'));
        cl(getstudinfo);
        let getinfodata=getstudinfo.filter(event2=>{
            return event2.id===getid;
        })
        fname.value=getinfodata[0].firstname;
        lname.value=getinfodata[0].lasttname;
        email.value=getinfodata[0].email;
        contact.value=getinfodata[0].contact;
        add.value=getinfodata[0].add;
    }

    function deletedata(ele){
        let getid=ele.dataset.id;
        cl(getid);
        let getstudinfo=JSON.parse(localStorage.getItem('data'));
        let getinfodata=getstudinfo.filter(test=>{
            return test.id!=getid;
        })
        localStorage.setItem('data',JSON.stringify(getinfodata));
        getdatastudent(getinfodata);
        }
  

    function getdatastudent(event1){
        let result='';
        event1.forEach((arr,i) => {
            result+=`<tr>
            <td>${i+1}</td>
            <td>${arr.firstname}</td>
            <td>${arr.lasttname}</td>
            <td>${arr.email}</td>
            <td>${arr.contact}</td>
            <td>${arr.add}</td>
            <td><button class="btn btn-primary" data-id="${arr.id}" onclick="editStuddata(this)">Edit</button></td>
            <td><button class="btn btn-danger" data-id="${arr.id}" onclick="deletedata(this)">Delete</button></td>
            </tr>`
        });
        studGetinfo.innerHTML=result;
    }

   
   


create.addEventListener('submit', addstudent)
update.addEventListener('click', updatestudent)