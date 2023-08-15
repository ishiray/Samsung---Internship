const { remote } = require('webdriverio');


const desiredCaps1 = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.viber.voip',
  'appium:appActivity': '8081fcf com.viber.voip/.WelcomeActivity',
  'appium:udid':'934fca5b0408',
  'appium:noReset': true,
};
const desiredCaps2 = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.viber.voip',
  'appium:appActivity': '8081fcf com.viber.voip/.WelcomeActivity',
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
    
    const calltab = await driver1.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.view.ViewGroup[2]/android.widget.ImageView'); 
    await calltab.click()
    await driver1.pause(2000); 

   
    const viber = await driver1.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout[1]/android.widget.RelativeLayout/android.widget.FrameLayout[3]/android.view.ViewGroup/android.widget.ListView/android.view.ViewGroup/android.widget.TextView[3]'); 
    await viber.click(); 
    await driver1.pause(5000); 
    
    const callButton = await driver1.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout[1]/android.widget.RelativeLayout/android.widget.FrameLayout[3]/android.view.ViewGroup/android.widget.ListView/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.ImageButton');
    await callButton.click();
    await driver1.pause(5000);

    const acceptCallButton = await driver2.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.ListView/android.view.ViewGroup[1]');
    await acceptCallButton.click();
    driver2.pause(5000);

    await driver1.pause(5000);
    await driver2.pause(5000);
    const endcall = await driver1.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.ImageView[4]')
    await endcall.click();
    await driver1.pause(2000);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await driver1.deleteSession();
    await driver2.deleteSession();
  }
})();


