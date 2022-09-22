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
  
const date1 = new Date(2022, 8, 22, 23, 30);
  
export class PjDatetime extends HTMLElement {
  private te;// = document.getElementById('time-incident') as HTMLInputElement;
  private de;// = document.getElementById('date-incident') as HTMLInputElement;  
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
    this.de.valueAsDate = createUtcDate(date1);
    this.te.valueAsDate = createUtcDate(date1);
  }
}
customElements.define('pj-datetime', PjDatetime);