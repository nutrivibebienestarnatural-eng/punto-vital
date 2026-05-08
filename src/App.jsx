import { useState, useRef, useMemo, lazy, Suspense } from "react";
import { PRODUCTS, KITS_ROTACION, WHATSAPP, ADMIN_PASS } from "./products";

const CATEGORIES = ["Todos",...[...new Set(PRODUCTS.map(p=>p.cat))].sort()];
function fmt(n){return "$ "+Math.round(n).toLocaleString("es-AR");}

const blue="#0071e3",darkBlue="#0055b3",lightBlue="#e8f0fe",gray="#86868b",lightGray="#f5f5f7",dark="#1d1d1f",white="#fff";
const S={
  app:{fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Helvetica,sans-serif",minHeight:"100vh",background:lightGray,color:dark},
  nav:{background:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #d2d2d7",position:"sticky",top:0,zIndex:200,height:52,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px"},
  logo:{fontWeight:700,fontSize:19,letterSpacing:-.5,color:dark,cursor:"pointer",display:"flex",alignItems:"center",gap:8},
  navLinks:{display:"flex",gap:20,alignItems:"center"},
  navLink:(a)=>({background:"none",border:"none",cursor:"pointer",fontSize:14,color:a?blue:gray,fontWeight:a?600:400,padding:0}),
  cartBadge:{background:blue,color:white,border:"none",borderRadius:20,padding:"6px 16px",cursor:"pointer",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:6},
  banner:{background:`linear-gradient(90deg,${blue},${darkBlue})`,color:white,textAlign:"center",padding:"10px 20px",fontSize:13,fontWeight:500},
  hero:{background:"linear-gradient(160deg,#0a0a0a 0%,#1a2a4a 60%,#0a1628 100%)",color:white,padding:"80px 24px 70px",textAlign:"center"},
  heroEye:{fontSize:12,letterSpacing:4,opacity:.6,textTransform:"uppercase",marginBottom:16},
  heroTitle:{fontSize:"clamp(2.4rem,6vw,4rem)",fontWeight:800,letterSpacing:-1.5,lineHeight:1.05,margin:"0 0 16px"},
  heroBlue:{color:"#60a5fa"},
  heroSub:{fontSize:"clamp(15px,2vw,18px)",opacity:.7,maxWidth:540,margin:"0 auto 32px",lineHeight:1.6},
  heroBtn:{background:blue,color:white,border:"none",borderRadius:24,padding:"13px 32px",cursor:"pointer",fontSize:16,fontWeight:600,marginRight:12},
  heroBtnOut:{background:"transparent",color:white,border:"1px solid rgba(255,255,255,0.3)",borderRadius:24,padding:"13px 28px",cursor:"pointer",fontSize:15,fontWeight:500},
  section:{maxWidth:1100,margin:"0 auto",padding:"48px 20px"},
  sectionTitle:{fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:700,letterSpacing:-.8,marginBottom:8},
  sectionSub:{color:gray,fontSize:15,marginBottom:36,lineHeight:1.5},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:18},
  card:{background:white,borderRadius:16,overflow:"hidden",cursor:"pointer",transition:"all .2s",boxShadow:"0 1px 6px rgba(0,0,0,0.06)"},
  cardImg:{width:"100%",height:180,background:lightBlue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:52},
  cardBody:{padding:"14px 16px 16px"},
  cardCat:{fontSize:11,color:blue,fontWeight:700,textTransform:"uppercase",letterSpacing:.8},
  cardName:{fontSize:15,fontWeight:600,margin:"3px 0 6px",lineHeight:1.3},
  cardPrice:{fontSize:18,fontWeight:800,color:dark},
  cardBtn:{background:blue,color:white,border:"none",borderRadius:12,padding:"9px 0",cursor:"pointer",fontSize:13,fontWeight:600,width:"100%",marginTop:10},
  filters:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24,alignItems:"center"},
  filterBtn:(a)=>({background:a?blue:white,color:a?white:gray,border:`1px solid ${a?blue:"#d2d2d7"}`,borderRadius:20,padding:"7px 16px",cursor:"pointer",fontSize:13,fontWeight:a?600:400}),
  searchBox:{flex:1,minWidth:200,border:"1px solid #d2d2d7",borderRadius:12,padding:"9px 14px",fontSize:14,outline:"none",fontFamily:"inherit"},
  overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:16},
  modal:{background:white,borderRadius:20,width:"100%",maxWidth:460,maxHeight:"92vh",overflowY:"auto",padding:24,boxShadow:"0 24px 60px rgba(0,0,0,0.2)"},
  mTitle:{fontSize:20,fontWeight:700,letterSpacing:-.4,marginBottom:18},
  inp:{width:"100%",border:"1px solid #d2d2d7",borderRadius:10,padding:"10px 13px",fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:10,fontFamily:"inherit"},
  btn:{background:blue,color:white,border:"none",borderRadius:14,padding:"12px 0",cursor:"pointer",fontSize:15,fontWeight:600,width:"100%"},
  btnSm:{background:blue,color:white,border:"none",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600},
  btnOut:{background:"transparent",border:"1px solid #d2d2d7",borderRadius:10,padding:"8px 14px",cursor:"pointer",fontSize:13,color:dark},
  closeBtn:{background:lightGray,border:"none",borderRadius:50,width:30,height:30,cursor:"pointer",fontSize:17,color:gray,float:"right",lineHeight:"30px",textAlign:"center"},
  tag:{display:"inline-block",background:lightBlue,color:blue,borderRadius:8,padding:"3px 10px",fontSize:11,fontWeight:700,letterSpacing:.5,marginBottom:8,textTransform:"uppercase"},
  kitTag:{display:"inline-block",background:"#fef3c7",color:"#d97706",borderRadius:8,padding:"3px 10px",fontSize:11,fontWeight:700,marginBottom:8},
  badge:(s)=>({display:"inline-block",padding:"3px 10px",borderRadius:8,fontSize:11,fontWeight:700,background:s==="Enviado"?"#e8f5e9":s==="Pagado"?"#e8f0fe":"#fff3e0",color:s==="Enviado"?"#2d5a27":s==="Pagado"?blue:"#e65100"}),
  th:{textAlign:"left",padding:"10px 12px",borderBottom:"2px solid #f0f0f5",color:gray,fontWeight:600,fontSize:11,textTransform:"uppercase"},
  td:{padding:"12px",borderBottom:"1px solid #f8f8fa",verticalAlign:"top",fontSize:13},
  adminNavBtn:(a)=>({background:a?dark:white,color:a?white:dark,border:"1px solid #d2d2d7",borderRadius:12,padding:"8px 18px",cursor:"pointer",fontSize:13,fontWeight:600}),
  success:{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:dark,color:white,borderRadius:14,padding:"13px 26px",fontSize:14,fontWeight:600,zIndex:400,boxShadow:"0 8px 28px rgba(0,0,0,0.18)",whiteSpace:"nowrap"},
};

