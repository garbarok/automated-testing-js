import { expect } from '@wdio/globals';
import SpecialistPage from '../pageobjects/specialistPage.ts';
import DoctorDetailPage from '../pageobjects/doctorDetailsPage.ts';

describe('Doctor list page', () => {
    
    it('Updating doctor name filtering by specialization', async () => {
        await SpecialistPage.open('doctors');
        await SpecialistPage.chooseSpecialization('Neurology');
        await SpecialistPage.selectDoctorByIndex(2);

        const newName = 'Smith';
        await DoctorDetailPage.updateName(newName);

        const doctorNameText = await DoctorDetailPage.doctorName.getText();
        expect(doctorNameText).toBe(`Dr. ${newName}`);
    });
});
