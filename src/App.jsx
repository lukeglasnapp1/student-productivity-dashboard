import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import StatCard from './components/StatCard.jsx';
import TaskItem from './components/TaskItem.jsx';
import AddTaskForm from './components/AddTaskForm.jsx';

const starterTasks = [
 {id:1,title:'Review lecture notes',course:'Computer Architecture',due:'Today',priority:'High',completed:false},
 {id:2,title:'Finish data structures practice',course:'Data Structures',due:'Tomorrow',priority:'Medium',completed:false},
 {id:3,title:'Read chapter 6',course:'Ethics',due:'Fri, Oct 23',priority:'Low',completed:true},
 {id:4,title:'Submit project reflection',course:'Web Development',due:'Mon, Oct 26',priority:'High',completed:false}
];
export default function App(){
 const [view,setView]=useState('Overview');
 const [tasks,setTasks]=useState(starterTasks);
 const [showForm,setShowForm]=useState(false);
 const [search,setSearch]=useState('');
 const filtered=useMemo(()=>tasks.filter(t=>`${t.title} ${t.course}`.toLowerCase().includes(search.toLowerCase())),[tasks,search]);
 const addTask=data=>{setTasks(old=>[...old,{...data,id:Date.now(),completed:false}]);setShowForm(false);setView('Tasks');};
 const toggleTask=id=>setTasks(old=>old.map(t=>t.id===id?{...t,completed:!t.completed}:t));
 const deleteTask=id=>setTasks(old=>old.filter(t=>t.id!==id));
 const completed=tasks.filter(t=>t.completed).length;
 const dueToday=tasks.filter(t=>!t.completed&&t.due==='Today').length;
 return <div className="app-shell">
  <Sidebar activeView={view} onNavigate={setView}/>
  <div className="main-column">
   <Header view={view} search={search} onSearch={setSearch} onAdd={()=>setShowForm(v=>!v)}/>
   <main className="page-content">
    {showForm&&<AddTaskForm onAdd={addTask} onCancel={()=>setShowForm(false)}/>}
    {view==='Overview'&&<>
     <section className="hero"><div><p className="eyebrow light">A LITTLE PROGRESS ADDS UP</p><h2>Make room for your best work.</h2><p>Keep your assignments organized and focus on what matters today.</p><button className="light-button" onClick={()=>setView('Tasks')}>View my tasks →</button></div><div className="hero-art" aria-hidden="true"><div className="sun"/><div className="book book-a"/><div className="book book-b">✦<small>FOCUS</small></div></div></section>
     <section className="stats"><StatCard label="Total tasks" value={tasks.length} detail="in your planner" icon="▤" tone="purple"/><StatCard label="Completed" value={completed} detail={`${tasks.length?Math.round(completed/tasks.length*100):0}% of all tasks`} icon="✓" tone="green"/><StatCard label="Due today" value={dueToday} detail="needs your attention" icon="◷" tone="orange"/></section>
     <section className="card"><div className="section-head"><div><p className="eyebrow">STAY ON TRACK</p><h3>Upcoming tasks</h3></div><button className="text-button" onClick={()=>setView('Tasks')}>See all →</button></div>
      {filtered.filter(t=>!t.completed).slice(0,4).map(t=><TaskItem key={t.id} task={t} onToggle={toggleTask} compact/>)}
      {!filtered.some(t=>!t.completed)&&<p className="empty">You're all caught up. Nice work!</p>}
     </section>
    </>}
    {view==='Tasks'&&<section className="card"><div className="section-head"><div><p className="eyebrow">YOUR ASSIGNMENTS</p><h3>Task list</h3><p className="muted">Check off finished work or remove tasks you no longer need.</p></div><span className="pill">{filtered.filter(t=>!t.completed).length} remaining</span></div>
      {filtered.map(t=><TaskItem key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask}/>)}
      {!filtered.length&&<p className="empty">No matching tasks. Try another search or add a task.</p>}
     </section>}
    {view==='Schedule'&&<section className="card"><div className="section-head"><div><p className="eyebrow">WEEK AT A GLANCE</p><h3>Your study schedule</h3><p className="muted">A simple view of your upcoming workload.</p></div></div><div className="week">{['MON','TUE','WED','THU','FRI'].map((day,i)=>{const assigned=tasks.filter(t=>!t.completed)[i];return <div className="day" key={day}><b>{day}</b><strong>{19+i}</strong>{assigned?<div className={`event ${assigned.priority.toLowerCase()}`}><b>{assigned.title}</b><small>{assigned.course}</small></div>:<small className="open">Open time</small>}</div>})}</div><p className="legend">● High priority　 <span>● Medium priority</span>　<em>● Low priority</em></p></section>}
   </main><footer>Small steps, steady progress. You’ve got this.</footer>
  </div>
 </div>;
}
