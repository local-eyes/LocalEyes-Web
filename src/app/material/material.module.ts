import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";

const MaterialComponents = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule,
  MatCardModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
