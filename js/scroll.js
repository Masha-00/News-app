// Scroll
const btnTop = document.querySelector('.scroll-up');
btnTop.addEventListener('click', function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})
window.addEventListener('scroll', function(){
    if(document.body.scrollTop > 100 || this.document.documentElement.scrollTop > 100){
        btnTop.style.display = 'block';
    } else {
        btnTop.style.display = 'none';
    }
})