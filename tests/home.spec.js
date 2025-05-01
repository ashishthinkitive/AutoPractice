const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');

test.describe('Home Page Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test('should display the logo', async () => {
    const isLogoVisible = await homePage.isLogoVisible();
    expect(isLogoVisible).toBeTruthy();
  });

  test('should be able to search', async () => {
    await homePage.search('test');
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toContain('search');
  });

  test('should display featured products', async () => {
    const isFeaturedProductsVisible = await homePage.isFeaturedProductsVisible();
    expect(isFeaturedProductsVisible).toBeTruthy();
  });

  test('should have menu items', async () => {
    const menuItems = await homePage.getMenuItems();
    expect(menuItems.length).toBeGreaterThan(0);
  });

  test('should display product cards', async () => {
    const productCount = await homePage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });
});