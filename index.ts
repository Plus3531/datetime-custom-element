// Import stylesheets
import './style.css';
import './pj-datetime';

const appDiv: HTMLElement = document.getElementById('app');
const btn = document.getElementById('get-display-btn');
btn.onclick = getDisplay;
function getDisplay() {
  console.log(document.querySelector('pj-datetime').display);
}