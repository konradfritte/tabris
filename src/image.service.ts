import { ChangeListeners, ImageValue } from "tabris";
import { shared, property, event } from "tabris-decorators";

@shared
export class ImageService {

    @property public images: ImageValue[] = [];

    @event public onImagesChanged: ChangeListeners<ImageService, 'images'>;

    constructor() { }

    public addImage(image: ImageValue): void {
        this.images = [...this.images, image];
    }
}