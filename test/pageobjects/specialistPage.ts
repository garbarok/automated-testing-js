import Page from './page.ts';

class SpecialistPage extends Page {

    async chooseSpecialization(specialization: string) {
        const specializationDropdown = await $('//div[@class="specialization-types"]//ejs-dropdownlist[@id="Specialization"]');
        await specializationDropdown.click(); 
        await browser.keys(specialization);
        await browser.keys('Enter');
    }

    async selectDoctorByIndex(index: number) {
        const doctorCard = await $(`div#Specialist_${index}`);
        await doctorCard.click();
    }
}

export default new SpecialistPage();
