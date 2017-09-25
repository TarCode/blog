---
title: React Native Image Uploading with Cloudinary
date: "2017-09-25T13:18:24.832Z"
path: "/react-native-image-uploading/"
---

![React Native Cloudinary](https://cloudinary-res.cloudinary.com/image/upload/c_fill,w_770/dpr_1.0/React_Progressive_Web_App_2000x1100.png)

Greetings creatures of the world. Today, we're gonna upload images to Cloudinary using React Native! 😬

("Cloudinary is the image back-end for web and mobile developers. An end-to-end solution for all your image-related needs." - [The Cloudinary Website](https://cloudinary.com))

First you wanna make sure you have the React Native CLI installed (We're not using create-react-native-app). Then, you wanna signup up to [Cloudinary](https://cloudinary.com) if haven't already.

Now let's get down to business.🤓

## Step 1

`react-native init imageupload`

`cd imageupload`

`npm install`

`mkdir app`

`touch app/index.js`

## Step 2

Replace `index.android.js` and `index.ios.js` with the following:

```
import React from 'react'
import { AppRegistry } from 'react-native'

import App from './app/index'

AppRegistry.registerComponent('imageupload', () => App)
```

## Step 3

Run `npm install —-save react-native-image-picker react-native-fetch-blob`

then `react-native link`.

That should successfully install and link the packages required for accessing the file system (included with react-native-image-picker) and posting the image data to Cloudinary (react-native-fetch-blob).

## Step 4

Before we can access files on the device, we have to ask the user for permission first. Follows these instructions to allow permissions for Android and iOS:

### iOS
Add this to `ios/app_name/Info.plist`:

![React Native Cloudinary](iosperm.png)

### Android
Add this to `android/app/src/AndroidManifest.xml`:

![React Native Cloudinary](androidperm.png)

## Step 5

This is the main component we use to do everything. Copy it into `app/index.js` and update it with your cloudinary name and preset:

```
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: "",
            uploadImage: false
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: "#FAFAFA",
                alignItems: 'center',
                justifyContent: "center"
            }}>
                <Text>React Native Image Upload with Cloudinary!</Text>
                <TouchableOpacity onPress={() => {
                    var options = {
                        title: 'Select Avatar',
                        customButtons: [
                            { name: 'fb', title: 'Choose Photo from Facebook' },
                        ],
                        storageOptions: {
                            skipBackup: true,
                            path: 'images'
                        }
                    };

                    this.setState({
                        uploadingImg: true
                    });

                    ImagePicker.showImagePicker(options, (response) => {
                        console.log('Response = ', response);

                        if (response.didCancel) {
                            console.log('User cancelled image picker');
                        }
                        else if (response.error) {
                            console.log('ImagePicker Error: ', response.error);
                        }
                        else if (response.customButton) {
                            console.log('User tapped custom button: ', response.customButton);
                        }
                        else {
                            let source = { uri: response.uri };

                            uploadFile(response)
                                .then(response => response.json())
                                .then(result => {
                                    this.setState({
                                        avatarSource: { uri: result.secure_url },
                                        uploadingImg: false
                                    });
                                })

                        }
                    });
                }} style={{
                    height: 80,
                    width: 80,
                    borderRadius: 40,
                    backgroundColor: "#333",
                    marginBottom: 20
                }}>
                    <Image source={this.state.avatarSource} style={{
                        height: 80,
                        width: 80,
                        borderRadius: 40
                    }} />
                </TouchableOpacity>
            </View>
        )
    }
}

function uploadFile(file) {
    return RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/yourcloudinaryname/image/upload?upload_preset=yourcloudinarypreset', {
        'Content-Type': 'multipart/form-data'
    }, [
            { name: 'file', filename: file.fileName, data: RNFetchBlob.wrap(file.origURL) }
        ])
}
```

## Step 6

Once that's all done and dusted, run `react-native run-ios` or `react-native run-andoid` and upload your images to Cloudinary!!

[The code exists on Github too](https://github.com/TarCode/react-native-cloudinary) 

# 👽 🤓 👾



