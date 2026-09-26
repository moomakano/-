
const KEY='study-v62';
let db=JSON.parse(localStorage.getItem(KEY)||'{"items":[],"recurring":[],"teachers":[]}');
let cur=new Date(), sel=new Date();
const $=id=>document.getElementById(id);
function save(){localStorage.setItem(KEY,JSON.stringify(db));render();}
function k(d){return d.toISOString().slice(0,10)}
function renderCal(){const y=cur.getFullYear(),m=cur.getMonth();$('month').textContent=cur.toLocaleDateString('th-TH',{month:'long',year:'numeric'});const g=$('grid');g.innerHTML='';let first=new Date(y,m,1).getDay();let days=new Date(y,m+1,0).getDate();for(let i=0;i<first;i++){g.appendChild(document.createElement('div'))}for(let d=1;d<=days;d++){let dt=new Date(y,m,d);let div=document.createElement('div');div.className='day';div.textContent=d;if(k(dt)==k(sel))div.classList.add('sel');let has=db.items.some(i=>i.date==k(dt))||db.recurring.some(r=>r.weekday==dt.getDay());if(has)div.classList.add('has');div.onclick=()=>{sel=dt;render()};g.appendChild(div)}$('selTitle').textContent='📅 '+sel.toLocaleDateString('th-TH')}
function listFor(){let arr=db.items.filter(i=>i.date==k(sel));db.recurring.filter(r=>r.weekday==sel.getDay()).forEach(r=>arr.push({...r,rec:true}));return arr}
function renderList(){const ul=$('list');ul.innerHTML='';listFor().forEach((i,n)=>{let li=document.createElement('li');li.innerHTML=`<div><b>${i.time}</b><br>${i.subject}<br>👩‍🏫 ${i.teacher}</div><div class=act><button class="small" data-i="${n}">✏️</button></div>`;li.querySelector('button').onclick=()=>edit(i);ul.appendChild(li)})}
function renderTeachers(){$('teachers').innerHTML='';db.teachers.forEach(t=>{let o=document.createElement('option');o.value=t;$('teachers').appendChild(o)})}
let editId=null;
function edit(i){editId=i.id||null;$('sub').value=i.subject;$('teacher').value=i.teacher;let p=i.time.split(' - ');$('s').value=p[0];$('e').value=(p[1]||'').replace(' น.','');$('repeat').value=i.rec?'weekly':'once';$('weekday').value=i.weekday??sel.getDay();window.scrollTo({top:0,behavior:'smooth'})}
$('add').onclick=()=>{const t=$('teacher').value.trim();if(t&&!db.teachers.includes(t))db.teachers.push(t);const item={id:editId||Date.now(),subject:$('sub').value,teacher:t,time:`${$('s').value} - ${$('e').value} น.`,weekday:+$('weekday').value};if($('repeat').value=='weekly'){db.recurring=db.recurring.filter(r=>r.id!=item.id);db.recurring.push(item)}else{item.date=k(sel);db.items=db.items.filter(r=>r.id!=item.id);db.items.push(item)}editId=null;$('sub').value='';$('teacher').value='';save()}
$('copy').onclick=()=>{const src=db.items.filter(i=>i.date==k(sel));if(!src.length)return alert('เลือกวันที่มีวิชาก่อน');let sun=new Date(sel);sun.setDate(sel.getDate()-sel.getDay());for(let x=0;x<7;x++){let d=new Date(sun);d.setDate(sun.getDate()+x);let kk=k(d);db.items=db.items.filter(i=>i.date!=kk);src.forEach(i=>db.items.push({...i,id:Date.now()+Math.random(),date:kk}))}save();alert('คัดลอกครบทั้งสัปดาห์')}
$('prev').onclick=()=>{cur.setMonth(cur.getMonth()-1);render()}
$('next').onclick=()=>{cur.setMonth(cur.getMonth()+1);render()}
$('today').onclick=()=>{cur=new Date();sel=new Date();render()}
function render(){renderCal();renderList();renderTeachers();save.cache=true}
render();
