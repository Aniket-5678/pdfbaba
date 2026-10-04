import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import assert from 'node:assert/strict';
import net from 'node:net';
const reservation=net.createServer();
await new Promise(resolve=>reservation.listen(0,'127.0.0.1',resolve));
const port=reservation.address().port;
await new Promise(resolve=>reservation.close(resolve));
const child=spawn(process.execPath,['index.js'],{env:{...process.env,PORT:String(port),HOST:'127.0.0.1',DOTENV_CONFIG_PATH:'.env.example',MONGODB_URI:'mongodb://127.0.0.1:1/ci?serverSelectionTimeoutMS=1000',JWT_SECRET:'ci-only',EMAIL_USER:'ci@example.invalid',EMAIL_PASS:'ci-only',RAZORPAY_KEY_ID:'rzp_test_ci',RAZORPAY_KEY_SECRET:'ci-only'},stdio:['ignore','pipe','pipe']});
let output='';child.stdout.on('data',chunk=>output+=chunk);child.stderr.on('data',chunk=>output+=chunk);
try{
 let ready=false;
 for(let i=0;i<50;i++){try{const response=await fetch('http://127.0.0.1:'+port+'/healthz');if(response.status===503){ready=true;break;}}catch{}await delay(200);}
 assert.ok(ready,'Backend failed to start: '+output);
 for(const route of ['/api/notes','/api/v1/questionpaper/create-question','/api/v1/category/get-category','/uploads/pdfs/example.pdf']){
  const response=await fetch('http://127.0.0.1:'+port+route,{method:route.includes('create-question')?'POST':'GET'});
  assert.equal(response.status,410,'Removed endpoint still available: '+route);
 }
 assert.equal((await fetch('http://127.0.0.1:'+port+'/api/unknown')).status,404);
 console.log('Backend removal smoke checks passed.');
}finally{child.kill();await new Promise(resolve=>{if(child.exitCode!==null)return resolve();child.once('exit',resolve);});}
