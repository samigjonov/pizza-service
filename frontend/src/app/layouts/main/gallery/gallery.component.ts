import { Component, OnInit } from "@angular/core";
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from "@kolkov/ngx-gallery";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() {
  }

  public ngOnInit() {
    this.galleryOptions = [
      {
        image: false,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailMargin: 0,
        previewDownload: true
      },
      // max-width 800
      {
        breakpoint: 800,
        imagePercent: 80,
        thumbnailsPercent: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [1, 2, 3, 4, 5, 6].map(i => {
      return {
        small: `https://picsum.photos/id/${i * 100 + 2}/300/300`,
        medium: `https://picsum.photos/id/${i * 100 + 2}/600/600`,
        big: `https://picsum.photos/id/${i * 100 + 2}/1200/1200`
      }
    })
  }
}
