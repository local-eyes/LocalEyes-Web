import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import app from "firebase/app"
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  filepath: string;
  file: File;
  fullname = this.auth.userData.fullname;

  constructor(private storage: AngularFireStorage, private auth: AuthService) { }

  ngOnInit(): void {
    // app.storage().useEmulator("localhost", 9199)
  }

  getFile(event: FileList) {
    this.file = event.item(0);
    if (this.file.type.split('/')[0] !== 'image') {
      console.log("ONLY IMAGE TYPE REQUIRED");
      return;
    }
    this.filepath = `uploads/${this.fullname}/${new Date().getTime()}_${this.file.name}`;
  }

  startUpload() {
    this.task = this.storage.upload(this.filepath, this.file);
    // get notified when the download URL is available
    const fileRef = this.storage.ref(this.filepath);
    this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL()
          console.log("download url ", this.downloadURL);
        })
     )
    .subscribe()
  }

}
