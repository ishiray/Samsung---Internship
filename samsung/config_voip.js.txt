module.exports = {
    apps: [
      {
        name: 'whatsapp',
        capabilities: {
          platformName: 'Android',
          'appium:automationName': 'UiAutomator2',
          'appium:deviceName': 'Android',
          'appium:noReset': true,
          'appium:appPackage': 'com.whatsapp',
          'appium:appActivity': 'com.whatsapp.HomeActivity',
        },
      },
      {
        name: 'telegram',
        capabilities: {
          platformName: 'Android',
          'appium:automationName': 'UiAutomator2',
          'appium:deviceName': 'Android',
          'appium:noReset': true,
          'appium:appPackage': 'org.telegram.messenger',
          'appium:appActivity': 'f00a356 org.telegram.messenger/org.telegram.ui.LaunchActivity',
        },
      },
      {
        name: 'viber',
        capabilities: {
          platformName: 'Android',
          'appium:automationName': 'UiAutomator2',
          'appium:deviceName': 'Android',
          'appium:noReset': true,
          'appium:appPackage': 'com.viber.voip',
          'appium:appActivity': '8081fcf com.viber.voip/.WelcomeActivity',
        },
      },
      // Add more app configurations as needed
    ],
  };
  