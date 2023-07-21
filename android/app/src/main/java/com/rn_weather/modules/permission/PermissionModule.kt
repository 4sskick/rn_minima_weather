package com.rn_weather.modules.permission

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.rn_weather.utils.Constants

class PermissionModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return Constants.PERMISSION_NAME
    }

    @ReactMethod
    fun checkLocationPermission(promise: Promise){

        val hasPermission = ContextCompat.checkSelfPermission(
                reactApplicationContext
                , Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED

        promise.resolve(hasPermission)
    }

}