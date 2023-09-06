import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function callApi() {
  let contacts = {} 
  await fetch("https://jsonplaceholder.typicode.com/users?fbclid=IwAR1Kv9vAk1UhU60d3ZB-nwbilDAnJ-HYz-x35sOx0_XaxFof8dzSqDbdsqg")
    .then((response) => response.json())
    .then((json) => {
      contacts = json;
      // data da dc set trang thai
      console.log(json);
    });
    return contacts;
}


export async function getContacts(query) {
  //  tạo ra một kết nối giả tới service để lấy dữ liệu
  await fakeNetwork(`getContacts:${query}`);

  let contacts = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  // fake 1 network mất một khoảng thời gian nào đó
  await fakeNetwork();
  // tạo ra một cái id duy nhất
  let id = Math.random().toString(36).substring(2, 9);
  // tạo ra một object contact với id và createAt vừa sinh ra
  let contact = { id, name: Date.now() };
  // lấy ra một danh sách mảng contacts
  let contacts = await getContacts();
  // thêm object contact vừa tạo vào mảng đã get ra vào đầu
  contacts.unshift(contact);
  //  set lại contact đã được cập nhật
  await set(contacts);
  return contact;
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find(contact => contact.id === id);
  // "?? " để kiểm tra chính nó nếu là true thì trả về một contact còn false thì trả ra null
  return contact ?? null;
}

export async function updateContact(id, updates) {
  await fakeNetwork();
//  lấy ra một danh sách contacts
  let contacts = await localforage.getItem("contacts");
// tìm objject contacts với id tương ứng trong list contacts bên trên
  let contact = contacts.find(contact => contact.id === id);
  // nếu chưa có thì in ra lỗi
  if (!contact) throw new Error("No contact found for", id);
  //  nếu tìm được thì gán contacts tìm được bằng cái object updates mà mình thêm vào form khi nãy
  Object.assign(contact, updates);
  //  thực hiện set lại giá trị contacts
  await set(contacts);
  return contact;
}

export async function deleteContact(id) {
  let contacts = await localforage.getItem("contacts");
  let index = contacts.findIndex(contact => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}