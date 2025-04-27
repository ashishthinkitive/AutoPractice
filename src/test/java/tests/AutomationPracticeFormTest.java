package tests;

import org.testng.annotations.Test;

import com.aventstack.extentreports.ExtentTest;

import base.BaseTest;
import pages.AutomationPracticeFormPage;

public class AutomationPracticeFormTest extends BaseTest {
    @Test
    public void testFormSubmission() {
    	  ExtentTest localTest = extent.createTest("Form Submission Test ");
    	try {
            AutomationPracticeFormPage formPage = new AutomationPracticeFormPage(driver);

            formPage.enterFirstName("Ranjit");
            formPage.enterLastName("Bachute");
            formPage.enterEmail("ranjit@example.com");
            formPage.selectGender();
            formPage.enterPhoneNumber("1234567890");
            formPage.clickSubmit();

            localTest.pass("Form submitted successfully for");
        } catch (Exception e) {
            test.fail("Test execution failed: " + e.getMessage());
        }
    }
    
    @Test
    public void testFormSubmissionWithDifferentUser() {
    	  ExtentTest localTest = extent.createTest("Form Submission Test for Ashish");
    	try {
            AutomationPracticeFormPage formPage = new AutomationPracticeFormPage(driver);

            formPage.enterFirstName("Ashish");
            formPage.enterLastName("Thinkitive");
            formPage.enterEmail("ashish@thinkitive.com");
            formPage.selectGender();
            formPage.enterPhoneNumber("9876543210");
            formPage.clickSubmit();

            localTest.pass("Form submitted successfully for Ashish");
        } catch (Exception e) {
            test.fail("Test execution failed: " + e.getMessage());
        }
    }
}