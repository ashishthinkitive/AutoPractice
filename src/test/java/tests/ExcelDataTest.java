package tests;

import org.testng.annotations.Test;

import com.aventstack.extentreports.ExtentTest;

import base.BaseTest;
import pages.PatientRegistrationPage;
import utils.ExcelUtils;
import java.util.List;

public class ExcelDataTest extends BaseTest {

    @Test
    public void testReadAndFillPatientForm() {
        List<String[]> users = ExcelUtils.readExcelData();
        PatientRegistrationPage registrationPage = new PatientRegistrationPage(driver);

        for (String[] user : users) {
            ExtentTest localTest = extent.createTest("Form Submission Test - " + user[0]); 
            try {
                System.out.println("Filling form for: " + user[0]);
                registrationPage.enterFirstName(user[0]);
                registrationPage.enterLastName(user[1].trim());
                registrationPage.enterEmail(user[2].trim());
                registrationPage.selectGender();
                registrationPage.enterPhoneNumber(user[3].trim());
                //registrationPage.clickSubmit();

                localTest.pass("Form submitted successfully for: " + user[0] + " " + user[1]);
                System.out.println("Ranjit");
            } catch (Exception e) {
                localTest.fail("Test execution failed: " + e.getMessage());
            }
        }
    }
}