const test = require('ava').default;
const webdriver = require('selenium-webdriver');
const ip = require('ip');
const app = require('../src/app');
const redisClient = require('../src/redisClient');

// just simple tests here - no need to have a driver per test case
const driver = exports.driver = new webdriver.Builder()
  .forBrowser('chrome')
  .usingServer('http://localhost:4444/wd/hub')
  .build();

const url = exports.url = `http://${ip.address()}:8080/`;
const By = exports.By = webdriver.By;
const until = exports.until = webdriver.until;
const timeout = 1000;

exports.homePage = {
  async browse() {
    await driver.get(url);
  },
  async getTitle() {
    return await driver.getTitle();
  },
  async getNumberOfSequences() {
    const number = await driver.wait(until.elementLocated(By.id('seq-count')), timeout);
    return await number.getText();
  },
  async createSequence() {
    const button = await driver.wait(until.elementLocated(By.css('button')), timeout);
    await button.click();
  }
};

exports.sequencePage = {
  async browse(id) {
    await driver.get(`${url}id/${id}`);
  },
  async getTitle() {
    return await driver.getTitle();
  },
  async getId() {
    const id = await driver.wait(until.elementLocated(By.id('seq-id')), timeout);
    return await id.getText();
  },
  async getCounter() {
    const counter = await driver.wait(until.elementLocated(By.id('seq-counter')), timeout);
    return await counter.getText();
  }
};

test.before.cb('start app', t => {
  app.listen(8080, t.end);
});

test.before.cb('flush redis', t => {
  redisClient.flushall(t.end);
});

test.afterEach.cb('flush redis', t => {
  redisClient.flushall(t.end);
});
