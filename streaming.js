const { remote } = require('webdriverio');
const config = require('appium-uiautomator2-driver/node_modules/opencv-bindings/test/config.js');
const shell = require('shelljs');
const path = require('path');

const wdOpts = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
};

async function openApp(appPackage, appActivity) {
  const interfaceNumber = 4; 
  const customLocation = 'C:/Users/Ishita/pcap';
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const captureFileName = `${appPackage}_captured_packets_${timestamp}.pcap`;
  const fullPath = path.join(customLocation, captureFileName);
  const captureCommand = `tshark -i ${interfaceNumber} -w "${fullPath}"`;
  shell.exec(captureCommand, { async: true });

  const driver = await remote({ ...wdOpts, capabilities: { platformName: 'Android', 'appium:automationName': 'UiAutomator2', 'appium:deviceName': 'Android', 'appium:noReset': true, 'appium:appPackage': appPackage, 'appium:appActivity': appActivity } });
  try {
   
    await driver.pause(18000);
    if (appPackage === 'com.google.android.youtube'){
      const video = await driver.$('//android.view.ViewGroup[@content-desc="Expand Mini Player"]/android.widget.FrameLayout[2]/android.view.ViewGroup/android.widget.FrameLayout')
      await video.click();
    }
    // Find any available movie and click on it
    // const movieElement = await driver.$('android.view.View');
    // await movieElement.click();

    if (appPackage === 'com.jio.media.ondemand'){
      const vid = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View[1]/android.view.View[1]/android.view.View/android.view.View/android.view.View/android.widget.Button')
      await vid.click();
    }
    
    // If it's Amazon Prime Video, click on the play button
    if (appPackage === 'com.amazon.avod.thirdpartyclient') {
      const playButton = await driver.$('(//android.widget.FrameLayout[@content-desc="play"])[1]');
      await playButton.click();
    }

    if (appPackage === 'com.sonyliv') {
      const profile = await driver.$('//android.widget.ImageView[@content-desc="Ishi"]');
      await profile.click();
      await driver.pause(2000);
      const play = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.view.ViewGroup[1]/androidx.recyclerview.widget.RecyclerView/android.view.ViewGroup[1]/android.widget.RelativeLayout/android.widget.RelativeLayout/android.widget.TextView');
      await play.click();
    }

    if (appPackage === 'com.netflix.mediaclient'){
      const profile = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.GridView/android.view.ViewGroup[3]/android.widget.ImageView');
      await profile.click();
    }
    await driver.pause(30000);
  } finally {
    
    await driver.closeApp();
    await driver.deleteSession();
    const tsharkProcess = shell.exec('tasklist | find /i "tshark.exe"', { silent: true });
    const tsharkProcessId = tsharkProcess.stdout.trim().split(/\s+/)[1];
    if (tsharkProcessId) {
      shell.exec(`taskkill /F /PID ${tsharkProcessId}`);
    }
  }
}

async function runTest() {
  config.appConfigs.forEach((appConfig, index) => {
    console.log(`${index + 1}. ${appConfig.appPackage}`);
  });
  // const choiceIndex = 3; // Replace this with your desired index or source of the choice
  // const chosenApp = config.appConfigs[choiceIndex - 1];
  for (const appConfig of config.appConfigs) {
    console.log(`Opening ${appConfig.appPackage}...`);
    await openApp(appConfig.appPackage, appConfig.appActivity);
  }
  await openApp(chosenApp.appPackage, chosenApp.appActivity);
}

runTest().catch(console.error);

