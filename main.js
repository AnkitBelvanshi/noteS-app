import { renderNotes } from "./app.js";


let note = document.querySelector(".note");
let title = document.querySelector(".title");
let addNoteButton = document.querySelector(".add-btn");
let notesDisplay = document.querySelector(".notes-display");
let otherNotes = document.querySelector(".notes-container");
let pinnedNotes = document.querySelector(".pinned-notes-container");
let pinTitle = document.querySelector(".pin-title");
let otherTitle = document.querySelector(".other-title");
let arrOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

if(arrOfNotes.length > 0){
    pinTitle.classList.toggle("d-none");
    otherTitle.classList.toggle("d-none");
}

notesDisplay.addEventListener("click", (e) => {
    let type = e.target.dataset.type;
    let noteId = e.target.dataset.id;

    switch (type){
        case "del":
            arrOfNotes = arrOfNotes.filter(({id}) => id.toString() !== noteId);
            otherNotes.innerHTML = renderNotes(arrOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            pinnedNotes.innerHTML = renderNotes(arrOfNotes.filter(({isPinned}) => isPinned));
            localStorage.setItem("notes", JSON.stringify(arrOfNotes));
            break;
        case "pinned":
            arrOfNotes = arrOfNotes.map(note => note.id.toString() === noteId ? {...note, isPinned: !note.isPinned}: note);
            otherNotes.innerHTML = renderNotes(arrOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            pinnedNotes.innerHTML = renderNotes(arrOfNotes.filter(({isPinned}) => isPinned));
            localStorage.setItem("notes", JSON.stringify(arrOfNotes));
            break;
        case "archived":
            arrOfNotes = arrOfNotes.map(note => note.id.toString() === noteId ? {...note, isArchived: !note.isArchived}: note);
            otherNotes.innerHTML= renderNotes(arrOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            localStorage.setItem("notes", JSON.stringify(arrOfNotes));
            break;
    }
})


addNoteButton.addEventListener("click", () => {
    if(note.value.trim().length > 0 || title.value.trim().length > 0){
        arrOfNotes = [...arrOfNotes,{
            id: Date.now(),
            title: title.value.trim(),
            note: note.value.trim(),
            isPinned: false,
            isArchived: false}];
            note.value = title.value = "";
            otherNotes.innerHTML = renderNotes(arrOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            localStorage.setItem("notes", JSON.stringify(arrOfNotes));
    }
});

otherNotes.innerHTML = renderNotes(arrOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
pinnedNotes.innerHTML = renderNotes(arrOfNotes.filter(({isPinned}) => isPinned));