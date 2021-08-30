import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import app from "firebase/app"
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Output() imageUploadEvent = new EventEmitter<string>();

  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  filepath: string;
  file: File;
  fullname = this.auth.userData.fullname;
  uploadURL: string;
  disableUploadButton: boolean = true;
  buttonTitle:string = "Upload Image";

  constructor(private storage: AngularFireStorage, private auth: AuthService, public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    // app.storage().useEmulator("localhost", 9199)
  }

  getFile(event: FileList) {
    this.file = event.item(0);
    this.buttonTitle = "Upload Image";
    if (this.file.type.split('/')[0] !== 'image') {
      console.log("ONLY IMAGE TYPE REQUIRED");
      const snackRef = this.snackbar.open("ONLY IMAGES ALLOWED", "Retry", {verticalPosition: "bottom", horizontalPosition: "center"})
      snackRef.onAction().subscribe(res => {
        event.item = null
      })
      return;
    }
    this.disableUploadButton = false;
    this.filepath = `uploads/${this.fullname}/${new Date().getTime()}_${this.file.name}`;
  }

  startUpload(e:Event) {
    e.preventDefault();
    this.disableUploadButton = true;
    this.buttonTitle = "UPLOADING... Please Wait"
    this.task = this.storage.upload(this.filepath, this.file);
    // get notified when the download URL is available
    const fileRef = this.storage.ref(this.filepath);
    this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL()
          this.downloadURL.subscribe(url => {
            console.log(url);
            this.uploadURL = url;
            this.imageUploadEvent.emit(url);
            this.buttonTitle = "Upload Complete"
          })
        })
        )
    .subscribe()
  }

}
