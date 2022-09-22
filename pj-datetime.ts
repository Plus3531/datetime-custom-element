import template from './pj-datetime.html';

const createUtcDate = (date) =>
  new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    )
  );
  const combineToDate = (utcTime, utcDate) => {
    if (utcTime && utcDate) {
      return new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        utcTime.getUTCHours(),
        utcTime.getUTCMinutes()
      );
    }
    return undefined;
  };
  
let date1 = new Date(2022, 8, 22, 23, 30);
  
export class PjDatetime extends HTMLElement {
  private te;
  private de;
  private plusMinutes;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    const { shadowRoot } = this;
    shadowRoot.innerHTML = template;
    const t = shadowRoot.getElementById('pj-datetime') as HTMLTemplateElement;
    const templateContent = t.content;
    shadowRoot.appendChild(templateContent);
    this.te = shadowRoot.getElementById('time-incident') as HTMLInputElement;
    this.de = shadowRoot.getElementById('date-incident') as HTMLInputElement;  
    this.plusMinutes = shadowRoot.getElementById('plus-minutes') as HTMLInputElement;

    const displayIso = this.display;
    if (displayIso) {
      date1 = new Date(displayIso);
    }
    this.de.valueAsDate = createUtcDate(date1);
    this.te.valueAsDate = createUtcDate(date1);
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }
  get display() {
    return this.getAttribute('display');
  }
  
  set display(iso) {
    if (iso) {
      this.setAttribute('display', iso);
    } else {
      this.removeAttribute('display');
    }
  }
  plusMinutesKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (this.plusMinutes.value.startsWith('+')) {
        const cnt = this.plusMinutes.value.substring(1);
        const count = Number(cnt);
        if (count !== NaN) {
          const utcTime = this.te.valueAsDate;
          const utcDate = this.de.valueAsDate;
          const date = combineToDate(utcTime, utcDate);
          if (date) {
            date.setMinutes(date.getMinutes() + count);
            this.de.valueAsDate = createUtcDate(date);
            this.te.valueAsDate = createUtcDate(date);
            const event = new Event('change');
            this.te.dispatchEvent(event);
            this.de.focus();
          }
        }
      }
      this.plusMinutes.style.display = 'none';
    }
  }
  plusMinutesBlur = (event) => {
    this.plusMinutes.style.display = 'none';
  }
  
  teChanged = (event) => {
    this.display = combineToDate(this.te.valueAsDate, this.de.valueAsDate).toISOString();
    console.log(`time change:  ${combineToDate(this.te.valueAsDate, this.de.valueAsDate)}`);
  }

  deChanged = (event) => {
    this.display = combineToDate(this.te.valueAsDate, this.de.valueAsDate).toISOString();
    console.log(`date change:  ${combineToDate(this.te.valueAsDate, this.de.valueAsDate)}`);
  }

  teKeyDown = (event) => {
    if (event.key === '+') {
      this.plusMinutes.value = '';
      this.plusMinutes.style.position = 'absolute';
      this.plusMinutes.style.display = 'block';
      this.plusMinutes.style.left = `${this.te.getBoundingClientRect().left}px`;
      this.plusMinutes.style.top = `${this.te.getBoundingClientRect().top}px`;
      //plusMinutes.value = '+'
      this.plusMinutes.focus();
    }
  }

  addEventListeners() {
    this.plusMinutes.addEventListener('keydown', this.plusMinutesKeyDown);
    this.de.addEventListener('change', this.deChanged);
    this.te.addEventListener('change', this.teChanged);
    this.te.addEventListener('keydown', this.teKeyDown);
  }
  removeEventListeners() {
    this.plusMinutes.removeEventListener('keydown', this.plusMinutesKeyDown);
    this.de.removeEventListener('change', this.deChanged);
    this.te.removeEventListener('change', this.teChanged);
    this.te.removeEventListener('keydown', this.teKeyDown);
  }
}
customElements.define('pj-datetime', PjDatetime);