const IMG = [
'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80',
'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=80',
'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=80',
'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=700&q=80',
'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80',
'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80',
'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80',
'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
];
const womenTypes=['Tops','Dresses','Jeans','Co-ord Sets','T-Shirts','Kurtis','Jackets','Hoodies','Shorts','Ethnic Wear','Bodycon Dresses','Floral Dresses','Party Wear','Shirts','Crop Tops','Oversized Tees','Tube Tops','Halter Tops','One-Shoulder Tops','Peplum Tops','Ribbed Tops','Corset Tops','Tank Tops','Camisoles','Blouses','Wrap Dresses','Maxi Dresses','Midi Dresses','Mini Dresses','A-Line Dresses','Slip Dresses','Shirt Dresses','Tiered Dresses','Kaftan Dresses','Jumpsuits','Rompers','Palazzo Pants','Cargo Pants','Wide-Leg Pants','Straight Pants','Joggers','Leggings','Skorts','Denim Shorts','Biker Shorts','Mini Skirts','Midi Skirts','Pleated Skirts','Bodycon Skirts','Shrugs','Blazers','Trench Coats','Puffer Jackets','Denim Jackets','Cardigans','Sweaters','Sweatshirts','Track Jackets','Anarkali','Lehenga Choli','Sharara Sets','Gharara Sets','Kurta Sets','Palazzo Sets','Festive Wear','Wedding Wear','Bridal Wear','Indo-Western','Printed Kurtas','Straight Kurtas','A-Line Kurtas','Chikankari Kurtas','Embroidered Kurtas','Cotton Kurtas','Ready-to-Wear Sarees','Draped Skirts','Y2K Tops','Y2K Dresses','Korean Fashion','Streetwear','Quiet Luxury','Office Wear','Vacation Wear','Beachwear','Resort Wear','Date-Night Wear','Lounge Sets','Sleepwear','Activewear','Gym Wear','Yoga Wear','Plus Size Dresses','Plus Size Tops','Petite Dresses','Tall Fit Jeans','Scarves','Stoles','Capes','Matching Sets'];
const sareeTypes=['Banarasi Silk Saree','Kanjivaram Silk Saree','Chanderi Silk Saree','Chiffon Saree','Georgette Saree','Organza Saree','Cotton Saree','Linen Saree','Tissue Saree','Crepe Saree','Satin Saree','Net Saree','Printed Saree','Floral Saree','Embroidered Saree','Sequined Party Saree','Ready-to-Wear Saree','Pre-Stitched Saree','Ruffle Saree','Belted Saree','Designer Saree','Festive Saree','Wedding Saree','Reception Saree','Office Wear Saree','Daily Wear Saree','Pastel Saree','Ombre Saree','Ajrakh Saree','Block Print Saree','Ikat Saree','Bandhani Saree','Kalamkari Saree','Paithani Style Saree','Maheshwari Saree','Tussar Silk Saree','Bhagalpuri Silk Saree','Mysore Silk Saree','Mulmul Cotton Saree','Handloom Saree'];
const menTypes=['Shirts','T-Shirts','Jeans','Hoodies','Jackets','Polo Shirts','Cargo Pants','Shorts','Sweatshirts','Kurtas','Blazers','Chinos','Joggers','Track Pants','Oversized Tees','Formal Trousers','Denim Jackets','Bomber Jackets','Linen Shirts','Ethnic Sets'];
const boysTypes=['T-Shirts','Shirts','Jeans','Shorts','Hoodies','Joggers','Jackets','Ethnic Wear','Cargo Pants','Sweatshirts','School Shirts','Party Wear','Tracksuits','Kurtas','Dresses','Co-ord Sets'];
const shoeTypes=['Sneakers','Sandals','Slippers','Sports Shoes','Casual Shoes','Heels','Flats','Loafers','Running Shoes','Boots','Mules','Wedges','Slides','Canvas Shoes','Formal Shoes','Ballet Flats','Platform Heels','Training Shoes'];
const colors=['Pink','Black','Blue','Green','White','Purple','Beige','Red','Maroon','Yellow','Teal','Ivory'];
let products=[]; let id=1;
function addBatch(category,types,count,label,baseExtra=0){for(let i=0;i<count;i++){const type=types[i%types.length];const base=699+(i%18)*125+baseExtra;const old=Math.round(base*(1.35+(i%5)*0.05));products.push({id:id++,name:`${label} ${type} ${String(i+1).padStart(4,'0')}`,category,type,price:base,oldPrice:old,discount:Math.max(5,Math.round((1-base/old)*100)),rating:(4.1+(i%9)/10).toFixed(1),reviews:120+(i%97)*23,size:['S','M','L','XL'][i%4],color:colors[i%colors.length],image:IMG[i%IMG.length],new:i<30});}}
addBatch('Women',womenTypes,10000,'Girls Trend');
addBatch('Sarees',sareeTypes,2000,'Saree Edit',250);
addBatch('Men',menTypes,2000,'Men Style',150);
addBatch('Boys',boysTypes,10000,'Boys Style',0);
addBatch('Shoes',shoeTypes,2000,'Shoe Studio',400);
const collectionRules=[
  ['Saree Collection',p=>p.category==='Sarees'],
  ['Wedding & Bridal',p=>/Wedding|Bridal|Reception/i.test(p.type+' '+p.name)],
  ['Lehenga & Festive',p=>/Lehenga|Party Wear|Festive|Sharara|Gharara|Gown/i.test(p.type+' '+p.name)],
  ['Kurtis & Kurta Sets',p=>/Kurtis|Kurta|Anarkali|Chikankari|Ethnic Wear|Ethnic Sets/i.test(p.type+' '+p.name)],
  ['Floral Edit',p=>/Floral|Printed/i.test(p.type+' '+p.name)],
  ['Co-ord Central',p=>/Co-ord|Matching Sets|Lounge Sets/i.test(p.type+' '+p.name)],
  ['Party Glam',p=>/Party|Sequined|Bodycon|Corset|Tube|Halter|One-Shoulder/i.test(p.type+' '+p.name)],
  ['Office Chic',p=>/Office|Formal|Blazer|Shirt|Straight Pants|Trousers/i.test(p.type+' '+p.name)],
  ['Daily Wear',p=>/Daily|Cotton|T-Shirt|Tops|Jeans|Casual/i.test(p.type+' '+p.name)],
  ['Vacation & Resort',p=>/Vacation|Beachwear|Resort|Rompers|Maxi/i.test(p.type+' '+p.name)],
  ['Girls Mega Collection',p=>p.category==='Women'],
  ['Boys Mega Collection',p=>p.category==='Boys'],
  ['Women Western',p=>p.category==='Women' && /Dress|Tops|Jeans|Jumpsuit|Skirt|Pants|Leggings|Shrugs|Jackets/i.test(p.type)],
  ['Women Night & Lounge',p=>p.category==='Women' && /Night|Lounge|Sleep/i.test(p.type)],
  ['Plus Size Edit',p=>p.category==='Women' && /Plus Size/i.test(p.type)],
  ['Denim & Cargo',p=>/Jeans|Denim|Cargo/i.test(p.type+' '+p.name)],
  ['Men Ethnic',p=>p.category==='Men' && /Kurta|Ethnic/i.test(p.type)],
  ['Men Western',p=>p.category==='Men' && !/Kurta|Ethnic/i.test(p.type)],
  ['Kids Girls',p=>p.category==='Boys' && /Dresses|Co-ord Sets|Party Wear/i.test(p.type+' '+p.name)],
  ['Kids Boys',p=>p.category==='Boys' && !/Dresses|Co-ord Sets|Party Wear/i.test(p.type+' '+p.name)],
  ['Kids Party',p=>p.category==='Boys' && /Party|Ethnic/i.test(p.type+' '+p.name)],
  ['Kids Casual',p=>p.category==='Boys' && /T-Shirts|Shirts|Shorts|Jeans|Joggers/i.test(p.type)],
  ['Sports & Active',p=>/Sports|Running|Training|Tracksuit|Gym|Active|Joggers/i.test(p.type+' '+p.name)],
  ['Sneakers & Casual Shoes',p=>p.category==='Shoes' && /Sneakers|Casual|Canvas|Slides/i.test(p.type)],
  ['Heels & Flats',p=>p.category==='Shoes' && /Heels|Flats|Mules|Wedges|Ballet/i.test(p.type)],
  ['Formal & Loafers',p=>p.category==='Shoes' && /Formal|Loafers|Boots/i.test(p.type)],
  ['Footwear Deals',p=>p.category==='Shoes' && p.price<=999],
  ['Under ₹799',p=>p.price<=799],
  ['Budget Finds',p=>p.price<=999],
  ['Premium Picks',p=>p.price>=1800],
  ['New Arrivals',p=>p.new===true],
  ['Trending Now',p=>p.id%7===0]
];
products.forEach(p=>{p.oldPrice=Math.max(2,p.oldPrice);p.price=Math.round(p.oldPrice/2);p.discount=50;const hit=collectionRules.find(([,fn])=>fn(p));p.collection=hit?hit[0]:(p.category+' Collection');});
if(typeof window!=='undefined') window.seedProducts=products;

if(typeof module!=='undefined') module.exports=products;
