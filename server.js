const express=require('express');
const fs=require('fs'); const path=require('path'); const crypto=require('crypto');
const mongoose=require('mongoose');
const app=express(); const PORT=process.env.PORT||3000;
const ADMIN_KEY=process.env.ADMIN_KEY||'change-this-admin-key';
const DATA=path.join(__dirname,'data');
const files={orders:path.join(DATA,'orders.json'),products:path.join(DATA,'products.json'),users:path.join(DATA,'users.json'),sessions:path.join(DATA,'sessions.json')};
if(!fs.existsSync(DATA)) fs.mkdirSync(DATA,{recursive:true});
for(const [k,f] of Object.entries(files)) if(!fs.existsSync(f)) fs.writeFileSync(f,k==='products'?JSON.stringify(require('./products'),null,2):'[]');
app.use(express.json({limit:'1mb'})); app.use(express.static(__dirname));
const read=f=>JSON.parse(fs.readFileSync(f,'utf8')); const write=(f,d)=>fs.writeFileSync(f,JSON.stringify(d,null,2));
const hash=p=>crypto.scryptSync(p,'stylenest-salt',64).toString('hex');
const token=()=>crypto.randomBytes(32).toString('hex');
const productSchema=new mongoose.Schema({id:{type:Number,unique:true},name:String,category:String,type:String,price:Number,oldPrice:Number,discount:Number,rating:String,reviews:Number,size:String,color:String,image:String,new:Boolean},{timestamps:true});
const Product=mongoose.model('Product',productSchema); let mongoReady=false;
async function connectMongo(){if(!process.env.MONGODB_URI)return;try{await mongoose.connect(process.env.MONGODB_URI);mongoReady=true;if(!(await Product.countDocuments()))await Product.insertMany(read(files.products),{ordered:false});console.log('MongoDB connected')}catch(e){console.error('MongoDB unavailable; JSON fallback:',e.message);mongoReady=false}}
connectMongo();
function admin(req,res,next){if(req.get('x-admin-key')!==ADMIN_KEY)return res.status(401).json({error:'Invalid admin key'});next()}
function auth(req,res,next){const t=req.get('authorization')?.replace('Bearer ','');const s=t&&read(files.sessions).find(x=>x.token===t);if(!s)return res.status(401).json({error:'Login required'});req.user=read(files.users).find(x=>x.id===s.userId);if(!req.user)return res.status(401).json({error:'Session expired'});next()}
function normalizeProduct(b,id){return{id:Number(id),name:String(b.name||'').trim(),category:String(b.category||'Women'),type:String(b.type||'Dresses'),price:Number(b.price),oldPrice:Number(b.oldPrice||b.price),discount:Number(b.discount||0),rating:String(b.rating||'4.5'),reviews:Number(b.reviews||0),size:String(b.size||'S,M,L,XL'),color:String(b.color||'Black'),image:String(b.image||''),new:Boolean(b.new)}}
app.get('/api/health',(q,r)=>r.json({ok:true,store:'StyleNest',cod:false,payment:'UPI',database:mongoReady?'MongoDB':'JSON fallback'}));
app.get('/api/products',async(q,r)=>r.json(mongoReady?await Product.find().sort({id:1}).lean():read(files.products)));
app.post('/api/products',admin,async(q,r)=>{const max=mongoReady?((await Product.findOne().sort({id:-1}).lean())?.id||0):Math.max(0,...read(files.products).map(p=>p.id));const p=normalizeProduct(q.body,max+1);if(!p.name||!p.price||!p.image)return r.status(400).json({error:'name, price and image are required'});if(mongoReady)await new Product(p).save();else{const a=read(files.products);a.push(p);write(files.products,a)}r.status(201).json(p)});
app.delete('/api/products/:id',admin,async(q,r)=>{const id=Number(q.params.id);if(mongoReady)await Product.deleteOne({id});else write(files.products,read(files.products).filter(p=>p.id!==id));r.json({ok:true})});
app.post('/api/auth/register',(q,r)=>{const {name,email,password}=q.body||{};if(!name||!email||!password||password.length<6)return r.status(400).json({error:'Name, email and 6+ character password required'});const users=read(files.users);if(users.some(u=>u.email===email.toLowerCase()))return r.status(409).json({error:'Email already registered'});const u={id:crypto.randomUUID(),name:String(name).trim(),email:email.toLowerCase().trim(),passwordHash:hash(password),createdAt:new Date().toISOString()};users.push(u);write(files.users,users);const t=token();const ss=read(files.sessions);ss.push({token:t,userId:u.id,createdAt:new Date().toISOString()});write(files.sessions,ss);r.status(201).json({token:t,user:{id:u.id,name:u.name,email:u.email}})});
app.post('/api/auth/login',(q,r)=>{const {email,password}=q.body||{};const u=read(files.users).find(x=>x.email===String(email||'').toLowerCase().trim()&&x.passwordHash===hash(String(password||'')));if(!u)return r.status(401).json({error:'Invalid email or password'});const t=token();const ss=read(files.sessions);ss.push({token:t,userId:u.id,createdAt:new Date().toISOString()});write(files.sessions,ss);r.json({token:t,user:{id:u.id,name:u.name,email:u.email}})});
app.get('/api/auth/me',auth,(q,r)=>r.json({id:q.user.id,name:q.user.name,email:q.user.email}));
app.post('/api/auth/logout',auth,(q,r)=>{const t=q.get('authorization').replace('Bearer ','');write(files.sessions,read(files.sessions).filter(x=>x.token!==t));r.json({ok:true})});
app.post('/api/orders',auth,(q,r)=>{const {customer,items,total,paymentMethod}=q.body||{};if(!customer?.name||!customer?.phone||!customer?.address||!customer?.city||!customer?.pincode||!Array.isArray(items)||!items.length||!total)return r.status(400).json({error:'Missing order details'});if(paymentMethod!=='UPI')return r.status(400).json({error:'Only UPI payment is enabled'});const orders=read(files.orders);const order={id:'SN'+Date.now().toString().slice(-8),createdAt:new Date().toISOString(),status:'Payment verification pending',paymentStatus:'Submitted for verification',paymentMethod:'UPI',customer,userId:q.user.id,items,total};orders.push(order);write(files.orders,orders);r.status(201).json(order)});
app.get('/api/orders/:id',auth,(q,r)=>{const o=read(files.orders).find(x=>x.id===q.params.id&&x.userId===q.user.id);o?r.json(o):r.status(404).json({error:'Order not found'})});
app.get('/api/orders',auth,(q,r)=>r.json(read(files.orders).filter(x=>x.userId===q.user.id).reverse()));
app.get('/api/admin/orders',admin,(q,r)=>r.json(read(files.orders).reverse()));
app.patch('/api/admin/orders/:id',admin,(q,r)=>{const allowed=['Payment verification pending','Payment verified','Processing','Shipped','Out for delivery','Delivered','Cancelled'];const {status,paymentStatus}=q.body||{};const a=read(files.orders);const i=a.findIndex(x=>x.id===q.params.id);if(i<0)return r.status(404).json({error:'Order not found'});if(status&&!allowed.includes(status))return r.status(400).json({error:'Invalid status'});if(status)a[i].status=status;if(paymentStatus)a[i].paymentStatus=paymentStatus;write(files.orders,a);r.json(a[i])});
app.listen(PORT,()=>console.log(`StyleNest running on http://localhost:${PORT}`));
