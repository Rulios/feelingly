export default function disableBtnAndLoad(btn: HTMLButtonElement ) {
    btn.disabled = true;
    btn.innerHTML = `${spinner()} Loading...`;
}

function spinner(){
    return `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
}