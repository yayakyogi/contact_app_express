const fs = require("fs");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContacts = () => {
  const file = fs.readFileSync("data/contact.json", "utf-8");
  const contact = JSON.parse(file);
  return contact;
};

const detailContact = (nama) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

// menuliskan / menimpan file contact.json
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
};

// menerima data dari route
const addContact = (contact) => {
  const contacts = loadContacts();
  contacts.push(contact);
  saveContacts(contacts);
};

// cek duplikat nama
const cekDuplikat = (nama) => {
  const contacts = loadContacts();
  return contacts.find((contact) => contact.nama === nama);
};

// delete contact
const deleteContact = (nama) => {
  const contacts = loadContacts();
  const newContact = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(newContact);
};

// update contact
const updateContact = (contactBaru) => {
  // ambil semua kontak
  const contacts = loadContacts();
  // hilangkan kontak lama yg namanya === oldNama
  const filteredContacts = contacts.filter(
    (contact) => contact.nama !== contactBaru.oldNama
  );
  // hapus properti oldNama
  delete contactBaru.oldNama;
  // masukkan data contactBaru ke dalam objek
  filteredContacts.push(contactBaru);
  // simpan ke file contact.json
  saveContacts(filteredContacts);
};

module.exports = {
  loadContacts,
  detailContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact,
};
