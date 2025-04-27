package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import utils.ElementUtils;

public class AutomationPracticeFormPage {
    WebDriver driver;

    private By firstName = By.id("firstName");
    private By lastName = By.id("lastName");
    private By email = By.id("userEmail");
    private By genderMale = By.xpath("//label[@for='gender-radio-1']");
    private By phoneNumber = By.id("userNumber");
    private By submitButton = By.id("submit");

    public AutomationPracticeFormPage(WebDriver driver) {
        this.driver = driver;
    }

    public void enterFirstName(String fname) {
        ElementUtils.enterText(driver, firstName, fname);
    }

    public void enterLastName(String lname) {
        ElementUtils.enterText(driver, lastName, lname);
    }

    public void enterEmail(String emailText) {
        ElementUtils.enterText(driver, email, emailText);
    }

    public void selectGender() {
        ElementUtils.clickElement(driver, genderMale);
    }

    public void enterPhoneNumber(String phone) {
        ElementUtils.enterText(driver, phoneNumber, phone);
    }

    public void clickSubmit() {
        ElementUtils.clickElement(driver, submitButton);
    }
}