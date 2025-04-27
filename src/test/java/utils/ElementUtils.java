package utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class ElementUtils {
    public static void enterText(WebDriver driver, By locator, String text) {
        try {
            WebElement element = driver.findElement(locator);
            element.clear();
            element.sendKeys(text);
        } catch (Exception e) {
            System.out.println("Error entering text: " + e.getMessage());
        }
    }

    public static void clickElement(WebDriver driver, By locator) {
        try {
            WebElement element = driver.findElement(locator);
            element.click();
        } catch (Exception e) {
            System.out.println("Error clicking element: " + e.getMessage());
        }
    }
}