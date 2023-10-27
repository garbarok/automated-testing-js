import {expect} from '@wdio/globals'
import PatientList from '../pageobjects/patientListPage.ts';

describe('Patient list page', () => {
    it('Adding new patient using waitUntil()', async () => {
        await PatientList.open('patients');

        const lastRowIndexStr = await (await PatientList.lastRow).getAttribute('index');
        const lastRowIndex = parseInt(lastRowIndexStr, 10);

        await PatientList.addNewPatient('Max McKinney', '01629 190163', 'udieno@kewuzeh.ax', 'covid-19');

        let newRowIndex = -1;
        await browser.waitUntil(async () => {
            const newRow = await $('//table[@class="e-table"]//tr[last()]/td[@class="e-rowcell"]');
            const newRowIndexStr = await newRow.getAttribute('index');
            newRowIndex = parseInt(newRowIndexStr, 10);
            return newRowIndex > lastRowIndex;
        }, {
            timeout: 10000,
            timeoutMsg: 'New row is not added'
        });

        expect(newRowIndex).toBeGreaterThan(lastRowIndex);
    });
});
