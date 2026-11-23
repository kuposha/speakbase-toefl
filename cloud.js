// Public project configuration; access is enforced by Supabase Auth and RLS.
const cloud = supabase.createClient('https://arkxkmeqrmtgzkbomdmd.supabase.co','sb_publishable_FVDwXlJF5EPTd0KHMTiHRA_pH9L_ATN');
let cloudUser=null, queue=Promise.resolve(), timer;
const gate=document.createElement('div');gate.className='auth-gate';
gate.innerHTML='<form class="panel stack"><h1>Speakbase</h1><p>Вход в личную студию TOEFL</p><label>Email<input name="email" type="email" autocomplete="username" required></label><label>Пароль<input name="password" type="password" autocomplete="current-password" required></label><button class="primary">Войти</button><p role="status" id="authStatus"></p></form>';
document.body.append(gate);
const authStatus=t=>gate.querySelector('#authStatus').textContent=t;
const accountKey=id=>`speakbase.account.${id}`;
function syncNow(){if(!cloudUser)return Promise.resolve();const id=cloudUser.id,state=JSON.parse(JSON.stringify(db));queue=queue.catch(()=>{}).then(async()=>{const {error}=await cloud.from('learning_progress').upsert({user_id:id,state,updated_at:new Date().toISOString()});if(error)throw error;});return queue;}
persist=function(){if(cloudUser){localStorage.setItem(accountKey(cloudUser.id),JSON.stringify(db));clearTimeout(timer);timer=setTimeout(()=>syncNow().catch(e=>{document.querySelector('#profileSelect').title='Ошибка синхронизации: '+e.message}),600);}};
async function enter(user){
 const profiles={'gyrina.mi@gmail.com':'marina','vladlenkabakov@gmail.com':'vladlen'};
 const profile=profiles[user.email.toLowerCase()];
 if(!profile)throw Error('This account is not assigned a study profile.');
 const {data,error}=await cloud.from('learning_progress').select('state').eq('user_id',user.id).maybeSingle();
 if(error)throw error;
 const defaults={h:[],plans:{},topics:[],materials:[],tests:[],draft:null,exam:null};
 activeProfile=profile;
 db=Object.assign(defaults,data?.state||JSON.parse(localStorage.getItem(accountKey(user.id))||'{}'));
 cloudUser=user;
 localStorage.setItem(accountKey(user.id),JSON.stringify(db));
 render();gate.remove();document.querySelector('main').inert=false;document.querySelector('aside').inert=false;
 if(!data)await syncNow();
}
switcher=function(){modal('<h2>Личный аккаунт</h2><p>'+esc(cloudUser?.email||'')+'</p><button class="primary" onclick="logoutCloud()">Выйти / сменить аккаунт</button>');};
async function logoutCloud(){try{clearTimeout(timer);await syncNow();await cloud.auth.signOut();location.reload();}catch(e){alert('Не удалось сохранить прогресс: '+e.message);}}
gate.querySelector('form').onsubmit=async e=>{e.preventDefault();const f=e.target;authStatus('Подключение…');try{const {data,error}=await cloud.auth.signInWithPassword({email:f.email.value.trim(),password:f.password.value});if(error)throw error;await enter(data.user);}catch(e){authStatus(e.message);}};
cloud.auth.getSession().then(({data})=>{if(data.session)enter(data.session.user).catch(e=>authStatus(e.message));});
