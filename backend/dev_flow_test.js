(async ()=>{
  const fetch = global.fetch || require('node-fetch');
  const base = 'http://localhost:5000';
  try {
    console.log('Registering test user...');
    let res = await fetch(base + '/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName:'Test User',email:'testuser+1@example.com',password:'Password123!'})});
    const reg = await res.json();
    console.log('register:', reg);
    const userToken = reg.token;
    const userId = reg.data && reg.data.id;

    console.log('Creating transaction...');
    res = await fetch(base + '/api/transactions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer ' + userToken},body:JSON.stringify({type:'deposit',amount:12.34,transactionId:'DEVTEST'+Date.now(),timestamp:new Date(),currency:'USD'})});
    const tx = await res.json();
    console.log('transaction create:', tx);
    const txId = tx.data && (tx.data._id || tx.data.id || tx.data.transactionId);

    console.log('Creating admin user...');
    res = await fetch(base + '/api/dev/create-admin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'admin+dev@example.com',password:'AdminPass123!',name:'DevAdmin'})});
    const adm = await res.json();
    console.log('create-admin:', adm);
    const adminToken = adm.token;

    console.log('Approving transaction as admin...');
    // find id: use tx.data._id if present, else transactionId
    const idToUse = tx.data && (tx.data._id || tx.data.transactionId);
    res = await fetch(base + '/api/transactions/' + idToUse + '/status',{method:'PATCH',headers:{'Content-Type':'application/json','Authorization':'Bearer ' + adminToken},body:JSON.stringify({status:'Completed'})});
    const approveRes = await res.json();
    console.log('approve response:', approveRes);
  } catch (e){
    console.error('flow error', e);
  }
})();
