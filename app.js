const video=document.getElementById('video'),canvas=document.getElementById('canvas'),img=document.getElementById('preview');
let last='';async function start(){try{const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}}});video.srcObject=s}catch(e){alert('เปิดกล้องไม่สำเร็จ')}}
open.onclick=start;
capture.onclick=()=>{if(!video.videoWidth)return;canvas.width=video.videoWidth;canvas.height=video.videoHeight;canvas.getContext('2d').drawImage(video,0,0);last=canvas.toDataURL('image/jpeg',0.95);img.src=last;img.hidden=false;video.hidden=true;editor.classList.remove('hidden')};
save.onclick=()=>{if(!last)return;const a=document.createElement('a');a.href=last;a.download='scan.jpg';a.click()};
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{img.className='';img.classList.add(b.dataset.f)});
if('serviceWorker' in navigator)navigator.serviceWorker.register('service-worker.js');