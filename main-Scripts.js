let phone = document.getElementsByClassName('phone')[0];
let openPhone = document.getElementsByClassName('phone-opend')[0];
let exitPhone = document.getElementsByClassName('exit-phone-icon')[0];

phone.addEventListener('click', () => {
  openPhone.style.visibility = 'visible';
});
exitPhone.addEventListener('click', () => {
  openPhone.style.visibility = 'hidden';
});

let noteBook = document.getElementsByClassName('notebook')[0];
let openNoteBook = document.getElementsByClassName('notebook-opend')[0];
let exitNoteBook = document.getElementsByClassName('exit-arrow-icon')[0];

noteBook.addEventListener('click', () => {
  openNoteBook.style.visibility = 'visible';
});
exitNoteBook.addEventListener('click', () => {
  openNoteBook.style.visibility = 'hidden';
});

let folder = document.getElementsByClassName('folder')[0];
let openFolder = document.getElementsByClassName('folder-open')[0];
let exitFolder = document.getElementsByClassName('exit-arrow-icon-2')[0];

folder.addEventListener('click', () => {
  openFolder.style.visibility = 'visible';
});
exitFolder.addEventListener('click', () => {
  openFolder.style.visibility = 'hidden';
});

this.texts = [
  {
      text: "بهنام بیست و چهار سالشه.",
  },
  {
      text: "بهنام ساکن مشهد است.",
  },
  {
      text: "بهنام به وقت شناسی اهمیت میده!",
  },
  {
      text: "بهنام کامل نیست ولی همیشه سعی میکنه بهترین عملکردشو به اجرا بذاره.",
  },
  {
      text: "بهنام علاقه به یادگیری چیزهای جدید داره.",
  },
  {
      text: "بهنام به ورزش علاقه داره و در حال حاضر پارکور کار میکنه.",
  },
];

const noteBookText = document.querySelector(".notebook-text"),
      previous = document.querySelector(".left-arrow-icon"),
      next = document.querySelector(".right-arrow-icon");

currentTextIndex = 0,
currentText = texts[0];

next.addEventListener('click', ()=> {
  if (currentTextIndex < texts.length - 1 ) {
    currentTextIndex++;
  }
  else {
    currentTextIndex = 0;
  }
  currentText = texts[currentTextIndex];
  noteBookText.innerText = currentText.text;
});

previous.addEventListener('click', ()=> {
  if (currentTextIndex > 0 ) {
    currentTextIndex--;
  }
  else {
    currentTextIndex = this.texts.length - 1;
  }
  currentText = texts[currentTextIndex];
  noteBookText.innerText = currentText.text;
});