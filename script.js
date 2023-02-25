const addbtn = document.querySelector('.add');

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(note => addNewNote(note));
}

addbtn.addEventListener('click',()=>{
    addNewNote();
});
function addNewNote(text=''){
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML =  `
    <div class="tools">
            <button class="edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>

        <div class="main ${text ? "":"hidden"}"></div>
        <textarea class="${text ? "hidden":""}"></textarea>
    `
    const editbtn = note.querySelector('.edit');
    const deletebtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked.parse(text);
    
    deletebtn.addEventListener('click',()=>{
        note.remove();
        UpdateLs();
    });
    editbtn.addEventListener('click',()=>{
        textArea.classList.toggle('hidden');
        main.classList.toggle('hidden');
    });

    textArea.addEventListener('input',(e)=>{
        const {value} = e.target;
    
        main.innerHTML = marked.parse(value);


        UpdateLs();
    });

    document.body.appendChild(note);
}

function UpdateLs(){
    const notesText = document.querySelectorAll('textarea');
    const Notes = [];

    notesText.forEach(note => Notes.push(note.value));
    console.log(Notes);
    localStorage.setItem('notes',JSON.stringify(Notes));

}
const clear = document.querySelector('.confirm');
function clearAll(){
    const note = document.querySelectorAll('.note');
    note.forEach((noteEl)=>noteEl.remove());
}
clear.addEventListener('click',(e)=>{
    localStorage.clear();
    clearAll();
    closeModal();
});

//////////////////////////////////////////////////
//ripple effect
const buttons = document.querySelectorAll('.ripple');

buttons.forEach((btn)=>{
    btn.addEventListener('click',function(e){
        const x = e.clientX;
        const y = e.clientY;

        console.log(x,y);

        const btntop = e.target.offsetTop;
        const btnleft = e.target.offsetLeft;
        console.log(btnleft,btntop);
        const xInside = x - btnleft;
        const yInside = y - btntop;
        console.log(xInside,yInside);

        const circle = document.createElement('span');
        circle.classList.add('circle');
        circle.style.top = yInside + 'px';
        circle.style.left = xInside + 'px';

        this.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 500);
    });
});
//////////////////////////////////////////////////
//modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnclosemodal = document.querySelector('.close-modal');
const btnshowmodal = document.querySelectorAll('.show-modal');
const openModal = function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.querySelector('body').style.overflow = "hidden";
}
const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    document.querySelector('body').style.overflow = "auto";
}
for (let i = 0; i < btnshowmodal.length; i++) {
    btnshowmodal[i].addEventListener('click',()=>{openModal();});
}
btnclosemodal.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal);


document.addEventListener('keydown',function(e){
    console.log(e);
    if(e.key === 'Escape' && !modal.classList.contains('hidden')){
        closeModal();
    }
});