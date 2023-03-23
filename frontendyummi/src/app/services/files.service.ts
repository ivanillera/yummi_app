import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare const gapi: any;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class FilesService {  
private clientId = '859577195578-m21bt7jdm5t22d50m6vbc7och4seppho.apps.googleusercontent.com';
private apiKey = 'AIzaSyBl9Rlduq68w76W6D7qCaajygRsimEPWvk';
private appId = 'fine-physics-335722';
private scope = 'https://www.googleapis.com/auth/drive.file';
private oauthAccessToken = null;
private pickerApiLoaded = false;
private pickerCallback = null;


constructor(private http: HttpClient) { }


  // public open(callback: any): void {
  // console.log('hola');
  // this.pickerCallback = callback;
  // gapi.load('auth', {'callback': this.onAuthApiLoad.bind(this)});
  // gapi.load('picker', {'callback': this.onPickerApiLoad.bind(this)});
  // }

  // public onAuthApiLoad(): void {
  //   gapi.auth.authorize({
  //     'client_id': this.clientId,
  //     'scope': this.scope,
  //     'immediate': false,
  //   }, this.handleAuthResult.bind(this));
  // }

  // public onPickerApiLoad(): void {
  //   this.pickerApiLoaded = true;
  //   this.createPicker();
  // }

  // public handleAuthResult(authResult:any): void {
  //   if (authResult && !authResult.error) {
  //     this.oauthAccessToken = authResult.access_token;
  //     this.createPicker();
  //   }
  // }

  // public createPicker(): void {
  //   if (this.pickerApiLoaded && this.oauthAccessToken) {
  //     let view = new google.picker.View(google.picker.ViewId.DOCS);
  //     let picker = new google.picker.PickerBuilder()
  //       .enableFeature(google.picker.Feature.NAV_HIDDEN)
  //       .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
  //       .setAppId(this.appId)
  //       .setOAuthToken(this.oauthAccessToken)
  //       .addView(view)
  //       .addView(new google.picker.DocsUploadView())
  //       .setDeveloperKey(this.apiKey)
  //       .setCallback(this.pickerCallback)
  //       .build();
  //     picker.setVisible(true);
  //   }
  // }
}
