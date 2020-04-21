import AdmanagerSlot from "./components/AdmanagerSlot";

export default {

    install(Vue, settings) {

        Vue.component('admanager-slot', AdmanagerSlot);

        this.init(Vue, settings);
    },


    init(Vue, settings){

        this.renderGpt();

        this.renderAdSlots(settings);

        Vue.prototype.$admanager = settings;
    },


    renderGpt() {
        let googleScript = document.createElement('script');
        googleScript.async = true;
        googleScript.type = 'text/javascript';
        googleScript.src = 'https://www.googletagservices.com/tag/js/gpt.js'

        // Add in head section
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(googleScript);
    },

    /**
     * rendering the slots
     */
    renderAdSlots(settings){
        window.googletag = window.googletag || {cmd: []};
        googletag.cmd.push(() => {
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
            googletag.pubads().setTargeting("page", ["test"] ); // @todo Set dynamic
        });
    },

};

