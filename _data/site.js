import getGigs from "./gigs.js";

const gigs = getGigs();

export default {
  title: "Abhinay Khoparzi",
  subtitle: "Creative Technologist, Algorave Artist, Livecoder, Video Producer",
  description: "Multidisciplinary creative technologist working across algorithmic music, livecoded shaders, film, and creative tools.",
  url: "https://khoparzi.com",
  baseurl: "",
  data: {
    gigs
  },
  author: {
    name: "Abhinay Khoparzi",
    email: "abhinay@khoparzi.com",
    github: "khoparzi",
    instagram: "khoparzi",
    twitch: "khoparzi",
    twitter: "khoparzi",
    linkedin: "khoparzi"
  },
  social: {
    github: "https://github.com/khoparzi",
    instagram: "https://instagram.com/khoparzi",
    twitch: "https://twitch.tv/khoparzi",
    linkedin: "https://linkedin.com/in/khoparzi",
    kofi: "https://ko-fi.com/C0C7XSIV"
  },
  nav: [
    { title: "About", url: "/aboutme/" },
    { title: "Film", url: "/film/" },
    { title: "Music", url: "/music/" },
    { title: "Video", url: "/video/" },
    { title: "Art", url: "/art/" },
    { title: "Gigs", url: "/gigs/" },
    { title: "Press", url: "/press/" }
  ]
};
