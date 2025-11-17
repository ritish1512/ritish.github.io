// Load saved notes on page load
window.onload = () => {
    const saved = localStorage.getItem("ritishNotes");
    if (saved) {
        document.getElementById("notesArea").value = saved;
    }
}

// Save notes to browser
function saveNotes() {
    const notes = document.getElementById("notesArea").value;
    localStorage.setItem("ritishNotes", notes);
    alert("Your notes have been saved!");
}

// Clear notes
function clearNotes() {
    document.getElementById("notesArea").value = "";
    localStorage.removeItem("ritishNotes");
    alert("Notes cleared!");
}
