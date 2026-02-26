const resorts = [
  { name: 'Chamonix', lat: 45.9237, lon: 6.8694 },
  { name: 'Verbier', lat: 46.0960, lon: 7.2268 },
  { name: 'Zermatt', lat: 46.0199, lon: 7.7491 },
  { name: 'Les%20Gets', lat: 46.1943, lon: 6.6563 }
];

const container = document.getElementById('resorts');

function weatherCodeToEmoji(code){
  if(code===0) return '☀️';
  if(code<=3) return '⛅';
  if((code>=51 && code<=67) || (code>=80 && code<=82)) return '🌧️';
  if(code>=71 && code<=77) return '🌨️';
  if(code>=95) return '⛈️';
  return '🌫️';
}

async function fetchWeather(lat, lon){
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Europe%2FBerlin`;
  const res = await fetch(url);
  if(!res.ok) throw new Error('weather fetch failed');
  return res.json();
}

function makeCard(resort){
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <h2>${decodeURIComponent(resort.name)}</h2>
    <div class="meta">
      <div class="icon" aria-hidden="true">⏳</div>
      <div>
        <div class="temp">—</div>
        <div class="desc">Loading…</div>
      </div>
    </div>
  `;
  return el;
}

async function render(){
  container.innerHTML = '';
  const cards = resorts.map(r => ({ r, el: makeCard(r) }));
  cards.forEach(c => container.appendChild(c.el));

  await Promise.all(cards.map(async (c) => {
    try{
      const data = await fetchWeather(c.r.lat, c.r.lon);
      const w = data.current_weather;
      const icon = weatherCodeToEmoji(w.weathercode);
      c.el.querySelector('.icon').textContent = icon;
      c.el.querySelector('.temp').textContent = `${Math.round(w.temperature)}°C`;
      c.el.querySelector('.desc').textContent = `Wind ${Math.round(w.windspeed)} km/h`;
    }catch(e){
      c.el.querySelector('.desc').textContent = 'Unavailable';
    }
  }));
}

render();
