import {expect, $, browser} from '@wdio/globals'
import Page from '../pageobjects/page.ts';


class AppointmentPlannerPage extends Page {
    get headerElement() {
        return $('h1.clinic-name');
    }
}

const appointmentPlannerPage = new AppointmentPlannerPage();


describe('Appointment Planner page', () => {
    it('Modify header text using action browser.execute()', async () => {
        await appointmentPlannerPage.open('');
        await appointmentPlannerPage.headerElement.waitForDisplayed({ timeout: 5000 });
        const newHeaderText = 'Modified Header';
        await browser.execute((text) => {
            const header = document.querySelector('h1.clinic-name');
            if(header) {
                header.textContent = text;
            }
        }, newHeaderText);
        
        expect(await appointmentPlannerPage.headerElement.getText()).toHaveTextContaining(newHeaderText);
    });
});

