// Burger
const burger = document.querySelector('.burger');
const categoris = document.querySelector('.down-menu');
const trend = document.querySelector('.trend');

burger.addEventListener('click', () => {
    burger.classList.toggle('burger-active');
    categoris.classList.toggle('active');
    trend.classList.toggle('active');
});