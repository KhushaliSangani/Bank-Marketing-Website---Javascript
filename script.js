'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
let scrollBtn = document.querySelector('.btn--scroll-to');
let section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

//opening & closing modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//implement smooth scrolling
scrollBtn.addEventListener('click', function (e) {
  let s1Cord = section1.getBoundingClientRect();
  console.log(window.pageYOffset);
  console.log(s1Cord.top);
  console.log(window.pageYOffset + s1Cord.top);
  window.scrollTo({
    left: s1Cord.left,
    top: s1Cord.top + window.pageYOffset,
    behavior: 'smooth',
  });
});

//page navigation

// document.querySelectorAll('.nav__link').forEach(el=>{
//   el.addEventListener('click',function(e){
//     // console.log('click');
//     e.preventDefault();
//     let id = this.getAttribute('href');
//     // console.log();
//     document.querySelector(id).scrollIntoView({behavior:"smooth"})
//   })
// })

//or using event delegation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    // console.log('click');
    let id = e.target.getAttribute('href');
    //     // console.log();
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//tabbed component
document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    e.preventDefault();
    // console.log('click');
    let clickedElement = e.target.closest('.operations__tab');
    // console.log(clickedElement);
    if (!clickedElement) return;
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    clickedElement.classList.add('operations__tab--active');
    let tabsId = clickedElement.dataset.tab;
    console.log(tabsId);
    document
      .querySelector(`.operations__content--${tabsId}`)
      .classList.add('operations__content--active');
  });

//link menu fade animation

const mouseHover = (e, opacity) => {
  // console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    // console.log(siblings);
    siblings.forEach(el => {
      // console.log(el);
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener('mouseover', e => {
  mouseHover(e, 0.5);
});
nav.addEventListener('mouseout', e => {
  mouseHover(e, 1);
});


//sticky navigation

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords.top);

// window.addEventListener('scroll',()=>{
//   if(window.scrollY > initialCoords.top){
//     nav.classList.add('sticky')
//   }else{
//     nav.classList.remove('sticky')
    
//   }  
// })

//OR
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav =(entries)=>{
  const [entry] = entries;
  if(!entry.isIntersecting){
    nav.classList.add('sticky')
  }else{
    nav.classList.remove('sticky')
    
  }
}
const headerObserver = new IntersectionObserver(stickyNav ,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`
})
headerObserver.observe(header);

//Reveals Sections
const revealSections =(entries,observer)=>{
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSections,{
root:null,
threshold:0.15
})

const sections = document.querySelectorAll('.section');
sections.forEach((section)=>{
sectionObserver.observe(section);
// section.classList.add('section--hidden');
})

//lazyloading Images
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg =(entries,observer)=>{
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load',()=>{
   entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg ,{
  root:null,
  threshold:0
})

imgTargets.forEach((img)=>{
  imgObserver.observe(img);
})

//slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
// slider.style.overflow ='visible';
// slider.style.transform = 'scale(0.4) translateX(-665px)';
let currSlide = 0;
const maxSlide = slides.length;

const goToSlide =(slide)=>{
  slides.forEach((s,i)=>{
    s.style.transform = `translateX(${100 * (i-slide)}%)`
  })
}

goToSlide(currSlide);

const nextSlide =()=>{
  if(currSlide === maxSlide-1){
    currSlide =0;
  }else{
   currSlide++;
  }
  goToSlide(currSlide);
}
const prevSlide =()=>{
  if(currSlide === 0){
    currSlide = maxSlide -1;
  }else{
    currSlide--;
  }
  goToSlide(currSlide);
}
btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click',prevSlide)