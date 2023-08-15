const { remote } = require('webdriverio');
const config = require('./config_voip.js');
const shell = require('shelljs');
const path = require('path');

const wdOpts1 = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
};

const wdOpts2 = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4724,
  logLevel: 'info',
};

async function initDriver(desiredCaps, wdOpts) {
  const mergedOpts = { ...wdOpts, capabilities: desiredCaps };
  return await remote(mergedOpts);
}


async function makeWhatsAppCall(driver1, driver2) {
  
  await driver1.startActivity('com.whatsapp', 'com.whatsapp.HomeActivity');
  await driver1.pause(5000);
  await driver2.startActivity('com.whatsapp', 'com.whatsapp.HomeActivity');
  await driver2.pause(5000);

  const search = await driver1.$('//android.widget.TextView[@content-desc="Search"]'); 
  await search.click()
  await driver1.pause(2000);
  await driver1.pressKeyCode(41);
  await driver1.pause(2000);
  await driver1.pressKeyCode(43);
  await driver1.pause(2000);
  await driver1.pressKeyCode(41);
  await driver1.pause(2000);

  const choose = await driver1.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.RelativeLayout[1]/android.widget.LinearLayout');
  await choose.click();
  await driver1.pause(2000);

  const callbutton = await driver1.$('//android.widget.ImageButton[@content-desc="Voice call"]');
  await callbutton.click();
  await driver1.pause(5000);

  const acceptCallButton = await driver2.$('//android.widget.TextView[@content-desc="Camera"]');
  await acceptCallButton.click();
  await driver2.pause(5000);

  await driver1.pause(5000);
  await driver2.pause(15000);

  const endcall1 = await driver1.$('//android.widget.ImageButton[@content-desc="Leave call"]');
  await endcall1.click();
  await driver1.pause(5000);
}

async function makeTelegramCall(driver1, driver2) {
  await driver1.startActivity('org.telegram.messenger', 'f00a356 org.telegram.messenger/org.telegram.ui.LaunchActivity');
  await driver1.pause(5000);
  await driver2.startActivity('org.telegram.messenger', 'f00a356 org.telegram.messenger/org.telegram.ui.LaunchActivity');
  await driver2.pause(5000);

  const search = await driver1.$('//android.widget.ImageButton[@content-desc="Search"]/android.widget.ImageView');
  await search.click();
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
  await driver2.pause(5000);

  await driver1.pause(5000);
  await driver2.pause(5000);

  const endcall = await driver1.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.Button[3]/android.widget.FrameLayout');
  await endcall.click();
  await driver1.pause(2000);
}

async function makeViberCall(driver1, driver2) {
  
  await driver1.startActivity('com.viber.voip', '8081fcf com.viber.voip/.WelcomeActivity');
  await driver1.pause(5000);
  await driver2.startActivity('com.viber.voip', '8081fcf com.viber.voip/.WelcomeActivity');
  await driver2.pause(5000);

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
}

(async () => {
  try {
    for (const appConfig of config.apps) {
      const { name, capabilities, udid } = appConfig;
      console.log(`Opening ${name}...`);

      const wdOptsApp1 = { ...wdOpts1 };
      const wdOptsApp2 = { ...wdOpts2 };
      const driver1 = await initDriver({ ...capabilities, 'appium:udid': '934fca5b0408' }, wdOptsApp1);
      const driver2 = await initDriver({ ...capabilities, 'appium:udid': 'RZ8M91JCPJL' }, wdOptsApp2);

      const interfaceNumber = 4; 
      const customLocation = 'C:/Users/Ishita/pcap';
      const captureFileName = `${appPackage}_captured_packets.pcap`;
      const fullPath = path.join(customLocation, captureFileName);
      const captureCommand = `tshark -i ${interfaceNumber} -w "${fullPath}"`;
      shell.exec(captureCommand, { async: true });
      
      switch (name) {
        case 'whatsapp':
          await makeWhatsAppCall(driver1, driver2);
          break;
        case 'telegram':
          await makeTelegramCall(driver1, driver2);
          break;
        case 'viber':
          await makeViberCall(driver1, driver2);
          break;
        default:
          console.log('Invalid app choice');
          break;
      }

      await driver1.deleteSession();
      await driver2.deleteSession();
      console.log(`${name} testing completed.`);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    const tsharkProcess = shell.exec('tasklist | find /i "tshark.exe"', { silent: true });
    const tsharkProcessId = tsharkProcess.stdout.trim().split(/\s+/)[1];
    if (tsharkProcessId) {
      shell.exec(`taskkill /F /PID ${tsharkProcessId}`);
    }
  }
})();