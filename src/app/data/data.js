import React from "react";
const head = [
  {name: "Nama Client", uid: "name"},
  {name: "Acara", uid: "acara"},
  {name: "Status", uid: "status"},
  {name: "Menu", uid: "actions"},
];

const songs = [
  {name: "Judul", uid: "judul"},
  {name: "Kategori", uid: "kategori"},
  {name: "Action", uid: "menu"},
];

const song = [
  {id:1,judul:"Song 1", kategori: "Wedding"},
  {id:2,judul:"Song 2", kategori: "Wedding"},
  {id:3,judul:"Song 3", kategori: "Wedding"},
  {id:4,judul:"Song 4", kategori: "Birthday"},
  {id:5,judul:"Song 5", kategori: "Birthday"},
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    acara: "Birthday",
    template: "Birthday 01",
    status: "soon",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    acara: "Wedding",
    template: "Wedding 01 Web",
    status: "finished",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    acara: "Engagement",
    template: "Engage 01 ",
    status: "soon",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    acara: "Wedding",
    template: "Wedding 03",
    status: "finished",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    acara: "Birthday",
    template: "Birthday 05",
    status: "soon",
    email: "kristen.cooper@example.com",
  },
];




export {head, users, songs, song};
