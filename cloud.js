const cloud = supabase.createClient('https://arkxkmeqrmtgzkbomdmd.supabase.co','sb_publishable_FVDwXlJF5EPTd0KHMTiHRA_pH9L_ATN');
const accountKey=id=>'speakbase.account.'+id;
const stampKey=id=>accountKey(id)+'.base';
const dirtyKey=id=>accountKey(id)+'.pending';
const uploadKey=id=>accountKey(id)+'.uploads';
const emptyState=()=>({h:[],plans:{},topics:[],materials:[],tests:[],draft:null,exam:null});
let cloudUser=null, queue=Promise.resolve(), pullQueue=Promise.resolve(), timer, recovery=location.hash.includes('type=recovery'), conflict=false;
const gate=document.createElement('div');
gate.className='auth-gate';
document.body.append(gate);
const syncLabel=document.createElement('small');
syncLabel.setAttribute('role','status');
document.querySelector('#profileSelect').before(syncLabel);
function status(message){syncLabel.textContent=message}
function lock(){document.querySelector('main').inert=true;document.querySelector('aside').inert=true;document.body.append(gate)}
function form(recover=false){
 lock();
 gate.innerHTML='<form class="panel stack"><h1>Speakbase</h1><p>'+(recover?'Создай новый пароль для личного аккаунта.':'Вход в личную студию TOEFL')+'</p>'+
 (recover?'':'<label>Email<input name="email" type="email" autocomplete="username" required></label>')+
 '<label>Пароль<input name="password" type="password" autocomplete="'+(recover?'new-password':'current-password')+'" '+(recover?'minlength="8"':'')+' required></label><button class="primary">'+(recover?'Сохранить новый пароль':'Войти')+'</button>'+
 (recover?'':'<button type="button" id="resetPassword">Восстановить пароль</button>')+
 '<p role="status" id="authStatus"></p></form>';
 const f=gate.querySelector('form');
 const hint=t=>gate.querySelector('#authStatus').textContent=t;
 if(!recover)gate.querySelector('#resetPassword').onclick=async()=>{
  if(!f.elements.email.reportValidity())return;
  try{
   const {error}=await cloud.auth.resetPasswordForEmail(f.elements.email.value.trim(),{redirectTo:location.origin+location.pathname});
   if(error)throw error;
   hint('Если аккаунт зарегистрирован, на почту придёт ссылка для восстановления.');
  }catch(error){hint(error.message)}
 };
 f.onsubmit=async event=>{
  event.preventDefault();
  const submit=f.querySelector('.primary'); submit.disabled=true; hint('Подключение…');
  try{
   if(recover){
    const {data,error}=await cloud.auth.updateUser({password:f.elements.password.value});
    if(error)throw error;
    recovery=false;await enter(data.user);
   }else{
    const {data,error}=await cloud.auth.signInWithPassword({email:f.elements.email.value.trim(),password:f.elements.password.value});
    if(error)throw error;
    await enter(data.user);
   }
  }catch(error){hint(error.message)}finally{submit.disabled=false}
 };
}
const local=localStorage;
function cached(id){return Object.assign(emptyState(),JSON.parse(local.getItem(accountKey(id))||'{}'))}
async function remoteState(id){
 const {data,error}=await cloud.from('learning_progress').select('state,updated_at').eq('user_id',id).maybeSingle();
 if(error)throw error;
 return data;
}
function adopt(id,row){
 db=Object.assign(emptyState(),row?.state||{});
 local.setItem(accountKey(id),JSON.stringify(db));
 if(row)local.setItem(stampKey(id),row.updated_at);else local.removeItem(stampKey(id));
 local.removeItem(dirtyKey(id));conflict=false;
}
async function saveChanges(id){
 if(cloudUser?.id!==id||!local.getItem(dirtyKey(id))||conflict)return;
 const snapshot=local.getItem(accountKey(id)), previous=local.getItem(stampKey(id));
 const next=new Date(Math.max(Date.now(),(Date.parse(previous)||0)+1)).toISOString();
 const entry={state:JSON.parse(snapshot),updated_at:next};
 const table=cloud.from('learning_progress');
 const result=previous?await table.update(entry).eq('user_id',id).eq('updated_at',previous).select('updated_at').maybeSingle():
 await table.insert({...entry,user_id:id}).select('updated_at').single();
 if(cloudUser?.id!==id)return;
 if(result.error&&result.error.code!=='23505')throw result.error;
 if(!result.data||result.error){
  conflict=true;status('Изменения на двух устройствах · открой меню профиля');return;
 }
 local.setItem(stampKey(id),result.data.updated_at);
 if(local.getItem(accountKey(id))===snapshot)local.removeItem(dirtyKey(id));
 status('Сохранено');
}
function syncNow(){
 const id=cloudUser?.id;
 queue=queue.catch(()=>{}).then(()=>id&&saveChanges(id));
 return queue;
}
function syncFailure(){status('Сохранено на устройстве · ожидается синхронизация')}
persist=function(){
 if(!cloudUser)return;
 const id=cloudUser.id;
 local.setItem(accountKey(id),JSON.stringify(db));local.setItem(dirtyKey(id),'1');
 if(conflict)return;
 status('Сохранение…');clearTimeout(timer);timer=setTimeout(()=>syncNow().catch(syncFailure),350);
};
async function enter(user){
 const {data:identity,error}=await cloud.auth.getUser();if(error)throw error;
 if(identity.user.id!==user.id)throw Error('Сессия изменилась. Войди ещё раз.');
 const profile=identity.user.app_metadata?.speakbase_profile;
 if(!['marina','vladlen'].includes(profile))throw Error('Для этого аккаунта не назначен учебный профиль.');
 const id=user.id,row=await remoteState(id);
 activeProfile=profile;conflict=false;
 if(local.getItem(dirtyKey(id))||(!row&&local.getItem(accountKey(id))))db=cached(id);
 else adopt(id,row);
 cloudUser=user;render();gate.remove();document.querySelector('main').inert=false;document.querySelector('aside').inert=false;
 if(!row||local.getItem(dirtyKey(id)))persist();else status('Сохранено');
 retryUploads().catch(syncFailure);
}
async function pull(){
 const id=cloudUser?.id;if(!id)return;
 await syncNow(); if(local.getItem(dirtyKey(id))||document.querySelector('dialog[open]'))return;
 const row=await remoteState(id);
 if(row&&id===cloudUser?.id&&!local.getItem(dirtyKey(id))&&!document.querySelector('dialog[open]')&&row.updated_at!==local.getItem(stampKey(id))){
  adopt(id,row);render();status('Обновлено с другого устройства');
 }
 await retryUploads();
}
function refresh(){pullQueue=pullQueue.catch(()=>{}).then(pull).catch(syncFailure)}
window.addEventListener('online',refresh); window.addEventListener('focus',refresh);
setInterval(()=>{if(document.visibilityState==='visible')refresh()},30000);
switcher=function(){
 modal('<h2>Личный аккаунт</h2><p>'+esc(cloudUser?.email||'')+'</p>'+(conflict?'<p>На двух устройствах сохранены разные изменения. Скачай местный прогресс перед загрузкой облачной версии.</p><button id="resolveConflict">Скачать местную копию и загрузить облачную</button>':'')+'<button class="primary" onclick="logoutCloud()">Выйти / сменить аккаунт</button>');
 const resolve=document.querySelector('#resolveConflict');
 if(resolve)resolve.onclick=async()=>{
  const id=cloudUser.id;
  try{
   const row=await remoteState(id);
   const blob=new Blob([local.getItem(accountKey(id))],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='speakbase-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
   local.setItem(accountKey(id)+'.conflict.'+Date.now(),local.getItem(accountKey(id)));
   adopt(id,row);closeModal();render();status('Загружено из облака');
  }catch(error){status(error.message)}
 };
};
async function logoutCloud(){
 try{
  clearTimeout(timer);await syncNow().catch(syncFailure);const {error}=await cloud.auth.signOut({scope:'local'});if(error)throw error;
  location.reload();
 }catch(error){alert('Ошибка выхода: '+error.message)}
}
form(recovery);
cloud.auth.onAuthStateChange((event,session)=>{
 if(event==='PASSWORD_RECOVERY'){recovery=true;form(true)}
 if(event==='SIGNED_OUT'&&cloudUser){cloudUser=null;location.reload()}
 if(event==='SIGNED_IN'&&cloudUser&&session?.user.id!==cloudUser.id)location.reload();
});
cloud.auth.getSession().then(({data,error})=>{
 if(error)throw error;
 if(data.session&&!recovery)return enter(data.session.user);
}).catch(error=>gate.querySelector('#authStatus').textContent=error.message);

const saveLocalBlob=blobPut,loadLocalBlob=blobGet;
function uploads(id){return JSON.parse(local.getItem(uploadKey(id))||'[]')}
let uploading=null;
async function uploadPending(id){
 for(const key of uploads(id)){
  if(cloudUser?.id!==id)return;
  const path=id+'/'+key,blob=await loadLocalBlob(path);
  if(!blob)throw Error('Локальный файл недоступен');
  const {error}=await cloud.storage.from('user-files').upload(path,blob,{upsert:true});
  if(error)throw error;
  local.setItem(uploadKey(id),JSON.stringify(uploads(id).filter(k=>k!==key)));
 }
}
function retryUploads(){
 if(!cloudUser)return Promise.resolve();
 if(!uploading)uploading=uploadPending(cloudUser.id).finally(()=>{uploading=null});
 return uploading;
}
blobPut=async function(key,blob){
 if(!cloudUser)throw Error('Требуется вход');
 const id=cloudUser.id;
 await saveLocalBlob(id+'/'+key,blob);
 local.setItem(uploadKey(id),JSON.stringify([...new Set([...uploads(id),key])]));
 await retryUploads().catch(syncFailure);
};
blobGet=async function(key){
 if(!cloudUser)return;
 const path=cloudUser.id+'/'+key,cachedBlob=await loadLocalBlob(path);
 if(cachedBlob)return cachedBlob;
 const {data,error}=await cloud.storage.from('user-files').download(path);
 if(error){status('Файл пока недоступен на этом устройстве');return}
 await saveLocalBlob(path,data);
 return data;
};
