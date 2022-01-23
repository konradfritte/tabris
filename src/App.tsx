import { Constraint, contentView, TextView } from 'tabris';
import { GalleryViewComponent } from './gallery-view.component';

export class App {

  public start() {

    contentView.append(
      <$>
        <TextView padding={15} font='bold 24px monospace' centerX>My Photo Gallery</TextView>
        <GalleryViewComponent top={Constraint.prev} stretch />
      </$>
    );
  }
}

