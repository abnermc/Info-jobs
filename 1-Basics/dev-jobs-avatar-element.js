class DevJobsAvatar extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    createUrl(service, username){
        return `https://unavatar.io/${service}/${username}`
    }
    render(){
        const service = this.getAttribute('service') ?? 'github';
        const username = this.getAttribute('username') ?? 'midudev';
        const size = this.getAttribute('size') ?? '40';
        const url = this.createUrl(service, username);
        console.log({service, username, size});
        this.shadowRoot.innerHTML = `
            <style>
                img{
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 9999px;
                }
            </style>
            <img src="${url}" 
            alt="Avatar de ${username}"/>
        `
    }
    connectedCallback(){
        this.render();
    }
}
customElements.define('devjobs-avatar', DevJobsAvatar);