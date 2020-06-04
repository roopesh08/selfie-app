function setup() {
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(320, 240);
  if ("geolocation" in navigator) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const log = position.coords.longitude;
      document.getElementById("lattitude").textContent = lat;
      document.getElementById("logtitude").textContent = log;
      //console.log(position);

      //Map location
      const mymap = L.map("mymap").setView([lat, log], 10);
      // const attribution =
      //   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tileUrl =
        "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga";
      const tiles = L.tileLayer(tileUrl);
      tiles.addTo(mymap);
      const marker = L.marker([lat, log]).addTo(mymap);

      const button = document.getElementById("submit");
      button.addEventListener("click", async (event) => {
        const mood = document.getElementById("mood").value;
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        const data = { lat, log, mood, image64 };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        const response = await fetch("/api", options);
        const json = await response.json();
        console.log(json);
      });
      // //send Data to server
      // const data = { lat, log };
      // const options = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // };
      // const response = await fetch("/api", options);
      // const json = await response.json();
      // console.log(json);
    });
  } else {
    console.log("geolocation not available");
  }
}
