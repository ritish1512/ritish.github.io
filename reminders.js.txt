// Basic reminders using localStorage + setTimeout + Notification API
} else {
alert(`Reminder: ${body}`);
}
}


function renderReminders(){
reminderList.innerHTML = '';
reminders.forEach((r,i) => {
const li = document.createElement('li');
li.className = 'todo-item' + (r.fired ? ' completed' : '');
li.innerHTML = `
<div class="title">${escapeHTML(r.text)} <div class="muted">— ${new Date(r.when).toLocaleString()}</div></div>
<div class="actions">
${r.fired ? '' : `<button class="btn soft cancel" data-i="${i}">Cancel</button>`}
<button class="btn soft del" data-i="${i}">Delete</button>
</div>
`;
reminderList.appendChild(li);
});
}


function addReminder(text, when){
reminders.push({ text, when, fired: false, created: Date.now() });
saveRem(); scheduleAll(); renderReminders();
}


function cancelReminder(i){ reminders.splice(i,1); saveRem(); scheduleAll(); renderReminders(); }


function escapeHTML(s){ return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }


// events
document.getElementById('setReminder').addEventListener('click', () => {
const text = document.getElementById('reminderText').value;
const when = document.getElementById('reminderTime').value;
if(!text || !when) return alert('Add text and time');
addReminder(text, when);
document.getElementById('reminderText').value = '';
document.getElementById('reminderTime').value = '';
});


reminderList.addEventListener('click', e => {
const i = e.target.dataset.i;
if(e.target.classList.contains('cancel')){ reminders[i].fired = true; saveRem(); scheduleAll(); renderReminders(); }
if(e.target.classList.contains('del')){ cancelReminder(i); }
});


// Permission
if(window.Notification && Notification.permission !== 'granted'){
Notification.requestPermission();
}


renderReminders(); scheduleAll();