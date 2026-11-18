
(function(){
var root=document.documentElement,sky=document.getElementById("sky"),sun=document.getElementById("sun"),moon=document.getElementById("moon"),btn=document.getElementById("cyc");
var stars=[];for(var i=0;i<45;i++){var s=document.createElement("i");s.className="star";s.style.left=(Math.random()*100)+"%";s.style.top=(Math.random()*60)+"%";s.style.opacity=0;s.style.transform="scale("+(0.6+Math.random()*1.2)+")";sky.appendChild(s);stars.push(s)}
var KD=[[-1,[7,12,28],[18,28,52]],[-0.12,[7,12,28],[18,28,52]],[0,[42,35,80],[100,50,80]],[0.18,[70,50,70],[120,70,60]],[0.5,[20,50,80],[40,70,95]],[1,[20,50,80],[40,70,95]]];
var KL=[[-1,[150,165,205],[215,210,232]],[-0.12,[150,165,205],[215,210,232]],[0,[205,160,190],[255,205,170]],[0.18,[255,190,130],[255,232,185]],[0.5,[150,210,250],[255,246,222]],[1,[150,210,250],[255,246,222]]];
var K=KL,mq=matchMedia("(prefers-color-scheme: dark)");
function cl(v,a,b){return Math.min(b,Math.max(a,v))}
function mix(a,b,t){return a.map(function(v,i){return Math.round(v+(b[i]-v)*t)})}
function rgb(c){return "rgb("+c.join(",")+")"}
function pal(e){for(var i=1;i<K.length;i++){if(e<=K[i][0]){var t=(e-K[i-1][0])/(K[i][0]-K[i-1][0]);return[mix(K[i-1][1],K[i][1],t),mix(K[i-1][2],K[i][2],t)]}}return[K[5][1],K[5][2]]}
function draw(h){
 var dark=mq.matches;K=dark?KD:KL;var p=(h-6)/12,e=Math.sin(Math.PI*p),c=pal(e);
 sky.style.background="linear-gradient(to bottom,"+rgb(c[0])+","+rgb(c[1])+")";
 root.removeAttribute("data-theme");
 var sc=mix([255,110,40],[255,214,90],cl(e*2.5,0,1));
 sun.style.background="radial-gradient(circle,#fffbe0 0 35%,"+rgb(sc)+" 72%)";
 sun.style.boxShadow="0 0 60px 30px rgba("+sc.join(",")+",.45)";
 sun.style.display=(p>-0.12&&p<1.12)?"block":"none";
 sun.style.left=(5+90*p)+"%";sun.style.top=(88-72*Math.sin(Math.PI*p))+"%";
 var pm=h>=18?(h-18)/12:(h+6)/12;
 moon.style.left=(5+90*pm)+"%";moon.style.top=(88-72*Math.sin(Math.PI*pm))+"%";
 moon.style.opacity=cl((0.05-e)*6,0,1);
 var n=dark?cl((-e-0.05)/0.4,0,1):0;stars.forEach(function(x){x.style.opacity=n});
}
var previewing=false,timer=null,last=null,reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,H=reduce?12:7;
function real(){var d=new Date();return d.getHours()+d.getMinutes()/60}
function tick(){draw(H)}
tick();if(mq.addEventListener)mq.addEventListener("change",tick);
if(!reduce){(function f(t){if(last!=null){H=(H+(t-last)/1000*24/60)%24}last=t;draw(H);requestAnimationFrame(f)})(performance.now());}
if(btn)btn.onclick=function(){
 if(previewing){previewing=false;clearInterval(timer);btn.textContent="▶ Preview sun cycle";tick();return}
 previewing=true;btn.textContent="■ Stop preview";
 var start=real(),step=0;
 timer=setInterval(function(){step++;draw((start+step*0.1)%24);if(step>=240){previewing=false;clearInterval(timer);btn.textContent="▶ Preview sun cycle";tick()}},80);
};
})();

if(document.getElementById('menuBtn')){
(function(){var b=document.getElementById("menuBtn"),n=document.getElementById("navLinks");
function set(o){n.classList.toggle("open",o);b.setAttribute("aria-expanded",o);b.textContent=o?"✕":"☰"}
b.onclick=function(){set(!n.classList.contains("open"))};
n.addEventListener("click",function(e){if(e.target.closest("a"))set(false)});})();
}
