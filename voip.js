const { remote } = require('webdriverio');


const desiredCaps1 = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.whatsapp',
  'appium:appActivity': 'com.whatsapp.HomeActivity',
  'appium:udid':'934fca5b0408',
  'appium:noReset': true,
};
const desiredCaps2 = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.whatsapp',
  'appium:appActivity': 'com.whatsapp.HomeActivity',
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
    await driver1.startActivity('com.whatsapp', 'com.whatsapp.HomeActivity');
    await driver1.pause(5000);
    await driver2.startActivity('com.whatsapp', 'com.whatsapp.HomeActivity');
    await driver2.pause(5000);

    
    const callsTab = await driver1.$('//android.widget.TextView[@content-desc="Calls"]'); 
    await callsTab.click()
    await driver1.pause(2000); 
    

    const callButton = await driver1.$('(//android.widget.ImageView[@content-desc="Voice call"])[1]'); 
    await callButton.click(); 
    await driver1.pause(5000); 
    const acceptCallButton = await driver2.$('//android.widget.TextView[@content-desc="Camera"]');
    await acceptCallButton.click();
    await driver2.pause(5000);
    
    await driver1.pause(5000);
    await driver2.pause(15000);

    const endcall1 = await driver1.$('//android.widget.ImageButton[@content-desc="Leave call"]');
    await endcall1.click(); 
    await driver1.pause(5000); 

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await driver1.deleteSession();
    await driver2.deleteSession();
  }
})();


