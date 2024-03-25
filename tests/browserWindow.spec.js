const {test, expect} = require('@playwright/test')
const config = require('../playwright.config')

test.beforeEach('Open the website', async({page})=>{

    await page.goto(config.use.baseURL);
    await page.getByText('Alerts, Frame & Windows').click()
    await page.getByText('Browser Windows', {exact:true}).click()
})

test('Switch to new tab', async ({ page }) => {
    await page.pause();
    await page.locator('#tabButton').click()
    const page1 = await page.context().waitForEvent('page');
    const page1url = await page1.url();
    expect(await page1url).toBe('https://demoqa.com/sample')
    await page.waitForTimeout(2000)
    await page1.goto(config.use.baseURL)
    await page1.getByText('Alerts, Frame & Windows').click()
    await page1.getByText('Browser Windows', {exact:true}).click()
    await page1.locator('#tabButton').click()
    const page2 = await page.context().waitForEvent('page')
    const page2url = await page2.url();
    expect(await page2url).toBe('https://demoqa.com/sample')
    await page1.getByText('Frames', {exact:true}).click();
    await page.waitForTimeout(5000);
    
});
