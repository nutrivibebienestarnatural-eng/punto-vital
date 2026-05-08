import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";

const App = lazy(() => import("./App"));

const Loader = () => (
  <div style={{
    position:"fixed",inset:0,
    background:"linear-gradient(160deg,#0a0a0a 0%,#1a2a4a 60%,#0a1628 100%)",
    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif",
    color:"white"
  }}>
    <div style={{
      width:72,height:72,borderRadius:20,
      background:"rgba(255,255,255,0.08)",
      border:"2px solid rgba(255,255,255,0.15)",
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:36,marginBottom:20,
      animation:"pulse 1.5s ease-in-out infinite"
    }}>🌿</div>
    <div style={{fontSize:28,fontWeight:800,letterSpacing:-1,marginBottom:6}}>
      Punto <span style={{color:"#60a5fa"}}>Vital</span>
    </div>
    <div style={{fontSize:13,opacity:0.5,marginBottom:32}}>Distribuidora Nutracéutica</div>
    <div style={{display:"flex",gap:6}}>
      {[0,1,2].map(i=>(
        <div key={i} style={{
          width:8,height:8,borderRadius:"50%",background:"#60a5fa",
          animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`
        }}/>
      ))}
    </div>
    <style>{`
      @keyframes pulse {
        0%,100%{transform:scale(1);opacity:1}
        50%{transform:scale(1.05);opacity:0.8}
      }
      @keyframes bounce {
        0%,100%{transform:translateY(0);opacity:0.4}
        50%{transform:translateY(-8px);opacity:1}
      }
    `}</style>
  </div>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Loader/>}>
      <App/>
    </Suspense>
  </StrictMode>
);
