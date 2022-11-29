let buttons = document.getElementById('buttons').childNodes;
let scrn = document.getElementById('scrn');
let error = document.getElementById('greet');
let del = document.getElementById('delete');


let exp = new String;
//displays welcome for 3s
setTimeout(() => {
    error.classList.add('hide');
}, 3000);
const display = (text) => {
    if (text.length >= 15) {
        scrn.style.fontSize = '2rem';
    }
    else {
        scrn.style.fontSize = '3rem';
    }
    scrn.innerText = text === ''? '0':text;
}
//display error
const displayerror=(err)=>{
    if(err){
    error.classList.remove('hide');
    error.innerText = err;
    }
    else{
        error.classList.add('hide');
    }
}
//delete function
const dele = () => {
    if (exp.length !== 0) {
        exp = exp.substr(0, exp.length - 1);
        display(exp);
    }
    else {
        displayerror("Nothing to delete");
    }
}
const handleclick = (key) => {
    displayerror();
    if (key === 'C') {
        exp = '';
        display(exp);
        return;
    }
    if (key === '=') {
        let ans = Function('"use strict";return (' + exp + ')')(); //converts the string to expression
        display(ans);
            exp = String(ans);
        return;
    }
    exp += key;
    display(exp);
}
//adding eventlisteners for all keys
buttons.forEach(item => {
    item.addEventListener('click', () => { handleclick(item.innerText) });
});
window.addEventListener('keypress', (e) => {
    let k = e.key;
    if(e.keyCode===32){
        return;
    }
    if ((k <= 9 && k >= 0) || k === '+' || k === '=' || k === '-' || k === 'C' || k === '*' || k === '/' || k === 'Enter' || k === 'Delete') {
        if (k === 'Delete') {
            dele();
            return;
        }
        handleclick(k == 'Enter' ? '=' : k);
    }
    else {
        displayerror(k + ' is not allowed');
    }
});
del.addEventListener('click', dele);
