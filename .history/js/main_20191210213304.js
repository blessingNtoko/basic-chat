const msg = document.querySelector('input');

function onSubmit() {
    document.querySelector('form').submit((e) => {
        e.preventDefault();
        const value = document.querySelector('#m').val();
        console.log(value);
    })
};