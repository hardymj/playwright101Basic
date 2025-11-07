import { test, expect } from '@playwright/test';
 
test('Test Scenario 1', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground'); 
    await page.click('text=Simple Form Demo');
    const currentUrl = page.url();
    await expect(currentUrl).toContain('simple-form-demo');
    var welcome = "Welcome to LambdaTest";
    await page.waitForLoadState('domcontentloaded');
    await page.fill('input#user-message',welcome);
    await page.getByRole('button', { name: 'Get Checked Value' }).click();
    const message = await page.locator('#message').textContent();
    await expect(message).toBe(welcome);
});

test('Test Scenario 2', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground'); 
    await page.click('text=Drag & Drop Sliders');
    await page.waitForLoadState('domcontentloaded');
    const setValue = "95"
    const slider = page.locator('#slider3').getByRole('slider'); 
    await slider.fill(setValue);        
    const defaultValue = await page.$eval('#rangeSuccess', el => el.textContent);
    expect(Number(defaultValue)).toBe(Number(setValue));
});

test('Test Scenario 3', async ({ page, browserName }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground'); 
    await page.click('text=Input Form Submit');
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('button', { name: 'Submit' }).click();
    const input = page.locator('#name');
    let validationMessage = await input.evaluate(el => el.validationMessage);

    console.log(`Browser: ${browserName}, Validation Message: ${validationMessage}`);
    if(browserName === 'pw-webkit' || browserName === 'webkit'){
        await expect(validationMessage).toContain('Fill out this field');
    }
    else{
        await expect(validationMessage).toContain('Please fill out this field.');
    }
    await page.fill('input[name="name"]','Michael');
    await page.fill('input[name="password"]','password123');
    await page.fill('input[name="company"]','ABC Corp');
    await page.fill('input[name="website"]','http://www.ABCCorp.com');
    await page.fill('input[name="city"]','New York');
    await page.fill('input[name="address_line1"]','123 Main St');
    await page.fill('input[name="address_line2"]','Apt 4B');
    await page.fill('input#inputState','NY');
    await page.fill('input[name="zip"]','10001');
    await page.fill('#inputEmail4','test@test.com');
    await page.selectOption('select[name="country"]', {label : 'United States'});
    await page.getByRole('button', { name: 'Submit' }).click();
    const successMessage = page.locator('.success-msg');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('Thanks for contacting us, we will get back to you shortly.');
});