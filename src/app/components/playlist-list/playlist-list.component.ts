
import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {

  playlists: Playlist[] = [];
  loading = false;
  errorMessage = '';

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.loading = true;

    this.playlistService.getAllPlaylists().subscribe(
      (data) => {
        this.playlists = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading playlists:', error);
        this.errorMessage = 'Unable to load playlists.';
        this.loading = false;
      }
    );
  }

  deletePlaylist(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    if (confirm('Are you sure you want to delete this playlist?')) {
      this.playlistService.deletePlaylist(id).subscribe(
        () => {
          this.loadPlaylists();
        },
        (error) => {
          console.error('Error deleting playlist:', error);
          this.errorMessage = 'Unable to delete playlist.';
        }
      );
    }
  }
}
