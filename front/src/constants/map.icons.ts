import Leaflet from "leaflet";


export const getUserIcon = (color: string) => Leaflet.divIcon({
  html: `
 <svg width="25" height="36" viewBox="0 0 25 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.75 0.699997C5.995 0.699997 0.5 6.195 0.5 12.95C0.5 22.1375 12.75 35.7 12.75 35.7C12.75 35.7 25 22.1375 25 12.95C25 6.195 19.505 0.699997 12.75 0.699997ZM12.75 4.2C14.675 4.2 16.25 5.775 16.25 7.7C16.25 9.6425 14.675 11.2 12.75 11.2C10.825 11.2 9.25 9.6425 9.25 7.7C9.25 5.775 10.825 4.2 12.75 4.2ZM12.75 21.7C9.8275 21.7 7.255 20.2125 5.75 17.9375C5.785 15.6275 10.4225 14.35 12.75 14.35C15.0775 14.35 19.715 15.6275 19.75 17.9375C18.245 20.2125 15.6725 21.7 12.75 21.7V21.7Z" 
fill="${color}"/>
</svg>

  `,
  iconSize:     [25, 36], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [13, 34], // point of the icon which will correspond to marker's location
  className: "user-marker",
})

export const FLAG_ICON = Leaflet.icon({
  iconUrl: require("../assets/flag.png"),
  iconSize: [27, 32],
  iconAnchor: [13.5, 32]
})
