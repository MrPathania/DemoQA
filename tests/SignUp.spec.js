const { test, expect } = require('@playwright/test');
const config = require('../playwright.config')
const data = JSON.parse(JSON.stringify(require('../data.json')));

test.beforeEach( 'test', async({page, browser})=>{
    
await page.goto(config.use.baseURL)
await page.evaluate(()=>{

    window.scrollBy(0,2500)
})
await page.getByText('Elements').click();
    
})

test('TextBox', async({page, browser})=>{

await page.getByText('Text Box').click();
const currentUrl= page.url()
expect(currentUrl).toBe('https://demoqa.com/text-box');
await page.getByPlaceholder('Full Name').fill(data.textBox.fullName);
await page.getByPlaceholder('name@example.com').fill(data.textBox.email);
await page.getByPlaceholder('Current Address').fill(data.textBox.address);
await page.getByRole('button', {name:'Submit'}).click();
await page.waitForTimeout(5000)

})

test('Radio Button',async ({page})=>{

await page.getByText('Radio Button').click()
await page.getByText(data.radioButton.yes).click();
const yesConfirmation = await page.locator('.text-success').textContent() 
expect(yesConfirmation).toBe(data.radioButton.yes);
await page.getByText(data.radioButton.Impressive).click();
const ImpressiveConfirmation = await page.locator('.text-success').textContent() 
expect(ImpressiveConfirmation).toBe(data.radioButton.Impressive);

})


test('Web Tables',async ({page})=>{

await page.getByText('Web Tables').click()
await page.pause()
await page.click('#addNewRecordButton');
await page.getByPlaceholder('First Name').fill(data.webTable.firstName);
await page.getByPlaceholder('Last Name').fill(data.webTable.lastName);
await page.getByPlaceholder('name@example.com').fill(data.webTable.email);
await page.getByPlaceholder('Age').fill(data.webTable.age);
await page.getByPlaceholder('Salary').fill(data.webTable.salary);
await page.getByPlaceholder('Department').fill(data.webTable.department);


})