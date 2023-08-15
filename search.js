const { remote } = require('webdriverio');

const desiredCaps1 = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.whatsapp',
  'appium:appActivity': 'com.whatsapp.HomeActivity',
  'appium:noReset': true,
};

const wdOpts1 = {
    host: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities: desiredCaps1,
  };

  (async () => {
    const driver1 = await remote(wdOpts1);
    try {
        // Wait for the WhatsApp app to load
        await driver1.startActivity('com.whatsapp', 'com.whatsapp.HomeActivity');
        await driver1.pause(5000);
        const search = await driver1.$('//android.widget.TextView[@content-desc="Search"]'); 
        await search.click()
        await driver1.pause(2000);
        await driver1.pressKeyCode(32);
        await driver1.pause(2000);

        const choose = await driver1.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.RelativeLayout[1]/android.widget.LinearLayout');
        await choose.click();
        await driver1.pause(2000);

        const callbutton = await driver1.$('//android.widget.ImageButton[@content-desc="Voice call"]');
        await callbutton.click();
        await driver1.pause(5000);
    } catch (error) {
        console.error('Error:', error);
      } finally {
        await driver1.deleteSession();
      }
})();