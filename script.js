/************** إعداد الخريطة ******************/
mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v11",
  zoom: 1.6,
  center: [0, 20],
});

/************** شاشة الترحيب ******************/
const welcome = document.getElementById("welcome-screen");
setTimeout(() => welcome.style.opacity = 1, 500);

welcome.addEventListener("click", () => {
  welcome.style.opacity = 0;
  setTimeout(() => welcome.remove(), 500);
});

/************** الطوارئ ******************/
document.getElementById("callEmergency").onclick = async () => {

  try {
    const geo = await fetch("https://ipapi.co/json").then(r => r.json());
    const country = geo.country_code;
    
    // قراءة ملف الطوارئ
    const data = await fetch("data.json").then(r => r.json());
    
    let emergency = data.emergency[country];
    if (!emergency) emergency = data.emergency["GLOBAL"];
    
    window.location.href = `tel:${emergency}`;
  }
  catch(e){
    alert("Emergency service unavailable");
  }
};
