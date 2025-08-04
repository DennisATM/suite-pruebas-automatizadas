import { By, Builder, Browser, until } from 'selenium-webdriver';
import assert from 'assert';
import path from 'path';
import fs from 'fs';

const waitForInput = async (driver, name) => {
  const el = await driver.wait(until.elementLocated(By.name(name)), 5000);
  await driver.wait(until.elementIsVisible(el), 5000);
  return el;
}

const takeScreenshot = async (driver, testName) => {

try {

    const safeName = testName.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    const dir = path.join('./reports', 'screenshots');
    const filename = path.join(dir, `${safeName}.png`);

    fs.mkdirSync(dir, { recursive: true });

    const screenshot = await driver.takeScreenshot();

    fs.writeFileSync(filename, screenshot, 'base64');

    console.log(`📸 Screenshot guardado: ${filename}`);
  } catch (err) {
    console.error('Error al tomar screenshot:', err);
  }

}

// 🔹 DataProviders
const loginCases = [
  {
    name: 'Login correcto',
    username: 'admin',
    password: '1234',
    expectedId: 'success',
    expectedText: 'Bienvenido admin'
  },
  {
    name: 'Login incorrecto',
    username: 'otro',
    password: 'wrong',
    expectedId: 'error',
    expectedText: 'Credenciales Incorrectas'
  }
];

const registerCases = [
  {
    name: 'Registro de usuario nuevo',
    username: 'nuevoUsuario',
    password: 'clave123',
    expectedId: 'success',
    expectedText: 'Usuario nuevoUsuario registrado correctamente'
  },
  {
    name: 'Registro de usuario existente',
    username: 'admin',
    password: '1234',
    expectedId: 'error',
    expectedText: 'Usuario ya registrado'
  }
];

describe('Suite de pruebas de Registro y Autenticación en CHROME', function () {
  this.timeout(30000);
  let driver;

  beforeEach(async () => {
    await fetch('http://localhost:3000/reset', { method: 'POST' });
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  afterEach(async function () {
    const testName = this.currentTest.title;
    await takeScreenshot(driver, testName + '- CHROME');
    await driver.quit();
  });

  // 🔹 DataProvider para Login
  loginCases.forEach(tc => {
    it(`Login: ${tc.name}`, async () => {
      await driver.get('http://localhost:3000');
      const usernameInput = await waitForInput(driver, 'username');
      const passwordInput = await waitForInput(driver, 'password');

      await usernameInput.sendKeys(tc.username);
      await passwordInput.sendKeys(tc.password);
      await driver.findElement(By.css('button[type="submit"]')).click();

      const result = await driver.wait(until.elementLocated(By.id(tc.expectedId)), 5000);
      const text = await result.getText();
      assert.equal(text, tc.expectedText);
    });
  });

  // 🔹 Test de bloqueo tras 3 intentos
  it('Login: Bloqueo tras 3 intentos fallidos', async () => {
    await driver.get('http://localhost:3000');

    for (let i = 0; i < 3; i++) {
      const usernameInput = await waitForInput(driver, 'username');
      const passwordInput = await waitForInput(driver, 'password');

      await usernameInput.sendKeys('admin');
      await passwordInput.sendKeys('wrong');
      await driver.findElement(By.css('button[type="submit"]')).click();

      const error = await driver.wait(until.elementLocated(By.id('error')), 5000);
      const errorText = await error.getText();
      assert.equal(errorText, 'Credenciales Incorrectas');

      await driver.sleep(500); 
    }

    const usernameInput = await waitForInput(driver, 'username');
    const passwordInput = await waitForInput(driver, 'password');

    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('wrong');
    await driver.findElement(By.css('button[type="submit"]')).click();

    const blocked = await driver.wait(until.elementLocated(By.id('blocked')), 5000);
    const blockedText = await blocked.getText();
    assert.equal(blockedText, 'Demasiados intentos fallidos. Inténtalo más tarde.');
  });

  // 🔹 DataProvider para Registro
  registerCases.forEach(tc => {
    it(`Registro: ${tc.name}`, async () => {
      await driver.get('http://localhost:3000/register');
      const usernameInput = await waitForInput(driver, 'username');
      const passwordInput = await waitForInput(driver, 'password');

      await usernameInput.sendKeys(tc.username);
      await passwordInput.sendKeys(tc.password);
      await driver.findElement(By.css('button[type="submit"]')).click();

      const result = await driver.wait(until.elementLocated(By.id(tc.expectedId)), 5000);
      const text = await result.getText();
      assert.equal(text, tc.expectedText);
    });
  });
});

describe('Suite de pruebas de Registro y Autenticación en FIREFOX', function () {
  this.timeout(30000);
  let driver;

  beforeEach(async () => {
    await fetch('http://localhost:3000/reset', { method: 'POST' });
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  });

  afterEach(async function () {
    const testName = this.currentTest.title;
    await takeScreenshot(driver, testName+'-FIREFOX');
    await driver.quit();
  });

  // 🔹 DataProvider para Login
  loginCases.forEach(tc => {
    it(`Login: ${tc.name}`, async () => {
      await driver.get('http://localhost:3000');
      const usernameInput = await waitForInput(driver, 'username');
      const passwordInput = await waitForInput(driver, 'password');

      await usernameInput.sendKeys(tc.username);
      await passwordInput.sendKeys(tc.password);
      await driver.findElement(By.css('button[type="submit"]')).click();

      const result = await driver.wait(until.elementLocated(By.id(tc.expectedId)), 5000);
      const text = await result.getText();
      assert.equal(text, tc.expectedText);
    });
  });

  // 🔹 Test de bloqueo tras 3 intentos
  it('Login: Bloqueo tras 3 intentos fallidos', async () => {
    await driver.get('http://localhost:3000');

    for (let i = 0; i < 3; i++) {
      const usernameInput = await waitForInput(driver, 'username');
      const passwordInput = await waitForInput(driver, 'password');

      await usernameInput.sendKeys('admin');
      await passwordInput.sendKeys('wrong');
      await driver.findElement(By.css('button[type="submit"]')).click();

      const error = await driver.wait(until.elementLocated(By.id('error')), 5000);
      const errorText = await error.getText();
      assert.equal(errorText, 'Credenciales Incorrectas');

      await driver.sleep(500); 
    }

    const usernameInput = await waitForInput(driver, 'username');
    const passwordInput = await waitForInput(driver, 'password');

    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('wrong');
    await driver.findElement(By.css('button[type="submit"]')).click();

    const blocked = await driver.wait(until.elementLocated(By.id('blocked')), 5000);
    const blockedText = await blocked.getText();
    assert.equal(blockedText, 'Demasiados intentos fallidos. Inténtalo más tarde.');
  });

  // 🔹 DataProvider para Registro
  registerCases.forEach(tc => {
    it(`Registro: ${tc.name}`, async () => {
      await driver.get('http://localhost:3000/register');
      const usernameInput = await waitForInput(driver, 'username');
      const passwordInput = await waitForInput(driver, 'password');

      await usernameInput.sendKeys(tc.username);
      await passwordInput.sendKeys(tc.password);
      await driver.findElement(By.css('button[type="submit"]')).click();

      const result = await driver.wait(until.elementLocated(By.id(tc.expectedId)), 5000);
      const text = await result.getText();
      assert.equal(text, tc.expectedText);
    });
  });
});