(async ()=>{
  const fetch = global.fetch || require('node-fetch');
  const base = 'http://localhost:5000';
  try {
    console.log('Registering test user...');
    let res = await fetch(base + '/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName:'Loan User',email:'loanuser+1@example.com',password:'Password123!'})});
    const reg = await res.json();
    console.log('register:', reg);
    const userToken = reg.token;
    const userId = reg.data && reg.data.id;

    console.log('Creating loan transaction...');
    res = await fetch(base + '/api/transactions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer ' + userToken},body:JSON.stringify({type:'loan',loanAmount:500,amount:500,transactionId:'LOANTEST'+Date.now(),timestamp:new Date(),currency:'USD'})});
    const tx = await res.json();
    console.log('transaction create:', tx);
    const txId = tx.data && (tx.data._id || tx.data.id || tx.data.transactionId);

    console.log('Creating admin user...');
    res = await fetch(base + '/api/dev/create-admin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'admin+dev@example.com',password:'AdminPass123!',name:'DevAdmin'})});
    const adm = await res.json();
    console.log('create-admin:', adm);
    const adminToken = adm.token;

    console.log('Approving transaction as admin...');
    const idToUse = tx.data && (tx.data._id || tx.data.transactionId);
    res = await fetch(base + '/api/transactions/' + idToUse + '/status',{method:'PATCH',headers:{'Content-Type':'application/json','Authorization':'Bearer ' + adminToken},body:JSON.stringify({status:'Completed'})});
    const approveRes = await res.json();
    console.log('approve response:', approveRes);

    // Fetch transactions for user as admin for verification
    res = await fetch(base + '/api/transactions?userId=' + userId, {headers:{'Authorization':'Bearer ' + adminToken}});
    const list = await res.json();
    console.log('transactions for user (admin view):', JSON.stringify(list, null, 2));

  } catch (e){
    console.error('flow error', e);
  }
})();
