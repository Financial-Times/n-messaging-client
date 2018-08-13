import {swgLoader} from 'n-swg';
const bottomSlotOccupied = document.querySelector('[data-n-messaging-slot="bottom"]');

module.exports = async () => {
    if (!bottomSlotOccupied) {
        const swg = await swgLoader();
        await swg.init();
        const entitlements = await swg.checkEntitlements();
        //console.log('entitlements', entitlements);
        // if (entitlements && entitlements.granted) {
            //console.log('GRANTED! PLEASE ONWARD JOURNEY');
            swg.defaultOnwardEntitledJourney(entitlements);
        // }
    }
} 
