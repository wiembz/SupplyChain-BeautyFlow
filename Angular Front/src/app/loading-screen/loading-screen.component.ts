import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef | undefined;
  videoError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Ensure the video starts playing programmatically
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      const videoElement = this.videoPlayer.nativeElement;

      // Set muted attribute to true to increase chances of autoplay success
      videoElement.muted = true;

      videoElement.play().catch((error: any) => {
        console.error('Error playing video:', error);
        this.videoError = true;

        // If video can't autoplay, we'll show a static loading indicator instead
        // The template will show an alternative loading animation when videoError is true
      });
    }
  }
}
