<template>
    <div v-bind:id="elementId"></div>
</template>
<script>
    export default {
        name: 'AdmanagerSlot',
        props: {
            slotName: {
                type: String,
                required: true,
            },
            targeting: {
                type: Array,
                required: false,
                default: () => [],
            },
            elementId: {
                type: String,
                default: () => 'admanager-cookforweb-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10),
                required: false,
            }
        },
        data() {
            return {
                slot: null,
            }
        },
        mounted(){

            try {
                // Get the right slot by it's name given as a prop
                const [slot] = this.$admanager.slots.filter( v => v.name === this.slotName);
                // Assign it to component's slot
                this.slot = slot;

                this.renderSlot();

            } catch (e) {
                console.log('Error rendering slot', e)
            }

        },
        methods: {
            renderSlot() {
                googletag.cmd.push(() => {
                    // If default sizes is false then render as an out-of-page slot
                    if (this.fetchDefaultSizes){
                        this.defineSlot();
                    } else {
                        this.defineOutOfPageSlot();
                    }
                    googletag.display(this.elementId);
                });
            },
            defineSlot() {

                let slot = googletag.defineSlot(this.fetchSlot, this.fetchDefaultSizes, this.elementId);

                if (this.slot.sizeMapping) {

                    let sizeMapping = googletag.sizeMapping();

                    this.slot.sizeMapping.forEach(size => sizeMapping.addSize(size.window, size.sizes));

                    slot.defineSizeMapping(sizeMapping.build());
                }

                slot = this.setTargeting(slot);

                return slot.addService(googletag.pubads());
            },
            defineOutOfPageSlot() {

                let slot = googletag.defineOutOfPageSlot(this.fetchSlot, this.elementId).addService(googletag.pubads())

                slot = this.setTargeting(slot);

                return slot.addService(googletag.pubads());
            },
            // Targeting values for this specific slot
            // Example of targeting object
            // {
            //     page: ['home', 'index'],
            //     site: ['cookforweb.com'],
            // }
            setTargeting(slot){

                if (this.fetchTargeting) {

                    Object.keys(this.fetchTargeting).forEach((key) => {

                        slot.setTargeting(key, this.fetchTargeting[key]);
                    });
                }
                return slot;
            }
        },
        computed: {
            fetchSlot() {
                return  `/${this.$admanager.account}/${this.slot.name}`;
            },
            fetchDefaultSizes() {
                if (this.slot.fetchDefaultSizes){
                    return this.slot.fetchDefaultSizes;
                }
                else {
                    return false;
                }
            },
            fetchTargeting() {
                // If this slot has it's one targeting rules then use them
                if (this.targeting){

                    return this.targeting;
                }
                // else check if there are global rules defined
                if (this.$admanager.targeting){

                    return this.$admanager.targeting;
                }

                return false;s
            }
        },
        beforeDestroy () {
            googletag.cmd.push(() => {
                googletag.destroySlots()
            })
        },
    }
</script>
