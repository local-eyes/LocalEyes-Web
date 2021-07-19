import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  uid = this.auth.userData.uid;

  constructor(private storage: AngularFireStorage, private auth: AuthService) { }

  ngOnInit(): void {
  }

  toggleHover(event:boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.log("ONLY IMAGE TYPE REQUIRED");
      return;
    }

    const path = `images/${this.uid}_${new Date().getTime()}_${file.name}`;

    this.task = this.storage.upload(path, file);
    const fileRef = this.storage.ref(path);

    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    fileRef.getDownloadURL().subscribe(ref => {
      this.downloadURL = ref;
    });
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
