import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

interface Slide {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
  url: string;
  action: string;
  btnText: string;
}

@Component({
  selector: 'app-dash-slider-card',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dash-slider-card.component.html',
  styleUrl: './dash-slider-card.component.css'
})

export class DashSliderCardComponent implements OnInit, OnDestroy {

  @Input() slides: Slide[] = [];
  @Input() indicators = true;
  @Input() autoSlide = false;
  @Input() autoSlideInterval = 3000;
  @Input() parentComponent: any;

  selectedSlide = 0;
  private slideInterval: any;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideInterval);
  }

  nextSlide(): void {
    this.selectedSlide = (this.selectedSlide + 1) % this.slides.length;
  }

  selectSlide(index: number): void {
    this.selectedSlide = index;
    if (this.autoSlide) {
      clearInterval(this.slideInterval);
      this.startAutoSlide();
    }
  }

  executeAction(action: string | undefined): void {
    if (action && this.parentComponent) {
      const [property, value] = action.split('=').map(item => item.trim());
      if (this.parentComponent.hasOwnProperty(property)) {
        this.parentComponent[property] = value === 'true' ? true : value === 'false' ? false : value;
      }
    }
  }
}
