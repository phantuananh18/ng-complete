import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ng-complete';

  username = '';
  DoReset() {
    this.username = '';
  }

  loadFeature = 'recipe';
  onNavigate(feature: string) {
    this.loadFeature = feature;
  }
}
