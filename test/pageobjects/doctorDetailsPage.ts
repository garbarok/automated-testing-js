import Page from './page.ts';

class DoctorDetailPage extends Page {

    //getters

get doctorName() {
    return $('.active-doctor-info .basic-detail .name');
}

    get editButton() {
        return $('button[class="e-control e-btn e-lib e-small edit-details"]');
    }

    get nameInput() {
        return $('input[class="e-control e-textbox e-lib"]');
    }

    
    get saveButton() {
        return $('//div[@class="button-container"]//button[text()="Save"]');
    }

    get cancelButton() {
        return $('//div[@class="button-container"]//button[text()="Cancel"]');
    }

    async updateName(newName: string) {

        await this.editButton.click();
        await this.nameInput.setValue(newName);
        await this.saveButton.click();
    }
}

export default new DoctorDetailPage();