// Componente de imagen con lazy loading
function ProductImg({src,name,height=180,fontSize=52,onClick}){
  const [loaded,setLoaded]=useState(false);
  if(src) return(
    <div style={{width:"100%",height,background:lightBlue,position:"relative",overflow:"hidden"}} onClick={onClick}>
      {!loaded&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize}}}>🌿</div>}
      <img src={src} alt={name} loading="lazy"
        style={{width:"100%",height,objectFit:"cover",display:loaded?"block":"none"}}
        onLoad={()=>setLoaded(true)}/>
    </div>
  );
  return <div style={{...S.cardImg,height,cursor:onClick?"pointer":"default"}} onClick={onClick}>{fontSize===52?"🌿":"🌿"}</div>;
}

export default function App(){
  const [page,setPage]=useState("home");
  const [products,setProducts]=useState(PRODUCTS);
  const [cart,setCart]=useState([]);
  const [orders,setOrders]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);
  const [checkoutOpen,setCheckoutOpen]=useState(false);
  const [orderDone,setOrderDone]=useState(false);
  const [detail,setDetail]=useState(null);
  const [cat,setCat]=useState("Todos");
  const [search,setSearch]=useState("");
  const [adminLogged,setAdminLogged]=useState(false);
  const [adminPass,setAdminPass]=useState("");
  const [adminErr,setAdminErr]=useState("");
  const [adminTab,setAdminTab]=useState("orders");
  const [editP,setEditP]=useState(null);
  const [newP,setNewP]=useState({name:"",price:"",cost:"",desc:"",cat:"",stock:99,barcode:""});
  const [imgPrev,setImgPrev]=useState("");
  const [tracking,setTracking]=useState({});
  const [form,setForm]=useState({name:"",phone:"",address:"",notes:""});
  const [visibleCount,setVisibleCount]=useState(20);
  const fileRef=useRef();
  const editFileRef=useRef();

  const cartQty=cart.reduce((s,i)=>s+i.qty,0);
  const cartTotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const filtered=useMemo(()=>{
    setVisibleCount(20);
    return products.filter(p=>{
      const matchCat=cat==="Todos"||p.cat===cat;
      const matchSearch=p.name.toLowerCase().includes(search.toLowerCase())||p.cat.toLowerCase().includes(search.toLowerCase());
      return matchCat&&matchSearch;
    });
  },[products,cat,search]);

  function addCart(p){setCart(prev=>{const ex=prev.find(i=>i.id===p.id);if(ex)return prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i);return[...prev,{...p,qty:1}];});setCartOpen(true);}
  function remCart(id){setCart(p=>p.filter(i=>i.id!==id));}
  function updQty(id,q){if(q<1)return remCart(id);setCart(p=>p.map(i=>i.id===id?{...i,qty:q}:i));}

  function doCheckout(){
    if(!form.name||!form.phone||!form.address)return;
    const o={id:Date.now(),items:cart,total:cartTotal,customer:form,status:"Pendiente",tracking:"",date:new Date().toLocaleString("es-AR")};
    setOrders(p=>[o,...p]);
    const msg=encodeURIComponent(`🛒 *Nuevo pedido — Punto Vital*\n\n👤 *Cliente:* ${form.name}\n📞 ${form.phone}\n📍 ${form.address}${form.notes?`\n📝 ${form.notes}`:""}\n\n*Productos:*\n${cart.map(i=>`• ${i.name} x${i.qty} — ${fmt(i.price*i.qty)}`).join("\n")}\n\n💰 *Total: ${fmt(cartTotal)}*\n💳 Transferencia bancaria`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`,"_blank");
    setCart([]);setCheckoutOpen(false);setCartOpen(false);setOrderDone(true);
    setForm({name:"",phone:"",address:"",notes:""});
    setTimeout(()=>setOrderDone(false),4000);
  }

  function handleImg(e,isEdit){
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=ev=>{if(isEdit)setEditP(p=>({...p,img:ev.target.result}));else{setImgPrev(ev.target.result);setNewP(p=>({...p,img:ev.target.result}));}};
    r.readAsDataURL(f);
  }
  function saveNew(){
    if(!newP.name||!newP.price)return;
    setProducts(p=>[...p,{...newP,id:Date.now(),price:Number(newP.price),cost:Number(newP.cost)||0,stock:Number(newP.stock)||99}]);
    setNewP({name:"",price:"",cost:"",desc:"",cat:"",stock:99,barcode:""});setImgPrev("");
  }
  function saveEdit(){setProducts(p=>p.map(x=>x.id===editP.id?{...editP,price:Number(editP.price),cost:Number(editP.cost)}:x));setEditP(null);}
  function delP(id){setProducts(p=>p.filter(x=>x.id!==id));}
  function saveTracking(oid){setOrders(p=>p.map(o=>o.id===oid?{...o,tracking:tracking[oid]||o.tracking,status:tracking[oid]?"Enviado":o.status}:o));}

  const Presentation=()=>(
    <div>
      <div style={S.hero}>
        <div style={S.heroEye}>Distribuidora Nutracéutica</div>
        <h1 style={S.heroTitle}>Punto <span style={S.heroBlue}>Vital</span></h1>
        <p style={S.heroSub}>Acompañamos el crecimiento de profesionales, emprendedores y negocios con suplementos de alta calidad y stock inmediato.</p>
        <button style={S.heroBtn} onClick={()=>setPage("store")}>Ver catálogo completo</button>
        <button style={S.heroBtnOut} onClick={()=>document.getElementById("kits")?.scrollIntoView({behavior:"smooth"})}>Kits de alta rotación ↓</button>
      </div>
      <div style={{background:white,borderBottom:"1px solid #f0f0f5"}}>
        <div style={{...S.section,padding:"32px 20px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:24,textAlign:"center"}}>
            {[["119+","Productos disponibles"],["Stock inmediato","Sin esperas"],["Mismo día","Pedidos hasta las 13hs"],["40%+","Margen de ganancia"]].map(([v,l])=>(
              <div key={l}><div style={{fontSize:28,fontWeight:800,color:blue,letterSpacing:-1}}>{v}</div><div style={{fontSize:13,color:gray,marginTop:4}}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>¿Para quién es Punto Vital?</div>
        <p style={S.sectionSub}>Pensamos en nichos donde no se necesitan grandes inversiones para empezar a ganar.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
          {[{icon:"🩺",title:"Nutricionistas & Médicos",desc:"Complementá tus consultas con suplementos de calidad."},{icon:"🌿",title:"Dietéticas & Herboristerías",desc:"Amplía tu góndola con los productos de mayor rotación."},{icon:"💪",title:"Gimnasios & Entrenadores",desc:"Vende directamente a tus alumnos. Creatina, proteínas, BCAA."},{icon:"🚀",title:"Emprendedores",desc:"Empezá con un kit básico y escalá gradualmente. Margen real del 40%."},{icon:"🌸",title:"Emprendedoras de bienestar",desc:"Productos hormonales, antiage y control de peso."},{icon:"📦",title:"Revendedores online",desc:"Dropshipping con stock real. Envíos el mismo día."}].map(n=>(
            <div key={n.title} style={{background:white,borderRadius:16,padding:"24px 20px",boxShadow:"0 1px 6px rgba(0,0,0,0.05)"}}>
              <div style={{fontSize:32,marginBottom:12}}>{n.icon}</div>
              <div style={{fontWeight:700,fontSize:15,marginBottom:8}}>{n.title}</div>
              <div style={{color:gray,fontSize:13,lineHeight:1.6}}>{n.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:`linear-gradient(135deg,${lightBlue},#dbeafe)`,padding:"40px 20px"}}>
        <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:12}}>🚚</div>
          <div style={{fontSize:24,fontWeight:700,letterSpacing:-.5,marginBottom:16}}>Envíos rápidos garantizados</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,maxWidth:500,margin:"0 auto",textAlign:"left"}}>
            <div style={{background:white,borderRadius:14,padding:"18px 20px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
              <div style={{fontWeight:700,color:blue,fontSize:15,marginBottom:6}}>⚡ Mismo día</div>
              <div style={{color:gray,fontSize:13,lineHeight:1.5}}>Pedidos confirmados<br/><b>antes de las 13:00 hs</b></div>
            </div>
            <div style={{background:white,borderRadius:14,padding:"18px 20px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
              <div style={{fontWeight:700,color:dark,fontSize:15,marginBottom:6}}>📦 Día siguiente</div>
              <div style={{color:gray,fontSize:13,lineHeight:1.5}}>Pedidos después de las 13hs<br/><b>se envían al día siguiente</b></div>
            </div>
          </div>
        </div>
      </div>
      <div style={S.section} id="kits">
        <div style={S.sectionTitle}>Kits de alta rotación</div>
        <p style={S.sectionSub}>Selección estratégica para que tus clientes empiecen a ganar rápido.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
          {KITS_ROTACION.map(k=>(
            <div key={k.id} style={{background:white,borderRadius:18,padding:24,boxShadow:"0 2px 10px rgba(0,0,0,0.07)",border:`1px solid ${lightBlue}`}}>
              <div style={{marginBottom:12}}>
                <span style={S.kitTag}>{k.nicho}</span>
                <div style={{fontSize:18,fontWeight:700,letterSpacing:-.3}}>{k.icon} {k.name}</div>
                <div style={{fontSize:13,color:gray,marginTop:2}}>{k.subtitle}</div>
              </div>
              <div style={{background:lightGray,borderRadius:10,padding:"10px 14px",marginBottom:14}}>
                {k.products.map(p=><div key={p} style={{fontSize:12,color:gray,padding:"2px 0"}}>• {p}</div>)}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>
                <div style={{background:"#fef3c7",borderRadius:10,padding:"8px 4px"}}><div style={{fontSize:10,color:"#92400e",fontWeight:600,textTransform:"uppercase"}}>Inversión</div><div style={{fontSize:12,fontWeight:800,color:"#92400e",marginTop:2}}>{k.investment}</div></div>
                <div style={{background:"#d1fae5",borderRadius:10,padding:"8px 4px"}}><div style={{fontSize:10,color:"#065f46",fontWeight:600,textTransform:"uppercase"}}>Venta PVP</div><div style={{fontSize:12,fontWeight:800,color:"#065f46",marginTop:2}}>{k.ganancia}</div></div>
                <div style={{background:lightBlue,borderRadius:10,padding:"8px 4px"}}><div style={{fontSize:10,color:darkBlue,fontWeight:600,textTransform:"uppercase"}}>Margen</div><div style={{fontSize:24,fontWeight:800,color:blue,marginTop:2,lineHeight:1}}>{k.margen}</div></div>
              </div>
              <button style={{...S.btn,marginTop:14,fontSize:13,padding:"10px 0"}} onClick={()=>setPage("store")}>Ver productos del kit →</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:dark,color:white,textAlign:"center",padding:"60px 20px"}}>
        <div style={{fontSize:28,fontWeight:700,letterSpacing:-.5,marginBottom:12}}>¿Listo para empezar?</div>
        <div style={{color:"rgba(255,255,255,0.6)",fontSize:15,marginBottom:28}}>Pedido mínimo accesible · Stock inmediato · Soporte personalizado</div>
        <button style={{...S.heroBtn,fontSize:16,padding:"14px 36px"}} onClick={()=>setPage("store")}>Ver catálogo completo →</button>
        <div style={{marginTop:16}}><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{color:"#60a5fa",fontSize:14,textDecoration:"none"}}>💬 Consultar por WhatsApp</a></div>
      </div>
    </div>
  );

  const Store=()=>(
    <div style={S.section}>
      <div style={{marginBottom:24}}>
        <div style={S.sectionTitle}>Catálogo Punto Vital</div>
        <div style={S.sectionSub}>{filtered.length} productos · Stock inmediato</div>
      </div>
      <div style={S.filters}>
        <input style={S.searchBox} placeholder="🔍 Buscar producto..." value={search} onChange={e=>setSearch(e.target.value)}/>
        {CATEGORIES.map(c=><button key={c} style={S.filterBtn(cat===c)} onClick={()=>setCat(c)}>{c}</button>)}
      </div>
      {filtered.length===0
        ?<div style={{textAlign:"center",color:gray,padding:"40px 0"}}>No se encontraron productos.</div>
        :<>
          <div style={S.grid}>
            {filtered.slice(0,visibleCount).map(p=>(
              <div key={p.id} style={S.card}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 6px rgba(0,0,0,0.06)";}}>
                <ProductImg src={p.img} name={p.name} onClick={()=>setDetail(p)}/>
                <div style={S.cardBody}>
                  <div style={p.isKit?S.kitTag:S.cardCat}>{p.cat}</div>
                  <div style={S.cardName}>{p.name}</div>
                  <div style={{fontSize:12,color:gray,lineHeight:1.4,marginBottom:8,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.desc}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={S.cardPrice}>{fmt(p.price)}</div>
                    <div style={{fontSize:11,color:"#2d5a27",fontWeight:600}}>✅ Stock</div>
                  </div>
                  <button style={S.cardBtn} onClick={()=>addCart(p)}>Agregar al carrito</button>
                </div>
              </div>
            ))}
          </div>
          {visibleCount<filtered.length&&(
            <div style={{textAlign:"center",marginTop:32}}>
              <button style={{...S.btnOut,padding:"12px 32px",borderRadius:14,fontSize:14,fontWeight:600}}
                onClick={()=>setVisibleCount(v=>v+20)}>
                Ver más productos ({filtered.length-visibleCount} restantes)
              </button>
            </div>
          )}
        </>
      }
    </div>
  );

  const Cart=()=>(
    <div style={S.overlay} onClick={()=>setCartOpen(false)}>
      <div style={{...S.modal,maxWidth:400}} onClick={e=>e.stopPropagation()}>
        <button style={S.closeBtn} onClick={()=>setCartOpen(false)}>×</button>
        <div style={S.mTitle}>🛒 Carrito</div>
        {cart.length===0?<p style={{color:gray,textAlign:"center",padding:"24px 0"}}>Tu carrito está vacío</p>:<>
          {cart.map(i=>(
            <div key={i.id} style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:"1px solid #f5f5f7"}}>
              <div style={{width:48,height:48,borderRadius:8,background:lightBlue,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
                {i.img?<img src={i.img} alt="" loading="lazy" style={{width:48,height:48,objectFit:"cover"}}/>:<span style={{fontSize:22}}>🌿</span>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{i.name}</div>
                <div style={{color:gray,fontSize:12}}>{fmt(i.price)}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <button onClick={()=>updQty(i.id,i.qty-1)} style={{...S.btnOut,padding:"2px 9px",borderRadius:8}}>−</button>
                <span style={{fontWeight:700,minWidth:18,textAlign:"center",fontSize:13}}>{i.qty}</span>
                <button onClick={()=>updQty(i.id,i.qty+1)} style={{...S.btnOut,padding:"2px 9px",borderRadius:8}}>+</button>
              </div>
              <button onClick={()=>remCart(i.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#ff3b30",fontSize:16,padding:0}}>✕</button>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:17,margin:"16px 0"}}>
            <span>Total</span><span style={{color:blue}}>{fmt(cartTotal)}</span>
          </div>
          <button style={S.btn} onClick={()=>{setCartOpen(false);setCheckoutOpen(true);}}>Finalizar pedido →</button>
        </>}
      </div>
    </div>
  );

  const Checkout=()=>(
    <div style={S.overlay} onClick={()=>setCheckoutOpen(false)}>
      <div style={{...S.modal,maxWidth:420}} onClick={e=>e.stopPropagation()}>
        <button style={S.closeBtn} onClick={()=>setCheckoutOpen(false)}>×</button>
        <div style={S.mTitle}>📦 Completar pedido</div>
        <input style={S.inp} placeholder="Nombre completo *" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
        <input style={S.inp} placeholder="Teléfono *" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/>
        <input style={S.inp} placeholder="Dirección de entrega *" value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))}/>
        <input style={S.inp} placeholder="Notas (opcional)" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/>
        <div style={{background:lightBlue,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:8,color:darkBlue}}>💳 Transferencia bancaria</div>
          <div style={{fontSize:13,color:dark,lineHeight:1.8}}>CBU: <b>0000003100123456789012</b><br/>Alias: <b>PUNTO.VITAL</b><br/>Titular: <b>Punto Vital</b></div>
        </div>
        <div style={{background:"#f0fdf4",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:12,color:"#166534"}}>
          ⚡ Pedido antes de las <b>13:00 hs</b> → envío <b>el mismo día</b>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:17,marginBottom:14}}>
          <span>Total:</span><span style={{color:blue}}>{fmt(cartTotal)}</span>
        </div>
        <button style={{...S.btn,opacity:(!form.name||!form.phone||!form.address)?0.5:1}} onClick={doCheckout}>✅ Confirmar por WhatsApp</button>
        <p style={{fontSize:11,color:gray,textAlign:"center",marginTop:10}}>Al confirmar se abrirá WhatsApp con el resumen de tu pedido</p>
      </div>
    </div>
  );

  const Detail=({p})=>(
    <div style={S.overlay} onClick={()=>setDetail(null)}>
      <div style={{...S.modal,maxWidth:460}} onClick={e=>e.stopPropagation()}>
        <button style={S.closeBtn} onClick={()=>setDetail(null)}>×</button>
        <ProductImg src={p.img} name={p.name} height={200} fontSize={64}/>
        <div style={{padding:"16px 0 0"}}>
          <span style={p.isKit?S.kitTag:S.tag}>{p.cat}</span>
          <div style={{fontSize:22,fontWeight:700,letterSpacing:-.5,margin:"4px 0 8px"}}>{p.name}</div>
          <div style={{color:gray,fontSize:14,lineHeight:1.6,marginBottom:6}}>{p.desc}</div>
          {p.barcode&&<div style={{fontSize:11,color:gray,marginBottom:14,fontFamily:"monospace"}}>Código: {p.barcode}</div>}
          <div style={{fontSize:28,fontWeight:800,color:blue,marginBottom:16}}>{fmt(p.price)}</div>
          <button style={S.btn} onClick={()=>{addCart(p);setDetail(null);}}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );

  const AdminLogin=()=>(
    <div style={{...S.section,maxWidth:340,paddingTop:80}}>
      <div style={{background:white,borderRadius:20,padding:32,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <div style={{textAlign:"center",fontSize:32,marginBottom:8}}>🔐</div>
        <div style={{fontWeight:700,fontSize:20,textAlign:"center",marginBottom:20}}>Panel Admin</div>
        <input style={S.inp} type="password" placeholder="Contraseña" value={adminPass} onChange={e=>setAdminPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(adminPass===ADMIN_PASS?setAdminLogged(true):setAdminErr("Contraseña incorrecta"))}/>
        {adminErr&&<div style={{color:"#ff3b30",fontSize:13,marginBottom:8}}>{adminErr}</div>}
        <button style={S.btn} onClick={()=>adminPass===ADMIN_PASS?setAdminLogged(true):setAdminErr("Contraseña incorrecta")}>Ingresar</button>
      </div>
    </div>
  );

  const AdminPanel=()=>(
    <div style={S.section}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div style={{fontSize:22,fontWeight:700}}>⚙️ Panel Admin — Punto Vital</div>
        <button style={S.btnOut} onClick={()=>setAdminLogged(false)}>Cerrar sesión</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12,marginBottom:24}}>
        {[["📦","Pedidos",orders.length],["✅","Enviados",orders.filter(o=>o.status==="Enviado").length],["🏷️","Productos",products.length],["💰","Ventas",fmt(orders.reduce((s,o)=>s+o.total,0))]].map(([ic,lb,vl])=>(
          <div key={lb} style={{background:white,borderRadius:14,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,0,0.05)"}}>
            <div style={{fontSize:11,color:gray}}>{ic} {lb}</div>
            <div style={{fontSize:20,fontWeight:800,marginTop:4,color:blue}}>{vl}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {["orders","products","add"].map(t=>(
          <button key={t} style={S.adminNavBtn(adminTab===t)} onClick={()=>setAdminTab(t)}>
            {t==="orders"?"📋 Pedidos":t==="products"?"🏷️ Productos":"➕ Nuevo producto"}
          </button>
        ))}
      </div>
      {adminTab==="orders"&&(
        <div style={{background:white,borderRadius:16,padding:16,overflowX:"auto"}}>
          {orders.length===0?<p style={{color:gray,textAlign:"center",padding:32}}>Aún no hay pedidos</p>:(
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr>{["#","Fecha","Cliente","Productos","Total","Estado","Seguimiento"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
              <tbody>{orders.map(o=>(
                <tr key={o.id}>
                  <td style={S.td}><code style={{fontSize:11}}>#{String(o.id).slice(-5)}</code></td>
                  <td style={S.td}><span style={{fontSize:11,color:gray}}>{o.date}</span></td>
                  <td style={S.td}><b>{o.customer.name}</b><br/><span style={{color:gray,fontSize:11}}>{o.customer.phone}</span></td>
                  <td style={S.td}>{o.items.map(i=><div key={i.id} style={{fontSize:11}}>{i.name} x{i.qty}</div>)}</td>
                  <td style={S.td}><b style={{color:blue}}>{fmt(o.total)}</b></td>
                  <td style={S.td}><span style={S.badge(o.status)}>{o.status}</span></td>
                  <td style={S.td}>
                    {o.tracking&&<div style={{fontSize:11,color:"#2d5a27",marginBottom:4}}>🚚 {o.tracking}</div>}
                    <div style={{display:"flex",gap:6}}>
                      <input style={{...S.inp,marginBottom:0,fontSize:11,padding:"5px 8px",width:110}} placeholder="Cód. seguimiento" value={tracking[o.id]||""} onChange={e=>setTracking(t=>({...t,[o.id]:e.target.value}))}/>
                      <button style={S.btnSm} onClick={()=>saveTracking(o.id)}>✓</button>
                    </div>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
      )}
      {adminTab==="products"&&(
        <div style={{background:white,borderRadius:16,padding:16}}>
          {products.map(p=>(
            <div key={p.id} style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:"1px solid #f5f5f7"}}>
              <div style={{width:52,height:52,borderRadius:8,background:lightBlue,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
                {p.img?<img src={p.img} alt="" loading="lazy" style={{width:52,height:52,objectFit:"cover"}}/>:<span style={{fontSize:24}}>🌿</span>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                <div style={{fontSize:11,color:gray}}>{p.cat} · {fmt(p.price)}</div>
              </div>
              <button style={S.btnOut} onClick={()=>setEditP(p)}>Editar</button>
              <button style={{background:"#fff0f0",color:"#ff3b30",border:"1px solid #ffcdd2",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600}} onClick={()=>delP(p.id)}>✕</button>
            </div>
          ))}
        </div>
      )}
      {adminTab==="add"&&(
        <div style={{background:white,borderRadius:16,padding:24,maxWidth:500}}>
          <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>Nuevo producto</div>
          <input style={S.inp} placeholder="Nombre *" value={newP.name} onChange={e=>setNewP(p=>({...p,name:e.target.value}))}/>
          <input style={S.inp} placeholder="Precio PVP *" type="number" value={newP.price} onChange={e=>setNewP(p=>({...p,price:e.target.value}))}/>
          <input style={S.inp} placeholder="Precio mayorista" type="number" value={newP.cost} onChange={e=>setNewP(p=>({...p,cost:e.target.value}))}/>
          <input style={S.inp} placeholder="Descripción" value={newP.desc} onChange={e=>setNewP(p=>({...p,desc:e.target.value}))}/>
          <input style={S.inp} placeholder="Categoría" value={newP.cat} onChange={e=>setNewP(p=>({...p,cat:e.target.value}))}/>
          <input style={S.inp} placeholder="Código de barras" value={newP.barcode} onChange={e=>setNewP(p=>({...p,barcode:e.target.value}))}/>
          <div style={{marginBottom:14}}>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{display:"none"}} onChange={e=>handleImg(e,false)}/>
            <button style={S.btnOut} onClick={()=>fileRef.current.click()}>📷 Subir foto</button>
            {imgPrev&&<img src={imgPrev} alt="" style={{display:"block",marginTop:10,width:100,height:100,objectFit:"cover",borderRadius:10}}/>}
          </div>
          <button style={{...S.btn,opacity:(!newP.name||!newP.price)?0.5:1}} onClick={saveNew}>Guardar producto</button>
        </div>
      )}
      {editP&&(
        <div style={S.overlay} onClick={()=>setEditP(null)}>
          <div style={{...S.modal,maxWidth:440}} onClick={e=>e.stopPropagation()}>
            <button style={S.closeBtn} onClick={()=>setEditP(null)}>×</button>
            <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>Editar producto</div>
            <input style={S.inp} placeholder="Nombre" value={editP.name} onChange={e=>setEditP(p=>({...p,name:e.target.value}))}/>
            <input style={S.inp} placeholder="Precio PVP" type="number" value={editP.price} onChange={e=>setEditP(p=>({...p,price:e.target.value}))}/>
            <input style={S.inp} placeholder="Costo mayorista" type="number" value={editP.cost||""} onChange={e=>setEditP(p=>({...p,cost:e.target.value}))}/>
            <input style={S.inp} placeholder="Descripción" value={editP.desc||""} onChange={e=>setEditP(p=>({...p,desc:e.target.value}))}/>
            <input style={S.inp} placeholder="Categoría" value={editP.cat||""} onChange={e=>setEditP(p=>({...p,cat:e.target.value}))}/>
            <div style={{marginBottom:14}}>
              <input ref={editFileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{display:"none"}} onChange={e=>handleImg(e,true)}/>
              <button style={S.btnOut} onClick={()=>editFileRef.current.click()}>📷 Cambiar foto</button>
              {editP.img&&<img src={editP.img} alt="" style={{display:"block",marginTop:10,width:90,height:90,objectFit:"cover",borderRadius:10}}/>}
            </div>
            <button style={S.btn} onClick={saveEdit}>Guardar cambios</button>
          </div>
        </div>
      )}
    </div>
  );

  return(
    <div style={S.app}>
      <div style={S.banner}>⚡ <b>Envío mismo día</b> en pedidos antes de las 13 hs · 📦 Día siguiente después de las 13 hs · ✅ <b>Stock inmediato</b></div>
      <nav style={S.nav}>
        <div style={S.logo} onClick={()=>setPage("home")}><span style={{color:blue,fontSize:22}}>●</span> Punto Vital</div>
        <div style={S.navLinks}>
          <button style={S.navLink(page==="home")} onClick={()=>setPage("home")}>Inicio</button>
          <button style={S.navLink(page==="store")} onClick={()=>setPage("store")}>Catálogo</button>
          <button style={S.navLink(page==="admin")} onClick={()=>setPage("admin")}>Admin</button>
          {page==="store"&&<button style={S.cartBadge} onClick={()=>setCartOpen(true)}>
            🛒 {cartQty>0?<span style={{background:white,color:blue,borderRadius:10,padding:"1px 7px",fontSize:12,fontWeight:800}}>{cartQty}</span>:"Carrito"}
          </button>}
        </div>
      </nav>
      {page==="home"&&<Presentation/>}
      {page==="store"&&<Store/>}
      {page==="admin"&&(adminLogged?<AdminPanel/>:<AdminLogin/>)}
      {page!=="admin"&&(
        <div style={{background:dark,color:white,textAlign:"center",padding:"24px 20px"}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>● Punto Vital</div>
          <div style={{opacity:.5,fontSize:12}}>Distribuidora de Alimentos Nutracéuticos · Argentina</div>
        </div>
      )}
      {cartOpen&&<Cart/>}
      {checkoutOpen&&<Checkout/>}
      {detail&&<Detail p={detail}/>}
      {orderDone&&<div style={S.success}>✅ ¡Pedido confirmado y enviado por WhatsApp!</div>}
    </div>
  );
}
