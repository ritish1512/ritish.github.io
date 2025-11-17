const TODO_KEY = 'ritish_todos_v1';
const itemsLeft = document.getElementById('itemsLeft');


function save() { localStorage.setItem(TODO_KEY, JSON.stringify(todos)); }


function render() {
todoList.innerHTML = '';
const filtered = todos.filter(t => filter === 'all' || (filter === 'active' && !t.done) || (filter === 'completed' && t.done));
filtered.forEach((t, idx) => {
const li = document.createElement('li');
li.className = 'todo-item' + (t.done ? ' completed' : '');


li.innerHTML = `
<div class="checkbox" data-i="${idx}">${t.done ? '✓' : ''}</div>
<div class="title">${escapeHTML(t.text)}</div>
<div class="actions">
<div class="priority">${t.priority || 'Normal'}</div>
<button class="btn soft edit" data-i="${idx}">Edit</button>
<button class="btn soft delete" data-i="${idx}">Delete</button>
</div>
`;


todoList.appendChild(li);
});
itemsLeft.textContent = `${todos.filter(t => !t.done).length} items left`;
}


function addTodo(text){
if(!text || !text.trim()) return;
todos.unshift({ text: text.trim(), done: false, priority: 'Normal', created: Date.now() });
save(); render();
}


function toggleDone(i){ todos[i].done = !todos[i].done; save(); render(); }
function deleteTodo(i){ todos.splice(i,1); save(); render(); }


function editTodo(i){
const newText = prompt('Edit task', todos[i].text);
if(newText != null){ todos[i].text = newText; save(); render(); }
}


function exportTodos(){
const data = JSON.stringify(todos, null, 2);
const blob = new Blob([data], {type: 'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a'); a.href = url; a.download = 'todos.json'; a.click();
URL.revokeObjectURL(url);
}


function escapeHTML(s){ return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }


// Events
newTodoInput.addEventListener('keydown', e => { if(e.key === 'Enter'){ addTodo(newTodoInput.value); newTodoInput.value = ''; } });
document.getElementById('addBtn').addEventListener('click', () => { addTodo(newTodoInput.value); newTodoInput.value = ''; });


document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', e => {
document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
e.target.classList.add('active'); filter = e.target.dataset.filter; render();
}));


todoList.addEventListener('click', e => {
const target = e.target;
const idx = target.dataset && target.dataset.i;
if(target.classList.contains('checkbox')) toggleDone(idx);
if(target.classList.contains('delete')) deleteTodo(idx);
if(target.classList.contains('edit')) editTodo(idx);
});


document.getElementById('clearCompleted').addEventListener('click', () => { todos = todos.filter(t => !t.done); save(); render(); });
document.getElementById('exportBtn').addEventListener('click', exportTodos);


render();