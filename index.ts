// Import stylesheets
import './style.css';
import './pj-datetime';
import {PjDatetime} from './pj-datetime';

const appDiv: HTMLElement = document.getElementById('app');
const btn = document.getElementById('get-display-btn');
btn.onclick = getDisplay;
function getDisplay() {
  console.log((document.querySelector('pj-datetime') as PjDatetime).display);
}
const t = document.querySelector('pj-datetime') as PjDatetime;
if (t) {
  t.addEventListener(t.eventName, (e: Event) => {
    console.log(`${e.detail} --`);
  });
}
