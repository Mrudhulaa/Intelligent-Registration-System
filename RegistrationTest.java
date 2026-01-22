import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.io.FileHandler;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.time.Duration;

public class RegistrationTest {

    public static void main(String[] args) throws Exception {

        // Chrome setup
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");

        WebDriver driver = new ChromeDriver(options);

        // OPEN LIVE SERVER URL
        driver.get("http://127.0.0.1:5500/index.html");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

        // Fill form
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("firstName")))
                .sendKeys("John");

        driver.findElement(By.id("lastName")).sendKeys("Doe");
        driver.findElement(By.id("email")).sendKeys("test@gmail.com");
        driver.findElement(By.id("phone")).sendKeys("9876543210");
        driver.findElement(By.id("age")).sendKeys("25");

        driver.findElement(By.xpath("//input[@name='gender' and @value='Male']")).click();

        Select country = new Select(driver.findElement(By.id("country")));
        country.selectByVisibleText("India");

        wait.until(ExpectedConditions.elementToBeClickable(By.id("state")));
        new Select(driver.findElement(By.id("state")))
                .selectByVisibleText("Telangana");

        new Select(driver.findElement(By.id("city")))
                .selectByVisibleText("Hyderabad");

        driver.findElement(By.id("password")).sendKeys("Password@123");
        driver.findElement(By.id("confirmPassword")).sendKeys("Password@123");

        driver.findElement(By.id("terms")).click();

        // Enable submit button
        ((JavascriptExecutor) driver)
                .executeScript("document.getElementById('submitBtn').disabled = false;");

        driver.findElement(By.id("submitBtn")).click();

        // Wait for success message
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("successMessage")));

        // TAKE SCREENSHOT
        File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileHandler.copy(src, new File("form_submission.png"));

        System.out.println("✅ Form submitted successfully & Screenshot saved");

        driver.quit();
    }
}
