const { test, expect } = require('@playwright/test');
const config = require('../playwright.config');
const path = require('path');
const data = JSON.parse(JSON.stringify(require('../data.json')));

test.beforeEach( 'test', async({page, browser})=>{
    
await page.goto(config.use.baseURL)
await page.evaluate(()=>{

    window.scrollBy(0,2500)
})
await page.getByText('Forms').click();
    
})

test('fill the form',async({page})=>{
    await page.getByText('Practice Form').click()
    await page.getByPlaceholder('First Name').fill(data.forms.firstName);
    await page.getByPlaceholder('Last Name').fill(data.forms.lastName);
    await page.getByText('Sports',{exact:true}).click();
    await page.getByText('Reading',{exact:true}).click();
    await page.pause()
    await page.locator('#state').click();
    

    await page.getByText('Music',{exact:true}).click();
    await page.getByPlaceholder('name@example.com').fill(data.forms.email);
await page.getByPlaceholder('Mobile Number').fill(data.forms.mobile);



})