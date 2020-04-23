# VueJs Google Ad Manager slots
Vue.js plugin to add your google ad manager slots



![Vue Admanager](https://raw.githubusercontent.com/cookforweb/vue-admanager/master/images/vue-google-admanager.jpg)

## Install

Install the package using the command below
```
npm install vue-admanager
```

Add the admanager configuration with the following commangd 

```
import adManagerConfig from './admanager'; // example of admanager config below

Vue.use(AdManager, adManagerConfig);
```


Admanager configuration example file:

**admanager.js
```
const adManagerConfig = {
    account : '36492330',
    slots: [
        {
            name: 'cookforweb_468x60',
            fetchDefaultSizes: [[468, 60]],
            sizeMapping: [{
                window: [1420, 0],
                sizes: [[468, 60]],
            },{
                window: [0, 0],
                sizes: [[320, 100]],
            },]

        }, {
            name: 'cookforweb_300x250A',
            fetchDefaultSizes: [[300, 250]],
            sizeMapping: [{
                window: [768, 0],
                sizes: [[300, 250]],
            },{
                window: [0, 0],
                sizes: [[320, 100]],
            },]

        }, {
            name: 'cookforweb_728x90',
            fetchDefaultSizes: [[728, 90]],
            sizeMapping: [{
                    window: [1200, 0],
                    sizes: [[728, 90]],
                },{
                    window: [0, 0],
                    sizes: [[320, 100]],
                },]
        }, {
            name: 'cookforweb_970x90',
            fetchDefaultSizes: [[970, 90]],
            sizeMapping: [{
                    window: [1200, 0],
                    sizes: [[970, 90]],
                },{
                    window: [768, 0],
                    sizes: [[728, 90]],
                },{
                    window: [0, 0],
                    sizes: [[320, 100]],
                },]
        },
    ],
    /**
     * Must be an object with {key, value: String[]} format
     * It will appended as targeting values in each ad slot
     */
    targeting: {
        // the "page" & "site" must be defined as custom targeting value in admanager
        // or else they will not work
        // https://support.google.com/admanager/answer/188092
        page: ['home', 'index'],
        site: ['cookforweb.com'],
    }
}

export default adManagerConfig

```
