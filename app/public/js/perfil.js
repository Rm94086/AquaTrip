// ─── Constantes de validação ───────────────────────────────────────────────
const RULES={
  firstName:{min:2,max:30,pattern:/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,label:'Nome'},
  lastName:{min:2,max:30,pattern:/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,label:'Sobrenome'},
  username:{min:3,max:20,pattern:/^[a-z0-9_\.]+$/,label:'Username'},
  bio:{max:160,label:'Bio'}
};
const IMG={maxBytes:5*1024*1024,types:['image/jpeg','image/png','image/webp','image/gif'],maxW:4000,maxH:4000};
const RESERVED=['admin','root','api','support','help','me','null','undefined','system'];

// ─── Utilitários ────────────────────────────────────────────────────────────
const $=id=>document.getElementById(id);
const show=(el,cls='show')=>el.classList.add(cls);
const hide=(el,cls='show')=>el.classList.remove(cls);

function setFieldState(input,errEl,ok,msg=''){
  input.classList.toggle('error',!ok&&msg!=='');
  input.classList.toggle('valid',ok);
  errEl.textContent=msg;
  errEl.classList.toggle('show',!ok&&msg!=='');
}

function toastMsg(msg,type='success'){
  const t=$('toast');
  t.textContent=msg;
  t.className='toast '+type;
  show(t);
  clearTimeout(t._tid);
  t._tid=setTimeout(()=>hide(t),3000);
}

// ─── Validação front-end ─────────────────────────────────────────────────────
function validateField(id){
  const el=$('field_'+id),input=$(id),errEl=$('err_'+id),v=input.value.trim();
  const r=RULES[id];
  if(!r)return true;
  if(!v&&id!=='bio'){setFieldState(input,errEl,false,`${r.label} é obrigatório.`);return false;}
  if(id==='bio'&&!v){setFieldState(input,errEl,true);return true;}
  if(v.length<(r.min||0)){setFieldState(input,errEl,false,`Mínimo ${r.min} caracteres.`);return false;}
  if(v.length>r.max){setFieldState(input,errEl,false,`Máximo ${r.max} caracteres.`);return false;}
  if(r.pattern&&!r.pattern.test(v)){
    const msgs={firstName:'Apenas letras e hífens.',lastName:'Apenas letras e hífens.',username:'Apenas letras minúsculas, números, _ e .'};
    setFieldState(input,errEl,false,msgs[id]||'Formato inválido.');return false;
  }
  if(id==='username'&&RESERVED.includes(v)){setFieldState(input,errEl,false,'Este username é reservado.');return false;}
  if(id==='username'&&v.startsWith('.')){setFieldState(input,errEl,false,'Não pode começar com ponto.');return false;}
  setFieldState(input,errEl,true);return true;
}

function validateImageFile(file){
  if(!file)return{ok:false,msg:'Nenhum arquivo selecionado.'};
  if(!IMG.types.includes(file.type))return{ok:false,msg:'Formato inválido. Use JPG, PNG, WebP ou GIF.'};
  if(file.size>IMG.maxBytes)return{ok:false,msg:`Arquivo muito grande. Máx. 5 MB (atual: ${(file.size/1024/1024).toFixed(1)} MB).`};
  return{ok:true};
}

function validateImageDimensions(file){
  return new Promise(res=>{
    const url=URL.createObjectURL(file),img=new Image();
    img.onload=()=>{
      URL.revokeObjectURL(url);
      if(img.width>IMG.maxW||img.height>IMG.maxH)res({ok:false,msg:`Imagem muito grande. Máx. ${IMG.maxW}×${IMG.maxH}px.`});
      else res({ok:true});
    };
    img.onerror=()=>{URL.revokeObjectURL(url);res({ok:false,msg:'Não foi possível ler a imagem.'});};
    img.src=url;
  });
}

// ─── Simulação back-end ──────────────────────────────────────────────────────
const TAKEN_USERNAMES=['joao123','maria_s','dev.brasil','tech_br','admin_user'];

async function backendValidate(data){
  await new Promise(r=>setTimeout(r,600)); // simula latência
  const errors={};
  // username único
  if(TAKEN_USERNAMES.includes(data.username.toLowerCase())){
    errors.username='Este username já está em uso.';
  }
  // bio: filtro de palavras proibidas (simulado)
  const banned=['spam','scam','phishing'];
  if(banned.some(w=>data.bio.toLowerCase().includes(w))){
    errors.bio='Bio contém conteúdo não permitido.';
  }
  // nome: não pode ser só números (simulado)
  if(/^\d+$/.test(data.firstName)){
    errors.firstName='Nome não pode conter apenas números.';
  }
  const ok=Object.keys(errors).length===0;
  return{ok,errors};
}

