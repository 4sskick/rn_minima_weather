package com.rn_weather.modules.permission

import android.content.Context
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.rn_weather.utils.LogHelper

class LocationUtil {

    companion object {
        val TAG = LocationUtil.javaClass.simpleName
    }

    private var locationManager: LocationManager
    private var locationListener: android.location.LocationListener

    constructor(context: ReactApplicationContext, listener: LocationListener) {

        locationManager = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager;
        locationListener = object : android.location.LocationListener {
            override fun onLocationChanged(location: Location) {
                val lat = location.latitude
                val lon = location.longitude

                LogHelper.e(TAG, "current location: lat: ${lat} - lon: ${lon}")

                listener.getCurrentLocation(lat, lon)
            }

        }

    }

    fun startLocationUpdate() {
        //check for provider enabled
        if (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) ||
                locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {

            try {
                locationManager.requestLocationUpdates(
                        LocationManager.GPS_PROVIDER,
                        5000,
                        100f,
                        locationListener
                )
            } catch (e: SecurityException) {
                e.printStackTrace()
            }
        } else {
            LogHelper.e(TAG, "location provider not enabled yet!")
        }
    }

    fun stopLocationUpdate(){

    }

    interface LocationListener {
        fun getCurrentLocation(lat: Double, lon: Double);
    }
}