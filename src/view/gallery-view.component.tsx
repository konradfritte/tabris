import { Composite, ImageValue, ImageView, Properties, Popover, TextView } from 'tabris';
import { component, property, ListView, Cell, inject } from 'tabris-decorators';

import { DetailViewComponent } from './detail-view.component';

import { ImageService } from '../service/image.service';

@component
export class GalleryViewComponent extends Composite {

    public static placeholder = ['https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'];


    @property public images: string[];

    constructor(
        properties: Properties<GalleryViewComponent>,
        @inject private imageService: ImageService
    ) {
        super();
        this.set(properties);

        this.initImages();
        this.initView();

        this.listenToImageChanges();
    }

    private initImages(): void {
        const images = this.imageService.getImages();

        this.images = images.length ? this.imageService.getImages() : GalleryViewComponent.placeholder;
    }

    private initView(): void {

        this.append(
            <$>
                <TextView center >Here should be a List of your images</TextView>
            </$>
        );
    }

    private listenToImageChanges(): void {
    }

    private toggleDetailView(image: ImageValue): void {
        const popover = Popover.open(
            <Popover>
                <DetailViewComponent stretch image={image} onDismissedChanged={() => popover.close()}></DetailViewComponent>
            </Popover>
        );
    }

}