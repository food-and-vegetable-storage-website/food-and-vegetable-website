const $ = id => document.getElementById(id);
const today = new Date(); today.setHours(0,0,0,0);
$("todayLabel").textContent = today.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"});
$("storedDate").value = new Date().toISOString().slice(0,10);

const produce = {
 "tomato":{emoji:"🍅",fridge:"1–2 weeks",room:"3–7 days",freezer:"8–12 months",temp:"4 °C or colder",tip:"Store whole tomatoes in the refrigerator when fully ripe. Keep cut tomatoes covered and refrigerated; use promptly."},
 "potato":{emoji:"🥔",fridge:"Not recommended for raw whole potatoes",room:"1–2 months",freezer:"8–12 months (cooked/blanched)",temp:"7–10 °C in a cool, dark place",tip:"Keep raw potatoes in a cool, dark, dry, ventilated place, away from onions. Avoid refrigerating raw potatoes where possible."},
 "onion":{emoji:"🧅",fridge:"2–3 months (whole, dry)",room:"1–2 months",freezer:"10–12 months (chopped)",temp:"Cool, dry storage; cut onion at 4 °C or colder",tip:"Store whole onions in a dry, ventilated place. Refrigerate cut onion in a covered container."},
 "spinach":{emoji:"🥬",fridge:"3–5 days",room:"Not recommended",freezer:"10–12 months (blanched)",temp:"4 °C or colder",tip:"Keep dry in a breathable bag or container. Wash just before use for best quality."},
 "carrot":{emoji:"🥕",fridge:"2–3 weeks",room:"2–3 days",freezer:"10–12 months (blanched)",temp:"4 °C or colder",tip:"Remove leafy tops and store carrots in a bag or covered container in the crisper."},
 "cucumber":{emoji:"🥒",fridge:"About 1 week",room:"1–2 days",freezer:"Not ideal raw",temp:"About 10–12 °C for best quality",tip:"Keep dry and away from ethylene-producing fruit. Very cold storage can cause chilling damage."},
 "broccoli":{emoji:"🥦",fridge:"3–5 days",room:"Not recommended",freezer:"10–12 months (blanched)",temp:"4 °C or colder",tip:"Refrigerate unwashed in a loose bag. Use while florets are firm and green."},
 "cauliflower":{emoji:"🥦",fridge:"About 1 week",room:"Not recommended",freezer:"10–12 months (blanched)",temp:"4 °C or colder",tip:"Store whole and dry in the refrigerator. Keep cut pieces in a sealed container."},
 "capsicum":{emoji:"🫑",fridge:"1–2 weeks",room:"2–3 days",freezer:"10–12 months",temp:"4 °C or colder",tip:"Store dry in the crisper. Cut peppers should be covered and used within a few days."},
 "bell pepper":{emoji:"🫑",fridge:"1–2 weeks",room:"2–3 days",freezer:"10–12 months",temp:"4 °C or colder",tip:"Store dry in the crisper. Cut peppers should be covered and used within a few days."},
 "peas":{emoji:"🫛",fridge:"3–5 days",room:"Not recommended",freezer:"8–12 months",temp:"4 °C or colder",tip:"Refrigerate fresh peas promptly. Shell shortly before cooking, or blanch before freezing."},
 "beans":{emoji:"🫛",fridge:"3–5 days",room:"Not recommended",freezer:"8–12 months (blanched)",temp:"4 °C or colder",tip:"Keep unwashed in a breathable bag in the crisper."},
 "eggplant":{emoji:"🍆",fridge:"About 5–7 days",room:"1–2 days",freezer:"10–12 months (cooked/prepared)",temp:"Around 10–12 °C for best quality",tip:"Eggplant is sensitive to very cold temperatures. Use soon after cutting."},
 "cabbage":{emoji:"🥬",fridge:"1–2 weeks (cut); longer whole",room:"Not recommended",freezer:"10–12 months (blanched)",temp:"4 °C or colder",tip:"Keep whole cabbage in the crisper. Wrap cut surfaces and refrigerate."},
 "lettuce":{emoji:"🥬",fridge:"About 5–7 days",room:"Not recommended",freezer:"Not recommended",temp:"4 °C or colder",tip:"Keep leaves dry with a paper towel in a breathable container."},
 "mushroom":{emoji:"🍄",fridge:"3–7 days",room:"Not recommended",freezer:"8–12 months (cooked)",temp:"4 °C or colder",tip:"Store in a paper bag or ventilated container. Avoid washing until ready to use."},
 "garlic":{emoji:"🧄",fridge:"Whole cloves: several weeks",room:"Several weeks to months",freezer:"Up to 10–12 months",temp:"Cool, dry room storage; chopped garlic at 4 °C or colder",tip:"Keep whole bulbs dry and ventilated. Refrigerate peeled or chopped garlic promptly."},
 "zucchini":{emoji:"🥒",fridge:"4–5 days",room:"1–2 days",freezer:"10–12 months (blanched)",temp:"4 °C or colder",tip:"Keep dry in the crisper and use while firm."},
 "pumpkin":{emoji:"🎃",fridge:"Cut: 3–5 days",room:"Whole: weeks in cool, dry place",freezer:"10–12 months (cooked)",temp:"Cut pumpkin at 4 °C or colder",tip:"Refrigerate cut pumpkin in a sealed container. Store whole, uncut pumpkin in a cool dry place."}
};
const common = Object.keys(produce);
const shelfDefaults = {"prepared food":{fridge:"3–4 days",freezer:"2–3 months",temp:"4 °C or colder",tip:"Refrigerate promptly in shallow, covered containers. Do not leave perishable food at room temperature for more than 2 hours."},"dairy":{fridge:"Check package date; opened items vary",freezer:"Varies by product",temp:"4 °C or colder",tip:"Follow the package instructions and refrigerate promptly."}};
const getItems=()=>JSON.parse(localStorage.getItem("chilloraItems")||"[]");
const saveItems=items=>localStorage.setItem("chilloraItems",JSON.stringify(items));
function dayDiff(date){return Math.ceil((new Date(date+"T00:00:00")-today)/86400000)}
function emojiFor(name){let key=Object.keys(produce).find(k=>name.toLowerCase().includes(k));return key?produce[key].emoji:"🍱"}
function render(){
 const items=getItems(),q=$("searchFood").value.toLowerCase(),filter=$("filterFood").value;
 $("totalCount").textContent=items.length;
 $("soonCount").textContent=items.filter(x=>dayDiff(x.reminder)<=2&&dayDiff(x.reminder)>=0).length;
 $("overdueCount").textContent=items.filter(x=>dayDiff(x.reminder)<0).length;
 const shown=items.filter(x=>x.name.toLowerCase().includes(q)).filter(x=>filter==="all"||(filter==="soon"&&dayDiff(x.reminder)<=2&&dayDiff(x.reminder)>=0)||(filter==="overdue"&&dayDiff(x.reminder)<0));
 $("foodList").innerHTML=shown.length?shown.map(x=>{let d=dayDiff(x.reminder),status=d<0?"Reminder overdue":d===0?"Due today":`Remind in ${d} day${d===1?"":"s"}`,cls=d<0?"late":d<=2?"due":"";return `<article class="food-item"><div class="food-emoji">${emojiFor(x.name)}</div><div class="food-info"><b>${escapeHtml(x.name)}</b><small>${escapeHtml(x.quantity||"Quantity not set")} • ${escapeHtml(x.place)} • Stored ${x.stored}</small></div><span class="food-status ${cls}">${status}</span><button class="remove-btn" title="Remove item" data-remove="${x.id}">×</button></article>`}).join(""):`<div class="empty-state">🥬<b>No matching food items</b><span>Add food or change your search filter.</span></div>`;
 document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{saveItems(getItems().filter(x=>x.id!==b.dataset.remove));render()});
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("reminderDays").onchange=()=> $("customDateWrap").classList.toggle("hidden",$("reminderDays").value!=="custom");
$("foodForm").onsubmit=e=>{e.preventDefault();let stored=$("storedDate").value,reminder=$("reminderDays").value==="custom"?$("customDate").value:new Date(new Date(stored+"T00:00:00").getTime()+Number($("reminderDays").value)*86400000).toISOString().slice(0,10);if(!reminder||reminder<stored){alert("Please choose a reminder date on or after the stored date.");return}let items=getItems();items.unshift({id:crypto.randomUUID(),name:$("foodName").value.trim(),category:$("foodCategory").value,quantity:$("foodQuantity").value.trim(),stored,place:$("storagePlace").value,reminder,notes:$("foodNotes").value});saveItems(items);e.target.reset();$("storedDate").value=new Date().toISOString().slice(0,10);$("reminderDays").value="3";$("customDateWrap").classList.add("hidden");render()};
$("searchFood").oninput=render;$("filterFood").onchange=render;

