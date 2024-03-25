import { describe } from "node:test"
const {test, expect} = require ('@playwright/test')
const config = require('../playwright.config')

test.beforeEach('login', async({page})=>{

    await page.goto(config.use.baseURL)
    await page.getByText('Alerts, Frame & Windows').click()
    await page.getByText('Alerts', {exact:true}).click()

})


test.skip('alert', async({page})=>{
await page.pause()
     expect(await page.url()).toContain('https://demoqa.com/alerts');
    page.on('dialog', alert=>{
         expect(alert.type()).toContain('alert')
         expect(alert.message()).toContain('You clicked a button')
        alert.accept();
    })
    await page.click('#alertButton');
    
})

test.skip('Confirm alert box', async ({ page }) => {
    await page.pause();

    await page.click('#confirmButton');
    const dialog = await page.waitForEvent('dialog');
    await dialog.accept();
    expect(await page.locator('#confirmResult').textContent()).toContain('You selected Ok');
    await page.click('#confirmButton');
    const secondDialog = await page.waitForEvent('dialog');
    await secondDialog.dismiss();
    expect(await page.locator('#confirmResult').textContent()).toContain('You selected Cancel');
});

