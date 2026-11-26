import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongFormComponent } from './components/song-form/song-form.component';
import { PlaylistListComponent } from './components/playlist-list/playlist-list.component';
import { PlaylistFormComponent } from './components/playlist-form/playlist-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongFormComponent,
    PlaylistListComponent,
    PlaylistFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
