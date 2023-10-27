import Page from './page.ts';

class PatientListPage extends Page {

    get lastRow() {
        return $('//table[@class="e-table"]//tr[last()]/td[@class="e-rowcell"]');
    }

    get btnAddNewPatient() {
        return $('[class="e-control e-btn e-lib e-normal add-details e-primary"]');
    }

    get newPatientCard() {
        return $('ejs-dialog[cssclass="new-patient-dialog"]');
    }

    get btnSaveNewPatient() {
        return $('//ejs-dialog[contains(@class, "new-patient-dialog")]//div[@class="e-footer-content"]//button[text()="Save"]');
    }

    get patientName() {
        return $('//ejs-dialog[contains(@class, "new-patient-dialog")]//div[@class="e-dlg-content"]//input[@name="Name"]');
    }

    get mobileNumber() {
        return $('#PatientMobile');
    }

    get email() {
        return $('input[name="Email"]');
    }

    get symptoms() {
        return $('input[name="Symptoms"]');
    }

    async addNewPatient(name: string, mobile: string, email: string, symptoms: string) {
        await this.btnAddNewPatient.click();
        await browser.waitUntil(async () => {
            return await this.newPatientCard.isDisplayed() === true;
        }, {
            timeout: 10000,
            timeoutMsg: 'Patient card is not opened'
        });
        await this.patientName.setValue(name);
        await this.mobileNumber.setValue(mobile);
        await this.email.setValue(email);
        await this.symptoms.setValue(symptoms);
        await this.btnSaveNewPatient.click();
    }

    
}

export default new PatientListPage();
