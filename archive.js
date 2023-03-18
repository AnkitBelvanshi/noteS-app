import { renderNotes } from "./app.js";

let arrOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

let archivedNotes = document.querySelector(".archive-notes-container");

archivedNotes.addEventListener("click", (e) => {
    let type = e.target.dataset.type;
    let noteId = e.target.dataset.id;

    switch(type){
        case "del":
            arrOfNotes = arrOfNotes.filter(({id}) => id.toString() !== noteId);
            archivedNotes.innerHTML = renderNotes(arrOfNotes.filter(({isArchived}) => isArchived));
            localStorage.setItem("notes", JSON.stringify(arrOfNotes));
            break;
        case "archived":
            arrOfNotes = arrOfNotes.map(note => note.id.toString() === noteId ? {...note,isArchived: !note.isArchived}: note);
            archivedNotes.innerHTML = renderNotes(arrOfNotes.filter(({isArchived}) => isArchived));
            localStorage.setItem("notes", JSON.stringify(arrOfNotes));
            break;
        case "pinned":
            arrOfNotes = arrOfNotes.filter(({id}) => id.toString() === noteId ? {...note, isArchived: !note.isArchived}: note);
            archivedNotes.innerHTML = renderNotes(arrOfNotes.filter(({isArchived}) => !isArchived ));
            localStorage.setItem("notes", JSON.stringify(arrOfNotes));
            break;
    }

});

archivedNotes.innerHTML = renderNotes(arrOfNotes.filter(({isArchived}) => isArchived));