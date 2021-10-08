const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const prevButtons = document.querySelectorAll('.prev');
const nextButtons = document.querySelectorAll('.next');
const firstProject = document.querySelector('.first');
const lastProject = document.querySelector('.last');
const projects = document.querySelectorAll('.project');
const discord = document.querySelector('#discord');
const instagram = document.querySelector('#instagram');
const codepen = document.querySelector('#codepen');
const github = document.querySelector('#github');


navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

// makes the next project active on button click
nextButtons.forEach(button => {
    const project = button.parentElement.parentElement;

    button.addEventListener("click", function () {
        project.classList.toggle('active');
        project.classList.add('hidden');

        let nextProject = project.nextElementSibling ? project.nextElementSibling : firstProject;
        nextProject.classList.toggle('hidden');
        nextProject.classList.add('active');
    });
});

// makes the prev project active on button click
prevButtons.forEach(button => {
    const project = button.parentElement.parentElement;

    button.addEventListener("click", function () {
        project.classList.toggle('active');
        project.classList.add('hidden');

        let prevProject = project == firstProject ? lastProject : project.previousElementSibling;
        prevProject.classList.toggle('hidden');
        prevProject.classList.add('active');
    });
});

discord.addEventListener("click", function () {
    window.open("https://dsc.bio/joshtrivedi");
});

instagram.addEventListener("click", function () {
    window.open("https://www.instagram.com/josh_trivedi/");
});

github.addEventListener("click", function () {
    window.open("https://github.com/joshtrivedi/");
});

codepen.addEventListener("click", function () {
    window.open("https://www.linkedin.com/in/josh-trivedi/");
});