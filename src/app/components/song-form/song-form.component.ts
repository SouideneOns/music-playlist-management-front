
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../../models/song';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent implements OnInit {

  song: Song = {
  title: '',
  artist: '',
  genre: '',
  duration: 0,
  audioUrl: ''
};

  isEditMode = false;
  songId?: number;

  constructor(
    private songService: SongService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.songId = Number(id);
      this.loadSong(this.songId);
    }
  }

  loadSong(id: number): void {
    this.songService.getSongById(id).subscribe(
      (data) => {
        this.song = data;
      },
      (error) => {
        console.error('Error loading song', error);
      }
    );
  }

  saveSong(): void {

  if (this.isEditMode && this.songId !== undefined) {

    this.songService.updateSong(this.songId, this.song).subscribe(
      (response) => {
        console.log('Song updated:', response);
        this.router.navigate(['/songs']);
      },
      (error) => {
        console.error('Error updating song:', error);
      }
    );

  } else {

    this.songService.createSong(this.song).subscribe(
      (response) => {
        console.log('Song created:', response);
        this.router.navigate(['/songs']);
      },
      (error) => {
        console.error('Error creating song:', error);
      }
    );

  }
}
}
