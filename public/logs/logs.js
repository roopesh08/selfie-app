getData();
async function getData() {
  const response = await fetch("/api/selfie");
  const data = await response.json();

  for (item of data) {
    const root = document.createElement("p");
    const mood = document.createElement("div");
    const geo = document.createElement("div");
    const date = document.createElement("div");
    const image = document.createElement("img");
    mood.textContent = `Mood : ${item.mood}`;
    geo.textContent = `Location : ${item.lat},${item.log}`;

    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = `Date & Time:${dateString}`;
    image.src = item.image64;

    root.append(mood, geo, date, image);
    list.appendChild(root);
  }
  console.log(data);
}