// ─── Upload de foto ──────────────────────────────────────────────────────────
async function handleUpload(e){
  const file=e.target.files[0];
  const fileErrEl=$('fileError');
  hide(fileErrEl);
  if(!file)return;

  const basic=validateImageFile(file);
  if(!basic.ok){fileErrEl.textContent=basic.msg;show(fileErrEl);$('fileInput').value='';return;}

  const dim=await validateImageDimensions(file);
  if(!dim.ok){fileErrEl.textContent=dim.msg;show(fileErrEl);$('fileInput').value='';return;}

  const reader=new FileReader();
  reader.onload=ev=>{
    const img=$('avatarImg');
    img.src=ev.target.result;
    img.style.display='block';
    $('avatarPlaceholder').style.display='none';
    $('fileInfo').textContent=`${file.name} (${(file.size/1024).toFixed(0)} KB)`;
  };
  reader.readAsDataURL(file);
}

// ─── Preview em tempo real ───────────────────────────────────────────────────
function updatePreview(){
  const first=$('firstName').value.trim(),last=$('lastName').value.trim(),user=$('username').value.trim();
  $('previewName').textContent=[first,last].filter(Boolean).join(' ')||'Seu Nome';
  $('previewUsername').textContent=user?'@'+user:'@username';
  const initial=first?first[0].toUpperCase():last?last[0].toUpperCase():'?';
  $('avatarInitial').textContent=initial;
}

function updateCharCount(){
  const len=$('bio').value.length,el=$('charCount');
  el.textContent=len;
  el.className='char-count'+(len>=150?' near':'')+(len>=160?' full':'');
}

// ─── Submit ──────────────────────────────────────────────────────────────────
async function saveProfile(){
  hide($('serverError'));
  // 1. Validação front-end
  const valid=['firstName','lastName','username','bio'].map(validateField).every(Boolean);
  if(!valid){toastMsg('Corrija os erros antes de salvar.','error');return;}

  // 2. Chama back-end simulado
  const btn=$('btnSave');
  btn.disabled=true;btn.classList.add('loading');
  btn.innerHTML='<span class="spinner"></span>Salvando...';

  const payload={
    firstName:$('firstName').value.trim(),
    lastName:$('lastName').value.trim(),
    username:$('username').value.trim(),
    bio:$('bio').value.trim()
  };

  const result=await backendValidate(payload);

  btn.disabled=false;btn.classList.remove('loading');
  btn.innerHTML='Salvar perfil';

  if(!result.ok){
    // Mostra erros do servidor nos campos corretos
    for(const[id,msg] of Object.entries(result.errors)){
      const input=$(id),errEl=$('err_'+id);
      if(input&&errEl)setFieldState(input,errEl,false,'[Servidor] '+msg);
    }
    $('serverError').textContent='O servidor retornou erros. Verifique os campos destacados.';
    show($('serverError'));
    toastMsg('Erro ao salvar perfil.','error');
    return;
  }

  toastMsg('Perfil salvo com sucesso!','success');
}

function resetForm(){
  ['firstName','lastName','username','bio'].forEach(id=>{
    const el=$(id),err=$('err_'+id);
    el.value='';
    el.classList.remove('error','valid');
    if(err){err.textContent='';hide(err);}
  });
  $('avatarImg').style.display='none';
  $('avatarPlaceholder').style.display='flex';
  $('avatarInitial').textContent='?';
  $('previewName').textContent='Seu Nome';
  $('previewUsername').textContent='@username';
  $('charCount').textContent='0';
  $('charCount').className='char-count';
  $('fileInput').value='';
  $('fileInfo').textContent='JPG, PNG, WebP ou GIF — máx. 5 MB';
  hide($('fileError'));
  hide($('serverError'));
}

// ─── Eventos ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  ['firstName','lastName','username'].forEach(id=>{
    $(id).addEventListener('input',()=>{validateField(id);updatePreview();});
    $(id).addEventListener('blur',()=>validateField(id));
  });
  $('bio').addEventListener('input',()=>{updateCharCount();validateField('bio');});
  $('bio').addEventListener('blur',()=>validateField('bio'));
  $('fileInput').addEventListener('change',handleUpload);
});
