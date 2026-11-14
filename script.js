const $ = id => document.getElementById(id);
const colorOne = $("colorOne"), colorTwo = $("colorTwo"), mixAmount = $("mixAmount");
let currentHex = "#800080";
const colorNames = [
  ["Black","#000000"],["White","#FFFFFF"],["Red","#FF0000"],["Green","#008000"],["Blue","#0000FF"],
  ["Yellow","#FFFF00"],["Orange","#FFA500"],["Purple","#800080"],["Pink","#FFC0CB"],["Brown","#A52A2A"],
  ["Gray","#808080"],["Silver","#C0C0C0"],["Gold","#FFD700"],["Coral","#FF7F50"],["Tomato","#FF6347"],
  ["Salmon","#FA8072"],["Crimson","#DC143C"],["Hot Pink","#FF69B4"],["Magenta","#FF00FF"],["Violet","#EE82EE"],
  ["Indigo","#4B0082"],["Sky Blue","#87CEEB"],["Royal Blue","#4169E1"],["Navy","#000080"],["Teal","#008080"],
  ["Turquoise","#40E0D0"],["Aqua","#00FFFF"],["Olive","#808000"],["Lime","#00FF00"],["Mint","#98FF98"],
  ["Chocolate","#D2691E"],["Tan","#D2B48C"],["Beige","#F5F5DC"],["Lavender","#E6E6FA"],["Orchid","#DA70D6"],
  ["Plum","#DDA0DD"],["Peach","#FFE5B4"],["Khaki","#F0E68C"],["Steel Blue","#4682B4"],["Forest Green","#228B22"]
];
function hexToRgb(hex){const n=parseInt(hex.slice(1),16);return {r:(n>>16)&255,g:(n>>8)&255,b:n&255}}
function rgbToHex({r,g,b}){return "#"+[r,g,b].map(v=>Math.round(v).toString(16).padStart(2,"0")).join("").toUpperCase()}
function nearestName(hex){const c=hexToRgb(hex);let best=colorNames[0],distance=Infinity;for(const item of colorNames){const x=hexToRgb(item[1]);const d=(c.r-x.r)**2+(c.g-x.g)**2+(c.b-x.b)**2;if(d<distance){distance=d;best=item}}return best[0]}
function setColor(hex, updateMix=true){currentHex=hex.toUpperCase();const c=hexToRgb(currentHex);$("colorPreview").style.background=currentHex;$("colorName").textContent=nearestName(currentHex);$("hexValue").textContent=currentHex;$("hexInput").value=currentHex;$("redRange").value=c.r;$("greenRange").value=c.g;$("blueRange").value=c.b;$("redValue").textContent=c.r;$("greenValue").textContent=c.g;$("blueValue").textContent=c.b;$("rgbValue").textContent=`RGB (${c.r}, ${c.g}, ${c.b})`;if(updateMix){colorOneHex.textContent=colorOne.value.toUpperCase();colorTwoHex.textContent=colorTwo.value.toUpperCase()}}
function mixColors(){const a=hexToRgb(colorOne.value),b=hexToRgb(colorTwo.value),t=Number(mixAmount.value)/100;const mixed={r:a.r*(1-t)+b.r*t,g:a.g*(1-t)+b.g*t,b:a.b*(1-t)+b.b*t};setColor(rgbToHex(mixed));$("mixPercent").textContent=`${100-Number(mixAmount.value)}% / ${mixAmount.value}%`;colorOneHex.textContent=colorOne.value.toUpperCase();colorTwoHex.textContent=colorTwo.value.toUpperCase()}
colorOne.addEventListener("input",mixColors);colorTwo.addEventListener("input",mixColors);mixAmount.addEventListener("input",mixColors);
["red","green","blue"].forEach((channel)=>$(channel+"Range").addEventListener("input",()=>{const rgb={r:Number($("redRange").value),g:Number($("greenRange").value),b:Number($("blueRange").value)};setColor(rgbToHex(rgb),false)}));
$("applyHex").addEventListener("click",()=>{let v=$("hexInput").value.trim();if(/^#[0-9a-fA-F]{6}$/.test(v)){setColor(v);$("hexError").textContent=""}else{$("hexError").textContent="Please enter a valid 6-digit HEX code, e.g. #33A1FF."}});
$("hexInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("applyHex").click()});
$("copyHex").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(currentHex);showToast("HEX code copied")}catch{showToast("Copy is unavailable in this browser")}});
$("randomMix").addEventListener("click",()=>{const random=()=>"#"+Math.floor(Math.random()*16777216).toString(16).padStart(6,"0");colorOne.value=random();colorTwo.value=random();mixAmount.value=50;mixColors()});
$("presets").addEventListener("click",e=>{const btn=e.target.closest("[data-color]");if(btn)setColor(btn.dataset.color)});
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1700)}
setColor(currentHex);mixColors();