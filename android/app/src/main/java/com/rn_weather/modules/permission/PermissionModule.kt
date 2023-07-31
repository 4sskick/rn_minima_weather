package com.rn_weather.modules.permission

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import com.rn_weather.utils.Constants
import com.rn_weather.utils.LogHelper

class PermissionModule : ReactContextBaseJavaModule {

    private lateinit var locationUtil: LocationUtil
    private var act: Activity?
    private var context: ReactApplicationContext

    constructor(context: ReactApplicationContext) : super(context) {
        this.context = context;
        act = currentActivity;



        context.addLifecycleEventListener(object : LifecycleEventListener {
            override fun onHostResume() {
                locationUtil.startLocationUpdate()
            }

            override fun onHostPause() {
                locationUtil.stopLocationUpdate()
            }

            override fun onHostDestroy() {
                locationUtil.stopLocationUpdate()
            }
        })
        context.addActivityEventListener(object : ActivityEventListener {
            override fun onActivityResult(
                    activity: Activity?,
                    requestCode: Int,
                    resultCode: Int,
                    data: Intent?
            ) {
                LogHelper.e(TAG, "req code: ${requestCode}\nresult code: ${requestCode}\ndata: ${data}")
            }

            override fun onNewIntent(intent: Intent?) {
                LogHelper.e(TAG, "calling here?")
            }


        })

        locationUtil = LocationUtil(context, object : LocationUtil.LocationListener {
            override fun getCurrentLocation(lat: Double, lon: Double) {

                LogHelper.e(TAG, "current location: ${lat} - ${lon}")

            }

        })

    }

    override fun getName(): String {
        return Constants.PERMISSION_NAME
    }

    @ReactMethod
    fun checkLocationPermission(callback: Callback) {


        if (act is PermissionAwareActivity) {
            val hasPermission = ContextCompat.checkSelfPermission(
                    reactApplicationContext,
                    Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED

            if (hasPermission) askLocation()
            else {
                ActivityCompat.requestPermissions(
                        act!!,
                        arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                        permissionCode
                )
            }
        } else callback.invoke("Error, Current activity is not PermissionAwareActivity")
    }

    private fun askLocation() {
        locationUtil.startLocationUpdate()
    }


    companion object {
        val TAG = PermissionModule.javaClass.simpleName
        const val permissionCode = 1;
    }
}