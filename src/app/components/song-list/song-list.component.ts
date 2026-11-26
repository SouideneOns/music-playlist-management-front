import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songs: Song[] = [];
  loading = false;
  errorMessage = '';

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.loading = true;

    this.songService.getAllSongs().subscribe({
      next: (data) => {
        this.songs = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load songs.';
        this.loading = false;
      }
    });
  }

  deleteSong(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    if (confirm('Are you sure you want to delete this song?')) {
      this.songService.deleteSong(id).subscribe({
        next: () => {
          this.loadSongs();
        },
        error: () => {
          this.errorMessage = 'Unable to delete song.';
        }
      });
    }
  }
}