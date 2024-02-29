
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @amplitude/react-native
import com.amplitude.reactnative.AmplitudeReactNativePackage;
// @giphy/react-native-sdk
import com.giphyreactnativesdk.GiphyReactNativeSdkPackage;
// @jitsi/react-native-sdk
import org.jitsi.meet.sdk.JitsiMeetReactNativePackage;
// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/clipboard
import com.reactnativecommunity.clipboard.ClipboardPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-community/slider
import com.reactnativecommunity.slider.ReactSliderPackage;
// @react-native-google-signin/google-signin
import com.reactnativegooglesignin.RNGoogleSigninPackage;
// react-native-background-timer
import com.ocetnik.timer.BackgroundTimerPackage;
// react-native-calendar-events
import com.calendarevents.RNCalendarEventsPackage;
// react-native-default-preference
import com.kevinresol.react_native_default_preference.RNDefaultPreferencePackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-get-random-values
import org.linusu.RNGetRandomValuesPackage;
// react-native-immersive-mode
import com.rnimmersivemode.RNImmersiveModePackage;
// react-native-keep-awake
import com.corbt.keepawake.KCKeepAwakePackage;
// react-native-orientation-locker
import org.wonday.orientation.OrientationPackage;
// react-native-pager-view
import com.reactnativepagerview.PagerViewPackage;
// react-native-performance
import com.oblador.performance.PerformancePackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-sound
import com.zmxv.RNSound.RNSoundPackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;
// react-native-webrtc
import com.oney.WebRTCModule.WebRTCModulePackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AmplitudeReactNativePackage(),
      new GiphyReactNativeSdkPackage(),
      new JitsiMeetReactNativePackage(),
      new AsyncStoragePackage(),
      new ClipboardPackage(),
      new NetInfoPackage(),
      new ReactSliderPackage(),
      new RNGoogleSigninPackage(),
      new BackgroundTimerPackage(),
      new RNCalendarEventsPackage(),
      new RNDefaultPreferencePackage(),
      new RNDeviceInfo(),
      new RNGestureHandlerPackage(),
      new RNGetRandomValuesPackage(),
      new RNImmersiveModePackage(),
      new KCKeepAwakePackage(),
      new OrientationPackage(),
      new PagerViewPackage(),
      new PerformancePackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSoundPackage(),
      new SplashScreenReactPackage(),
      new SvgPackage(),
      new ReactVideoPackage(),
      new WebRTCModulePackage(),
      new RNCWebViewPackage()
    ));
  }
}
