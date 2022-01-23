import { Composite, ImageValue, ImageView, Properties, Popover } from 'tabris';
import { component, property, ListView, Cell, inject } from 'tabris-decorators';

import { DetailViewComponent } from './detail-view.component';

import { ImageService } from './image.service';

@component
export class GalleryViewComponent extends Composite {

    @property public stringList: ImageValue[] = ['https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'];

    constructor(
        properties: Properties<GalleryViewComponent>,
        @inject private imageService: ImageService
    ) {
        super();
        this.set(properties);

        this.listenToImageChanges();

        this.initView();
    }

    private initView(): void {
        this.append(
            <$>
                <ListView stretch bind-items='stringList' onSelect={({ item }: { item: ImageValue }) => this.toggleDetailView(item)}>
                    <Cell padding={15} selectable={true}>
                        <ImageView centerX height={250} width={250} cornerRadius={25} scaleMode='fill' bind-image='item'></ImageView>
                    </Cell>
                </ListView>
            </$>
        );
    }

    private listenToImageChanges(): void {
        this.imageService.onImagesChanged(() => {
            this.stringList = this.imageService.images;
        });
    }

    private toggleDetailView(image: ImageValue): void {
        const popover = Popover.open(
            <Popover>
                <DetailViewComponent stretch image={image} onDismissedChanged={() => popover.close()}></DetailViewComponent>
            </Popover>
        );
    }

}