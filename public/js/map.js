


  const map = new maplibregl.Map({
    container: "map", // same container ID
    style: `https://api.maptiler.com/maps/streets/style.json?key=${mapToken}`, // MapTiler style
    center:listing.geometry.coordinates, // same starting position [lng, lat]
    zoom: 9, // starting zoom
  });

const marker = new maplibregl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) // [lng, lat]
  .setPopup(
    new maplibregl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.title}</h4>
       <p>Exact location will be provided after booking</p>`
    )
  )
  .addTo(map);


