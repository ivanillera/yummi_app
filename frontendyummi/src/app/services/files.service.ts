import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FilesService {
    private readonly clientId = '859577195578-m21bt7jdm5t22d50m6vbc7och4seppho.apps.googleusercontent.com';
    private readonly apiKey = 'AIzaSyBl9Rlduq68w76W6D7qCaajygRsimEPWvk';
    private readonly appId = 'fine-physics-335722';
    private readonly scope = 'https://www.googleapis.com/auth/drive.file';
    private readonly oauthAccessToken = null;
    private readonly pickerApiLoaded = false;
    private readonly pickerCallback = null;


    constructor(private readonly http: HttpClient) { }


    // Public open(callback: any): void {
    // Console.log('hola');
    // This.pickerCallback = callback;
    // Gapi.load('auth', {'callback': this.onAuthApiLoad.bind(this)});
    // Gapi.load('picker', {'callback': this.onPickerApiLoad.bind(this)});
    // }

    // Public onAuthApiLoad(): void {
    //   Gapi.auth.authorize({
    //     'client_id': this.clientId,
    //     'scope': this.scope,
    //     'immediate': false,
    //   }, this.handleAuthResult.bind(this));
    // }

    // Public onPickerApiLoad(): void {
    //   This.pickerApiLoaded = true;
    //   This.createPicker();
    // }

    // Public handleAuthResult(authResult:any): void {
    //   If (authResult && !authResult.error) {
    //     This.oauthAccessToken = authResult.access_token;
    //     This.createPicker();
    //   }
    // }

    // Public createPicker(): void {
    //   If (this.pickerApiLoaded && this.oauthAccessToken) {
    //     Let view = new google.picker.View(google.picker.ViewId.DOCS);
    //     Let picker = new google.picker.PickerBuilder()
    //       .enableFeature(google.picker.Feature.NAV_HIDDEN)
    //       .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
    //       .setAppId(this.appId)
    //       .setOAuthToken(this.oauthAccessToken)
    //       .addView(view)
    //       .addView(new google.picker.DocsUploadView())
    //       .setDeveloperKey(this.apiKey)
    //       .setCallback(this.pickerCallback)
    //       .build();
    //     Picker.setVisible(true);
    //   }
    // }
}