function renderGuide(name,storage,state){
 let key=Object.keys(produce).find(k=>name.toLowerCase().trim()===k||name.toLowerCase().includes(k));
 let data=key?produce[key]:null;
 if(!data && (state==="Cooked / prepared"||storage==="Refrigerator"))data=shelfDefaults["prepared food"];
 if(!data && name.toLowerCase().includes("milk"))data=shelfDefaults.dairy;
 if(!data)return `<div class="guide-spark">✦</div><b>General guidance for ${escapeHtml(name)}</b><span>We don't have a specific entry yet. For most cut vegetables and cooked leftovers, refrigerate at 4 °C or colder and use promptly. Tell us the exact food and preparation method for a more useful estimate.</span>`;
 let life=storage==="Freezer"?data.freezer:storage==="Room temperature"?data.room:data.fridge;
 let temp=storage==="Room temperature"?(data.temp.includes("°C")?data.temp:"Cool, dry place"):data.temp;
 if(state==="Cut / peeled"&&storage==="Refrigerator"&&key!=="potato")life="Use promptly; often 1–3 days (food-dependent)";
 if(state==="Cooked / prepared")life="3–4 days for many cooked leftovers, if promptly refrigerated";
 return `<div class="guide-spark">✦ STORAGE RESULT</div><b>${data.emoji||"🥗"} ${escapeHtml(name)}</b><div class="result-big">${life||"Not recommended"}</div><div class="result-tip"><b>Temperature:</b> ${temp||"Follow safe storage guidance"}<br><b>Storage tip:</b> ${data.tip}<br><b>Reminder:</b> Set a reminder earlier than the estimated limit and check the food before eating.</div>`;
}
$("checkStorage").onclick=()=>{let name=$("guideFood").value.trim();if(!name){$("guideFood").focus();return} $("guideResult").innerHTML=renderGuide(name,$("guideStorage").value,$("guideState").value)};
$("vegLibrary").innerHTML=common.slice(0,16).map(k=>`<div class="veg-chip"><span>${produce[k].emoji} ${k[0].toUpperCase()+k.slice(1)}</span><b>${produce[k].fridge}</b></div>`).join("");
$("foodSuggestions").innerHTML=common.map(k=>`<option value="${k[0].toUpperCase()+k.slice(1)}">`).join("");
$("notifyBtn").onclick=async()=>{if(!("Notification"in window)){alert("This browser does not support notifications.");return}let p=await Notification.requestPermission();$("notifyBtn").textContent=p==="granted"?"Notifications enabled": "Enable notifications";if(p==="granted")new Notification("Chillora",{body:"Notifications are enabled on this device."})};
function checkReminders(){if(!("Notification"in window)||Notification.permission!=="granted")return;let items=getItems(),sent=JSON.parse(localStorage.getItem("chilloraSent")||"{}"),now=new Date().toISOString().slice(0,10);items.forEach(x=>{if(x.reminder<=now&&!sent[x.id]){new Notification("Chillora reminder: "+x.name,{body:"Check your stored food. Open Chillora to update your list."});sent[x.id]=now}});localStorage.setItem("chilloraSent",JSON.stringify(sent))}
if("serviceWorker"in navigator && location.protocol!=="file:"){navigator.serviceWorker.register("service-worker.js").catch(()=>{})}
render();checkReminders();setInterval(checkReminders,60000);
