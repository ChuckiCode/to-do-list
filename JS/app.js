'use strict';

////Elements
const task = document.querySelector('#to_do_txt');
const expire = document.querySelector('#expireTime');
const noti = document.querySelector('#notifiMe');
const createBtn = document.querySelector('#btn');
const newBlock = document.querySelector('#newTaskBolck');
const completeBlock = document.querySelector('#completBlock');
const toDoSmallHelpEl = document.querySelector('#toDoSmallHelp');
const toDoSmallHelp_dateEl = document.querySelector('#toDoSmallHelp_date');
const helpBtnEl = document.querySelector('#helpBtn');
const helpWindowEL = document.querySelector('.helpWindow');
const form_containerEL = document.querySelector('#form_container');
const task_containerEL = document.querySelector('#task_container');
const closeBtnEL = document.querySelector('#closeBtn');

////Objects
const myDate = new Date();
const currentDay = myDate.toLocaleDateString("en-US", {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

////Events
createBtn.addEventListener('click', addNewTask);

const currentDate = `${myDate.getUTCFullYear()}-${myDate.getUTCMonth() + 1}-${myDate.getDate()}`;

const timeStamp = function(date1, date2){
    let diff = date1 - date2;
    let dayDiff = Math.floor(diff/1000/60/24);
    diff -= dayDiff*1000*60*60*24;
    let hoursDiff = Math.floor(diff/1000/60/60);
    diff -= hoursDiff*1000*60;
    let minDiff = Math.floor(diff/1000/60);
    diff -= minDiff*1000*60;
    let secDiff = Math.floor(diff/1000);
    // diff -= secDiff*1000;
    return console.log(Math.trunc(diff / 1000 * 60 * 60));
}

helpBtnEl.addEventListener('click', function(){
    form_containerEL.style.display = 'none';
    task_containerEL.style.display = 'none';
    helpWindowEL.style.display = 'block';

})

closeBtnEL.addEventListener('click', function(){
    form_containerEL.style.display = 'block';
    task_containerEL.style.display = 'block';
    helpWindowEL.style.display = 'none';
});


///Create new task function
function addNewTask(){
    if(task.value !== '' && expire.value !== ''){

        if(toDoSmallHelpEl.classList.contains('error') || toDoSmallHelp_dateEl.classList.contains('error')){
            toDoSmallHelpEl.textContent = `What do you need to do?`;
            toDoSmallHelpEl.classList.add('form-text');
            toDoSmallHelpEl.classList.add('text-muted');
            toDoSmallHelpEl.classList.remove('error');
            toDoSmallHelp_dateEl.textContent = `What do you need to do?`;
            toDoSmallHelp_dateEl.classList.add('form-text');
            toDoSmallHelp_dateEl.classList.add('text-muted');
            toDoSmallHelp_dateEl.classList.remove('error');
        };

        let expire_timestapm = expire.valueAsNumber;
        let currentDate_timestamp = myDate.getTime();

        timeStamp(currentDate_timestamp, expire_timestapm);
        console.log(currentDate - expire_timestapm)
    
        const container = document.createElement('div');
        container.classList.add('taskContainer');
        newBlock.append(container);
    
        if(noti.checked === true){
            container.style.backgroundColor = 'rgb(255, 246, 195)';
        }
    
        const headerContaineer = document.createElement('div');
        headerContaineer.classList.add('taskNameContainer');
        headerContaineer.innerHTML = `<h4>${task.value}</h4>`
        container.append(headerContaineer);
    
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonsBox');
        buttonContainer.innerHTML = `<button class="checkBtn"><img src="media/check-circle.svg" alt=""></button>
        <button class="delBtn"><img src="media/trash-fill.svg" alt=""></button>`;
        container.append(buttonContainer);
    
        const startContainer = document.createElement('div');
        startContainer.classList.add('timeContainer_start');
        startContainer.innerHTML = `<small>${currentDate}</small>`;
        container.append(startContainer);
    
        const endContainer = document.createElement('div');
        endContainer.classList.add('timeContainer_end');
        endContainer.innerHTML = `<small> Expire at ${expire.value}</small>`;
        container.append(endContainer);
    }
    
    else if(task.value === ''){
        toDoSmallHelpEl.textContent = `Enter a task in the text field`;
        toDoSmallHelpEl.classList.remove('form-text');
        toDoSmallHelpEl.classList.remove('text-muted');
        toDoSmallHelpEl.classList.add('error');
    }
 
    else if(expire.value === ''){
        toDoSmallHelp_dateEl.textContent = `Enter a expire date in the text field`;
        toDoSmallHelp_dateEl.classList.remove('form-text');
        toDoSmallHelp_dateEl.classList.remove('text-muted');
        toDoSmallHelp_dateEl.classList.add('error');

    };

///Reset input values
    task.value = '';
    expire.value = '';

// del button element
    const delBtnClass = document.querySelectorAll('.delBtn');
///Del button event
    delBtnClass.forEach(btn => {
        btn.addEventListener('click', function(){
            btn.parentElement.parentElement.remove();
    });
});


///Check button element
    const checkedBtnClass = document.querySelectorAll('.checkBtn');
// Checked button event    
    checkedBtnClass.forEach(btn => {
        btn.addEventListener('click', function () {
            completeBlock.append(btn.parentElement.parentElement);
            let currContainer = btn.parentNode.parentNode;
            currContainer.classList.remove('taskContainer');
            currContainer.classList.add('taskContainer_complete');
            btn.classList.add('checkBtn_disable');
            btn.classList.remove('checkBtn');
          });
    });
};

