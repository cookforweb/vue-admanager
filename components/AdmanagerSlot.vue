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
            elementId: {
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
            renderSlot(){
                googletag.cmd.push(() => {
                    this.defineSlot();
                    googletag.display(this.elementId);
                });
            },
            defineSlot(){

                let slot = googletag.defineSlot(this.fullSlot, this.defaultSizes, this.elementId);

                if (this.slot.sizeMapping){

                    let sizeMapping = googletag.sizeMapping();

                    this.slot.sizeMapping.forEach(size => sizeMapping.addSize(size.window, size.sizes));

                    slot.defineSizeMapping(sizeMapping.build());
                }

                return slot.addService(googletag.pubads());
            }
        },
        beforeDestroy () {
            googletag.cmd.push(() => {
                googletag.destroySlots()
            })
        },
        computed: {
            fullSlot(){
                return  `/${this.$admanager.account}/${this.slot.name}`;
            },
            defaultSizes(){
                return this.slot.defaultSizes;
            }
        },
    }
</script>
