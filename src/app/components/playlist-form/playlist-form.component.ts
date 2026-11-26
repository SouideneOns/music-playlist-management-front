
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { Song } from '../../models/song';
import { PlaylistService } from '../../services/playlist.service';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css']
})
export class PlaylistFormComponent implements OnInit {

  playlist: Playlist = {
    name: '',
    description: '',
    songs: []
  };

  availableSongs: Song[] = [];
  selectedSongIds: number[] = [];

  isEditMode = false;
  playlistId?: number;

  constructor(
    private playlistService: PlaylistService,
    private songService: SongService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSongs();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.playlistId = Number(id);
      this.loadPlaylist(this.playlistId);
    }
  }

  loadSongs(): void {
    this.songService.getAllSongs().subscribe(
      (data) => {
        this.availableSongs = data;
      },
      (error) => {
        console.error('Error loading songs:', error);
      }
    );
  }

  loadPlaylist(id: number): void {
    this.playlistService.getPlaylistById(id).subscribe(
      (data) => {
        this.playlist = data;
        this.selectedSongIds = data.songs
          ? data.songs.map(song => song.id!)
          : [];
      },
      (error) => {
        console.error('Error loading playlist:', error);
      }
    );
  }

  onSongSelectionChange(event: any, songId: number | undefined): void {
    if (songId === undefined) {
      return;
    }

    if (event.target.checked) {
      if (!this.selectedSongIds.includes(songId)) {
        this.selectedSongIds.push(songId);
      }
    } else {
      this.selectedSongIds = this.selectedSongIds.filter(id => id !== songId);
    }
  }

  savePlaylist(): void {
    const selectedSongs = this.availableSongs.filter(
      song => song.id !== undefined && this.selectedSongIds.includes(song.id)
    );

    this.playlist.songs = selectedSongs;

    if (this.isEditMode && this.playlistId !== undefined) {
      this.playlistService.updatePlaylist(
        this.playlistId,
        this.playlist
      ).subscribe(
        () => {
          this.router.navigate(['/playlists']);
        },
        (error) => {
          console.error('Error updating playlist:', error);
        }
      );
    } else {
      this.playlistService.createPlaylist(this.playlist).subscribe(
        () => {
          this.router.navigate(['/playlists']);
        },
        (error) => {
          console.error('Error creating playlist:', error);
        }
      );
    }
  }
}
