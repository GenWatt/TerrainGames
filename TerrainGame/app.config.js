export default ({ config }) => ({
    ...config,
    plugins: [
        "expo-router",
        [
            "@rnmapbox/maps",
            {
                "RNMapboxMapsDownloadToken": process.env.EXPO_PUBLIC_RNMAPBOX_MAPS_DOWNLOAD_TOKEN
            }
        ],
        [
            "expo-location",
            {
                "locationWhenInUsePermission": "Show current location on map."
            }
        ]
    ],
});