import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const $ = (s) => document.querySelector(s);
const viewport = $('.project-viewport');
const projects = [...document.querySelectorAll('.project')];
const media = matchMedia('(prefers-reduced-motion: reduce)');
let disabled = media.matches;
let mm;
let rail;
let index = 0;
let removeMagnet = () => {};
function updateIndex() {
 const mid = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
 index = projects.reduce((best, card, i) => Math.abs(card.getBoundingClientRect().left + card.offsetWidth / 2 - mid) < Math.abs(projects[best].getBoundingClientRect().left + projects[best].offsetWidth / 2 - mid) ? i : best, 0);
 $('#project-count').textContent = `${String(index + 1).padStart(2,'0')} / 04`;
 $('#prev').disabled = index === 0;
 $('#next').disabled = index === 3;
 $('.work-progress span').style.transform = `translateX(${(viewport.scrollLeft / Math.max(1, viewport.scrollWidth - viewport.clientWidth)) * 300}%)`;
}
viewport.addEventListener('scroll', updateIndex, {passive:true});
function goToProject(i) {
 i = Math.max(0, Math.min(3, i));
 const distance = projects[i].getBoundingClientRect().left - projects[0].getBoundingClientRect().left;
 const max = viewport.scrollWidth - viewport.clientWidth;
 const target = Math.min(max, distance);
 if (rail) window.scrollTo({top: rail.start + (target / max) * (rail.end - rail.start), behavior: disabled ? 'instant' : 'smooth'});
 else viewport.scrollTo({left:target, behavior:disabled ? 'instant' : 'smooth'});
}
$('#prev').addEventListener('click', () => goToProject(index - 1));
$('#next').addEventListener('click', () => goToProject(index + 1));
viewport.addEventListener('focusin', e => {
 const card=e.target.closest('.project');
 if(card) goToProject(projects.indexOf(card));
});
function setupMotion() {
 mm?.revert(); removeMagnet(); rail = null;
 $('.work').classList.remove('is-pinned');
 document.body.classList.toggle('motion-off', disabled);
 $('#motion-toggle').textContent = `Motion: ${disabled ? 'off' : 'on'}`;
 $('#motion-toggle').setAttribute('aria-pressed', String(disabled));
 mm = gsap.matchMedia();
 if (!disabled) {
 mm.add('all', () => {
 gsap.from('.title-line', {y:65, opacity:0, duration:1.1, stagger:.12, ease:'power3.out'});
 gsap.from('.hero-bottom > *', {y:25, opacity:0, duration:.8, stagger:.12, delay:.25, ease:'power2.out'});
 gsap.utils.toArray('[data-reveal]').forEach(el => gsap.from(el, {y:35, opacity:0, duration:.8, ease:'power2.out', scrollTrigger:{trigger:el, start:'top 92%', once:true}}));
 });
 mm.add('(min-width: 1000px) and (min-height: 800px)', () => {
 $('.work').classList.add('is-pinned');
 gsap.to('.portrait-frame img', {yPercent:-10, ease:'none', scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:1}});
 const anim=gsap.to(viewport, {scrollLeft:()=>viewport.scrollWidth-viewport.clientWidth,ease:'none',scrollTrigger:{id:'project-rail',trigger:'.work',start:'top top',end:()=>`+=${viewport.scrollWidth-viewport.clientWidth}`,pin:true,scrub:.65,invalidateOnRefresh:true,onUpdate:updateIndex}});
 rail=anim.scrollTrigger;
 return () => { rail=null; $('.work').classList.remove('is-pinned'); };
 });
 if(matchMedia('(pointer: fine)').matches) {
 const el=$('[data-magnetic]');
 const x=gsap.quickTo(el,'x',{duration:.5,ease:'power3.out'});
 const y=gsap.quickTo(el,'y',{duration:.5,ease:'power3.out'});
 const move=e=>{const r=el.getBoundingClientRect();x((e.clientX-r.left-r.width/2)*.025);y((e.clientY-r.top-r.height/2)*.08)};
 const reset=()=>{x(0);y(0)};
 el.addEventListener('pointermove',move);el.addEventListener('pointerleave',reset);el.addEventListener('blur',reset);
 removeMagnet=()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);el.removeEventListener('blur',reset);gsap.killTweensOf(el);gsap.set(el,{clearProps:'transform'})};
 }
 }
 ScrollTrigger.refresh(); updateIndex();
}
$('#motion-toggle').addEventListener('click',()=>{disabled=!disabled;setupMotion()});
media.addEventListener('change',e=>{disabled=e.matches;setupMotion()});
for(const link of document.querySelectorAll('a[href^="#"]')) link.addEventListener('click',e=>{
 const target=document.querySelector(link.getAttribute('href'));
 if(!target) return;
 e.preventDefault();
 history.pushState(null,'',link.getAttribute('href'));
 const top=target.id==='work' && rail ? rail.start : target.getBoundingClientRect().top+window.scrollY-25;
 window.scrollTo({top,behavior:disabled?'instant':'smooth'});
 target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
});
function progress(){const max=document.documentElement.scrollHeight-innerHeight;$('.progress').style.transform=`scaleX(${max?scrollY/max:0})`}
window.addEventListener('scroll',progress,{passive:true});
for(const detail of document.querySelectorAll('details'))detail.addEventListener('toggle',()=>ScrollTrigger.refresh());
await document.fonts.ready;
setupMotion(); progress();
window.addEventListener('load',()=>ScrollTrigger.refresh());
