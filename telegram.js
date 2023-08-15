const { remote } = require('webdriverio');


const desiredCaps1 = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'org.telegram.messenger',
  'appium:appActivity': 'f00a356 org.telegram.messenger/org.telegram.ui.LaunchActivity',
  'appium:udid':'934fca5b0408',
  'appium:noReset': true,
};
const desiredCaps2 = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'org.telegram.messenger',
  'appium:appActivity': 'f00a356 org.telegram.messenger/org.telegram.ui.LaunchActivity',
  'appium:udid':'RZ8M91JCPJL',
  'appium:noReset': true,
};

const wdOpts1 = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities: desiredCaps1,
};

const wdOpts2 = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4724,
  logLevel: 'info',
  capabilities: desiredCaps2,
};

(async () => {
  const driver1 = await remote(wdOpts1);
  const driver2 = await remote(wdOpts2);

  try {
    
    const search = await driver1.$('//android.widget.ImageButton[@content-desc="Search"]/android.widget.ImageView'); 
    await search.click()
    await driver1.pause(2000); 
    await driver1.pressKeyCode(44);
    await driver1.pause(5000);

   
    const choose = await driver1.$('.android.view.ViewGroup'); 
    await choose.click(); 
    await driver1.pause(5000); 
    
    const callButton = await driver1.$('//android.widget.ImageButton[@content-desc="Call"]/android.widget.ImageView');
    await callButton.click();
    await driver1.pause(5000);

    const acceptCallButton = await driver2.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[3]/android.widget.FrameLayout/android.widget.FrameLayout[3]/androidx.recyclerview.widget.RecyclerView/android.view.ViewGroup[1]');
    await acceptCallButton.click();
    driver2.pause(5000);

    await driver1.pause(5000);
    await driver2.pause(5000);
    const endcall = await driver1.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.Button[3]/android.widget.FrameLayout')
    await endcall.click();
    await driver1.pause(2000);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await driver1.deleteSession();
    await driver2.deleteSession();
  }
})();


